"use client";

import { useMemo } from "react";
import { Star, Calendar, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export type InfiniteReview = {
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

const ReviewCard = ({
  review,
  className,
}: {
  review: InfiniteReview;
  className?: string;
}) => (
  <Card
    className={`w-[300px] sm:w-[350px] min-h-[300px] sm:min-h-[320px] shrink-0 hover:shadow-xl transition-all duration-300 border-gray-200 bg-white flex flex-col mb-4 ${className ?? ""}`}
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
        </div>
        <div className="ml-auto">
          <StarRating rating={review.rating} />
        </div>
      </div>

      {review.title && (
        <h3 className="font-bold text-[#46b96c] mb-3 text-lg line-clamp-1">
          {review.title}
        </h3>
      )}

      <p className="text-gray-700 italic leading-relaxed text-sm flex-grow line-clamp-5 mb-5">
        "{review.reviewText}"
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
);

function repeatToMin<T>(items: T[], minLen: number): T[] {
  if (items.length === 0) return [];
  const out: T[] = [];
  while (out.length < minLen) out.push(...items);
  return out;
}

export default function InfiniteReviewsScroller({
  reviews,
  className,
}: {
  reviews: InfiniteReview[];
  className?: string;
}) {
  const approvedReviews = useMemo(
    () => reviews.filter((r) => r.approved),
    [reviews],
  );

  const { col1, col2, col3 } = useMemo(() => {
    const c1 = approvedReviews.filter((_, i) => i % 3 === 0);
    const c2 = approvedReviews.filter((_, i) => i % 3 === 1);
    const c3 = approvedReviews.filter((_, i) => i % 3 === 2);
    return { col1: c1, col2: c2, col3: c3 };
  }, [approvedReviews]);

  if (approvedReviews.length === 0) return null;

  // Ensure each track has enough items to look continuous (then we render 2 copies for seamless looping).
  const desktopCols = [col1, col2, col3].map((col) => repeatToMin(col, 6));
  const mobileRowA = repeatToMin([...col1, ...col2], 8);
  const mobileRowB = repeatToMin([...col2, ...col3], 8);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[600px] md:h-[800px] overflow-hidden relative pause">
        {/* Top/Bottom Fade Overlays */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none" />

        {/* Desktop View: 3 Parallel Vertical Columns */}
        <div className="hidden md:contents">
          {desktopCols.map((col, i) => (
            <div key={i} className="relative h-full overflow-hidden">
              <div
                className={`flex flex-col animate-v ${i === 1 ? "reverse" : ""}`}
                style={
                  { "--speed": `${35 + i * 10}s` } as React.CSSProperties
                }
              >
                {[...col, ...col].map((r, idx) => (
                  <ReviewCard
                    key={`${r.id}-${idx}`}
                    review={r}
                    className="mx-0 w-full"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: 2 Parallel Horizontal Rows */}
        <div className="md:hidden absolute inset-0 flex flex-col justify-center gap-6">
          <div className="overflow-hidden relative">
            <div
              className="flex animate-h"
              style={{ "--speed": "30s" } as React.CSSProperties}
            >
              {[...mobileRowA, ...mobileRowA].map((r, idx) => (
                <ReviewCard key={`h1-${r.id}-${idx}`} review={r} className="mx-3" />
              ))}
            </div>
          </div>
          <div className="overflow-hidden relative">
            <div
              className="flex animate-h reverse"
              style={{ "--speed": "40s" } as React.CSSProperties}
            >
              {[...mobileRowB, ...mobileRowB].map((r, idx) => (
                <ReviewCard key={`h2-${r.id}-${idx}`} review={r} className="mx-3" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button
          asChild
          size="lg"
          className="bg-[#46b96c] hover:bg-[#3a9959] text-white font-semibold"
        >
          <Link href="/reviews/write-review">
            <Star className="w-5 h-5 mr-2" />
            Write a Review
          </Link>
        </Button>
      </div>
    </div>
  );
}

