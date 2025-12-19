import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

export async function GET(req: Request) {
    try {
        const content = await prisma.landingPageContent.findMany();

        // Transform array to object keyed by section for easier frontend consumption
        const contentMap = content.reduce((acc, item) => {
            acc[item.section] = item;
            return acc;
        }, {} as Record<string, any>);

        return NextResponse.json(contentMap);
    } catch (error) {
        console.error("Fetch landing page content error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

const updateSchema = z.object({
    section: z.string(),
    title: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
    videoUrl: z.string().optional(),
});

export async function PATCH(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || (session.user.role !== "superAdmin" && session.user.role !== "superUser" && session.user.role !== "admin")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const validatedData = updateSchema.parse(body);

        const { section, ...data } = validatedData;

        const updatedContent = await prisma.landingPageContent.upsert({
            where: { section },
            update: data,
            create: { section, ...data },
        });

        return NextResponse.json(updatedContent);

    } catch (error) {
        console.error("Update landing page content error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
