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
    <div className="section-shell">
      <div className="section-inner max-w-3xl">
        <SlideUp delay={0.05}>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "mb-10 cursor-pointer inline-flex items-center gap-1.5 -ml-2"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
        </SlideUp>

        <SlideUp delay={0.1}>
          <p className="section-index">Legal</p>
          <h1 className="section-title">Privacy Policy</h1>
          <p className="font-mono text-xs text-muted-foreground mt-3">
            Last updated: {lastUpdated}
          </p>
        </SlideUp>

        <SlideUp delay={0.15}>
          <div className="max-w-none text-sm text-muted-foreground mt-12 space-y-8 leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-display font-medium text-foreground">1. Introduction</h2>
              <p>
                Welcome to my portfolio website (https://mhassanjaved.dev). I am committed to protecting
                your privacy. This policy outlines how I handle any data you submit when contacting me.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-medium text-foreground">2. Data We Collect</h2>
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
              <h2 className="text-lg font-display font-medium text-foreground">3. How I Use Your Data</h2>
              <p>
                Any information submitted is used solely to respond to your queries, discuss contract
                terms, or coordinate employment opportunities. I do not sell, rent, or distribute your
                personal details to third-party marketing companies.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-medium text-foreground">4. Storage & Security</h2>
              <p>
                Form submissions are stored securely inside a Supabase PostgreSQL database and sent as
                an email message via Resend. I use industry-standard precautions to prevent unauthorized
                access or leakage of submitted information.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-medium text-foreground">5. Cookies</h2>
              <p>
                This website uses minor cookie values strictly for system authentication checks inside
                the administrative dashboard (if logged in) and to persist user dark/light theme choices.
                No marketing or tracking cookies are utilized.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-display font-medium text-foreground">6. Contact Information</h2>
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
    </div>
  );
}
