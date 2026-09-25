import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { 
  Compass, 
  MapPin, 
  Clock, 
  DollarSign, 
  Sparkles, 
  Utensils, 
  Camera, 
  Building2, 
  Moon, 
  Bike, 
  ArrowRight, 
  BookOpen, 
  Heart,
  ChevronRight,
  Ticket,
  AlertTriangle
} from "lucide-react";

export const metadata = {
  title: "50+ Best Things to Do in Hanoi (2026 Guide) | English Homestay Vietnam",
  description: "Discover 50+ best things to do in Hanoi: ancient temples, Old Quarter 36 guild streets, street food, water puppetry, night markets, and day trips with updated 2026 prices and insider homestay tips.",
  keywords: [
    "things to do in hanoi",
    "hanoi attractions",
    "hanoi travel guide 2026",
    "what to do in hanoi",
    "hanoi old quarter",
    "hoan kiem lake",
    "temple of literature hanoi",
    "hanoi budget travel",
    "vietnam homestay travel tips"
  ],
  openGraph: {
    title: "50+ Best Things to Do in Hanoi: 2026 Comprehensive Guide",
    description: "Explore Hanoi's top temples, colonial architecture, street food markets, hidden alley cafes, and epic day trips with local host recommendations.",
    url: "https://www.englishhomestayvietnam.com/homestay-guides/things-to-do-in-hanoi",
    type: "article",
    images: [
      {
        url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Hoan Kiem Lake Hanoi at dusk"
      }
    ]
  }
};

export default function ThingsToDoInHanoiPage() {
  return (
    <div className="max-w-full overflow-hidden bg-slate-50 min-h-screen flex flex-col font-sans">
      <PromoBanner />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white pt-36 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute top-12 left-1/4 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-lime-400/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <nav className="flex justify-center items-center gap-2 text-xs md:text-sm text-emerald-200/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/homestay-guides" className="hover:text-white transition-colors">Guides</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-lime-300 font-medium">Things to Do in Hanoi</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-lime-300 mb-6">
            <Compass className="w-4 h-4" />
            Ultimate 2026 Hanoi City Guide
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            50+ Best Things to Do in <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-lime-300">
              Hanoi, Vietnam
            </span>
          </h1>

          <p className="text-lg md:text-xl text-emerald-100/90 font-light max-w-3xl mx-auto leading-relaxed mb-8">
            From thousand-year-old temples and aromatic street food stalls to hidden coffee alleys and peaceful lakes, discover the absolute best experiences in Vietnam&apos;s vibrant capital.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm text-emerald-200">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <Clock className="w-4 h-4 text-lime-300" /> Updated for 2026
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <BookOpen className="w-4 h-4 text-lime-300" /> 16 Min Read
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <Heart className="w-4 h-4 text-lime-300" /> Tested by Homestay Hosts &amp; Volunteers
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        
        {/* Quick Jump Navigator */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 mb-12 shadow-xs">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            Quick Navigation &amp; Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
            <a href="#iconic-landmarks" className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition font-medium text-slate-700 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
              1. Landmarks
            </a>
            <a href="#cultural-experiences" className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition font-medium text-slate-700 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              2. Culture &amp; Arts
            </a>
            <a href="#historic-neighborhoods" className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition font-medium text-slate-700 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              3. Old Quarter
            </a>
            <a href="#museums-history" className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition font-medium text-slate-700 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />
              4. Museums
            </a>
            <a href="#hanoi-nightlife" className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition font-medium text-slate-700 flex items-center gap-2">
              <Moon className="w-4 h-4 text-emerald-600 shrink-0" />
              5. After Dark
            </a>
            <a href="#outdoor-activities" className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition font-medium text-slate-700 flex items-center gap-2">
              <Bike className="w-4 h-4 text-emerald-600 shrink-0" />
              6. Outdoors
            </a>
            <a href="#day-trips" className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition font-medium text-slate-700 flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600 shrink-0" />
              7. Day Trips
            </a>
            <a href="#cost-table" className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition font-medium text-slate-700 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-600 shrink-0" />
              8. Cost Table
            </a>
          </div>
        </div>

        {/* Section 1 */}
        <section id="iconic-landmarks" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 border-b-2 border-emerald-500 pb-3 mb-8">
            <Building2 className="w-7 h-7 text-emerald-600" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              1. Iconic Landmarks of Hanoi
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs">
              <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden mb-6 bg-slate-100">
                <Image 
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop" 
                  alt="Hoan Kiem Lake in Hanoi"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Hoan Kiem Lake &amp; Ngoc Son Temple
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                The emotional and geographic heartbeat of Hanoi. According to Vietnamese lore, Emperor Le Loi received a divine sword from the Golden Turtle God to defeat invaders in the 15th century, later returning the sword at this very lake.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                Cross the striking red wooden <strong>The Huc Bridge</strong> onto Jade Island to visit <strong>Ngoc Son Temple</strong>, dedicated to Tran Hung Dao and Van Xuong. Inside, view the preserved giant softshell turtle that lived in the lake.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
                <span className="bg-slate-100 px-3 py-1 rounded-md"><strong>Admission:</strong> Free for Lake; 30,000 VND (~$1.20) for Temple</span>
                <span className="bg-slate-100 px-3 py-1 rounded-md"><strong>Hours:</strong> Daily 8:00 AM – 6:00 PM</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs">
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Ho Chi Minh Mausoleum Complex &amp; One Pillar Pagoda
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Located in historic Ba Dinh Square where President Ho Chi Minh proclaimed the Declaration of Independence in 1945, this grand granite monument is where Vietnam&apos;s founding father rests.
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                The complex includes the French colonial <strong>Presidential Palace</strong>, the peaceful <strong>Stilt House and Fish Pond</strong>, and the 11th-century <strong>One Pillar Pagoda (Chùa Một Cột)</strong>, which rises from a lotus pond on a single stone column.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl text-sm text-amber-900 mb-4 flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <strong>Dress Code &amp; Timing:</strong> Shoulders and knees must be fully covered. Visiting hours are morning only (7:30–10:30 AM in summer; 8:00–11:00 AM in winter). Closed Mondays and Fridays.
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
                <span className="bg-slate-100 px-3 py-1 rounded-md"><strong>Admission:</strong> Free for Mausoleum; 40,000 VND for Palace grounds</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs">
              <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden mb-6 bg-slate-100">
                <Image 
                  src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop" 
                  alt="Temple of Literature in Hanoi"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                Temple of Literature (Văn Miếu – Quốc Tử Giám)
              </h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Founded in 1070 to honor Confucius, this site became Vietnam&apos;s first university in 1076. Spanning five courtyards, it features the Well of Heavenly Clarity and 82 carved stone turtle stelae engraved with doctoral graduates between 1442 and 1779.
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-600">
                <span className="bg-slate-100 px-3 py-1 rounded-md"><strong>Admission:</strong> 30,000 VND (~$1.20)</span>
                <span className="bg-slate-100 px-3 py-1 rounded-md"><strong>Hours:</strong> 8:00 AM – 5:00 PM daily</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section id="cultural-experiences" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 border-b-2 border-emerald-500 pb-3 mb-8">
            <Sparkles className="w-7 h-7 text-emerald-600" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              2. Cultural Heritage &amp; Authentic Experiences
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-2">
                  <Ticket className="w-4 h-4" /> 1,000-Year Tradition
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Thang Long Water Puppet Theatre</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Originated in the flooded rice paddies of northern Vietnam over a thousand years ago. Puppeteers waist-deep in water manipulate lacquered figurines while a traditional folk orchestra plays live.
                </p>
              </div>
              <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-slate-700">
                <strong>Ticket:</strong> ~100,000 VND (~$4.00) | Book 1 day in advance.
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-2">
                  <Utensils className="w-4 h-4" /> Cooking Class
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Hanoi Cooking Classes &amp; Market Walks</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Shop local herbs, chili, and rice noodles at a traditional wet market, then cook authentic Phở, crispy Bánh Xèo crepes, and frothy egg coffee alongside a local chef.
                </p>
              </div>
              <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-slate-700">
                <strong>Price:</strong> $25 – $40 USD per person including a multi-course meal.
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-2">
                  <Camera className="w-4 h-4" /> Artisan Heritage
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Craft Villages (Silk, Pottery, Incense)</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Visit <strong>Bat Trang Ceramic Village</strong> to throw clay pottery, <strong>Van Phuc Silk Village</strong> for ancient loom weaving, or <strong>Quang Phu Cau</strong> for colorful drying incense blooms.
                </p>
              </div>
              <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-slate-700">
                <strong>Access:</strong> Reached easily by public city bus (~8,000 VND) or Grab.
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-2">
                  <Building2 className="w-4 h-4" /> Architecture
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Hanoi Opera House</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Built in 1911 by French architects and modeled after Paris&apos;s Palais Garnier. Neoclassical exterior, illuminated beautifully each evening.
                </p>
              </div>
              <div className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-slate-700">
                <strong>Tip:</strong> Free to admire from outside in August Revolution Square.
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section id="historic-neighborhoods" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 border-b-2 border-emerald-500 pb-3 mb-8">
            <MapPin className="w-7 h-7 text-emerald-600" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              3. Historic Neighborhoods
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 shadow-xs mb-8">
            <div className="relative h-64 md:h-80 w-full rounded-xl overflow-hidden mb-6 bg-slate-100">
              <Image 
                src="https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=1200&auto=format&fit=crop" 
                alt="Narrow street in Hanoi Old Quarter"
                fill
                unoptimized
                className="object-cover"
              />
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
              The Old Quarter &amp; The 36 Guild Streets
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              Dating back to the 11th century, the Old Quarter is a labyrinth of historic trade streets: Hàng Bạc (silver), Hàng Gai (silk), Hàng Mã (paper lanterns), and Hàng Chiếu (woven mats). Duck into narrow alleyways (<em>ngõ</em>) to find hidden noodle stalls and ancient pagodas.
            </p>
          </div>
        </section>

        {/* Section 4: Cost Table */}
        <section id="cost-table" className="mb-16 scroll-mt-24">
          <div className="flex items-center gap-3 border-b-2 border-emerald-500 pb-3 mb-8">
            <DollarSign className="w-7 h-7 text-emerald-600" />
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              4. Quick Cost Reference Table
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-xs">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold">
                  <th className="py-3.5 px-4">Activity</th>
                  <th className="py-3.5 px-4">Cost (VND)</th>
                  <th className="py-3.5 px-4">Cost (USD)</th>
                  <th className="py-3.5 px-4">Best Timing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Hoan Kiem Lake Stroll</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">FREE</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">FREE</td>
                  <td className="py-3 px-4">Sunrise or Weekend Evenings</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Ngoc Son Temple</td>
                  <td className="py-3 px-4">30,000 VND</td>
                  <td className="py-3 px-4">~$1.20</td>
                  <td className="py-3 px-4">Daily 8 AM – 6 PM</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Ho Chi Minh Mausoleum</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">FREE</td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">FREE</td>
                  <td className="py-3 px-4">Morning (7:30 – 10:30 AM)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Temple of Literature</td>
                  <td className="py-3 px-4">30,000 VND</td>
                  <td className="py-3 px-4">~$1.20</td>
                  <td className="py-3 px-4">Daily 8 AM – 5 PM</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Thang Long Water Puppets</td>
                  <td className="py-3 px-4">100,000 VND</td>
                  <td className="py-3 px-4">~$4.00</td>
                  <td className="py-3 px-4">Evening Show</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-900">Ta Hien Fresh Bia Hoi Beer</td>
                  <td className="py-3 px-4">5,000 – 11,000 VND</td>
                  <td className="py-3 px-4">~$0.20 – $0.45</td>
                  <td className="py-3 px-4">Nighttime</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white p-8 md:p-12 shadow-lg border border-emerald-700/40">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 leading-snug">
            Experience Hanoi with English Homestay Vietnam
          </h2>
          <p className="text-emerald-100 text-base md:text-lg mb-8 leading-relaxed font-light">
            Live with a Vietnamese family, practice conversational English with local students, and enjoy free accommodation and authentic home-cooked meals.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 font-bold text-sm hover:from-lime-300 transition"
            >
              Apply to Volunteer Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/homestay-guides/free-things-to-do-in-hanoi"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold text-sm transition border border-white/20"
            >
              View 30+ Free Sights
            </Link>
          </div>
        </div>

      </main>

      <Contact />
      <Footer />
    </div>
  );
}
