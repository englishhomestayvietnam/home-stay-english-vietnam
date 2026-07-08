import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingActionMenu from "@/components/floating-menu";
import HomestayGuides from "@/components/HomestayGuides";
import { BookOpen } from "lucide-react";

export const metadata = {
  title: "Volunteer Welcome Guides | English Homestay Vietnam",
  description: "Read our comprehensive welcome guide for volunteering in Vietnam: airport bus routes, SIM cards, money exchanges, local transport, and budget eating tips in Hanoi.",
  keywords: [
    "volunteer welcome guides",
    "vietnam volunteer guide",
    "hanoi volunteer tips",
    "getting to hanoi homestay",
    "vietnam sim card for volunteers",
    "money exchange hanoi banks",
    "budget eating hanoi travel",
    "public bus airport hanoi"
  ],
  openGraph: {
    title: "Volunteer Welcome Guides | English Homestay Vietnam",
    description: "Read our comprehensive welcome guide for volunteering in Vietnam: airport bus routes, SIM cards, money exchanges, local transport, and budget eating tips in Hanoi.",
    url: "https://www.englishhomestayvietnam.com/homestay-guides",
    type: "website",
  }
};

export default function HomestayGuidesPage() {
  return (
    <div className="max-w-full overflow-hidden bg-slate-50 min-h-screen flex flex-col">
      <PromoBanner />
      <Navbar />

      {/* Header Banner */}
      <div className="relative bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white pt-36 pb-20 px-4 text-center overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-10 left-1/4 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-lime-400/10 blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-widest text-lime-300 mb-6">
            <BookOpen className="w-3.5 h-3.5" />
            Volunteer Knowledge Base
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            Homestay &amp; Cultural <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-lime-300">
              Survival Guides
            </span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 font-light max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about airport transit, SIM cards, money exchanges, local transport, and budget eating around our homestay in Hanoi.
          </p>
        </div>
      </div>

      {/* Interactive Guides Component */}
      <div className="flex-grow">
        <HomestayGuides />
      </div>

      <Contact />
      <Footer />
      <FloatingActionMenu />
    </div>
  );
}
