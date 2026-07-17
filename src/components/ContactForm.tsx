"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus("success");
        reset();
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error(e);
      setSubmitStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full surface p-5 sm:p-6 md:p-8 relative overflow-hidden rounded-2xl">
      <AnimatePresence mode="wait">
        {submitStatus === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="flex flex-col items-center justify-center text-center py-12"
          >
            <CheckCircle2 className="h-12 w-12 text-primary mb-5" />
            <h3 className="text-xl font-display font-medium text-foreground mb-2">
              Message sent
            </h3>
            <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
              Thank you for reaching out. I have received your message and will get back to you soon.
            </p>
            <Button
              onClick={() => setSubmitStatus("idle")}
              variant="outline"
              className="text-xs font-medium cursor-pointer"
            >
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {submitStatus === "error" && (
              <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-md flex items-start gap-2.5">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className={`bg-background/50 border-border rounded-md ${errors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  {...register("name")}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-xs font-medium text-destructive">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className={`bg-background/50 border-border rounded-md ${errors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  {...register("email")}
                  disabled={isSubmitting}
                />
                {errors.email && (
                  <p className="text-xs font-medium text-destructive">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
                >
                  Phone Number (Optional)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className={`bg-background/50 border-border rounded-md ${errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  {...register("phone")}
                  disabled={isSubmitting}
                />
                {errors.phone && (
                  <p className="text-xs font-medium text-destructive">{errors.phone.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="subject"
                  className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
                >
                  Subject
                </label>
                <Input
                  id="subject"
                  type="text"
                  placeholder="Project inquiry / collaboration"
                  className={`bg-background/50 border-border rounded-md ${errors.subject ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  {...register("subject")}
                  disabled={isSubmitting}
                />
                {errors.subject && (
                  <p className="text-xs font-medium text-destructive">{errors.subject.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="message"
                className="font-mono text-[10px] tracking-[0.18em] uppercase text-muted-foreground"
              >
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about your project, goals, or timeline..."
                rows={5}
                className={`bg-background/50 border-border rounded-md resize-none ${errors.message ? "border-destructive focus-visible:ring-destructive" : ""}`}
                {...register("message")}
                disabled={isSubmitting}
              />
              {errors.message && (
                <p className="text-xs font-medium text-destructive">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 h-11 text-sm font-medium cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  <span>Send Message</span>
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
