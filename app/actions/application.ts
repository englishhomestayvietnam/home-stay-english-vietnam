"use server";

import { z } from "zod";
import prisma from "@/lib/prisma";
import { Resend } from "resend";
import ApplicationThankYouEmail from "@/components/ApplicationThankYouEmail";
import AdminNewApplicationEmail from "@/components/AdminNewApplicationEmail";

const applicationSchema = z
    .object({
        fullName: z.string().min(2, {
            message: "Full name must be at least 2 characters.",
        }),
        email: z.string().email({
            message: "Please enter a valid email address.",
        }),
        whatsApp: z.string().min(1, {
            message: "WhatsApp number is required.",
        }),
        country: z.string().min(1, "Country is required"),
        sex: z.string().min(1, "Sex is required"),
        startDate: z.date({
            message: "A start date is required.",
        }),
        endDate: z.date({
            message: "An end date is required.",
        }),
        duration: z.string({
            message: "Please select a duration.",
        }),

        message: z.string().optional(),
        groupMembers: z.array(z.object({
            fullName: z.string().min(1, "Full name is required"),
            country: z.string().min(1, "Country is required"),
            sex: z.string().min(1, "Sex is required"),
        })).optional(),
    })
    .refine((data) => data.endDate > data.startDate, {
        path: ["endDate"],
        message: "End date must be after start date",
    });

export async function submitApplication(values: z.infer<typeof applicationSchema>) {
    try {
        const validatedData = applicationSchema.parse(values);

        const application = await prisma.application.create({
            data: {
                ...validatedData,
                groupMembers: {
                    create: validatedData.groupMembers || [],
                },
            },
        });

        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send confirmation email
        try {
            await resend.emails.send({
                from: "English Homestay Vietnam <onboarding@updates.englishhomestayvietnam.com>", // Using a generic sender or the one from env
                to: [validatedData.email],
                subject: "We received your application!",
                react: ApplicationThankYouEmail({
                    fullName: validatedData.fullName,
                }),
            });
        } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
            // We don't fail the submission if email fails, just log it.
        }

        try {
            const admins = await prisma.user.findMany({
                where: { role: "superAdmin" },
                select: { email: true },
            });
            const adminEmails = admins.map((u) => u.email).filter(Boolean);
            if (adminEmails.length > 0) {
                await resend.emails.send({
                    from: "English Homestay Vietnam <onboarding@updates.englishhomestayvietnam.com>",
                    to: adminEmails,
                    subject: "New application submitted",
                    react: AdminNewApplicationEmail({
                        fullName: validatedData.fullName,
                        email: validatedData.email,
                        country: validatedData.country,
                        sex: validatedData.sex,
                        startDate: validatedData.startDate,
                        endDate: validatedData.endDate,
                        duration: validatedData.duration,
                        message: validatedData.message,
                        groupMembers: validatedData.groupMembers,
                    }),
                });
            }
        } catch (notifyError) {
            console.error("Failed to notify admins of new application:", notifyError);
        }

        return { success: true, data: application };
    } catch (error) {
        console.error("Application submission error:", error);
        if (error instanceof z.ZodError) {
            return { success: false, error: (error as any).errors[0]?.message || "Invalid input data" };
        }
        return { success: false, error: "Failed to submit application. Please try again." };
    }
}
