import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingActionMenu from "@/components/floating-menu";
import Link from "next/link";
import InfiniteReviewsScroller, { type InfiniteReview } from "@/components/InfiniteReviewsScroller";

export const revalidate = 0;

export default async function VolunteerReviews() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  const res = await fetch(`${baseUrl}/api/reviews`, { cache: "no-store" });
  const reviews: InfiniteReview[] = res.ok ? await res.json() : [];
  const approvedCount = reviews.filter((r) => r.approved).length;

  return (
    <section id="review" className="py-20 bg-gray-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#46b96c] mb-4">What Our Volunteers Say</h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Real experiences from volunteers who lived with Vietnamese host families.
          </p>
        </div>
      </div>

      {approvedCount > 0 ? (
        <div className="max-w-6xl mx-auto px-4">
          <InfiniteReviewsScroller reviews={reviews} />
        </div>
      ) : (
        <div className="text-center py-10">
          <MessageCircle className="w-16 h-16 text-[#46b96c] mx-auto mb-4 opacity-20" />
          <p className="text-gray-500">No reviews yet. Be the first!</p>
          <Link href="/reviews/write-review">
            <Button className="mt-4 bg-[#46b96c] hover:bg-[#3a9a59]">Write Review</Button>
          </Link>
        </div>
      )}

      <div className="mt-20 text-center">
        <p className="text-gray-600 font-medium">Join {approvedCount}+ volunteers who shared their story</p>
      </div>
      <FloatingActionMenu />
    </section>
  );
}