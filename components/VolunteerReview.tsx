// components/VolunteerReviews.tsx
import { Star, Calendar, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type Review = {
  id: string;
  user: { name: string | null; image: string | null };
  nationality: string;
  countryFlag: string;
  stayDuration: string;
  stayPeriod: string;
  rating: number;
  title?: string | null;
  reviewText: string;
  date: string;
  approved: boolean;
  userId: string;
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i <= rating ? "fill-[#46b96c] text-[#46b96c]" : "text-gray-300"}`}
      />
    ))}
  </div>
);

export default async function VolunteerReviews() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/reviews`, { cache: "no-store" });
  const reviews: Review[] = res.ok ? await res.json() : [];

  const approvedReviews = reviews
    .filter((r) => r.approved)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 6);

  const approvedCount = approvedReviews.length;
  const userHasReviewed = user ? reviews.some((r) => r.userId === user.id && r.approved) : false;
  const showWriteReviewButton = !userHasReviewed;

  return (
    <section id="review" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#46b96c] mb-4">
            What Our Volunteers Say
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto">
            Real experiences from volunteers who taught English and lived with Vietnamese host families.
          </p>
        </div>

        {/* Reviews Grid - RESPONSIVE: 1 col mobile, 2 tablet, 3 desktop */}
        {approvedCount > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {approvedReviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-xl transition-all duration-300 border-gray-200 bg-white h-full flex flex-col"
              >
                <CardContent className="pt-6 pb-6 px-5 flex flex-col h-full">
                  {/* Avatar + Info + Stars */}
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="w-12 h-12 ring-2 ring-[#46b96c]/30 flex-shrink-0">
                      <AvatarImage src={review.user.image || undefined} />
                      <AvatarFallback className="bg-[#46b96c]/10 text-[#46b96c] font-bold">
                        {review.user.name?.[0] || "V"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                        {review.user.name || "Volunteer"}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 mt-0.5">
                        <span className="text-xl">{review.countryFlag}</span>
                        <span className="truncate">{review.nationality}</span>
                      </div>

                      {/* Stars below on mobile */}
                      <div className="flex sm:hidden mt-2">
                        <StarRating rating={review.rating} />
                      </div>
                    </div>

                    {/* Stars on right - hidden on mobile */}
                    <div className="hidden sm:flex ml-auto">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>

                  {/* Title */}
                  {review.title && (
                    <h3 className="font-bold text-[#46b96c] mb-3 text-base line-clamp-2">
                      {review.title}
                    </h3>
                  )}

                  {/* Review Text */}
                  <p className="text-gray-700 italic leading-relaxed text-sm flex-grow line-clamp-4 mb-5">
                    &ldquo;{review.reviewText}&rdquo;
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 text-xs mt-auto">
                    <Badge variant="secondary" className="bg-[#46b96c]/10 text-[#46b96c]">
                      <Calendar className="w-3 h-3 mr-1" />
                      {review.stayPeriod}
                    </Badge>
                    <Badge variant="outline" className="border-[#46b96c]/30 text-[#46b96c]">
                      <Globe className="w-3 h-3 mr-1" />
                      {review.stayDuration}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#46b96c]/10 mb-6">
              <Star className="w-12 h-12 text-[#46b96c]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              Be the First to Share Your Experience!
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Your story could inspire the next volunteer to join this amazing journey in Vietnam.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="text-center mt-12">
          {approvedCount > 0 ? (
            <p className="text-gray-700 font-medium text-lg mb-8">
              Join {approvedCount}+ volunteers who have already shared their story
            </p>
          ) : (
            <p className="text-gray-700 font-medium text-lg mb-8">
              Start the conversation — be the first to leave a review!
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
            {showWriteReviewButton && (
              <Button asChild size="lg" className="w-full sm:w-auto bg-[#46b96c] hover:bg-[#3a9959] text-white font-semibold">
                <Link href="/reviews/write-review">
                  <Star className="w-5 h-5 mr-2" />
                  Write Your Review
                </Link>
              </Button>
            )}

            {approvedCount > 0 && (
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-[#46b96c] text-[#46b96c] hover:bg-[#46b96c]/5">
                <Link href="/reviews">
                  See All Reviews ({approvedCount})
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}