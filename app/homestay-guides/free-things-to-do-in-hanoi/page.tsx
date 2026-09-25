import Link from "next/link";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { 
  DollarSign, 
  Sun, 
  Users, 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Coffee, 
  MapPin, 
  Heart, 
  ChevronRight, 
  Clock, 
  BookOpen, 
  TreePine, 
  Camera, 
  Utensils 
} from "lucide-react";

export const metadata = {
  title: "30+ Best Free Things to Do in Hanoi (2026 Budget Guide) | English Homestay Vietnam",
  description: "Discover 30+ completely free things to do in Hanoi: sunrise tai chi, student walking tours, ancient pagodas, Old Quarter streets, Eiffel bridge walks, night shows, and cheap eats under $2.",
  keywords: [
    "free things to do in hanoi",
    "hanoi on a budget",
    "cheap things to do in hanoi",
    "hanoi budget travel guide",
    "free walking tours hanoi",
    "hoan kiem lake free activities",
    "vietnam volunteer homestay tips"
  ],
  openGraph: {
    title: "30+ Best Free Things to Do in Hanoi (2026 Budget Guide)",
    description: "You don't need a fortune to fall in love with Hanoi. Explore the best 30+ completely free attractions, student tours, pagodas, and insider budget tips.",
    url: "https://www.englishhomestayvietnam.com/homestay-guides/free-things-to-do-in-hanoi",
    type: "article",
  }
};

export default function FreeThingsToDoInHanoiPage() {
  const freeItems = [
    {
      num: 1,
      title: "Sunrise Tai Chi at Hoan Kiem Lake (5:30 AM)",
      desc: "Join hundreds of welcoming local seniors around Sword Lake for dawn Tai Chi, fan dancing, and laughing yoga. Tourists are warmly welcomed to join in.",
      tag: "Morning Ritual",
    },
    {
      num: 2,
      title: "Walk Across Eiffel's 1902 Long Bien Bridge",
      desc: "Stroll along the pedestrian walkway of the historic cantilever iron bridge at sunset for skyline views and banana plantations below.",
      tag: "Photography",
    },
    {
      num: 3,
      title: "Free Student-Led Walking Tours (Hanoi Kids)",
      desc: "Local university students guide you through the Old Quarter and city highlights with zero guide fees to practice conversational English.",
      tag: "Cultural Exchange",
    },
    {
      num: 4,
      title: "Tran Quoc Pagoda on West Lake (Hồ Tây)",
      desc: "Hanoi's oldest Buddhist temple founded in the 6th century. Free admission, stunning sunset view over the lake.",
      tag: "Historic Shrine",
    },
    {
      num: 5,
      title: "Ho Chi Minh Mausoleum (Body Viewing)",
      desc: "Pay respects to Vietnam's revolutionary leader in Ba Dinh Square. Admission is 100% free (strictly morning hours; modest dress required).",
      tag: "National Monument",
    },
    {
      num: 6,
      title: "Weekend Pedestrian Walking Street",
      desc: "From Friday 7 PM to Sunday midnight, the perimeter of Hoan Kiem Lake shuts to traffic, turning into a festival of acoustic bands and folk games.",
      tag: "Weekend Night",
    },
    {
      num: 7,
      title: "One Pillar Pagoda (Chùa Một Cột)",
      desc: "Legendary 11th-century Buddhist pagoda built atop a single stone column in a lotus pond, right beside the Mausoleum grounds.",
      tag: "Ancient Wonder",
    },
    {
      num: 8,
      title: "Wander the 36 Old Quarter Guild Streets",
      desc: "A self-guided sensory walk through Hang Bac (silver), Hang Gai (silk), Hang Ma (lanterns), and narrow residential alleyways (ngõ).",
      tag: "Self-Guided Walk",
    },
    {
      num: 9,
      title: "Bach Ma Temple (Old Quarter's Oldest)",
      desc: "Founded in the 9th century and dedicated to the sacred White Horse deity. Free, quiet, and deeply atmospheric.",
      tag: "Sacred Temple",
    },
    {
      num: 10,
      title: "St. Joseph's Cathedral (Nhà Thờ Lớn)",
      desc: "Hanoi's 1886 neo-Gothic cathedral. Free to enter during visiting hours, or sit on the church plaza watching youth culture.",
      tag: "Architecture",
    },
    {
      num: 11,
      title: "French Quarter Colonial Heritage Walk",
      desc: "A 90-minute walk admiring the Hanoi Opera House, Sofitel Metropole, State Bank, and restored French yellow villas.",
      tag: "Historic Walk",
    },
    {
      num: 12,
      title: "Dong Xuan Wholesale Market",
      desc: "Hanoi's largest 3-story covered market dating to 1889. Free to wander through aisles of fabrics, tea, dried fruits, and souvenirs.",
      tag: "Local Market",
    },
    {
      num: 13,
      title: "Hang Be Dawn Wet Market",
      desc: "Between 6:00 and 8:00 AM, observe local housewives and street chefs buying fresh mountain herbs, river fish, and freshly rolled rice cakes.",
      tag: "Morning Market",
    },
    {
      num: 14,
      title: "Hanoi Book Street (Phố Sách 19/12)",
      desc: "A charming, car-free brick promenade lined with indie bookstores, wooden reading benches, and artistic sculptures.",
      tag: "Quiet Escape",
    },
    {
      num: 15,
      title: "Banana Island (Bãi Giữa) Farm Trail",
      desc: "Descend from Long Bien Bridge into an agricultural oasis of banana groves and quiet dirt trails right in the middle of the Red River.",
      tag: "Nature Walk",
    },
    {
      num: 16,
      title: "The 6-Kilometer Ceramic Mosaic Wall",
      desc: "Guinness World Record holder for the longest ceramic mosaic in the world, depicting Vietnamese mythology and history.",
      tag: "Public Art",
    },
    {
      num: 17,
      title: "Ta Hien Beer Street Energy",
      desc: "Absorb the electric energy, chatter, and street performers along the famous backpacker beer junction without ordering anything.",
      tag: "Nightlife",
    },
    {
      num: 18,
      title: "Mega Grand World Nightly Water Show",
      desc: "A spectacular free nightly lagoon light, laser, and fountain performance with floating stage boats at Ocean Park 1.",
      tag: "Night Spectacle",
    },
    {
      num: 19,
      title: "Watch the Train on Train Street",
      desc: "Observe the train thundering inches from residential walls from the safe outer crossing points on Dien Bien Phu or Tran Phu.",
      tag: "Iconic Moment",
    },
    {
      num: 20,
      title: "Thong Nhat Park (Reunification Park)",
      desc: "Hanoi's largest central public park surrounding Bay Mau Lake with running loops and grassy picnic spots.",
      tag: "Green Park",
    },
    {
      num: 21,
      title: "Nghia Do Park Outdoor Fitness",
      desc: "Community park with free outdoor gym machines, running trails, and a peaceful lake in Cau Giay district.",
      tag: "Workout",
    },
    {
      num: 22,
      title: "Bach Thao Botanical Gardens",
      desc: "A tranquil 33-hectare park with ancient banyan trees and orchid gardens. Symbolic 2,000 VND (~$0.08) entrance.",
      tag: "Nature",
    },
    {
      num: 23,
      title: "West Lake Lotus Ponds (May to July)",
      desc: "Blossoming pink lotus ponds along the northern rim of West Lake, free to admire from the wooden lakeside walkways.",
      tag: "Seasonal",
    },
    {
      num: 24,
      title: "Turtle Tower & Sword Lake Reflections",
      desc: "Watch the illuminated 19th-century Turtle Tower cast golden reflections on Hoan Kiem Lake after dark.",
      tag: "Night Photography",
    },
    {
      num: 25,
      title: "Sidewalk Workshop Culture",
      desc: "Watch street mechanics assemble motorbikes, knife sharpeners pedal grinding stones, and cobblers fix shoes right on the sidewalk.",
      tag: "Street Life",
    },
    {
      num: 26,
      title: "Ngoc Son Temple Outer Bridge Views",
      desc: "Walking the Scarlet-red The Huc bridge and photographing the outer pagoda gates without paying entrance to the inner shrine.",
      tag: "Photo Spot",
    },
    {
      num: 27,
      title: "Quan Thanh Taoist Temple Exterior",
      desc: "Admire the 11th-century carved wooden gates and giant banyan trees at the edge of West Lake.",
      tag: "Heritage",
    },
    {
      num: 28,
      title: "1st & 15th Lunar Day Street Altars",
      desc: "Twice a month, street vendors set out fragrant incense and fresh fruit on tiny sidewalk altars in honor of ancestors.",
      tag: "Culture",
    },
    {
      num: 29,
      title: "Dawn Fishermen on West Lake",
      desc: "Watch small wooden fishing boats navigate mist on West Lake at 6:00 AM from Thanh Nien causeway.",
      tag: "Sunrise",
    },
    {
      num: 30,
      title: "People-Watching on Plastic Stools",
      desc: "Simply grab a sidewalk stoop or bench and watch the mesmerizing flow of millions of scooters moving in rhythm.",
      tag: "Hanoi Magic",
    },
  ];

  return (
    <div className="max-w-full overflow-hidden bg-slate-50 min-h-screen flex flex-col font-sans">
      <PromoBanner />
      <Navbar />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white pt-36 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <nav className="flex justify-center items-center gap-2 text-xs md:text-sm text-emerald-200/80 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/homestay-guides" className="hover:text-white transition-colors">Guides</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-lime-300 font-medium">Free Things to Do</span>
          </nav>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-lime-300 mb-6">
            <DollarSign className="w-4 h-4" /> Zero-Dollar Hanoi Travel Guide (2026)
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            30+ Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-lime-300">Free Things to Do</span> <br />
            in Hanoi
          </h1>

          <p className="text-lg md:text-xl text-emerald-100/90 font-light max-w-3xl mx-auto leading-relaxed mb-8">
            Experience sunrise tai chi by the lake, free student-led tours, thousand-year-old temples, and the magic of the Old Quarter without spending a single dollar.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 text-xs md:text-sm text-emerald-200">
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <Clock className="w-4 h-4 text-lime-300" /> Updated for 2026
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <BookOpen className="w-4 h-4 text-lime-300" /> 12 Min Read
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              <Heart className="w-4 h-4 text-lime-300" /> Backpacker &amp; Volunteer Tested
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 md:py-16">
        
        {/* 30 Free Activities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {freeItems.map((item) => (
            <div key={item.num} className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs hover:border-emerald-300 transition">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center">
                  #{item.num}
                </span>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {item.tag}
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 10 Cheap Bites Under $2 */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 md:p-8 mb-12 shadow-xs">
          <div className="flex items-center gap-3 mb-6">
            <Utensils className="w-6 h-6 text-emerald-600" />
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900">
                10 Delicious Add-Ons Under $2 USD
              </h2>
              <p className="text-xs md:text-sm text-slate-500">Pair your free walking tour with these budget treats</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Crispy Bánh Mì</p>
                <p className="text-xs text-slate-500">Pork, pâté &amp; cucumber</p>
              </div>
              <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-1 rounded">25k VND ($1.00)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Cà Phê Sữa Đá</p>
                <p className="text-xs text-slate-500">Iced condensed milk coffee</p>
              </div>
              <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-1 rounded">20k VND ($0.80)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Bia Hơi Draft Beer</p>
                <p className="text-xs text-slate-500">Fresh daily at Ta Hien</p>
              </div>
              <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-1 rounded">7k VND ($0.28)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Bánh Cuốn</p>
                <p className="text-xs text-slate-500">Steamed rice rolls</p>
              </div>
              <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-1 rounded">30k VND ($1.20)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Fresh Sugarcane Juice</p>
                <p className="text-xs text-slate-500">Pressed with calamansi</p>
              </div>
              <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-1 rounded">10k VND ($0.40)</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center">
              <div>
                <p className="font-bold text-slate-900">Airport Bus 86</p>
                <p className="text-xs text-slate-500">Airport to Old Quarter</p>
              </div>
              <span className="text-emerald-700 font-bold text-xs bg-emerald-100 px-2 py-1 rounded">45k VND ($1.80)</span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 text-white p-8 md:p-12 shadow-lg border border-emerald-700/40">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4 leading-snug">
            Live in Hanoi Completely Free as a Homestay Volunteer
          </h2>
          <p className="text-emerald-100 text-base md:text-lg mb-8 leading-relaxed font-light">
            Love budget travel? Join <strong>English Homestay Vietnam</strong>. Exchange ~15 hours of conversational English per week for 100% free accommodation, homemade Vietnamese food, and a local family.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-400 text-slate-950 font-bold text-sm hover:from-lime-300 transition"
            >
              Join Our Homestay Family
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/homestay-guides/things-to-do-in-hanoi"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold text-sm transition border border-white/20"
            >
              Read 50+ Things to Do in Hanoi
            </Link>
          </div>
        </div>

      </main>

      <Contact />
      <Footer />
    </div>
  );
}
