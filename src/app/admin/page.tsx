import React from "react";
import { redirect } from "next/navigation";
import { checkAuth } from "@/lib/auth";
import { dbService } from "@/lib/dbService";
import AdminConsole from "@/components/AdminConsole";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // 1. Session Auth Gate
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    redirect("/admin/login");
  }

  // 2. Data Retrieval
  const projects = await dbService.getProjects();
  const messages = await dbService.getMessages();
  const certificates = await dbService.getCertificates();
  const resumeUrl = await dbService.getResumeUrl();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <AdminConsole
        initialProjects={projects}
        initialMessages={messages}
        initialCertificates={certificates}
        initialResumeUrl={resumeUrl}
      />
    </div>
  );
}
