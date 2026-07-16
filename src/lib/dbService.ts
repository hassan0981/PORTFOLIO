import { prisma } from "./prisma";

// Pre-defined premium data for fallback/default state
export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  imageUrl: string;
  tags: string[];
  features: string[];
  githubUrl: string | null;
  liveUrl: string | null;
  order: number;
}



export interface MessageData {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  duration: string;
  responsibilities: string[];
  order: number;
}

export interface EducationData {
  id: string;
  school: string;
  degree: string;
  duration: string;
  details: string;
  order: number;
}

export interface CertificateData {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string | null;
  imageUrl: string | null;
  order: number;
}

// In-Memory Database for Mock fallback
let mockProjects: ProjectData[] = [
  {
    id: "proj-1",
    title: "Mashhoor",
    slug: "mashhoor",
    description: "AI-Powered Influencer Marketing Platform",
    content: `An AI-powered influencer marketing platform that helps businesses discover influencers, analyze engagement, manage campaigns, and improve marketing performance.
    
    ### Key Features
    - **AI Influencer Discovery**: Search through a curated database of influencers across multiple platforms using natural language filters.
    - **Engagement Analytics**: Deep-dive into engagement rates, audience demographics, and sentiment analysis.
    - **Campaign Management**: Set budgets, tracking metrics, and collaborate directly with creators inside the portal.
    - **Performance Reporting**: Automated post-campaign reports showing ROI, impressions, and conversions.`,
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "Node.js", "Express", "MongoDB", "Python", "AI"],
    features: [
      "AI Influencer Discovery",
      "Engagement Analytics",
      "Campaign Management Tools",
      "Automated Performance Reporting",
    ],
    githubUrl: "https://github.com/mhassanjaved/mashhoor",
    liveUrl: "https://mashhoor.ai",
    order: 1,
  },
  {
    id: "proj-2",
    title: "BouncyDigital",
    slug: "bouncydigital",
    description: "Company Portfolio Website",
    content: `Modern company portfolio website with responsive design, SEO optimization, contact management, and professional UI.
    
    ### Key Features
    - **Modern Dark & Light UI**: Sleek styling with custom typography and subtle animations built with GSAP and Framer Motion.
    - **SEO Optimization**: Complete schema markup, metadata tags, and optimized asset loading for instant visual rendering.
    - **Contact System**: Built-in messaging, lead notifications, and feedback cycles.
    - **Blogging Engine**: Integrated blog to share insights, with categorization and read time estimation.`,
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Supabase"],
    features: [
      "Pixel-perfect Responsive Design",
      "SEO Optimization & Structured Data",
      "Integrated Contact Management",
      "Dynamic Blogging Engine",
    ],
    githubUrl: "https://github.com/mhassanjaved/bouncydigital",
    liveUrl: "https://bouncydigital.com",
    order: 2,
  },
  {
    id: "proj-3",
    title: "PetCare Tracker",
    slug: "petcare-tracker",
    description: "Android Application",
    content: `Android application for managing pet health records, vaccinations, appointments, and reminders.
    
    ### Key Features
    - **Health Profiles**: Keep track of multiple pets, their breed, age, weight, and general notes.
    - **Vaccination Logs**: Schedule upcoming shots and view history with automated push notifications.
    - **Vet Visits**: Record notes from visits, prescriptions, and follow-up timelines.
    - **Offline-First Storage**: Built with SQLite to ensure all records are fully available offline.`,
    imageUrl: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80",
    tags: ["Java", "SQLite", "XML", "Android SDK"],
    features: [
      "Local SQLite Database",
      "Vaccination Schedule Reminders",
      "Health Record Logs",
      "Upcoming Appointments Calendar",
    ],
    githubUrl: "https://github.com/mhassanjaved/petcare-tracker",
    liveUrl: null,
    order: 3,
  },
  {
    id: "proj-4",
    title: "Realtime Face Landmark Detection",
    slug: "realtime-face-landmark-detection",
    description: "Computer Vision & ML Tracking System",
    content: `Real-time face landmark detection system capable of detecting facial points with high accuracy using computer vision techniques.
    
    ### Key Features
    - **High-Precision Mesh**: Tracks up to 468 3D landmarks on a human face in real-time.
    - **OpenCV Integration**: Processes webcam streams with low-latency frame manipulations.
    - **MediaPipe Framework**: Employs Google MediaPipe's lightweight deep learning models.
    - **Interactive Overlays**: Supports mapping filters, eye tracking, and expression detection.`,
    imageUrl: "https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python", "OpenCV", "MediaPipe", "Machine Learning"],
    features: [
      "Real-time 3D Coordinate Mapping",
      "Low-latency Frame Processing",
      "Multi-face Tracking Support",
      "Facial Expression Analysis",
    ],
    githubUrl: "https://github.com/mhassanjaved/face-landmark",
    liveUrl: null,
    order: 4,
  },
  {
    id: "proj-5",
    title: "Aegis CMS",
    slug: "aegis-cms",
    description: "Client Management Portal",
    content: `Client management portal for certification and compliance consultancies featuring ISO lead management, sales pipelines, follow-ups, payments, task management, and cross-department coordination.
    
    ### Key Features
    - **ISO Lead Pipeline**: Organize prospects by certification standards (ISO 9001, 27001, etc.) and stages.
    - **Department Channels**: Share information dynamically between consultants, auditors, and sales reps.
    - **Payment tracking**: Track client invoices, deposit records, and recurring compliance payments.
    - **Task Board**: Built-in Kanban system linked to client files for deadline enforcement.`,
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    tags: ["Next.js", "Supabase", "Prisma", "Tailwind CSS"],
    features: [
      "Lead & ISO Management Pipeline",
      "Automated Follow-up Systems",
      "Payment & Invoice Tracking",
      "Cross-department Task Boards",
    ],
    githubUrl: "https://github.com/mhassanjaved/aegis-cms",
    liveUrl: "https://aegiscms.com",
    order: 5,
  },
];



let mockExperiences: ExperienceData[] = [
  {
    id: "exp-1",
    role: "React Native App Developer",
    company: "ACME ONE",
    duration: "2024 - Present",
    responsibilities: [
      "Built multiple high-performance React Native applications for iOS and Android.",
      "Integrated secure REST APIs, payment gateways, and third-party authentication services.",
      "Fixed legacy bugs, reduced app crashes by 40%, and refactored state management to Zustand/Redux.",
      "Optimized rendering performance, asset caching, and image layout processing.",
      "Collaborated closely with backend developers, UI/UX designers, and QA engineers in Agile sprints.",
    ],
    order: 1,
  },
  {
    id: "exp-2",
    role: "Freelance Full Stack Developer",
    company: "Remote / Self-Employed",
    duration: "2022 - 2024",
    responsibilities: [
      "Designed and developed customized web applications, landing pages, and API integrations for local and global clients.",
      "Built content management portals (CMS) and e-commerce platforms using the MERN stack and Next.js.",
      "Deployed and maintained secure cloud infrastructures on Vercel, Heroku, AWS, and Supabase.",
      "Optimized client websites for Core Web Vitals, achieving high PageSpeed/Lighthouse scores and SEO rankings.",
    ],
    order: 2,
  },
];

let mockEducation: EducationData[] = [
  {
    id: "edu-1",
    school: "University of Central Punjab",
    degree: "Bachelor of Science in Computer Science (BSCS)",
    duration: "2020 - 2024",
    details: "Graduated with honors. Specialized in Software Engineering, Computer Vision, and Artificial Intelligence. Active member of the computer science society and contributor to open source projects.",
    order: 1,
  },
];

let mockCertificates: CertificateData[] = [
  {
    id: "cert-1",
    title: "Meta Front-End Developer Specialization",
    issuer: "Coursera / Meta",
    issueDate: "2024",
    credentialUrl: "https://coursera.org/verify/meta-frontend",
    imageUrl: null,
    order: 1,
  },
  {
    id: "cert-2",
    title: "MERN Stack Web Development Certification",
    issuer: "EVS Professional Training Institute",
    issueDate: "2023",
    credentialUrl: null,
    imageUrl: null,
    order: 2,
  },
];

let mockMessages: MessageData[] = [];
let mockResumeUrl = "/resume.pdf";

// DB Query Helper Functions
export const dbService = {
  // Test if Prisma works
  async isDbAvailable(): Promise<boolean> {
    if (!process.env.DATABASE_URL) return false;
    try {
      // Small query to verify connection
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (e) {
      console.warn("Database connection verification failed, falling back to mock services:", e);
      return false;
    }
  },

  // Projects
  async getProjects(): Promise<ProjectData[]> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        const projs = await prisma.project.findMany({
          orderBy: { order: "asc" },
        });
        return projs.map((p) => ({
          ...p,
          githubUrl: p.githubUrl || null,
          liveUrl: p.liveUrl || null,
        }));
      } catch (e) {
        console.error("Prisma error in getProjects:", e);
      }
    }
    return mockProjects.sort((a, b) => a.order - b.order);
  },

  async getProjectBySlug(slug: string): Promise<ProjectData | null> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        const proj = await prisma.project.findFirst({ where: { slug } });
        if (proj) {
          return {
            ...proj,
            githubUrl: proj.githubUrl || null,
            liveUrl: proj.liveUrl || null,
          };
        }
      } catch (e) {
        console.error("Prisma error in getProjectBySlug:", e);
      }
    }
    return mockProjects.find((p) => p.slug === slug) || null;
  },

  async createProject(data: Omit<ProjectData, "id">): Promise<ProjectData> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        const created = await prisma.project.create({ data });
        return {
          ...created,
          githubUrl: created.githubUrl || null,
          liveUrl: created.liveUrl || null,
        };
      } catch (e) {
        console.error("Prisma error in createProject:", e);
      }
    }
    const newProj: ProjectData = {
      ...data,
      id: `proj-${Date.now()}`,
    };
    mockProjects.push(newProj);
    return newProj;
  },

  async updateProject(id: string, data: Partial<Omit<ProjectData, "id">>): Promise<ProjectData | null> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        const updated = await prisma.project.update({
          where: { id },
          data,
        });
        return {
          ...updated,
          githubUrl: updated.githubUrl || null,
          liveUrl: updated.liveUrl || null,
        };
      } catch (e) {
        console.error("Prisma error in updateProject:", e);
      }
    }
    const idx = mockProjects.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    mockProjects[idx] = { ...mockProjects[idx], ...data } as ProjectData;
    return mockProjects[idx];
  },

  async deleteProject(id: string): Promise<boolean> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        await prisma.project.delete({ where: { id } });
        return true;
      } catch (e) {
        console.error("Prisma error in deleteProject:", e);
      }
    }
    const idx = mockProjects.findIndex((p) => p.id === id);
    if (idx === -1) return false;
    mockProjects.splice(idx, 1);
    return true;
  },



  // Experiences (Mock for now, easy to read/write)
  async getExperiences(): Promise<ExperienceData[]> {
    return mockExperiences.sort((a, b) => a.order - b.order);
  },

  // Education
  async getEducation(): Promise<EducationData[]> {
    return mockEducation.sort((a, b) => a.order - b.order);
  },

  // Certificates
  async getCertificates(): Promise<CertificateData[]> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        const certs = await prisma.certificate.findMany({
          orderBy: { order: "asc" },
        });
        return certs.map((c) => ({
          ...c,
          credentialUrl: c.credentialUrl || null,
          imageUrl: c.imageUrl || null,
        }));
      } catch (e) {
        console.error("Prisma error in getCertificates:", e);
      }
    }
    return mockCertificates.sort((a, b) => a.order - b.order);
  },

  async createCertificate(data: Omit<CertificateData, "id">): Promise<CertificateData> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        const created = await prisma.certificate.create({ data });
        return {
          ...created,
          credentialUrl: created.credentialUrl || null,
          imageUrl: created.imageUrl || null,
        };
      } catch (e) {
        console.error("Prisma error in createCertificate:", e);
      }
    }
    const newCert: CertificateData = {
      ...data,
      id: `cert-${Date.now()}`,
    };
    mockCertificates.push(newCert);
    return newCert;
  },

  async deleteCertificate(id: string): Promise<boolean> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        await prisma.certificate.delete({ where: { id } });
        return true;
      } catch (e) {
        console.error("Prisma error in deleteCertificate:", e);
      }
    }
    const idx = mockCertificates.findIndex((c) => c.id === id);
    if (idx === -1) return false;
    mockCertificates.splice(idx, 1);
    return true;
  },

  // Messages (Contact Form Submission)
  async saveMessage(data: Omit<MessageData, "id" | "createdAt">): Promise<MessageData> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        const created = await prisma.message.create({ data });
        return {
          ...created,
          createdAt: created.createdAt.toISOString(),
        };
      } catch (e) {
        console.error("Prisma error in saveMessage:", e);
      }
    }
    const newMessage: MessageData = {
      ...data,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    mockMessages.unshift(newMessage);
    return newMessage;
  },

  async getMessages(): Promise<MessageData[]> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        const msgs = await prisma.message.findMany({
          orderBy: { createdAt: "desc" },
        });
        return msgs.map((m) => ({
          ...m,
          createdAt: m.createdAt.toISOString(),
        }));
      } catch (e) {
        console.error("Prisma error in getMessages:", e);
      }
    }
    return mockMessages;
  },

  async deleteMessage(id: string): Promise<boolean> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        await prisma.message.delete({ where: { id } });
        return true;
      } catch (e) {
        console.error("Prisma error in deleteMessage:", e);
      }
    }
    const idx = mockMessages.findIndex((m) => m.id === id);
    if (idx === -1) return false;
    mockMessages.splice(idx, 1);
    return true;
  },

  // Resume URL
  async getResumeUrl(): Promise<string> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        const resume = await prisma.resume.findFirst({
          where: { isActive: true },
          orderBy: { updatedAt: "desc" },
        });
        if (resume) return resume.url;
      } catch (e) {
        console.error("Prisma error in getResumeUrl:", e);
      }
    }
    return mockResumeUrl;
  },

  async updateResumeUrl(url: string): Promise<string> {
    const isAvail = await this.isDbAvailable();
    if (isAvail) {
      try {
        // Set all others inactive
        await prisma.resume.updateMany({
          data: { isActive: false },
        });
        // Create new active
        const created = await prisma.resume.create({
          data: { url, isActive: true },
        });
        return created.url;
      } catch (e) {
        console.error("Prisma error in updateResumeUrl:", e);
      }
    }
    mockResumeUrl = url;
    return mockResumeUrl;
  },
};
