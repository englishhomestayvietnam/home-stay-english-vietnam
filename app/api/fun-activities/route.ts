import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { z } from "zod";

export async function GET(req: Request) {
    try {
        const activities = await prisma.funActivity.findMany({
            orderBy: [
                { order: "asc" },
                { createdAt: "desc" }
            ]
        });

        // The Refine dataProvider expects data under the "data" key, or an array? 
        // Wait, @refinedev/simple-rest expects just an array or X-Total-Count header.
        // I'll return just the array for now. If it complains, I can adjust.
        return NextResponse.json(activities);
    } catch (error) {
        console.error("Fetch fun activities error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

const createSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    schedule: z.string(),
    icon: z.string().default("Compass"),
    description: z.string(),
    highlights: z.array(z.string()).default([]),
    images: z.array(z.string()).default([]),
    order: z.number().default(0),
});

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || (session.user.role !== "superAdmin" && session.user.role !== "superUser" && session.user.role !== "admin")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        const body = await req.json();
        const validatedData = createSchema.parse(body);

        const newActivity = await prisma.funActivity.create({
            data: validatedData,
        });

        return NextResponse.json(newActivity);
    } catch (error) {
        console.error("Create fun activity error:", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
