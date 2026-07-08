"use client";

import { useState, useEffect } from "react";
import { X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show banner only if it hasn't been dismissed in the current session
    const isDismissed = sessionStorage.getItem("promo-banner-dismissed");
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    sessionStorage.setItem("promo-banner-dismissed", "true");
    setIsVisible(false);
    window.dispatchEvent(new Event("promo-banner-dismissed"));
  };

  const scrollToActivities = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("activities");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="relative z-55 w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-lime-500 text-white font-medium shadow-md"
        >
          <div className="container mx-auto px-4 py-2.5 flex items-center justify-between gap-4 text-center">
            <div className="flex-1 flex items-center justify-center gap-2 flex-wrap text-sm">
              <span className="inline-flex items-center gap-1.5 bg-white/20 px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5 text-lime-200 fill-lime-200 animate-pulse" />

              </span>
              <span className="font-semibold text-white/95">
                Weekly Saturday Cooking & Cultural Exchanges + Monthly Trips around Hanoi!
              </span>
              <a
                href="#activities"
                onClick={scrollToActivities}
                className="underline hover:text-lime-100 transition-colors font-bold ml-1 inline-flex items-center"
              >
                See Activities & Apply &rarr;
              </a>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 rounded-full hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoBanner;
