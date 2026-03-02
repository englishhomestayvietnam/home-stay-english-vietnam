// components/VolunteerReviews.tsx
import { Star, Calendar, Globe, Users, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Make sure you have this component
import FloatingActionMenu from "@/components/floating-menu";
import Link from "next/link";

export const revalidate = 0;

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
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

  const res = await fetch(`${baseUrl}/api/reviews`, { cache: "no-store" });
  const reviews: Review[] = res.ok ? await res.json() : [];

  const approvedReviews = reviews
    .filter((r) => r.approved)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const totalApprovedCount = approvedReviews.length;

  return (
    <section id="review" className="py-16 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 lg:pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#46b96c] mb-4">
            What Our Volunteers Say
          </h2>
          <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Real experiences from volunteers who taught English and lived with
            Vietnamese host families.
          </p>
        </div>

        {/* Reviews Grid OR Empty State */}
        {totalApprovedCount > 0 ? (
          <div
            className="
              grid 
              grid-cols-1         
              sm:grid-cols-2       
              lg:grid-cols-3        
              gap-6                
              mb-16
            "
          >
            {approvedReviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-xl transition-all duration-300 border-gray-200 bg-white h-full flex flex-col"
              >
                <CardContent className="pt-6 pb-6 px-5 flex flex-col h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <Avatar className="w-12 h-12 ring-2 ring-[#46b96c]/30 flex-shrink-0">
                      <AvatarImage src={review.user.image || undefined} />
                      <AvatarFallback className="bg-[#46b96c]/10 text-[#46b96c] font-bold text-lg">
                        {review.user.name?.[0] || "V"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-base truncate">
                        {review.user.name || "Volunteer"}
                      </p>
                      <div className="flex items-center gap-1.5 text-sm text-gray-600 mt-1">
                        <span className="text-xl">{review.countryFlag}</span>
                        <span className="truncate">{review.nationality}</span>
                      </div>
                      <div className="mt-3 lg:hidden">
                        <StarRating rating={review.rating} />
                      </div>
                    </div>

                    <div className="hidden lg:flex ml-auto">
                      <StarRating rating={review.rating} />
                    </div>
                  </div>

                  {review.title && (
                    <h3 className="font-bold text-[#46b96c] mb-3 text-lg line-clamp-2">
                      {review.title}
                    </h3>
                  )}

                  <p className="text-gray-700 italic leading-relaxed text-sm sm:text-base flex-grow line-clamp-4 mb-5">
                    {review.reviewText}
                  </p>

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
          /* Enhanced Empty State with CTA */
          <div className="text-center -mt-10 px-6">
            <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-[#46b96c]/10 mb-8">
              <MessageCircle className="w-14 h-14 text-[#46b96c]" />
            </div>
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Be the First to Share Your Story!
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto text-lg leading-relaxed mb-10">
              No reviews yet — your experience could be the one that inspires the next volunteer to join this life-changing journey in Vietnam!
            </p>

            <Link href="/reviews/write-review">
              <Button
                size="lg"
                className="bg-[#46b96c] hover:bg-[#3a9a59] text-white font-bold text-lg px-8 py-6 shadow-xl transform hover:scale-95 cursor-pointer transition-all duration-200"
              >
                <Star className="w-6 h-6 mr-3" />
                Write the First Review
              </Button>
            </Link>

            <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center items-center text-gray-500">
              <div className="flex items-center gap-2">
                <Users className="w-6 h-6 text-[#46b96c]" />
                <span className="font-medium">Join an amazing community</span>
              </div>
              <div className="hidden sm:block w-px h-12 bg-gray-300" />
              <div className="flex items-center gap-2">
                <Globe className="w-6 h-6 text-[#46b96c]" />
                <span className="font-medium">Help others discover Vietnam</span>
              </div>
            </div>
          </div>
        )}

        {/* Counter */}
        {totalApprovedCount > 0 && (
          <div className="text-center mb-8 lg:mb-16">
            <p className="text-gray-700 font-medium text-lg">
              Join {totalApprovedCount}+ volunteers who have shared their story
            </p>
          </div>
        )}
      </div>

      <FloatingActionMenu />
    </section>
  );
}