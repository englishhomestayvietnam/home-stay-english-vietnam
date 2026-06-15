"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Calendar, Utensils, Compass, Users, MapPin, ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface Activity {
  id: string;
  title: string;
  subtitle: string;
  schedule: string;
  icon: React.ReactNode;
  description: string;
  highlights: string[];
  images: string[];
}

const FunActivities = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const activities: Activity[] = [
    {
      id: "cooking",
      title: "Saturday Cultural Exchange & Cooking",
      subtitle: "Vietnamese Culinary Masterclass & Story Sharing",
      schedule: "Every Saturday",
      icon: <Utensils className="w-5 h-5 text-emerald-600" />,
      description: "Every Saturday afternoon, our homestay community opens its doors for a vibrant cultural exchange and Vietnamese cooking class. Volunteers, students, and local staff gather to learn, cook, and feast together.",
      highlights: [
        "Master traditional Vietnamese dishes (Pho, fresh Spring Rolls, Bun Cha, and Vietnamese Egg Coffee)",
        "Open to all Vietnamese staff, local students, and foreign volunteers",
        "Exchange languages, stories, and cultural traditions over a family-style meal",
        "100% free activity focused on building community and sharing local heritage"
      ],
      images: [
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.51 PM.jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.52 PM (1).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.52 PM (2).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.52 PM (3).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.52 PM.jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.53 PM (1).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.53 PM (2).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.53 PM (3).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.53 PM.jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.54 PM (1).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.54 PM (2).jpeg",
      ]
    },
    {
      id: "trips",
      title: "Monthly Hanoi Trips & Excursions",
      subtitle: "Explore the Beautiful Landscapes & History of Northern Vietnam",
      schedule: "Once a Month",
      icon: <Compass className="w-5 h-5 text-orange-600" />,
      description: "English Homestay organizes monthly excursions to help volunteers and local students step outside the classroom and discover the wonders of Hanoi and its surrounding areas.",
      highlights: [
        "Guided visits to Hanoi's historic quarters, temples, and famous museums",
        "Trips to traditional craft villages (Bat Trang Ceramics, Quang Phu Cau Incense Village)",
        "Weekend hikes, nature exploration, and scenic escapes in Hanoi's surrounding provinces",
        "A fantastic bonding opportunity for the entire community outside the homestay environment"
      ],
      images: [
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.54 PM (3).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.54 PM.jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.55 PM (1).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.55 PM (2).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.55 PM (3).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.55 PM.jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.56 PM (1).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.56 PM (2).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.56 PM (3).jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.56 PM.jpeg",
        "/fun-activities/WhatsApp Image 2026-06-15 at 3.34.57 PM.jpeg",
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState<string>("cooking");
  const currentActivity = activities.find((a) => a.id === activeTab) || activities[0];

  // Image Gallery Viewer State
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Reset active image when changing tab
  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeTab]);

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % currentActivity.images.length);
  };

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + currentActivity.images.length) % currentActivity.images.length);
  };

  return (
    <section id="activities" className="py-24 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-500/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-sm">Life & Community</span>
          <h2 className="text-4xl md:text-5xl font-black mt-2 mb-4 text-foreground">
            Fun & Cultural Activities
          </h2>
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-lime-500 w-24 mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground text-lg">
            At English Homestay Vietnam, volunteering is far more than teaching. Build lifelong friendships and experience authentic local life with our active weekly and monthly community activities.
          </p>
        </motion.div>

        {/* Custom Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex gap-2 max-w-full overflow-x-auto no-scrollbar">
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => setActiveTab(activity.id)}
                className={`relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeTab === activity.id
                    ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-md scale-102"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {activity.id === "cooking" ? (
                  <Utensils className={`w-4 h-4 ${activeTab === "cooking" ? "text-emerald-600" : "text-slate-500"}`} />
                ) : (
                  <Compass className={`w-4 h-4 ${activeTab === "trips" ? "text-orange-600" : "text-slate-500"}`} />
                )}
                <span className="whitespace-nowrap">{activity.id === "cooking" ? "Weekly Saturday Cooking" : "Monthly Hanoi Trips"}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto"
          >
            {/* Left side: Information (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <Calendar className="w-3.5 h-3.5" />
                {currentActivity.schedule}
              </div>

              <div>
                <h3 className="text-3xl font-extrabold text-foreground tracking-tight">
                  {currentActivity.title}
                </h3>
                <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                  {currentActivity.subtitle}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed text-md">
                {currentActivity.description}
              </p>

              {/* Highlights List */}
              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">Activity Highlights</h4>
                <ul className="space-y-2.5">
                  {currentActivity.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Call to action */}
              <div className="pt-4 flex gap-4">
                <Button asChild size="lg" className="rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 shadow-md">
                  <Link href="/apply" target="_blank">
                    Join as a Volunteer
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) contactSection.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="rounded-xl font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Right side: Interactive Image Viewer (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Main Photo Card */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group shadow-xl bg-slate-900 border border-slate-200/50 dark:border-slate-800/50">
                <Image
                  src={currentActivity.images[activeImageIndex]}
                  alt={`${currentActivity.title} group moment ${activeImageIndex + 1}`}
                  fill
                  className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-w-xl) 100vw, 800px"
                  priority
                />
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Lightbox / Zoom Trigger */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 hover:bg-black/60 transition-colors text-white opacity-0 group-hover:opacity-100 duration-300"
                  aria-label="Zoom photo"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>

                {/* Left/Right Controls on main image */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-xs text-white hover:scale-110 transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-xs text-white hover:scale-110 transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Caption / Page indicator */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90">
                  <div className="flex items-center gap-1.5 text-xs bg-black/40 px-3 py-1 rounded-full backdrop-blur-xs font-semibold">
                    <Users className="w-3.5 h-3.5" />
                    <span>Real-Life Volunteer Moments</span>
                  </div>
                  <span className="text-xs bg-black/40 px-2.5 py-1 rounded-full backdrop-blur-xs font-bold font-mono">
                    {activeImageIndex + 1} / {currentActivity.images.length}
                  </span>
                </div>
              </div>

              {/* Scrollable Thumbnail Strip */}
              <div className="relative">
                <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar max-w-full">
                  {currentActivity.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative flex-shrink-0 w-20 aspect-[4/3] rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${
                        activeImageIndex === index
                          ? "border-emerald-500 scale-95 shadow-md"
                          : "border-transparent opacity-60 hover:opacity-100 hover:scale-98"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer"
              aria-label="Close fullscreen viewer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation buttons inside lightbox */}
            <button
              onClick={handlePrevImage}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white hover:scale-110 transition-all cursor-pointer hidden md:block"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white hover:scale-110 transition-all cursor-pointer hidden md:block"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Main Lightbox Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-[4/3] max-h-[85vh] rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src={currentActivity.images[activeImageIndex]}
                alt={`${currentActivity.title} zoomed view`}
                fill
                className="object-contain"
                sizes="(max-w-5xl) 100vw"
                priority
              />
            </motion.div>

            {/* Lightbox Caption / Info */}
            <div className="absolute bottom-6 left-6 right-6 text-center text-white/70 text-sm">
              <p className="font-bold text-white text-base mb-1">{currentActivity.title}</p>
              <p>Image {activeImageIndex + 1} of {currentActivity.images.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FunActivities;
