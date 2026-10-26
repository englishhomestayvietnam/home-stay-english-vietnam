import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Resend } from "resend";
import AdminNewApplicationEmail from "@/components/AdminNewApplicationEmail";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (
            !session ||
            (session.user.role !== "superAdmin" &&
                session.user.role !== "superUser" &&
                session.user.role !== "admin")
        ) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { id } = await params;

        const application = await prisma.application.findUnique({
            where: { id },
            include: { groupMembers: true },
        });

        if (!application) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        const resend = new Resend(process.env.RESEND_API_KEY);

        const admins = await prisma.user.findMany({
            where: { role: "superAdmin" },
            select: { email: true },
        });

        const adminEmails = Array.from(
            new Set([...admins.map((u) => u.email).filter(Boolean), "english.homestaynn@gmail.com"])
        );

        if (adminEmails.length === 0) {
            return NextResponse.json(
                { error: "No admin email configured to receive notifications" },
                { status: 400 }
            );
        }

        const { error: sendError } = await resend.emails.send({
            from: "English Homestay Vietnam <onboarding@review.englishhomestayvietnam.com>",
            to: adminEmails,
            replyTo: application.email,
            subject: `[Admin Notification] Volunteer Application: ${application.fullName}`,
            react: AdminNewApplicationEmail({
                fullName: application.fullName,
                email: application.email,
                whatsApp: application.whatsApp || undefined,
                country: application.country,
                sex: application.sex,
                startDate: application.startDate,
                endDate: application.endDate || undefined,
                duration: application.duration,
                message: application.message || undefined,
                groupMembers: application.groupMembers,
            }),
        });

        if (sendError) {
            console.error("Resend error:", sendError);
            return NextResponse.json({ error: sendError.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            recipients: adminEmails,
            message: `Notification sent to ${adminEmails.join(", ")}`,
        });
    } catch (error: any) {
        console.error("Notify admin error:", error);
        return NextResponse.json(
            { error: error?.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
