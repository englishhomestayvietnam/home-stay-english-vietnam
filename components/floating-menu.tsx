"use client";

import { useState, useEffect } from "react";
import { X, Utensils, Compass, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function FloatingActionMenu() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Determine initial state based on sessionStorage
    const isDismissed = sessionStorage.getItem("promo-widget-dismissed");
    if (isDismissed) {
      setIsExpanded(false);
    }
    setHasLoaded(true);
  }, []);

  const handleCloseWidget = () => {
    sessionStorage.setItem("promo-widget-dismissed", "true");
    setIsExpanded(false);
  };

  const handleOpenWidget = () => {
    setIsExpanded(true);
  };

  const scrollToActivities = () => {
    const element = document.getElementById("activities");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-45 pointer-events-none">
      <AnimatePresence mode="wait">
        {isExpanded ? (
          /* EXPANDED PROMO WIDGET CARD */
          <motion.div
            key="promo-widget"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="pointer-events-auto max-w-sm w-[calc(100vw-2rem)] sm:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden"
          >
            {/* Header Image */}
            <div className="relative h-36 w-full">
              <Image
                src="/fun-activities/WhatsApp Image 2026-06-15 at 3.34.52 PM.jpeg"
                alt="Vietnamese Cooking & Community Activities"
                fill
                className="object-cover"
                sizes="(max-w-md) 100vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              <button
                onClick={handleCloseWidget}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white/90 hover:text-white cursor-pointer"
                aria-label="Close promotion"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-4 right-4">
                <span className="inline-flex items-center gap-1 bg-emerald-500 text-white px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                  Community Life
                </span>
                <h4 className="text-white font-bold text-lg mt-1 truncate">
                  Weekly & Monthly Activities
                </h4>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Experience authentic Vietnamese culture through our active community programs!
              </p>

              <div className="space-y-2.5">
                <div className="flex items-start gap-2.5 text-xs">
                  <div className="mt-0.5 p-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-md">
                    <Utensils className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">Saturdays Cooking & Exchange</span>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Vietnamese cuisine with students & staff</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 text-xs">
                  <div className="mt-0.5 p-1 bg-lime-100 dark:bg-lime-950 text-lime-600 dark:text-lime-400 rounded-md">
                    <Compass className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">Monthly Excursions</span>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">Explore beautiful sites around Hanoi</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={scrollToActivities}
                  className="flex-1 py-2 text-xs font-bold text-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl hover:bg-emerald-100 dark:hover:bg-emerald-950/70 transition-colors cursor-pointer"
                >
                  Learn More
                </button>
                <Link
                  href="/apply"
                  className="flex-1 py-2 text-xs font-bold text-center text-white bg-gradient-to-r from-emerald-500 to-lime-500 rounded-xl hover:from-emerald-600 hover:to-lime-600 shadow-sm transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer pointer-events-auto"
                >
                  Apply Free
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          /* COLLAPSED FLOATING BUTTON WITH TEXT & PING ANIMATION */
          hasLoaded && (
            <motion.div
              key="promo-button-container"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              className="pointer-events-auto flex flex-col items-center gap-2"
            >
              {/* Click me badge with arrow pointing down */}
              <div 
                onClick={handleOpenWidget}
                className="bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-black px-2.5 py-1.5 rounded-xl shadow-lg animate-bounce flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap select-none"
              >
                Click me! &darr;
              </div>

              {/* Pulsing button */}
              <div className="relative">
                {/* Ping animation effect */}
                <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-75 animate-ping pointer-events-none" />
                
                <button
                  onClick={handleOpenWidget}
                  className="relative flex items-center justify-center h-14 w-14 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
                  aria-label="View community activities promotion"
                >
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </button>
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}