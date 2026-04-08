import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";
import { Resend } from "resend";
import ApplicationApprovedEmail from "@/components/ApplicationApprovedEmail";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || (session.user.role !== "superAdmin" && session.user.role !== "superUser" && session.user.role !== "admin")) {
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

        return NextResponse.json(application);
    } catch (error) {
        console.error("Fetch application error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

const updateSchema = z.object({
    status: z.enum(["PENDING", "APPROVED", "REJECTED"]).optional(),
    country: z.string().optional(),
    sex: z.string().optional(),
    duration: z.string().optional(),
    // Add other editable fields if necessary
});

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || session.user.role !== "superAdmin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { id } = await params;
        const body = await req.json();

        // Validate partial update
        const validatedData = updateSchema.parse(body);

        const existing = await prisma.application.findUnique({ where: { id } });

        if (!existing) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        const application = await prisma.application.update({
            where: { id },
            data: validatedData,
        });

        if (
            validatedData.status === "APPROVED" &&
            existing.status !== "APPROVED"
        ) {
            try {
                await resend.emails.send({
                    from: "English Homestay Vietnam <onboarding@updates.englishhomestayvietnam.com>",
                    to: [application.email],
                    subject: "Your application has been approved",
                    react: ApplicationApprovedEmail({
                        fullName: application.fullName,
                        startDate: application.startDate,
                        duration: application.duration,
                    }),
                });
            } catch (emailError) {
                console.error("Failed to send approval email:", emailError);
            }
        }

        return NextResponse.json(application);

    } catch (error) {
        console.error("Update application error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || session.user.role !== "superAdmin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const { id } = await params;

        const existing = await prisma.application.findUnique({ where: { id } });
        if (!existing) {
            return NextResponse.json({ error: "Application not found" }, { status: 404 });
        }

        await prisma.application.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete application error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
