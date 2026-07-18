import { createClient } from "@supabase/supabase-js";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import "dotenv/config";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const adminEmail = process.env.ADMIN_EMAIL || "admin@hassan.dev";
const adminPassword = process.env.ADMIN_PASSWORD || "AdminPassword123!";

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Error: Supabase environment variables are missing.");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL environment variable is missing.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Setup Prisma Client with pg adapter
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting Admin User Seeding...");
  console.log(`Target Email: ${adminEmail}`);

  // 1. Check if user already exists in Supabase Auth (by listing users)
  console.log("Checking if user exists in Supabase Auth...");
  const { data: usersData, error: listError } = await supabase.auth.admin.listUsers();
  
  if (listError) {
    console.error("Error listing Supabase users:", listError.message);
    process.exit(1);
  }

  let authUser = usersData.users.find(u => u.email === adminEmail);

  if (authUser) {
    console.log(`User ${adminEmail} already exists in Supabase Auth. ID: ${authUser.id}`);
    
    // Update password just in case
    console.log("Updating password for existing user...");
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      authUser.id,
      { password: adminPassword }
    );
    if (updateError) {
      console.error("Error updating user password:", updateError.message);
    } else {
      console.log("Password updated successfully.");
    }
  } else {
    // Create new user in Supabase Auth
    console.log("Creating new user in Supabase Auth...");
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: { role: "Admin" }
    });

    if (createError) {
      console.error("Error creating user in Supabase Auth:", createError.message);
      process.exit(1);
    }

    authUser = createData.user;
    console.log(`Successfully created user in Supabase Auth. ID: ${authUser.id}`);
  }

  // 2. Synchronize to the profiles table in our database
  console.log("Syncing admin user to database profiles table...");
  const profile = await prisma.profile.upsert({
    where: { email: adminEmail },
    update: {
      id: authUser.id,
      role: "Admin",
    },
    create: {
      id: authUser.id,
      email: adminEmail,
      role: "Admin",
    },
  });

  console.log("Admin Profile synced in database successfully:", profile);

  // 3. Clean up other users if they exist in the profiles table to ensure "Only one user should exist"
  console.log("Enforcing only one admin user exists in profiles table...");
  const deleteResult = await prisma.profile.deleteMany({
    where: {
      id: { not: authUser.id }
    }
  });
  console.log(`Deleted ${deleteResult.count} other profile records.`);
  
  console.log("Admin seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seeding failed with unexpected error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
