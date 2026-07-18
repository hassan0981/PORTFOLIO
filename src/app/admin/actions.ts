"use server";

import { revalidatePath } from "next/cache";
import { loginUser, logoutUser, checkAuth } from "@/lib/auth";
import { dbService, ProjectData, CertificateData } from "@/lib/dbService";

import { headers } from "next/headers";
import { checkRateLimit, recordLoginFailure, recordLoginSuccess } from "@/lib/rateLimit";

async function getClientIp(): Promise<string> {
  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
  const isSandbox = !siteKey || siteKey.toLowerCase().includes("placeholder") || siteKey === "";

  if (isSandbox && token === "mock-token") {
    console.log("[reCAPTCHA] Bypassing validation in Sandbox/Development mode.");
    return true;
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY || "6Ld2aKcUAAAAAFg8L11-5h9v71g4d_6E4n2G1Gg6"; // test secret key
  if (!token) return false;

  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await res.json();
    return data.success && data.score >= 0.5;
  } catch (e) {
    console.error("reCAPTCHA validation error:", e);
    return false;
  }
}

// Authentication Actions
export async function adminLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const recaptchaToken = formData.get("recaptchaToken") as string;

  // 1. IP Rate Limiting Check
  const ip = await getClientIp();
  const limitCheck = await checkRateLimit(ip);
  if (!limitCheck.allowed) {
    return { success: false, error: limitCheck.message };
  }

  // 2. Verify reCAPTCHA
  const isHuman = await verifyRecaptcha(recaptchaToken);
  if (!isHuman) {
    return { success: false, error: "reCAPTCHA verification failed. Please try again." };
  }

  // 3. Attempt Login
  const success = await loginUser(email, password);
  if (success) {
    await recordLoginSuccess(ip);
    revalidatePath("/", "layout");
    return { success: true };
  }

  // 4. Record Failure
  const failMessage = await recordLoginFailure(ip);
  return { success: false, error: failMessage };
}


export async function adminLogout() {
  await logoutUser();
  revalidatePath("/", "layout");
  return { success: true };
}

export async function verifySession() {
  return await checkAuth();
}

// Project Actions
export async function createProject(data: Omit<ProjectData, "id">) {
  const auth = await checkAuth();
  if (!auth) throw new Error("Unauthorized");

  const created = await dbService.createProject(data);
  revalidatePath("/");
  revalidatePath("/projects");
  return { success: true, data: created };
}

export async function updateProject(id: string, data: Partial<Omit<ProjectData, "id">>) {
  const auth = await checkAuth();
  if (!auth) throw new Error("Unauthorized");

  const updated = await dbService.updateProject(id, data);
  revalidatePath("/");
  revalidatePath("/projects");
  revalidatePath(`/projects/${updated?.slug}`);
  return { success: true, data: updated };
}

export async function deleteProject(id: string) {
  const auth = await checkAuth();
  if (!auth) throw new Error("Unauthorized");

  const success = await dbService.deleteProject(id);
  revalidatePath("/");
  revalidatePath("/projects");
  return { success };
}

// Certificate Actions
export async function createCertificate(data: Omit<CertificateData, "id">) {
  const auth = await checkAuth();
  if (!auth) throw new Error("Unauthorized");

  const created = await dbService.createCertificate(data);
  revalidatePath("/");
  revalidatePath("/resume");
  return { success: true, data: created };
}

export async function deleteCertificate(id: string) {
  const auth = await checkAuth();
  if (!auth) throw new Error("Unauthorized");

  const success = await dbService.deleteCertificate(id);
  revalidatePath("/");
  revalidatePath("/resume");
  return { success };
}


// Message Actions
export async function deleteMessage(id: string) {
  const auth = await checkAuth();
  if (!auth) throw new Error("Unauthorized");

  const success = await dbService.deleteMessage(id);
  return { success };
}

export async function updateMessageStatus(id: string, status: string) {
  const auth = await checkAuth();
  if (!auth) throw new Error("Unauthorized");

  const updated = await dbService.updateMessageStatus(id, status);
  return { success: !!updated, data: updated };
}


// Settings Actions
export async function updateResumeUrl(url: string) {
  const auth = await checkAuth();
  if (!auth) throw new Error("Unauthorized");

  const updatedUrl = await dbService.updateResumeUrl(url);
  revalidatePath("/");
  revalidatePath("/resume");
  return { success: true, url: updatedUrl };
}
