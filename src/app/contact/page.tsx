import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, Linkedin, Github, Globe } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ContactForm from "@/components/ContactForm";
import { SlideUp } from "@/components/Animated";

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
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
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          Contact Me
        </h1>
        <p className="text-muted-foreground mt-3 text-base sm:text-lg max-w-xl leading-relaxed mb-12">
          Want to discuss a potential project, freelance collaboration, or hiring opportunity?
          Submit the form below or contact me through social links.
        </p>
      </SlideUp>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Info panel */}
        <div className="lg:col-span-5 space-y-6">
          <SlideUp delay={0.15}>
            <div className="p-5 glass-card glass-card-hover rounded-2xl space-y-4">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                Availability & Contacts
              </h2>

              <div className="space-y-4 pt-2">
                <div className="flex items-center space-x-3 text-xs">
                  <Mail className="h-4.5 w-4.5 text-primary shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Direct Email</p>
                    <a href="mailto:mhassanjaved@gmail.com" className="text-muted-foreground hover:text-primary hover:underline">
                      mhassanjaved@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <Linkedin className="h-4.5 w-4.5 text-[#7c6ef6] shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">LinkedIn</p>
                    <a
                      href="https://linkedin.com/in/mhassanjaved"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary hover:underline"
                    >
                      linkedin.com/in/mhassanjaved
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <Github className="h-4.5 w-4.5 text-muted-foreground shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">GitHub</p>
                    <a
                      href="https://github.com/mhassanjaved"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary hover:underline"
                    >
                      github.com/mhassanjaved
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-xs">
                  <Globe className="h-4.5 w-4.5 text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-foreground">Availability</p>
                    <p className="text-muted-foreground">Open to remote positions & contract terms</p>
                  </div>
                </div>
              </div>
            </div>
          </SlideUp>
        </div>

        {/* Contact Form Panel */}
        <div className="lg:col-span-7">
          <SlideUp delay={0.2}>
            <ContactForm />
          </SlideUp>
        </div>
      </div>
    </div>
  );
}
