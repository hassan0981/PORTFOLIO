"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Compass } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center py-24 px-4 text-center relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,oklch(0.62_0.19_285/6%),transparent_65%)] pointer-events-none" />

      <div className="max-w-md space-y-6 relative z-10">
        {/* Animated Compass Icon */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 mx-auto bg-primary/10 border border-primary/20 rounded-full flex items-center justify-center text-primary"
        >
          <Compass className="h-8 w-8" />
        </motion.div>

        <h1 className="text-4xl font-extrabold text-foreground tracking-tight sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you are looking for does not exist, has been removed, or is temporarily
          unavailable. Let's redirect you back to safety.
        </p>

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "default" }),
            "px-6 py-5 rounded-xl cursor-pointer inline-flex items-center space-x-2"
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
