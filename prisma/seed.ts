import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const hasDbUrl = process.env.DATABASE_URL;

if (!hasDbUrl) {
  console.error("Error: DATABASE_URL environment variable is missing.");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: hasDbUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const projects = [
  {
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

const blogs = [
  {
    title: "Building Modern Real-time Apps with Supabase and Next.js",
    slug: "building-modern-real-time-apps-with-supabase-and-next-js",
    description: "Learn how to build real-time reactive layouts in Next.js using Supabase listeners.",
    content: `Next.js and Supabase are a match made in heaven. In this comprehensive guide, we will explore how to integrate real-time subscriptions into your Next.js application, enabling live state synchronization for chats, dashboards, and portals.
    
    ### Why Supabase?
    Supabase wraps PostgreSQL in a series of powerful services, including Realtime listeners via WebSockets. This means you get the full transactional power of SQL combined with the reactive simplicity of a Firebase-like realtime subscription.
    
    ### Getting Started
    Initialize your client, subscribe to table changes, and set up state handlers. Here is a small code example:
    
    \`\`\`ts
    import { createClient } from '@supabase/supabase-js'
    const supabase = createClient('URL', 'KEY')
    
    supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
        console.log('Change received!', payload)
      })
      .subscribe()
    \`\`\`
    
    In the client, ensure you handle cleaning up the subscription inside \`useEffect\` callbacks to prevent memory leaks!`,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    category: "Next.js",
    readingTime: "5 min read",
    published: true,
    createdAt: new Date("2026-07-10T12:00:00Z"),
  },
  {
    title: "Mastering React Native: Native Modules and Performance",
    slug: "mastering-react-native-native-modules-and-performance",
    description: "Advanced techniques to optimize your React Native apps and bridge native Java/Swift modules.",
    content: `React Native is fantastic for cross-platform efficiency, but matching raw native performance requires understanding the bridge, the new architecture (TurboModules), and optimizing thread workloads.
    
    ### Optimizing React Native Layouts
    - **Avoid Inline Functions**: Do not pass inline functions to list items.
    - **FlatList Tuning**: Set \`windowSize\`, \`maxToRenderPerBatch\`, and use \`getItemLayout\` where applicable.
    - **Use Hermes**: The Hermes engine optimizes memory utilization and startup latency significantly.
    
    ### Custom Native Bridge (Android Example)
    Sometimes you need hardware APIs or custom SDKs not wrapped in npm. Here is a simple outline of implementing an Android custom module:
    
    \`\`\`java
    package com.portfolioapp;
    import com.facebook.react.bridge.ReactApplicationContext;
    import com.facebook.react.bridge.ReactContextBaseJavaModule;
    import com.facebook.react.bridge.ReactMethod;
    
    public class CustomModule extends ReactContextBaseJavaModule {
        CustomModule(ReactApplicationContext context) {
            super(context);
        }
        @Override
        public String getName() { return "CustomModule"; }
        
        @ReactMethod
        public void performAction() {
            // Android SDK codes
        }
    }
    \`\`\`
    
    Register it in your package wrapper, expose it in JavaScript, and enjoy native speed.`,
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    category: "React Native",
    readingTime: "8 min read",
    published: true,
    createdAt: new Date("2026-06-25T12:00:00Z"),
  },
  {
    title: "Real-time AI Automation with OpenCV and MediaPipe",
    slug: "real-time-ai-automation-with-opencv-and-mediapipe",
    description: "An intro to leveraging light machine learning models directly in webcam streams.",
    content: `Building computer vision applications used to require massive clusters and heavy servers. With tools like Google MediaPipe and OpenCV, we can run high-precision face mesh, gesture tracking, and object detection locally in real-time.
    
    ### Setting Up MediaPipe in Python
    Setting up is incredibly simple:
    
    \`\`\`python
    import cv2
    import mediapipe as mp
    
    mp_face_mesh = mp.solutions.face_mesh
    face_mesh = mp_face_mesh.FaceMesh()
    
    cap = cv2.VideoCapture(0)
    while cap.isOpened():
        success, image = cap.read()
        if not success: continue
        
        # Process image
        results = face_mesh.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        # Draw landmarks...
    \`\`\`
    
    This lightweight implementation runs at 30+ FPS on consumer laptops, opening up massive possibilities for smart apps, automation triggers, and edge computing interfaces.`,
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    category: "AI & ML",
    readingTime: "6 min read",
    published: true,
    createdAt: new Date("2026-05-18T12:00:00Z"),
  },
];

const certificates = [
  {
    title: "Meta Front-End Developer Specialization",
    issuer: "Coursera / Meta",
    issueDate: "2024",
    credentialUrl: "https://coursera.org/verify/meta-frontend",
    order: 1,
  },
  {
    title: "MERN Stack Web Development Certification",
    issuer: "EVS Professional Training Institute",
    issueDate: "2023",
    credentialUrl: null,
    order: 2,
  },
];

async function main() {
  console.log("Seeding database...");

  // Delete existing records to allow re-run of seeding
  await prisma.project.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.resume.deleteMany();

  // Projects
  for (const project of projects) {
    await prisma.project.create({ data: project });
  }
  console.log(`Created ${projects.length} projects.`);

  // Blogs
  for (const blog of blogs) {
    await prisma.blogPost.create({ data: blog });
  }
  console.log(`Created ${blogs.length} blog posts.`);

  // Certificates
  for (const cert of certificates) {
    await prisma.certificate.create({ data: cert });
  }
  console.log(`Created ${certificates.length} certificates.`);

  // Default Resume URL
  await prisma.resume.create({
    data: {
      url: "/resume.pdf",
      isActive: true,
    },
  });
  console.log("Created default resume entry.");

  console.log("Seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
