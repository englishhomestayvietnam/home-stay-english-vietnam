"use client";
import { motion } from "framer-motion";
import React from "react";

import { ArrowDown, Globe, Heart, Users, Calendar } from "lucide-react";
import { ImagesSlider } from "./ui/images-slider";
import { Button } from "./ui/button";
import Link from "next/link";

export function HeroSectionDemo({ content }: { content?: any }) {
  const images = content?.images?.length > 0 ? content.images : [
    "/home_stay_vietnam_1.jpg",
    "/home_stay_vietnam_2.jpg",
    "/home_stay_vietnam_3.jpg",
    "/home_stay_vietnam_4.jpg",
    "/home_stay_vietnam_5.jpg",
    "/home_stay_vietnam_6.jpg",
    "/home_stay_vietnam_7.jpg",
  ];

  const scrollToApply = () => {
    const element = document.getElementById("apply");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ImagesSlider className="h-212" images={images}>
      {/* Dark overlay for better text readability */}
      <div id="home" className="absolute inset-0 z-10 bg-black/30" />

      {/* Center Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 flex flex-col items-center justify-center h-full max-w-5xl px-6 mx-auto text-center"
      >
        {/* Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-sm font-medium tracking-wider text-white border rounded-full bg-white/20 backdrop-blur-md border-white/30"
        >
          <Heart className="w-4 h-4 text-lime-300 fill-lime-300" />
          {content?.subtitle || "STAY FREE • TEACH ENGLISH • LIVE LOCAL"}
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
        >
          {content?.title ? (
            content.title
          ) : (
            <>
              Teach. Travel.{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-300 to-lime-400">
                Connect.
              </span>
            </>
          )}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="max-w-2xl mb-5 text-xl font-light text-gray-100 md:text-2xl"
        >
          {content?.description || "Live with passionate Vietnamese learners. Share your language, enjoy free Saturday cooking classes, and explore Hanoi on monthly trips!"}
        </motion.p>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-8 mb-10 text-sm text-white/90"
        >
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <span>500+ Homestays</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            <span>From 40+ Countries</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-lime-300" />
            <span>Weekly Saturday Cooking & Monthly Hanoi Trips</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
          className="cursor-pointer"
        >
          <Link
            href="/apply"
            target="_blank"
            className="flex items-center gap-3 px-10 py-5 font-semibold text-white transition-all duration-300 rounded-full shadow-2xl cursor-pointer text-md bg-linear-to-r hover:scale-95 from-emerald-400 to-lime-400 hover:from-emerald-500 hover:to-lime-500 hover:shadow-emerald-400/30"
          >
            Apply to Stay Free
            <ArrowDown className="w-5 h-5 cursor-pointer animate-bounce" />
          </Link>
        </motion.div>

        {/* Subtle Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-6 text-sm text-white/70"
        >
          No fees. No catch. Just real cultural exchange.
        </motion.p>
      </motion.div>
    </ImagesSlider>
  );
}