import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { HeroSectionDemo } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";
import Partnership from "@/components/Partnership";
import VolunteerReviewsSkeleton from "@/components/VolunteerReviewsSkeleton";
import { Suspense } from "react";
import prisma from "@/lib/prisma";
import InfiniteReviewsScroller, {
  type InfiniteReview,
} from "@/components/InfiniteReviewsScroller";
import VolunteerReviews from "./reviews/page";
import ReviewVideos from "@/components/ReviewVideos";
import PromoBanner from "@/components/PromoBanner";
import FloatingActionMenu from "@/components/floating-menu";
import FunActivities from "@/components/FunActivities";

// Add revalidation or dynamic to ensure CMS updates are seen
export const dynamic = 'force-dynamic';

const page = async () => {
  let contentMap: Record<string, any> = {};
  let reviews: InfiniteReview[] = [];

  try {
    const content = await prisma.landingPageContent.findMany();
    contentMap = content.reduce((acc, item) => {
      acc[item.section] = item;
      return acc;
    }, {} as Record<string, any>);
  } catch (error: any) {
    const errSummary = error instanceof Error ? error.message.split("\n").filter(Boolean)[0] : String(error);
    console.error("Failed to fetch landing page content (using static fallback):", errSummary);
  }

  try {
    const dbReviews = await prisma.review.findMany({
      where: { approved: true },
      orderBy: { date: "desc" },
      take: 50,
      select: {
        id: true,
        stayDuration: true,
        stayPeriod: true,
        rating: true,
        title: true,
        nationality: true,
        countryFlag: true,
        reviewText: true,
        approved: true,
        date: true,
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });

    reviews = dbReviews.map((r) => ({
      ...r,
      date: r.date.toISOString(),
    }));
  } catch (error: any) {
    const errSummary = error instanceof Error ? error.message.split("\n").filter(Boolean)[0] : String(error);
    console.error("Failed to fetch reviews for homepage (using empty fallback):", errSummary);
  }

  return (
    <div className="max-w-full overflow-hidden">
      <PromoBanner />
      <Navbar />
      <HeroSectionDemo content={contentMap['hero']} />
      <About content={contentMap['about']} />
      <FunActivities />
      <Programs content={contentMap['programs']} />
      <Benefits content={contentMap['benefits']} />
      <ReviewVideos />
      <Gallery content={contentMap['gallery']} />
      <Partnership content={contentMap['partnership']} />
      <ErrorBoundary fallback={<div className="hidden" />}>
        <Suspense fallback={<VolunteerReviewsSkeleton />}>
          <VolunteerReviews />
        </Suspense>
      </ErrorBoundary>
      <Contact />
      <Footer />
      <FloatingActionMenu />
    </div>
  );
};

export default page;
