"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex-grow flex items-center justify-center py-28 px-4 text-center relative">
      <div className="max-w-md space-y-6 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-mono text-xs tracking-[0.25em] uppercase text-primary"
        >
          404
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl sm:text-5xl font-display font-medium tracking-tight text-foreground"
        >
          Page not found
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-sm text-muted-foreground leading-relaxed"
        >
          The page you are looking for does not exist or has been moved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "default" }),
              "h-11 px-6 cursor-pointer inline-flex items-center gap-2"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
