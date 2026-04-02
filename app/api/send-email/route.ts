// app/api/send-thank-you/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";
import ThankYouReviewEmail from "@/components/ReviewThankYouEmail";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";

export async function POST() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const permissionCheck = await auth.api.userHasPermission({
    headers: await headers(),
    body: {
      userId: session.user.id,
      permissions: {
        review: ["write"],
      },
    },
  });
  if (!permissionCheck.success) {
    return NextResponse.json(
      { error: "Insufficient permissions" },
      { status: 403 }
    );
  }

  const checkReviewExist = await prisma.review.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  if (!checkReviewExist) {
    return NextResponse.json(
      { error: "No review found for this user" },
      { status: 404 }
    );
  }

  if (checkReviewExist) {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const userName = session.user.name || "Volunteer";
    const reviewTitle = checkReviewExist.title || "Amazing volunteer experience!";
    const rating = checkReviewExist.rating || 5;
    const reviewText = checkReviewExist.reviewText || "I had a wonderful time volunteering here. The host family was very welcoming and the food was delicious. I highly recommend this program to anyone looking to experience local culture.";
    try {
      const { data, error } = await resend.emails.send({
        from: "English Homestay Vietnam<thank-you@review.englishhomestayvietnam.com>",
        to: [session.user.email || ""],
        subject: "Thank you for sharing your story!",
        react: ThankYouReviewEmail({ userName, reviewTitle , rating , reviewText }),
      });

      if (error) {
        return NextResponse.json({ error }, { status: 500 });
      }

      return NextResponse.json(
        { message: "Email sent!", data },
        { status: 200 }
      );
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  }
}
