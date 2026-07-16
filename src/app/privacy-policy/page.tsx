import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SlideUp } from "@/components/Animated";

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      {/* Back button */}
      <SlideUp delay={0.05}>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-8 cursor-pointer inline-flex items-center space-x-1"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </SlideUp>

      {/* Header */}
      <SlideUp delay={0.1}>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Privacy Policy
        </h1>
        <p className="text-xs font-mono text-muted-foreground mt-2">
          Last Updated: {lastUpdated}
        </p>
      </SlideUp>

      {/* Policy Details */}
      <SlideUp delay={0.15}>
        <div className="prose prose-slate dark:prose-invert max-w-none text-xs sm:text-sm text-muted-foreground mt-10 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to my portfolio website (https://mhassanjaved.dev). I am committed to protecting
              your privacy. This policy outlines how I handle any data you submit when contacting me.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">2. Data We Collect</h2>
            <p>
              I only collect information that you choose to provide directly through the contact forms
              on this site. This includes:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Your name</li>
              <li>Your email address</li>
              <li>The subject of your inquiry</li>
              <li>The message content you write</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">3. How I Use Your Data</h2>
            <p>
              Any information submitted is used solely to respond to your queries, discuss contract
              terms, or coordinate employment opportunities. I do not sell, rent, or distribute your
              personal details to third-party marketing companies.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">4. Storage & Security</h2>
            <p>
              Form submissions are stored securely inside a Supabase PostgreSQL database and sent as
              an email message via Resend. I use industry-standard precautions to prevent unauthorized
              access or leakage of submitted information.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">5. Cookies</h2>
            <p>
              This website uses minor cookie values strictly for system authentication checks inside
              the administrative dashboard (if logged in) and to persist user dark/light theme choices.
              No marketing or tracking cookies are utilized.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-foreground">6. Contact Information</h2>
            <p>
              If you have any questions or concern regarding this policy, please reach out directly at:{" "}
              <a href="mailto:mhassanjaved@gmail.com" className="text-primary hover:underline">
                mhassanjaved@gmail.com
              </a>.
            </p>
          </section>
        </div>
      </SlideUp>
    </div>
  );
}
