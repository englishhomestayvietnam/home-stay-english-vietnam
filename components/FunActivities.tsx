"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { Calendar, Users, MapPin, ChevronLeft, ChevronRight, X, ZoomIn, Compass } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface Activity {
  id: string;
  title: string;
  subtitle: string;
  schedule: string;
  icon: string;
  description: string;
  highlights: string[];
  images: string[];
}

const FunActivities = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeTab, setActiveTab] = useState<string>("");

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await fetch("/api/fun-activities");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setActivities(data);
            setActiveTab(data[0].id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      }
    };
    fetchActivities();
  }, []);

  const currentActivity = activities.find((a) => a.id === activeTab) || activities[0];

  // Image Gallery Viewer State
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  // Reset active image when changing tab
  useEffect(() => {
    setActiveImageIndex(0);
  }, [activeTab]);

  const handleNextImage = () => {
    if (!currentActivity?.images?.length) return;
    setActiveImageIndex((prev) => (prev + 1) % currentActivity.images.length);
  };

  const handlePrevImage = () => {
    if (!currentActivity?.images?.length) return;
    setActiveImageIndex((prev) => (prev - 1 + currentActivity.images.length) % currentActivity.images.length);
  };

  const renderIcon = (iconName: string, isActive: boolean) => {
    const IconComponent = (LucideIcons as any)[iconName] || Compass;
    return <IconComponent className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-500"}`} />;
  };

  if (!activities || activities.length === 0) return null;

  return (
    <section id="activities" className="py-12 sm:py-16 md:py-24 bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 sm:w-96 sm:h-96 bg-lime-500/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-16"
        >
          <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs sm:text-sm">Life & Community</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mt-2 mb-4 text-foreground">
            Fun & Cultural Activities
          </h2>
          <div className="h-1 bg-gradient-to-r from-emerald-500 to-lime-500 w-20 sm:w-24 mx-auto mb-6 rounded-full" />
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg px-2">
            At English Homestay Vietnam, volunteering is far more than teaching. Build lifelong friendships and experience authentic local life with our active weekly and monthly community activities.
          </p>
        </motion.div>

        {/* Custom Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex justify-center mb-8 sm:mb-12 px-2"
        >
          <div className="bg-slate-100/80 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex gap-1.5 sm:gap-2 max-w-full overflow-x-auto no-scrollbar">
            {activities.map((activity) => {
              const isActive = activeTab === activity.id;
              return (
                <button
                  key={activity.id}
                  onClick={() => setActiveTab(activity.id)}
                  className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 cursor-pointer ${isActive
                    ? "bg-white dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 shadow-md scale-102"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                >
                  {renderIcon(activity.icon, isActive)}
                  <span className="whitespace-nowrap">{activity.title}</span>
                </button>
              );
            })}
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
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto"
          >
            {/* Left side: Information (5 cols) */}
            <div className="lg:col-span-5 order-2 lg:order-1 bg-card border border-slate-200/60 dark:border-slate-800/60 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 space-y-5 sm:space-y-6 flex flex-col justify-between lg:h-full">
              <div className="space-y-4 sm:space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-lg text-xs font-bold text-emerald-700 dark:text-emerald-400">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentActivity.schedule}
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                    {currentActivity.title}
                  </h3>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1 text-sm sm:text-base">
                    {currentActivity.subtitle}
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                  {currentActivity.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-3 pt-1">
                  <h4 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider">Activity Highlights</h4>
                  <ul className="space-y-2">
                    {currentActivity.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call to action */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button asChild size="lg" className="w-full sm:w-auto rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 shadow-md">
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
                  className="w-full sm:w-auto rounded-xl font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  Contact Us
                </Button>
              </div>
            </div>

            {/* Right side: Interactive Image Viewer (7 cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-3 sm:gap-4 lg:h-full">
              {/* Main Photo Card - fills available height on desktop, fixed ratio on mobile */}
              <div className="relative aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-0 rounded-xl sm:rounded-2xl overflow-hidden group shadow-xl bg-slate-900 border border-slate-200/50 dark:border-slate-800/50">
                <Image
                  src={currentActivity.images[activeImageIndex]}
                  alt={`${currentActivity.title} group moment ${activeImageIndex + 1}`}
                  fill
                  className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 800px"
                  priority
                />

                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Lightbox / Zoom Trigger */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-xl bg-black/40 hover:bg-black/60 transition-colors text-white opacity-100 sm:opacity-0 group-hover:opacity-100 duration-300"
                  aria-label="Zoom photo"
                >
                  <ZoomIn className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Left/Right Controls on main image */}
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-xs text-white hover:scale-110 transition-all cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-2.5 rounded-full bg-black/30 hover:bg-black/60 backdrop-blur-xs text-white hover:scale-110 transition-all cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Caption / Page indicator */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between text-white/90 gap-2">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs bg-black/40 px-2 sm:px-3 py-1 rounded-full backdrop-blur-xs font-semibold truncate">
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                    <span className="truncate">Real-Life Volunteer Moments</span>
                  </div>
                  <span className="text-[10px] sm:text-xs bg-black/40 px-2 sm:px-2.5 py-1 rounded-full backdrop-blur-xs font-bold font-mono flex-shrink-0">
                    {activeImageIndex + 1} / {currentActivity.images.length}
                  </span>
                </div>
              </div>

              {/* Scrollable Thumbnail Strip */}
              <div className="relative flex-shrink-0">
                <div className="flex gap-2 sm:gap-2.5 overflow-x-auto pb-2 no-scrollbar max-w-full">
                  {currentActivity.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImageIndex(index)}
                      className={`relative flex-shrink-0 w-16 sm:w-20 aspect-[4/3] rounded-lg overflow-hidden border-2 cursor-pointer transition-all duration-300 ${activeImageIndex === index
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
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-3 sm:p-4"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white cursor-pointer z-10"
              aria-label="Close fullscreen viewer"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Navigation buttons inside lightbox */}
            <button
              onClick={handlePrevImage}
              className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white hover:scale-110 transition-all cursor-pointer z-10"
            >
              <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3.5 rounded-full bg-white/10 hover:bg-white/25 text-white hover:scale-110 transition-all cursor-pointer z-10"
            >
              <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>

            {/* Main Lightbox Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl aspect-[4/3] max-h-[75vh] sm:max-h-[85vh] rounded-xl overflow-hidden shadow-2xl"
            >
              <Image
                src={currentActivity.images[activeImageIndex]}
                alt={`${currentActivity.title} zoomed view`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Lightbox Caption / Info */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-center text-white/70 text-xs sm:text-sm">
              <p className="font-bold text-white text-sm sm:text-base mb-1">{currentActivity.title}</p>
              <p>Image {activeImageIndex + 1} of {currentActivity.images.length}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default FunActivities;