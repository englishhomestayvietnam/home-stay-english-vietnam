import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Resend } from "resend";
import AdminNewApplicationEmail from "@/components/AdminNewApplicationEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

const applicationSchema = z
    .object({
        fullName: z.string().min(1, "Full name is required"),
        email: z.string().email("Invalid email address"),
        whatsApp: z.string().min(1, "WhatsApp number is required"),
        country: z.string().min(1, "Country is required"),
        sex: z.string().min(1, "Sex is required"),
        startDate: z.string().pipe(z.coerce.date()),
        endDate: z.string().pipe(z.coerce.date()),
        duration: z.string().min(1, "Duration is required"),

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

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const validatedData = applicationSchema.parse(body);

        const application = await prisma.application.create({
            data: {
                ...validatedData,
                groupMembers: {
                    create: validatedData.groupMembers || [],
                },
            },
        });

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

        return NextResponse.json(application, { status: 201 });
    } catch (error) {
        console.error("Application submission error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || (session.user.role !== "superAdmin" && session.user.role !== "superUser" && session.user.role !== "admin")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const applications = await prisma.application.findMany({
            orderBy: { createdAt: "desc" },
            include: { groupMembers: true },
        });

        return NextResponse.json(applications);
    } catch (error) {
        console.error("Fetch applications error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
