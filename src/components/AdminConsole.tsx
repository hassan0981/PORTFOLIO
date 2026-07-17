"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  BookOpen,
  MessageSquare,
  Award,
  Settings,
  Plus,
  Trash2,
  Edit2,
  LogOut,
  Sparkles,
  ExternalLink,
  Github,
  CheckCircle,
} from "lucide-react";
import { ProjectData, MessageData, CertificateData } from "@/lib/dbService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  createProject,
  updateProject,
  deleteProject,
  createCertificate,
  deleteCertificate,
  deleteMessage,
  updateResumeUrl,
  adminLogout,
} from "@/app/admin/actions";

interface AdminConsoleProps {
  initialProjects: ProjectData[];
  initialMessages: MessageData[];
  initialCertificates: CertificateData[];
  initialResumeUrl: string;
}

export default function AdminConsole({
  initialProjects,
  initialMessages,
  initialCertificates,
  initialResumeUrl,
}: AdminConsoleProps) {
  const router = useRouter();

  // State Management
  const [projects, setProjects] = React.useState<ProjectData[]>(initialProjects);
  const [messages, setMessages] = React.useState<MessageData[]>(initialMessages);
  const [certificates, setCertificates] = React.useState<CertificateData[]>(initialCertificates);
  const [resumeUrl, setResumeUrl] = React.useState(initialResumeUrl);

  const [loading, setLoading] = React.useState(false);
  const [msgText, setMsgText] = React.useState({ text: "", type: "" });

  // Dialog / Modal States
  const [projectDialogOpen, setProjectDialogOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<ProjectData | null>(null);

  const [certDialogOpen, setCertDialogOpen] = React.useState(false);

  // Form input refs/states
  const projectFormRef = React.useRef<HTMLFormElement>(null);
  const certFormRef = React.useRef<HTMLFormElement>(null);

  const showMsg = (text: string, type: "success" | "error" = "success") => {
    setMsgText({ text, type });
    setTimeout(() => setMsgText({ text: "", type: "" }), 4000);
  };

  // Sign out handler
  const handleLogout = async () => {
    await adminLogout();
    router.push("/");
    router.refresh();
  };

  // --- PROJECT CRUD ---
  const handleSaveProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);

    const title = fd.get("title") as string;
    const slug = fd.get("slug") as string;
    const description = fd.get("description") as string;
    const content = fd.get("content") as string;
    const imageUrl = fd.get("imageUrl") as string;
    const tagsString = fd.get("tags") as string;
    const featuresString = fd.get("features") as string;
    const githubUrl = fd.get("githubUrl") as string || null;
    const liveUrl = fd.get("liveUrl") as string || null;
    const order = parseInt(fd.get("order") as string || "0");

    const tags = tagsString.split(",").map((s) => s.trim()).filter(Boolean);
    const features = featuresString.split("\n").map((s) => s.trim()).filter(Boolean);

    try {
      if (selectedProject) {
        // Edit mode
        const res = await updateProject(selectedProject.id, {
          title,
          slug,
          description,
          content,
          imageUrl,
          tags,
          features,
          githubUrl,
          liveUrl,
          order,
        });
        if (res.success && res.data) {
          setProjects((prev) =>
            prev.map((p) => (p.id === selectedProject.id ? (res.data as ProjectData) : p))
          );
          showMsg("Project updated successfully");
        }
      } else {
        // Create mode
        const res = await createProject({
          title,
          slug,
          description,
          content,
          imageUrl,
          tags,
          features,
          githubUrl,
          liveUrl,
          order,
        });
        if (res.success && res.data) {
          setProjects((prev) => [...prev, res.data as ProjectData]);
          showMsg("Project created successfully");
        }
      }
      setProjectDialogOpen(false);
      setSelectedProject(null);
    } catch (err: any) {
      console.error(err);
      showMsg(err.message || "Failed to save project", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await deleteProject(id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
        showMsg("Project deleted successfully");
      }
    } catch (err: any) {
      console.error(err);
      showMsg("Failed to delete project", "error");
    }
  };



  // --- CERTIFICATE CRUD ---
  const handleSaveCert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);

    const title = fd.get("title") as string;
    const issuer = fd.get("issuer") as string;
    const issueDate = fd.get("issueDate") as string;
    const credentialUrl = (fd.get("credentialUrl") as string) || null;

    try {
      const res = await createCertificate({
        title,
        issuer,
        issueDate,
        credentialUrl,
        imageUrl: null,
        order: certificates.length + 1,
      });
      if (res.success && res.data) {
        setCertificates((prev) => [...prev, res.data as CertificateData]);
        showMsg("Certificate added successfully");
        setCertDialogOpen(false);
      }
    } catch (err) {
      console.error(err);
      showMsg("Failed to save certificate", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCert = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) return;
    try {
      const res = await deleteCertificate(id);
      if (res.success) {
        setCertificates((prev) => prev.filter((c) => c.id !== id));
        showMsg("Certificate deleted successfully");
      }
    } catch (err) {
      console.error(err);
      showMsg("Failed to delete certificate", "error");
    }
  };

  // --- MESSAGE DELETE ---
  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this feedback message?")) return;
    try {
      const res = await deleteMessage(id);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        showMsg("Feedback log deleted");
      }
    } catch (err) {
      console.error(err);
      showMsg("Failed to delete message", "error");
    }
  };

  // --- SETTINGS (RESUME UPDATE) ---
  const handleUpdateResume = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const url = fd.get("resumeUrl") as string;

    try {
      const res = await updateResumeUrl(url);
      if (res.success) {
        setResumeUrl(res.url);
        showMsg("Resume reference link updated successfully");
      }
    } catch (err) {
      console.error(err);
      showMsg("Failed to update resume reference", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 select-text">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center space-x-2 text-primary font-semibold">
            <Sparkles className="h-4.5 w-4.5" />
            <span className="text-xs uppercase tracking-widest font-mono">Console Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1">
            Administrator Dashboard
          </h1>
        </div>

        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-fit flex items-center space-x-1.5 text-xs text-destructive border-destructive/20 hover:bg-destructive/10 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </Button>
      </div>

      {/* Action alerts */}
      {msgText.text && (
        <div
          className={`p-3 border rounded-xl flex items-center space-x-2 text-xs font-semibold max-w-sm animate-in fade-in slide-in-from-top-4 duration-200 ${
            msgText.type === "error"
              ? "bg-destructive/10 border-destructive/20 text-destructive"
              : "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
          }`}
        >
          <CheckCircle className="h-4 w-4 shrink-0" />
          <span>{msgText.text}</span>
        </div>
      )}

      {/* Tabs panels */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted border border-border/60 p-1 rounded-xl flex flex-wrap h-auto gap-1">
          <TabsTrigger value="overview" className="rounded-lg text-xs py-2 px-3.5 cursor-pointer">
            Overview
          </TabsTrigger>
          <TabsTrigger value="projects" className="rounded-lg text-xs py-2 px-3.5 cursor-pointer">
            Projects
          </TabsTrigger>

          <TabsTrigger value="messages" className="rounded-lg text-xs py-2 px-3.5 cursor-pointer">
            Messages ({messages.length})
          </TabsTrigger>
          <TabsTrigger value="certificates" className="rounded-lg text-xs py-2 px-3.5 cursor-pointer">
            Certificates
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-lg text-xs py-2 px-3.5 cursor-pointer">
            Settings
          </TabsTrigger>
        </TabsList>

        {/* --- OVERVIEW TAB --- */}
        <TabsContent value="overview" className="space-y-6 outline-none">
          {/* Stats Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-card border border-border p-5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 rounded-xl">
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Projects</p>
                <p className="text-xl font-extrabold text-foreground mt-0.5">{projects.length}</p>
              </div>
            </div>

            <div className="bg-card border border-border p-5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Contact Messages</p>
                <p className="text-xl font-extrabold text-foreground mt-0.5">{messages.length}</p>
              </div>
            </div>

            <div className="bg-card border border-border p-5 rounded-2xl flex items-center space-x-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Certifications</p>
                <p className="text-xl font-extrabold text-foreground mt-0.5">{certificates.length}</p>
              </div>
            </div>
          </div>

          {/* Recent Messages Preview */}
          <div className="bg-card border border-border p-5 rounded-2xl">
            <h2 className="text-sm font-bold text-foreground mb-4">Recent Contact Logs</h2>
            {messages.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">No messages received yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-muted-foreground border-collapse">
                  <thead>
                    <tr className="border-b border-border/80 text-foreground font-semibold">
                      <th className="py-2.5">Date</th>
                      <th className="py-2.5">Sender</th>
                      <th className="py-2.5">Subject</th>
                      <th className="py-2.5">Message Snippet</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.slice(0, 4).map((msg) => (
                      <tr key={msg.id} className="border-b border-border/40 hover:bg-muted/10">
                        <td className="py-2.5 font-mono">{new Date(msg.createdAt).toLocaleDateString()}</td>
                        <td className="py-2.5 font-medium text-foreground">
                          {msg.name} ({msg.email})
                        </td>
                        <td className="py-2.5 text-foreground">{msg.subject}</td>
                        <td className="py-2.5 truncate max-w-xs">{msg.message}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>

        {/* --- PROJECTS TAB --- */}
        <TabsContent value="projects" className="space-y-4 outline-none">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <h2 className="text-sm font-bold text-foreground">Manage Portfolio Projects</h2>
            <Button
              onClick={() => {
                setSelectedProject(null);
                setProjectDialogOpen(true);
              }}
              size="sm"
              className="flex items-center space-x-1 text-xs cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Project</span>
            </Button>
          </div>

          {projects.length === 0 ? (
            <p className="text-xs text-muted-foreground py-8 text-center bg-card border border-border rounded-xl">
              No projects configured. Click "Add Project" to begin.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-card border border-border p-5 rounded-2xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-foreground text-sm">{proj.title}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                        Order: {proj.order}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1 font-mono">slug: {proj.slug}</p>
                    <p className="text-xs text-muted-foreground mt-3 line-clamp-2">{proj.description}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 mt-6 border-t border-border/50">
                    <div className="flex space-x-1">
                      {proj.githubUrl && <Github className="h-3.5 w-3.5 text-muted-foreground" />}
                      {proj.liveUrl && <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => {
                          setSelectedProject(proj);
                          setProjectDialogOpen(true);
                        }}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs cursor-pointer"
                      >
                        <Edit2 className="h-3 w-3 mr-1" />
                        <span>Edit</span>
                      </Button>
                      <Button
                        onClick={() => handleDeleteProject(proj.id)}
                        variant="outline"
                        size="sm"
                        className="h-8 text-xs text-destructive hover:bg-destructive/10 border-destructive/10 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        <span>Delete</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>



        {/* --- MESSAGES TAB --- */}
        <TabsContent value="messages" className="space-y-4 outline-none">
          <h2 className="text-sm font-bold text-foreground border-b border-border/40 pb-4">
            Contact Submissions
          </h2>

          {messages.length === 0 ? (
            <p className="text-xs text-muted-foreground py-8 text-center bg-card border border-border rounded-xl">
              No contact submissions found in database.
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-card border border-border p-5 rounded-2xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b border-border/40 pb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-bold text-foreground text-xs">{msg.name}</p>
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 uppercase tracking-wider">
                          {msg.status || "Pending"}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                        {msg.email} {msg.phone ? `| Tel: ${msg.phone}` : ""}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {new Date(msg.createdAt).toLocaleString()}
                      </span>
                      <Button
                        onClick={() => handleDeleteMessage(msg.id)}
                        variant="outline"
                        size="sm"
                        className="h-7 text-[10px] text-destructive hover:bg-destructive/10 border-destructive/10 cursor-pointer"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground mb-1">Subject: {msg.subject}</p>
                    <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* --- CERTIFICATES TAB --- */}
        <TabsContent value="certificates" className="space-y-4 outline-none">
          <div className="flex items-center justify-between border-b border-border/40 pb-4">
            <h2 className="text-sm font-bold text-foreground">Manage Certifications</h2>
            <Button onClick={() => setCertDialogOpen(true)} size="sm" className="flex items-center space-x-1 text-xs cursor-pointer">
              <Plus className="h-3.5 w-3.5" />
              <span>Add Certificate</span>
            </Button>
          </div>

          {certificates.length === 0 ? (
            <p className="text-xs text-muted-foreground py-8 text-center bg-card border border-border rounded-xl">
              No certifications configured. Click "Add Certificate" to begin.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-card border border-border p-4 rounded-xl flex items-center justify-between"
                >
                  <div>
                    <h3 className="font-bold text-foreground text-xs">{cert.title}</h3>
                    <p className="text-[10px] text-muted-foreground font-mono mt-1">
                      {cert.issuer} &bull; {cert.issueDate}
                    </p>
                  </div>

                  <Button
                    onClick={() => handleDeleteCert(cert.id)}
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs text-destructive hover:bg-destructive/10 border-destructive/10 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* --- SETTINGS TAB --- */}
        <TabsContent value="settings" className="space-y-4 outline-none">
          <h2 className="text-sm font-bold text-foreground border-b border-border/40 pb-4">
            Console Settings
          </h2>

          <div className="bg-card border border-border p-6 rounded-2xl max-w-md">
            <form onSubmit={handleUpdateResume} className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="resumeUrl" className="text-xs font-semibold text-muted-foreground">
                  Resume PDF Link
                </label>
                <Input
                  id="resumeUrl"
                  name="resumeUrl"
                  type="text"
                  placeholder="https://example.com/resume.pdf"
                  required
                  defaultValue={resumeUrl}
                  className="bg-background border-border"
                />
                <p className="text-[10px] text-muted-foreground">
                  Configure the destination path for download button on your Resume page.
                </p>
              </div>

              <Button type="submit" disabled={loading} className="text-xs font-semibold cursor-pointer">
                Save Settings
              </Button>
            </form>
          </div>
        </TabsContent>
      </Tabs>

      {/* --- ADD/EDIT PROJECT DIALOG --- */}
      <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent className="max-w-lg bg-card border-border select-text overflow-y-auto max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>{selectedProject ? "Edit Project" : "Add Project"}</DialogTitle>
            <DialogDescription>
              Submit the project parameters below to update your public portfolio grid.
            </DialogDescription>
          </DialogHeader>

          <form ref={projectFormRef} onSubmit={handleSaveProject} className="space-y-4 py-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-muted-foreground">Project Title</label>
                <Input
                  name="title"
                  placeholder="Mashhoor"
                  required
                  defaultValue={selectedProject?.title || ""}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-muted-foreground">Slug (URL Path)</label>
                <Input
                  name="slug"
                  placeholder="mashhoor"
                  required
                  defaultValue={selectedProject?.slug || ""}
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Short Description</label>
              <Input
                name="description"
                placeholder="AI-powered influencer tracking platform..."
                required
                defaultValue={selectedProject?.description || ""}
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Image/Graphic URL</label>
              <Input
                name="imageUrl"
                placeholder="https://images.unsplash.com/photo-..."
                required
                defaultValue={
                  selectedProject?.imageUrl ||
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
                }
                className="bg-background border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-muted-foreground">Tags (comma separated)</label>
                <Input
                  name="tags"
                  placeholder="React, Node.js, AI"
                  required
                  defaultValue={selectedProject?.tags.join(", ") || ""}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-muted-foreground">Display Order (integer)</label>
                <Input
                  name="order"
                  type="number"
                  placeholder="0"
                  defaultValue={selectedProject?.order || 0}
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-muted-foreground">GitHub URL (Optional)</label>
                <Input
                  name="githubUrl"
                  placeholder="https://github.com/..."
                  defaultValue={selectedProject?.githubUrl || ""}
                  className="bg-background border-border"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-muted-foreground">Live Demo URL (Optional)</label>
                <Input
                  name="liveUrl"
                  placeholder="https://..."
                  defaultValue={selectedProject?.liveUrl || ""}
                  className="bg-background border-border"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Features (one per line)</label>
              <Textarea
                name="features"
                placeholder="AI Search discovery&#10;Analytics tracking"
                rows={3}
                required
                defaultValue={selectedProject?.features.join("\n") || ""}
                className="bg-background border-border resize-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Full Content / Case Study (Markdown Supported)</label>
              <Textarea
                name="content"
                placeholder="### Case study overview..."
                rows={5}
                required
                defaultValue={selectedProject?.content || ""}
                className="bg-background border-border resize-none"
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setProjectDialogOpen(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="cursor-pointer">
                {loading ? "Saving..." : "Save Project"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>



      {/* --- ADD CERTIFICATE DIALOG --- */}
      <Dialog open={certDialogOpen} onOpenChange={setCertDialogOpen}>
        <DialogContent className="max-w-sm bg-card border-border select-text">
          <DialogHeader>
            <DialogTitle>Add Certificate</DialogTitle>
            <DialogDescription>Input credentials of certification earned.</DialogDescription>
          </DialogHeader>

          <form ref={certFormRef} onSubmit={handleSaveCert} className="space-y-4 py-2 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Certificate Title</label>
              <Input
                name="title"
                placeholder="Meta Front-End Developer"
                required
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Issuer / Provider</label>
              <Input
                name="issuer"
                placeholder="Meta / Coursera"
                required
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Issue Date / Year</label>
              <Input name="issueDate" placeholder="2024" required className="bg-background border-border" />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-muted-foreground">Credential Verification Link (Optional)</label>
              <Input
                name="credentialUrl"
                placeholder="https://..."
                className="bg-background border-border"
              />
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCertDialogOpen(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="cursor-pointer">
                {loading ? "Adding..." : "Add"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
