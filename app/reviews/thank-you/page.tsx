import { CheckCircle2, Clock, Heart, Home, BookOpen } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export default async function ThankYouPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch user's review with approval status
  const userReview = await prisma.review.findFirst({
    where: { userId: user.id },
    select: { approved: true },
  });

  if (!userReview) {
    return redirect("/reviews/write-review");
  }

  const isApproved = userReview.approved;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {isApproved ? (
              <CheckCircle2 className="w-24 h-24 text-[#46b96c]" />
            ) : (
              <Clock className="w-24 h-24 text-orange-500" />
            )}
            <Heart className="w-10 h-10 text-red-500 absolute -top-2 -right-2 animate-ping" />
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          {isApproved ? "Thank You So Much!" : "Thank You!"}
        </h1>

        <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-3xl mx-auto">
          {isApproved ? (
            <>
              Your review has been <span className="text-[#46b96c] font-bold">approved and published</span>!
              It&apos;s now helping future volunteers make informed decisions.
            </>
          ) : (
            <>
              Your review has been submitted successfully and is currently <span className="text-orange-600 font-bold">under review</span>.
              We&apos;ll publish it as soon as it&apos;s approved — usually within 24 hours.
            </>
          )}
        </p>

        {/* Info Card */}
        <Card className="bg-white/80 backdrop-blur shadow-lg border-green-100">
          <CardContent className="pt-8 pb-6">
            <p className="text-lg text-gray-600 italic">
              {isApproved
                ? "“Your story is now inspiring others — thank you for being part of our community!”"
                : "“We review all submissions to ensure quality and authenticity. Thank you for your patience!”"}
            </p>
            <p className="text-sm text-gray-500 mt-4">- The Team</p>
          </CardContent>
        </Card>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
          <Button asChild size="lg" className="bg-[#46b96c] hover:bg-[#3a9959] text-white">
            <Link href="/reviews">
              <BookOpen className="w-5 h-5 mr-2" />
              {isApproved ? "See Your Review Live" : "View All Reviews"}
            </Link>
          </Button>

          <Button asChild size="lg" variant="outline" className="border-[#46b96c] text-[#46b96c] hover:bg-[#46b96c]/5">
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Status Badge */}
        <div className="mt-10">
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${isApproved
                ? "bg-green-100 text-green-800"
                : "bg-orange-100 text-orange-800"
              }`}
          >
            {isApproved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                Review Published
              </>
            ) : (
              <>
                <Clock className="w-4 h-4" />
                Awaiting Approval
              </>
            )}
          </span>
        </div>

        {/* Footer */}
        <div className="mt-20 text-gray-400 text-sm">
          Made with <Heart className="inline w-4 h-4 text-red-500 fill-red-500" />{" "}
          for volunteers, by volunteers.
        </div>
      </div>
    </div>
  );
}