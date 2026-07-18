import { prisma } from "./prisma";

const MAX_ATTEMPTS = 5;
const BLOCK_DURATION_MINUTES = 15;

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; message?: string }> {
  try {
    const record = await prisma.loginAttempt.findUnique({
      where: { ip },
    });

    if (record && record.blockedAt) {
      const now = new Date();
      const blockedUntil = new Date(record.blockedAt.getTime() + BLOCK_DURATION_MINUTES * 60 * 1000);
      if (now < blockedUntil) {
        const timeLeftSeconds = Math.ceil((blockedUntil.getTime() - now.getTime()) / 1000);
        const minutes = Math.floor(timeLeftSeconds / 60);
        const seconds = timeLeftSeconds % 60;
        return {
          allowed: false,
          message: `Too many login attempts. Access blocked. Please try again in ${minutes}m ${seconds}s.`,
        };
      } else {
        // Block has expired, reset attempts
        await prisma.loginAttempt.delete({ where: { ip } });
      }
    }
  } catch (e) {
    console.error("Error in checkRateLimit:", e);
  }
  return { allowed: true };
}

export async function recordLoginFailure(ip: string): Promise<string> {
  try {
    const record = await prisma.loginAttempt.findUnique({
      where: { ip },
    });

    if (!record) {
      await prisma.loginAttempt.create({
        data: { ip, attempts: 1 },
      });
      return `Invalid credentials. You have ${MAX_ATTEMPTS - 1} attempts remaining.`;
    } else {
      const newAttempts = record.attempts + 1;
      if (newAttempts >= MAX_ATTEMPTS) {
        await prisma.loginAttempt.update({
          where: { ip },
          data: {
            attempts: newAttempts,
            blockedAt: new Date(),
          },
        });
        return `Too many failed attempts. Your IP has been blocked for 15 minutes.`;
      } else {
        await prisma.loginAttempt.update({
          where: { ip },
          data: { attempts: newAttempts },
        });
        return `Invalid credentials. You have ${MAX_ATTEMPTS - newAttempts} attempts remaining.`;
      }
    }
  } catch (e) {
    console.error("Error in recordLoginFailure:", e);
    return "Invalid credentials.";
  }
}

export async function recordLoginSuccess(ip: string): Promise<void> {
  try {
    await prisma.loginAttempt.deleteMany({
      where: { ip },
    });
  } catch (e) {
    console.error("Error in recordLoginSuccess:", e);
  }
}
