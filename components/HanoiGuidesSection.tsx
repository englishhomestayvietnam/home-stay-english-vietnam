import Link from "next/link";
import Image from "next/image";
import { Sparkles, Compass, ArrowRight, BookOpen, Clock } from "lucide-react";

export default function HanoiGuidesSection() {
  return (
    <section className="py-16 md:py-20 bg-slate-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
            Hanoi Guides
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Discover Hanoi
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Everything you need to know about exploring Hanoi during your stay with us.
          </p>
        </div>

        {/* The Two Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          
          {/* Box 1: Things to Do */}
          <Link
            href="/homestay-guides/things-to-do-in-hanoi"
            className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop"
                  alt="Things to do in Hanoi"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-emerald-700/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  50+ Attractions
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" /> 16 min read · 2026 Guide
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                  50+ Best Things to Do in Hanoi
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Discover top landmarks, ancient temples, Old Quarter 36 guild streets, water puppetry, street food, night markets, and day trips with updated prices.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 group-hover:text-emerald-800">
                Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

          {/* Box 2: Free Things to Do */}
          <Link
            href="/homestay-guides/free-things-to-do-in-hanoi"
            className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                <Image
                  src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop"
                  alt="Free things to do in Hanoi"
                  fill
                  unoptimized
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-teal-700/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full">
                  30+ Free Sights
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                  <Clock className="w-3.5 h-3.5 text-teal-600" /> 12 min read · Budget Guide
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2.5 group-hover:text-emerald-700 transition-colors">
                  30+ Best Free Things to Do in Hanoi
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Enjoy the best of Hanoi without spending a dollar: sunrise tai chi, student walking tours, free pagodas, Eiffel&apos;s Long Bien Bridge, and eats under $2.
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-0">
              <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-700 group-hover:text-emerald-800">
                Read Guide <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}
