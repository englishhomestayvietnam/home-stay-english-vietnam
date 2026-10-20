import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { Resend } from "resend";
import AdminNewApplicationEmail from "@/components/AdminNewApplicationEmail";

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

        const resend = new Resend(process.env.RESEND_API_KEY);

        try {
            const admins = await prisma.user.findMany({
                where: { role: "superAdmin" },
                select: { email: true },
            });
            const adminEmails = admins.map((u) => u.email).filter(Boolean);
            if (adminEmails.length > 0) {
                const { error: emailError } = await resend.emails.send({
                    from: "English Homestay Vietnam <onboarding@review.englishhomestayvietnam.com>",
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
                if (emailError) {
                    console.error("Failed to notify admins of new application:", emailError);
                }
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

        const { searchParams } = new URL(req.url);

        // Handle pagination parameters (_start/_end from simple-rest, or currentPage/pageSize)
        const hasStart = searchParams.has("_start");
        const hasEnd = searchParams.has("_end");
        const hasCurrentPage = searchParams.has("currentPage");
        const hasPageSize = searchParams.has("pageSize");

        let skip: number | undefined = undefined;
        let take: number | undefined = undefined;

        if (hasStart && hasEnd) {
            const start = parseInt(searchParams.get("_start") || "0", 10);
            const end = parseInt(searchParams.get("_end") || "10", 10);
            skip = Math.max(0, start);
            take = Math.max(1, end - start);
        } else if (hasCurrentPage || hasPageSize) {
            const page = Math.max(1, parseInt(searchParams.get("currentPage") || "1", 10));
            const pageSize = Math.max(1, Math.min(100, parseInt(searchParams.get("pageSize") || "10", 10)));
            skip = (page - 1) * pageSize;
            take = pageSize;
        }

        // Handle sorting
        const sortField = searchParams.get("_sort") || "createdAt";
        const sortOrder = (searchParams.get("_order") || "desc").toLowerCase() === "asc" ? "asc" : "desc";
        const validSorts = ["createdAt", "startDate", "endDate", "fullName", "email", "status", "duration", "country"];
        const safeSortField = validSorts.includes(sortField) ? sortField : "createdAt";

        // Query applications and total count in parallel
        const [applications, total] = await Promise.all([
            prisma.application.findMany({
                skip,
                take,
                orderBy: { [safeSortField]: sortOrder },
                include: { groupMembers: true },
            }),
            prisma.application.count(),
        ]);

        const emails = applications.map((a) => a.email.toLowerCase()).filter(Boolean);
        const users = await prisma.user.findMany({
            where: { email: { in: emails } },
            select: { email: true, image: true },
        });
        const userImageMap = new Map(users.map((u) => [u.email.toLowerCase(), u.image]));

        const result = applications.map((app) => ({
            ...app,
            userImage: userImageMap.get(app.email.toLowerCase()) || null,
        }));

        return NextResponse.json(result, {
            status: 200,
            headers: {
                "x-total-count": total.toString(),
                "Access-Control-Expose-Headers": "x-total-count",
            },
        });
    } catch (error) {
        console.error("Fetch applications error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
