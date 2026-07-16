"use server";

import { revalidatePath } from "next/cache";
import { loginUser, logoutUser, checkAuth } from "@/lib/auth";
import { dbService, ProjectData, CertificateData } from "@/lib/dbService";

// Authentication Actions
export async function adminLogin(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const success = await loginUser(email, password);
  if (success) {
    revalidatePath("/", "layout");
    return { success: true };
  }
  return { success: false, error: "Invalid credentials." };
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
  revalidatePath("/about");
  return { success: true, data: created };
}

export async function deleteCertificate(id: string) {
  const auth = await checkAuth();
  if (!auth) throw new Error("Unauthorized");

  const success = await dbService.deleteCertificate(id);
  revalidatePath("/");
  revalidatePath("/about");
  return { success };
}

// Message Actions
export async function deleteMessage(id: string) {
  const auth = await checkAuth();
  if (!auth) throw new Error("Unauthorized");

  const success = await dbService.deleteMessage(id);
  return { success };
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
