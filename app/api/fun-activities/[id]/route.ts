import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

const updateSchema = z.object({
    title: z.string().optional(),
    subtitle: z.string().optional(),
    schedule: z.string().optional(),
    icon: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    images: z.array(z.string()).optional(),
    order: z.number().optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || (session.user.role !== "superAdmin" && session.user.role !== "superUser" && session.user.role !== "admin")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const resolvedParams = await params;
        const id = resolvedParams.id;

        const body = await req.json();
        const validatedData = updateSchema.parse(body);

        const updatedActivity = await prisma.funActivity.update({
            where: { id },
            data: validatedData,
        });

        return NextResponse.json(updatedActivity);
    } catch (error) {
        console.error("Update fun activity error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    // Refine often uses PUT or PATCH. Let's redirect PUT to PATCH
    return PATCH(req, { params });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || (session.user.role !== "superAdmin" && session.user.role !== "superUser" && session.user.role !== "admin")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const resolvedParams = await params;
        const id = resolvedParams.id;

        await prisma.funActivity.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Delete fun activity error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
