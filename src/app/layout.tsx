import type { Metadata } from "next";
import { Montserrat, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    "Full Stack Developer & AI Automation Engineer building modern web apps, mobile products, and scalable software solutions.",
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
      "Full Stack Developer & AI Automation Engineer building modern web apps, mobile products, and scalable software solutions.",
    siteName: "Muhammad Hassan Javed Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Hassan Javed | Full Stack Developer & AI Automation Engineer",
    description:
      "Full Stack Developer & AI Automation Engineer building modern web apps, mobile products, and scalable software solutions.",
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
      className={`${montserrat.variable} ${fraunces.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-500 relative overflow-x-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <Navbar />
            <main className="flex-grow relative z-10 w-full overflow-x-hidden">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
