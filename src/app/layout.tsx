import type { Metadata } from "next";
import { Instrument_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import BackgroundCanvas from "@/components/BackgroundCanvas";

const instrumentSans = Instrument_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Hassan Javed | Full Stack Developer & AI Automation Engineer",
  description:
    "Computer Science graduate passionate about building modern web applications, mobile applications, AI-powered systems, and scalable software solutions.",
  metadataBase: new URL("https://mhassanjaved.dev"),
  keywords: [
    "Muhammad Hassan Javed",
    "Hassan Javed",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Native Developer",
    "AI Automation Engineer",
    "Next.js Developer",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Muhammad Hassan Javed" }],
  creator: "Muhammad Hassan Javed",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mhassanjaved.dev",
    title: "Muhammad Hassan Javed | Full Stack Developer & AI Automation Engineer",
    description:
      "Computer Science graduate passionate about building modern web applications, mobile applications, AI-powered systems, and scalable software solutions.",
    siteName: "Muhammad Hassan Javed Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hassan Javed | Full Stack Developer & AI Automation Engineer",
    description:
      "Computer Science graduate passionate about building modern web applications, mobile applications, AI-powered systems, and scalable software solutions.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${instrumentSans.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300 relative">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Decorative background glows */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
            <div className="absolute top-[10%] left-[15%] w-[35vw] h-[35vw] rounded-full bg-[#61dafb]/6 dark:bg-[#61dafb]/10 blur-[95px] md:blur-[130px] animate-float" />
            <div className="absolute bottom-[20%] right-[5%] w-[30vw] h-[30vw] rounded-full bg-[#7c6ef6]/6 dark:bg-[#7c6ef6]/10 blur-[95px] md:blur-[130px] animate-float-reverse" />
            <div className="absolute top-[55%] left-[45%] w-[25vw] h-[25vw] rounded-full bg-[#22d3ee]/5 dark:bg-[#22d3ee]/8 blur-[95px] md:blur-[130px] animate-float" />
          </div>

          {/* Interactive background canvas animation */}
          <BackgroundCanvas />

          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-grow relative z-10">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
