"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Mail,
  Briefcase,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  Search,
  Filter,
  Trash2,
  Edit2,
  Plus,
  Sparkles,
  ExternalLink,
  Github,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  CheckSquare,
  ChevronRight,
  Info,
} from "lucide-react";
import { ProjectData, MessageData, CertificateData } from "@/lib/dbService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
  updateMessageStatus,
  updateResumeUrl,
  adminLogout,
} from "@/app/admin/actions";

interface AdminConsoleProps {
  initialProjects: ProjectData[];
  initialMessages: MessageData[];
  initialCertificates: CertificateData[];
  initialResumeUrl: string;
}

type TabType = "dashboard" | "queries" | "projects" | "certificates" | "settings";

export default function AdminConsole({
  initialProjects,
  initialMessages,
  initialCertificates,
  initialResumeUrl,
}: AdminConsoleProps) {
  const router = useRouter();

  // Navigation & UI States
  const [activeTab, setActiveTab] = React.useState<TabType>("dashboard");
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [msgText, setMsgText] = React.useState({ text: "", type: "" });

  // Core Data States
  const [projects, setProjects] = React.useState<ProjectData[]>(initialProjects);
  const [messages, setMessages] = React.useState<MessageData[]>(initialMessages);
  const [certificates, setCertificates] = React.useState<CertificateData[]>(initialCertificates);
  const [resumeUrl, setResumeUrl] = React.useState(initialResumeUrl);

  // Queries Filter & Search
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<string>("All");

  // Project Modal / Dialog States
  const [projectDialogOpen, setProjectDialogOpen] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState<ProjectData | null>(null);

  // Certificate Modal / Dialog States
  const [certDialogOpen, setCertDialogOpen] = React.useState(false);

  // Refs
  const projectFormRef = React.useRef<HTMLFormElement>(null);
  const certFormRef = React.useRef<HTMLFormElement>(null);

  // Helper: Toast Message
  const showMsg = (text: string, type: "success" | "error" = "success") => {
    setMsgText({ text, type });
    setTimeout(() => setMsgText({ text: "", type: "" }), 4000);
  };

  // Logout Handler
  const handleLogout = async () => {
    try {
      await adminLogout();
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      showMsg("Failed to sign out", "error");
    }
  };

  // --- QUERY / MESSAGE HANDLERS ---
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    // Optimistic UI Update
    const previousMessages = [...messages];
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, status: newStatus } : msg))
    );

    try {
      const res = await updateMessageStatus(id, newStatus);
      if (res.success) {
        showMsg(`Query status updated to ${newStatus}`);
      } else {
        // Revert on error
        setMessages(previousMessages);
        showMsg("Failed to update status", "error");
      }
    } catch (err) {
      console.error(err);
      setMessages(previousMessages);
      showMsg("Failed to update status", "error");
    }
  };

  const handleDeleteMessage = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this query?")) return;
    try {
      const res = await deleteMessage(id);
      if (res.success) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        showMsg("Query deleted successfully");
      }
    } catch (err) {
      console.error(err);
      showMsg("Failed to delete query", "error");
    }
  };

  // --- PROJECT CRUD HANDLERS ---
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
    const githubUrl = (fd.get("githubUrl") as string) || null;
    const liveUrl = (fd.get("liveUrl") as string) || null;
    const order = parseInt((fd.get("order") as string) || "0");

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
    } catch (err) {
      console.error(err);
      showMsg("Failed to delete project", "error");
    }
  };

  // --- CERTIFICATE CRUD HANDLERS ---
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

  // --- SETTINGS HANDLERS ---
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

  // --- STATS CALCULATIONS ---
  const stats = React.useMemo(() => {
    const total = messages.length;
    const pending = messages.filter((m) => m.status === "Pending" || !m.status).length;
    const resolved = messages.filter(
      (m) => m.status === "Resolved" || m.status === "Completed" || m.status === "Done"
    ).length;
    const recent = messages.slice(0, 5); // Assumes already sorted descending

    return { total, pending, resolved, recent };
  }, [messages]);

  // --- FILTERED MESSAGES ---
  const filteredMessages = React.useMemo(() => {
    return messages.filter((msg) => {
      const matchesSearch =
        msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.message.toLowerCase().includes(searchQuery.toLowerCase());

      const statusVal = msg.status || "Pending";
      const matchesStatus =
        statusFilter === "All" ||
        statusVal.toLowerCase() === statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [messages, searchQuery, statusFilter]);

  // Sidebar Menu Items
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "queries", label: "Contact Queries", icon: Mail, badge: stats.pending },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "certificates", label: "Certificates", icon: Award },
    { id: "settings", label: "Settings", icon: Settings },
  ] as const;

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans select-text">
      {/* Toast Notification */}
      <AnimatePresence>
        {msgText.text && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 p-4 border rounded-xl flex items-center space-x-3 text-xs font-semibold shadow-lg max-w-sm ${
              msgText.type === "error"
                ? "bg-destructive/15 border-destructive/20 text-destructive backdrop-blur-md"
                : "bg-emerald-500/15 border-emerald-500/20 text-emerald-500 backdrop-blur-md"
            }`}
          >
            {msgText.type === "error" ? (
              <AlertCircle className="h-5 w-5 shrink-0 text-destructive" />
            ) : (
              <CheckCircle className="h-5 w-5 shrink-0 text-emerald-500" />
            )}
            <span>{msgText.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border/80 h-full">
        {/* Header */}
        <div className="p-6 border-b border-border/60">
          <div className="flex items-center space-x-2 text-primary font-semibold mb-1">
            <Sparkles className="h-4.5 w-4.5" />
            <span className="text-[10px] uppercase tracking-widest font-mono">Console Active</span>
          </div>
          <h2 className="text-lg font-bold tracking-tight text-foreground">Admin Portal</h2>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-4.5 w-4.5" />
                  <span>{item.label}</span>
                </div>
                {"badge" in item && item.badge > 0 && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                      isActive
                        ? "bg-primary-foreground text-primary"
                        : "bg-primary/10 text-primary border border-primary/20"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-border/60 bg-muted/20">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
              A
            </div>
            <div className="truncate">
              <p className="text-[11px] font-semibold text-foreground truncate">Seeded Admin</p>
              <p className="text-[9px] text-muted-foreground truncate">admin@hassan.dev</p>
            </div>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center justify-center space-x-2 text-xs text-destructive border-destructive/20 hover:bg-destructive/10 cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Drawer Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col md:hidden"
            >
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 text-primary font-semibold mb-1">
                    <Sparkles className="h-4 w-4" />
                    <span className="text-[9px] uppercase tracking-widest font-mono">Console</span>
                  </div>
                  <h2 className="text-base font-bold tracking-tight text-foreground">Admin Portal</h2>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg border border-border text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-grow px-4 py-6 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer border-0 ${
                        isActive
                          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                          : "text-muted-foreground bg-transparent hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4.5 w-4.5" />
                        <span>{item.label}</span>
                      </div>
                      {"badge" in item && item.badge > 0 && (
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                            isActive
                              ? "bg-primary-foreground text-primary"
                              : "bg-primary/10 text-primary border border-primary/20"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="p-4 border-t border-border bg-muted/10">
                <div className="flex items-center space-x-3 mb-4 px-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs uppercase">
                    A
                  </div>
                  <div className="truncate">
                    <p className="text-[11px] font-semibold text-foreground truncate">Seeded Admin</p>
                    <p className="text-[9px] text-muted-foreground truncate">admin@hassan.dev</p>
                  </div>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-2 text-xs text-destructive border-destructive/20 hover:bg-destructive/10 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col h-full bg-background overflow-y-auto">
        {/* Mobile Header */}
        <header className="flex md:hidden items-center justify-between px-6 py-4 bg-card border-b border-border/80 sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 -ml-2 rounded-lg border border-border/80 text-foreground cursor-pointer bg-card"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-sm font-extrabold capitalize tracking-tight text-foreground">
              {activeTab === "queries" ? "Contact Queries" : activeTab}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[9px] font-bold uppercase tracking-wider font-mono text-muted-foreground">
              Console
            </span>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 max-w-6xl w-full mx-auto space-y-8 select-text">
          {/* Top Bar for Desktop */}
          <div className="hidden md:flex items-center justify-between border-b border-border/50 pb-6">
            <div>
              <div className="flex items-center space-x-2 text-muted-foreground text-xs font-mono">
                <span>Console</span>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="capitalize text-primary font-semibold">
                  {activeTab === "queries" ? "Contact Queries" : activeTab}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground mt-1.5 capitalize">
                {activeTab === "queries" ? "Contact Queries & Feedback" : `${activeTab} Management`}
              </h1>
            </div>
            <div className="text-xs text-muted-foreground bg-card border border-border p-2 rounded-xl flex items-center space-x-2 font-mono">
              <Calendar className="h-4 w-4 text-primary" />
              <span>{new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
          </div>

          {/* PAGE ROUTER */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* --- DASHBOARD TAB --- */}
              {activeTab === "dashboard" && (
                <div className="space-y-8">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Total Contacts */}
                    <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group shadow-sm">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                      <div className="flex items-center space-x-4">
                        <div className="p-3.5 bg-primary/10 text-primary border border-primary/20 rounded-xl">
                          <Mail className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-semibold">Total Contacts</p>
                          <p className="text-3xl font-extrabold text-foreground mt-1">
                            {stats.total}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/60 flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground">All time contact requests</span>
                        <button
                          onClick={() => setActiveTab("queries")}
                          className="text-primary hover:underline font-bold bg-transparent border-0 cursor-pointer"
                        >
                          View Queries &rarr;
                        </button>
                      </div>
                    </div>

                    {/* Pending Queries */}
                    <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group shadow-sm">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                      <div className="flex items-center space-x-4">
                        <div className="p-3.5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-xl">
                          <Clock className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-semibold">Pending Queries</p>
                          <p className="text-3xl font-extrabold text-foreground mt-1">
                            {stats.pending}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/60 flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground">Awaiting admin review</span>
                        <span className="bg-amber-500/15 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold uppercase">
                          Action Required
                        </span>
                      </div>
                    </div>

                    {/* Resolved/Completed Queries */}
                    <div className="bg-card border border-border p-6 rounded-2xl relative overflow-hidden group shadow-sm">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
                      <div className="flex items-center space-x-4">
                        <div className="p-3.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl">
                          <CheckCircle className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground font-semibold">Resolved Queries</p>
                          <p className="text-3xl font-extrabold text-foreground mt-1">
                            {stats.resolved}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border/60 flex justify-between items-center text-[10px]">
                        <span className="text-muted-foreground">Completed or resolved logs</span>
                        <span className="text-emerald-500 font-bold">
                          {stats.total > 0
                            ? `${Math.round((stats.resolved / stats.total) * 100)}% Done`
                            : "0% Done"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Quick System Info Alert */}
                  <div className="bg-card border border-border p-5 rounded-2xl flex items-start space-x-4 shadow-sm">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                      <Info className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-foreground">Database Sync Status</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        Currently using <strong>Supabase PostgreSQL</strong> for database persistence. 
                        Supabase JWT user profile roles are cross-referenced with local profiles table records 
                        for security.
                      </p>
                    </div>
                  </div>

                  {/* Recent Activity / Contacts Preview */}
                  <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-4">
                      <h3 className="text-sm font-bold text-foreground">Recent Contact Activity</h3>
                      <button
                        onClick={() => setActiveTab("queries")}
                        className="text-xs text-primary hover:underline font-bold bg-transparent border-0 cursor-pointer"
                      >
                        Manage All
                      </button>
                    </div>

                    {stats.recent.length === 0 ? (
                      <p className="text-xs text-muted-foreground py-6 text-center">
                        No messages received yet.
                      </p>
                    ) : (
                      <div className="divide-y divide-border/40">
                        {stats.recent.map((msg) => {
                          const statusVal = msg.status || "Pending";
                          return (
                            <div key={msg.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs font-bold text-foreground">
                                    {msg.name}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground">&bull;</span>
                                  <span className="text-[10px] text-muted-foreground truncate max-w-[150px] sm:max-w-none">
                                    {msg.email}
                                  </span>
                                  <span className="text-[10px] text-muted-foreground">&bull;</span>
                                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">
                                    {new Date(msg.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-[11px] text-foreground font-semibold">
                                  Subject: <span className="text-muted-foreground font-medium">{msg.subject}</span>
                                </p>
                                <p className="text-xs text-muted-foreground line-clamp-1">
                                  {msg.message}
                                </p>
                              </div>

                              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                                <span
                                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                                    statusVal === "Pending"
                                      ? "bg-amber-500/10 border-amber-500/25 text-amber-500"
                                      : statusVal === "Done"
                                      ? "bg-indigo-500/10 border-indigo-500/25 text-indigo-500"
                                      : statusVal === "Completed"
                                      ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-500"
                                      : "bg-teal-500/10 border-teal-500/25 text-teal-500"
                                  }`}
                                >
                                  {statusVal}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* --- CONTACT QUERIES TAB --- */}
              {activeTab === "queries" && (
                <div className="space-y-6">
                  {/* Search, Filter & Controls */}
                  <div className="bg-card border border-border p-5 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Search bar */}
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Search queries by name, email, subject, keyword..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-background border-border text-xs w-full py-5 rounded-xl"
                      />
                      {searchQuery && (
                        <button
                          onClick={() => setSearchQuery("")}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground bg-transparent border-0 cursor-pointer"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Filter tabs/buttons */}
                    <div className="flex items-center space-x-2 shrink-0 overflow-x-auto scrollbar-none py-1">
                      <Filter className="h-4 w-4 text-muted-foreground mr-1" />
                      {["All", "Pending", "Done", "Completed", "Resolved"].map((status) => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            statusFilter === status
                              ? "bg-primary border-primary text-primary-foreground shadow-sm"
                              : "bg-background border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Queries count */}
                  <div className="flex items-center justify-between px-2">
                    <p className="text-xs text-muted-foreground font-semibold">
                      Showing {filteredMessages.length} of {messages.length} queries
                    </p>
                  </div>

                  {/* Queries list */}
                  {filteredMessages.length === 0 ? (
                    <div className="bg-card border border-border p-12 rounded-2xl text-center shadow-sm">
                      <Mail className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
                      <h4 className="font-bold text-foreground text-sm">No queries found</h4>
                      <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
                        No contact submissions matched your active filters or search terms.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredMessages.map((msg) => {
                        const statusVal = msg.status || "Pending";
                        return (
                          <div
                            key={msg.id}
                            className="bg-card border border-border p-5 sm:p-6 rounded-2xl shadow-sm space-y-4 transition-all hover:border-border/100"
                          >
                            {/* Card Header */}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-border/50 pb-4">
                              <div className="space-y-1">
                                <div className="flex items-center space-x-2.5">
                                  <User className="h-4.5 w-4.5 text-primary shrink-0" />
                                  <h4 className="font-bold text-foreground text-sm leading-none">
                                    {msg.name}
                                  </h4>
                                  <span
                                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                                      statusVal === "Pending"
                                        ? "bg-amber-500/10 border-amber-500/25 text-amber-500"
                                        : statusVal === "Done"
                                        ? "bg-indigo-500/10 border-indigo-500/25 text-indigo-500"
                                        : statusVal === "Completed"
                                        ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-500"
                                        : "bg-teal-500/10 border-teal-500/25 text-teal-500"
                                    }`}
                                  >
                                    {statusVal}
                                  </span>
                                </div>
                                <div className="text-[11px] text-muted-foreground flex flex-wrap gap-x-3 gap-y-1 font-mono">
                                  <span>Email: {msg.email}</span>
                                  {msg.phone && <span>Phone: {msg.phone}</span>}
                                </div>
                              </div>

                              <div className="flex items-center space-x-2 shrink-0">
                                <span className="text-[10px] font-mono text-muted-foreground flex items-center">
                                  <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground/80" />
                                  {new Date(msg.createdAt).toLocaleString()}
                                </span>
                                <Button
                                  onClick={() => handleDeleteMessage(msg.id)}
                                  variant="outline"
                                  size="sm"
                                  className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 border-destructive/10 cursor-pointer"
                                  title="Delete query log"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="space-y-2">
                              <p className="text-xs font-bold text-foreground">
                                Subject: <span className="font-semibold text-foreground/80">{msg.subject}</span>
                              </p>
                              <div className="bg-muted/30 border border-border/40 p-4 rounded-xl">
                                <p className="text-xs text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                  {msg.message}
                                </p>
                              </div>
                            </div>

                            {/* Card Actions: Status Update Flow */}
                            <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs">
                              <span className="text-muted-foreground font-semibold flex items-center">
                                <CheckSquare className="h-4 w-4 mr-1 text-primary" />
                                Change Status Flow:
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {(["Pending", "Done", "Completed", "Resolved"] as const).map((s) => (
                                  <button
                                    key={s}
                                    onClick={() => handleUpdateStatus(msg.id, s)}
                                    className={`px-3 py-1.5 text-[10px] rounded-lg font-bold border transition-all cursor-pointer ${
                                      statusVal === s
                                        ? "bg-primary border-primary text-primary-foreground shadow-sm"
                                        : "bg-background border-border text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                                  >
                                    {s}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* --- PROJECTS TAB --- */}
              {activeTab === "projects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <h2 className="text-sm font-bold text-foreground">Manage Portfolio Projects</h2>
                    <Button
                      onClick={() => {
                        setSelectedProject(null);
                        setProjectDialogOpen(true);
                      }}
                      size="sm"
                      className="flex items-center space-x-1.5 text-xs cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Project</span>
                    </Button>
                  </div>

                  {projects.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-8 text-center bg-card border border-border rounded-xl">
                      No projects configured. Click "Add Project" to begin.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projects.map((proj) => (
                        <div
                          key={proj.id}
                          className="bg-card border border-border p-6 rounded-2xl flex flex-col justify-between shadow-sm"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <h3 className="font-bold text-foreground text-sm">{proj.title}</h3>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                                Order: {proj.order}
                              </span>
                            </div>
                            <p className="text-[11px] text-muted-foreground mt-1 font-mono">
                              slug: {proj.slug}
                            </p>
                            <p className="text-xs text-muted-foreground mt-3 line-clamp-2 leading-relaxed">
                              {proj.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 mt-6 border-t border-border/50">
                            <div className="flex space-x-2">
                              {proj.githubUrl && (
                                <a
                                  href={proj.githubUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                                >
                                  <Github className="h-4 w-4" />
                                </a>
                              )}
                              {proj.liveUrl && (
                                <a
                                  href={proj.liveUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 border border-border rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              )}
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
                                <Edit2 className="h-3.5 w-3.5 mr-1" />
                                <span>Edit</span>
                              </Button>
                              <Button
                                onClick={() => handleDeleteProject(proj.id)}
                                variant="outline"
                                size="sm"
                                className="h-8 text-xs text-destructive hover:bg-destructive/10 border-destructive/10 cursor-pointer"
                              >
                                <Trash2 className="h-3.5 w-3.5 mr-1" />
                                <span>Delete</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- CERTIFICATES TAB --- */}
              {activeTab === "certificates" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <h2 className="text-sm font-bold text-foreground">Manage Certifications</h2>
                    <Button
                      onClick={() => setCertDialogOpen(true)}
                      size="sm"
                      className="flex items-center space-x-1.5 text-xs cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Certificate</span>
                    </Button>
                  </div>

                  {certificates.length === 0 ? (
                    <p className="text-xs text-muted-foreground py-8 text-center bg-card border border-border rounded-xl">
                      No certifications configured. Click "Add Certificate" to begin.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {certificates.map((cert) => (
                        <div
                          key={cert.id}
                          className="bg-card border border-border p-5 rounded-2xl flex items-center justify-between shadow-sm"
                        >
                          <div>
                            <h3 className="font-bold text-foreground text-xs">{cert.title}</h3>
                            <p className="text-[10px] text-muted-foreground font-mono mt-1 leading-relaxed">
                              {cert.issuer} &bull; {cert.issueDate}
                            </p>
                            {cert.credentialUrl && (
                              <a
                                href={cert.credentialUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-primary hover:underline font-semibold mt-2 inline-flex items-center"
                              >
                                Verify Credential <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            )}
                          </div>

                          <Button
                            onClick={() => handleDeleteCert(cert.id)}
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:bg-destructive/10 border-destructive/10 cursor-pointer shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- SETTINGS TAB --- */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h2 className="text-sm font-bold text-foreground border-b border-border/40 pb-4">
                    Console Settings
                  </h2>

                  <div className="bg-card border border-border p-6 rounded-2xl max-w-md shadow-sm">
                    <form key={resumeUrl} onSubmit={handleUpdateResume} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="resumeUrl" className="text-xs font-semibold text-muted-foreground">
                          Resume PDF Reference Link
                        </label>
                        <Input
                          id="resumeUrl"
                          name="resumeUrl"
                          type="text"
                          placeholder="https://example.com/resume.pdf"
                          required
                          defaultValue={resumeUrl}
                          className="bg-background border-border text-xs py-5 rounded-xl"
                        />
                        <p className="text-[10px] text-muted-foreground leading-relaxed">
                          Configure the destination link for the download/view button on your public Resume page.
                        </p>
                      </div>

                      <Button type="submit" disabled={loading} className="text-xs font-semibold cursor-pointer py-5 px-5 rounded-xl">
                        {loading ? "Saving Settings..." : "Save Settings"}
                      </Button>
                    </form>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* --- ADD/EDIT PROJECT DIALOG --- */}
      <Dialog open={projectDialogOpen} onOpenChange={setProjectDialogOpen}>
        <DialogContent className="max-w-lg bg-card border-border select-text overflow-y-auto max-h-[85vh] rounded-3xl">
          <DialogHeader>
            <DialogTitle>{selectedProject ? "Edit Project" : "Add Project"}</DialogTitle>
            <DialogDescription>
              Submit the project parameters below to update your public portfolio grid.
            </DialogDescription>
          </DialogHeader>

          <form
            key={selectedProject ? selectedProject.id : "new-project"}
            ref={projectFormRef}
            onSubmit={handleSaveProject}
            className="space-y-4 py-4 text-xs"
          >
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

            <DialogFooter className="pt-4 gap-2">
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
        <DialogContent className="max-w-sm bg-card border-border select-text rounded-3xl">
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

            <DialogFooter className="pt-4 gap-2">
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
