import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { dbService } from "@/lib/dbService";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional().nullable(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

// Initialize Resend (with safety fallback)
const resendApiKey = process.env.RESEND_API_KEY || "";
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate inputs
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, phone, subject, message } = result.data;

    // 1. Store submission in database using our dbService
    const savedMessage = await dbService.saveMessage({
      name,
      email,
      phone: phone || null,
      subject,
      message,
    });

    // 2. Send email notification via Resend
    let emailSent = false;
    if (resend) {
      try {
        const adminEmail = process.env.ADMIN_RECEIVER_EMAIL || "hass.javed25@gmail.com";
        const emailResult = await resend.emails.send({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: adminEmail,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h2>New Contact Message Received</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #f4f4f5; padding: 12px; border-radius: 6px;">${message}</p>
          `,
        });
        if (emailResult.error) {
          console.error("Resend error:", emailResult.error);
        } else {
          emailSent = true;
        }
      } catch (err) {
        console.error("Resend execution error:", err);
      }
    } else {
      console.warn("Resend API key is missing. Skipping email notification. Simulated successfully.");
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully",
        data: savedMessage,
        emailSent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing contact submission:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
