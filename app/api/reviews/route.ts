// app/api/reviews/route.ts
import { NextRequest, NextResponse } from 'next/server'
import  prisma  from '@/lib/prisma'
import z from 'zod';
import { auth } from '@/lib/auth';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';
import ThankYouReviewEmail from "@/components/ReviewThankYouEmail";
import { headers } from 'next/headers';

// Validation schema (no userId - it comes from auth)
const createReviewSchema = z.object({
  stayDuration: z.string().min(1, 'Stay duration is required'),
  stayPeriod: z.string().min(1, 'Stay period is required'),
  rating: z.number().int().min(1).max(5).default(5),
  title: z.string().optional(),
  nationality: z.string().min(1, 'Nationality is required'),
  countryFlag: z.string().min(1, 'Country flag is required'),
  reviewText: z.string().min(10, 'Review text must be at least 10 characters'),
});
const validSortFields = ['date', 'rating', 'createdAt', 'id'] as const

export async function GET(
  request: Request,
) {
  // For searchParams, we still need to extract from URL
  const { searchParams } = new URL(request.url)

  // Pagination
  const page = Math.max(1, parseInt(searchParams.get('currentPage') || '1', 10))
  const pageSize = Math.max(1, Math.min(100, parseInt(searchParams.get('pageSize') || '10', 10)))
  const skip = (page - 1) * pageSize
  const take = pageSize

  // Safe sorting
  let sortField = searchParams.get('_sort') || 'date'
  if (!validSortFields.includes(sortField as any)) {
    sortField = 'date'
  }
  const sortOrder = searchParams.get('_order') === 'DESC' ? 'desc' : 'asc'

  try {
    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where: { approved: true },
        include: {
          user: {
            select: { name: true, image: true, email: true },
          },
        },
        orderBy: {
          [sortField]: sortOrder,
        },
        skip,
        take,
      }),
      prisma.review.count({
        where: { approved: true },
      }),
    ])

    return NextResponse.json(reviews, {
      status: 200,
      headers: {
        'X-Total-Count': total.toString(),
        'Access-Control-Expose-Headers': 'X-Total-Count',
      },
    })
  } catch (error) {
    console.error('Reviews API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}


export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    // Get headers once and reuse
    const headersList = await headers();
    
    // Get userId from auth session
    const session = await auth.api.getSession({
      headers: headersList,
    });
    
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unauthorized - please log in to submit a review',
        },
        { status: 401 }
      );
    }

    // Check permissions
    const permissionCheck = await auth.api.userHasPermission({
      headers: headersList, // Reuse the same headers
      body: {
        userId: session.user.id,
        permissions: {
          review: ["write"],
        },
      },
    });
    
    if (!permissionCheck.success) {
      return NextResponse.json(
        { 
          success: false,
          error: "Insufficient permissions to submit a review" 
        },
        { status: 403 }
      );
    }

    const userId = session.user.id;

    // Parse request body
    const body = await req.json();

    // Validate request body
    const validatedData = createReviewSchema.parse(body);

    // Check if user already has a review (due to unique constraint on userId)
    const existingReview = await prisma.review.findUnique({
      where: { userId },
    });

    if (existingReview) {
      return NextResponse.json(
        {
          success: false,
          error: 'You have already submitted a review',
        },
        { status: 409 }
      );
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        userId,
        stayDuration: validatedData.stayDuration,
        stayPeriod: validatedData.stayPeriod,
        rating: validatedData.rating,
        title: validatedData.title,
        nationality: validatedData.nationality,
        countryFlag: validatedData.countryFlag,
        reviewText: validatedData.reviewText,
        approved: false,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
     
    revalidatePath("/reviews");

    try {
      const { error } = await resend.emails.send({
        from: "English Homestay Vietnam <thank-you@review.englishhomestayvietnam.com>",
        to: [review.user.email],
        subject: "Thank you for sharing your story!",
        react: ThankYouReviewEmail({ 
          userName: review.user.name || "Guest",
          reviewTitle: review.title,
          rating: review.rating,
          reviewText: review.reviewText,
        }),
      });

      if (error) {
        console.error('Failed to send thank you email:', error);
      }
    } catch (emailError) {
      console.error('Error sending thank you email:', emailError);
    }

    // Return success response for review creation
    return NextResponse.json(
      {
        success: true,
        message: 'Review submitted successfully and is pending approval',
        data: review,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: error
        },
        { status: 400 }
      );
    }

    console.error('Error creating review:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An error occurred while creating the review',
      },
      { status: 500 }
    );
  }
}