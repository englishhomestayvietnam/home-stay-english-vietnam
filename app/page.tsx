import About from "@/components/About";
import Benefits from "@/components/Benefits";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";
import { HeroSectionDemo } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Partnership from "@/components/Partnership";
import prisma from "@/lib/prisma";
import PromoBanner from "@/components/PromoBanner";
import FloatingActionMenu from "@/components/floating-menu";


const page = async () => {
  let contentMap: Record<string, any> = {};

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

  return (
    <div className="max-w-full overflow-hidden">
      <PromoBanner />
      <Navbar />
      <HeroSectionDemo content={contentMap['hero']} />
      <About content={contentMap['about']} />
      <Benefits content={contentMap['benefits']} />
      <Gallery content={contentMap['gallery']} />
      <Partnership content={contentMap['partnership']} />
      <Contact />
      <Footer />
      <FloatingActionMenu />
    </div>
  );
};

export default page;

