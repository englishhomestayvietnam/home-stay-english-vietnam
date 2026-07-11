"use client";

import React, { useState } from "react";
import { m, AnimatePresence, Variants } from "framer-motion";
import { 
  Compass, 
  MapPin, 
  Map, 
  Clock, 
  Key, 
  Check, 
  AlertTriangle, 
  Wifi, 
  Zap, 
  Phone, 
  ShieldAlert, 
  HelpCircle, 
  Plus, 
  Minus,
  Briefcase,
  Calendar,
  Sparkles,
  Home,
  CheckCircle,
  Copy,
  Shield,
  ArrowRight,
  Info
} from "lucide-react";
import Navbar from "@/components/Navbar";
import PromoBanner from "@/components/PromoBanner";
import Footer from "@/components/Footer";

import Link from "next/link";

export default function WelcomeBookPage() {
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyText = (text: string, type: "wifi" | "address") => {
    navigator.clipboard.writeText(text);
    if (type === "wifi") {
      setCopiedWifi(true);
      setTimeout(() => setCopiedWifi(false), 2000);
    } else {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    }
  };



  // Framer motion variants to match Benefits/Programs
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="max-w-full overflow-hidden bg-background min-h-screen flex flex-col font-sans">
      <PromoBanner />
      <Navbar />

      {/* Hero Section - Matching Homepage banner style */}
      <section id="overview" className="relative bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white pt-48 pb-32 px-4 sm:px-6 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-lime-400/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-emerald-500/15 blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
          <m.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/20 text-lime-300"
          >
            Volunteer Portal
          </m.span>
          <m.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 leading-[1.1] tracking-tight max-w-4xl"
          >
            Homestay <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-lime-300">Welcome Book</span>
          </m.h1>
          <m.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-emerald-100/90 font-light max-w-2xl leading-relaxed mb-12"
          >
            English Homestay Vietnam – Trâu Quỳ, Hanoi. Your complete handbook for checking in, homestay rules, weekly schedules, and local integration.
          </m.p>

          {/* Address Card */}
          <m.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-full max-w-3xl bg-card border border-border/50 rounded-xl p-6 md:p-8 text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-3 flex-grow">
              <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest">
                <MapPin className="w-4 h-4" />
                Homestay Address
              </div>
              <p className="text-lg font-bold text-foreground leading-relaxed">
                21A Alley 22 Nguyen Khiem Ich Street, Trâu Quỳ, Gia Lâm, Hanoi
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0 w-full md:w-auto">
              <button
                onClick={() => handleCopyText("21A Alley 22 Nguyen Khiem Ich Street, Trâu Quỳ, Gia Lâm, Hanoi", "address")}
                className="flex-1 md:flex-none px-5 py-3 bg-muted/65 hover:bg-muted text-foreground border border-border rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                {copiedAddress ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                {copiedAddress ? "Copied" : "Copy Address"}
              </button>
              <a
                href="https://maps.google.com/?q=English+Homestay+Vietnam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-5 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-lg text-xs transition-transform text-center flex items-center justify-center gap-2"
              >
                <Map className="w-4 h-4" />
                Open In Maps
              </a>
            </div>
          </m.div>
        </div>
      </section>

      {/* Section 1: Check-in / check-out */}
      <section id="check-in-out" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 scroll-mt-20">
        <m.div 
          className="container px-4 mx-auto sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <m.div variants={itemVariants} className="mb-16 text-center">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary">
              Arrival &amp; Departure
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Check-In &amp; Check-Out Guide
            </h2>
            <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Flexible arrival and departure processes designed to make you feel right at home.
            </p>
          </m.div>

          <div className="grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
            {/* Check-In Card */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary transition-all duration-300">
                    <Home className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Check-In Guide</h3>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Flexible Time</p>
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg border border-border/50 flex gap-3.5 items-start">
                  <Key className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-foreground text-sm">Self Check-In Option</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      If staff are not present on arrival, self check-in is fully supported. We will send you detailed room instructions prior to your landing.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-foreground text-sm">Step-by-Step Entry:</h4>
                  <div className="space-y-3">
                    {[
                      "Receive room assignment & code instructions before arrival",
                      "Locate your assigned room and unpack your belongings",
                      "Rest up and make yourself completely at home 😊"
                    ].map((step, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-muted-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border/50">
                <h4 className="font-bold text-foreground text-xs uppercase tracking-widest mb-1.5">Early Arrival &amp; Luggage Drop:</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Arriving early? You can drop your luggage off for <strong>FREE</strong>. If your room is not ready, you can relax in the homestay living area. Please inform your host in advance.
                </p>
              </div>
            </m.div>

            {/* Check-Out Card */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary transition-all duration-300">
                    <Key className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Check-Out Guide</h3>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Flexible Time</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-bold text-foreground text-sm">Departure Checklist:</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    Before departing, please check off these steps to help keep the homestay running smoothly:
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Turn off all lights & air-conditioning units",
                      "Securely lock all doors and close windows",
                      "Return physical room keys (if provided)",
                      "Leave your room tidy and clear of personal waste"
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-3 items-center p-3 bg-muted/40 border border-border/50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-primary shrink-0" />
                        <span className="text-xs sm:text-sm text-foreground font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-border/50 text-center">
                <p className="text-xs text-muted-foreground italic">Safe travels on your next journey!</p>
              </div>
            </m.div>
          </div>
        </m.div>
      </section>

      {/* Section 2: House Rules */}
      <section id="rules" className="py-20 md:py-28 bg-linear-to-br from-muted/30 to-background scroll-mt-20">
        <m.div 
          className="container px-4 mx-auto sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <m.div variants={itemVariants} className="mb-16 text-center">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary">
              Homestay Harmony
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Homestay House Rules
            </h2>
            <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Essential agreements to keep the environment comfortable and respectful for everyone.
            </p>
          </m.div>

          <div className="grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
            {/* Prohibited items */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 text-red-650">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Strictly Prohibited</h3>
                </div>
                <div className="space-y-3.5">
                  {[
                    "Smoking inside the homestay premises",
                    "Alcohol drinking inside the rooms/common areas",
                    "Loud noise, shouting, or disturbances",
                    "Swearing / offensive language"
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">
                      <span className="text-red-650 shrink-0 text-base mt-0.5">❌</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 p-3.5 bg-red-500/10 border border-red-500/20 rounded-lg text-xs font-bold text-red-800 text-center uppercase tracking-widest">
                Strictly Enforced
              </div>
            </m.div>

            {/* Cleanliness */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Cleanliness</h3>
                </div>
                <div className="space-y-3.5">
                  {[
                    "Keep shared common areas neat and tidy",
                    "Wash your dishes immediately after meals",
                    "Return items to original places after use",
                    "Clean up after eating or activities"
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">
                      <span className="text-primary shrink-0 text-base mt-0.5">✔</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 p-3.5 bg-primary/10 border border-primary/20 rounded-lg text-xs font-bold text-primary text-center italic tracking-wider">
                “Leave it as clean as you found it”
              </div>
            </m.div>

            {/* Respect */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-500/10 text-sky-650">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Culture &amp; Respect</h3>
                </div>
                <div className="space-y-3.5">
                  {[
                    "Be warm and respectful to other guests",
                    "Observe quiet hours during designated rest times",
                    "Respect Vietnamese traditions & home rules",
                    "Be friendly and polite to neighborhood locals"
                  ].map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-muted-foreground font-semibold leading-relaxed">
                      <span className="text-sky-650 shrink-0 text-base mt-0.5">✔</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 p-3.5 bg-sky-500/10 border border-sky-500/20 rounded-lg text-xs font-bold text-sky-850 text-center uppercase tracking-widest">
                Harmonious Living
              </div>
            </m.div>
          </div>
        </m.div>
      </section>

      {/* Section 3: Wifi & Basics */}
      <section id="wifi-info" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 scroll-mt-20">
        <m.div 
          className="container px-4 mx-auto sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <m.div variants={itemVariants} className="mb-16 text-center">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary">
              Connectivity &amp; Power
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              WiFi &amp; Basic Information
            </h2>
            <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Network and power details to keep your devices connected during your stay.
            </p>
          </m.div>

          <div className="grid max-w-4xl grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
            {/* WiFi Placard */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden bg-gradient-to-br from-primary to-secondary text-primary-foreground rounded-xl border-transparent"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-[150px] pointer-events-none" />
              
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-lime-300 flex items-center gap-1.5">
                  <Wifi className="w-5 h-5 animate-pulse" />
                  Homestay WiFi Placard
                </span>
                <span className="text-[10px] bg-white/20 border border-white/20 rounded-full px-2.5 py-0.5 font-bold uppercase">Dual Band</span>
              </div>

              <div className="my-8 space-y-4">
                <div className="flex items-center justify-between border-b border-white/15 pb-2">
                  <span className="text-xs text-white/70">WiFi Network SSID</span>
                  <span className="text-sm sm:text-base font-black font-mono text-white">Provided In Room</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/15 pb-2">
                  <span className="text-xs text-white/70">WiFi Password</span>
                  <span className="text-sm sm:text-base font-black font-mono text-white">Provided In Room</span>
                </div>
              </div>

              <div className="text-[10px] text-white/60 text-center italic">
                Laminated placard with current SSID &amp; Password is placed directly in your room.
              </div>
            </m.div>

            {/* Power Specs */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="flex items-start gap-4">
                <div className="p-3.5 bg-primary/10 text-primary rounded-xl shrink-0">
                  <Zap className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Electricity &amp; Power</h3>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Standard Outlets</p>
                  <p className="text-muted-foreground text-sm sm:text-base mt-4 leading-relaxed">
                    Electricity in Vietnam is standard <strong>220V</strong> (50Hz). Socket styles accommodate both flat two-pin (Type A) and round two-pin (Type C) plugs. If you carry standard UK three-pin plugs, please bring an adapter.
                  </p>
                </div>
              </div>
            </m.div>
          </div>
        </m.div>
      </section>

      {/* Section 4: Emergency Info */}
      <section id="emergency" className="py-20 md:py-28 bg-linear-to-br from-muted/30 to-background scroll-mt-20">
        <m.div 
          className="container px-4 mx-auto sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <m.div variants={itemVariants} className="mb-16 text-center">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary">
              Safety First
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Emergency Information
            </h2>
            <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Critical hotlines and medical points should you require immediate assistance.
            </p>
          </m.div>

          <div className="grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
            {/* Contact Host Card */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <div className="p-3 bg-red-500/10 text-red-650 rounded-xl w-fit">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Contact Host First</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  For any home repairs, room lockouts, health issues, or general assistance, always call your coordinator/host first for immediate help.
                </p>
              </div>
              <div className="mt-8 text-xs font-bold text-red-700 bg-red-500/10 border border-red-500/20 py-3 text-center rounded-lg">
                Primary Contact Number
              </div>
            </m.div>

            {/* Hospital Card */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <div className="p-3 bg-slate-500/10 text-slate-700 rounded-xl w-fit">
                  <Home className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Nearby Hospital</h3>
                <p className="text-xs sm:text-sm text-foreground font-bold leading-relaxed">
                  Gia Lâm General Hospital
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Located within close driving distance in the Gia Lâm district. Available for general medical issues and emergency cases.
                </p>
              </div>
            </m.div>

            {/* National Hotlines */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-slate-950 text-white rounded-xl"
            >
              <div className="space-y-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block">National Emergency Lines</span>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400 text-xs sm:text-sm">Police</span>
                    <span className="font-extrabold text-base text-rose-450 font-mono">113</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-900 pb-2">
                    <span className="text-slate-400 text-xs sm:text-sm">Fire Department</span>
                    <span className="font-extrabold text-base text-amber-450 font-mono">114</span>
                  </div>
                  <div className="flex items-center justify-between pb-1">
                    <span className="text-slate-400 text-xs sm:text-sm">Ambulance</span>
                    <span className="font-extrabold text-base text-sky-450 font-mono">115</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-[10px] text-slate-450 text-center uppercase tracking-wider font-semibold">
                Vietnam Emergency
              </div>
            </m.div>
          </div>
        </m.div>
      </section>

      {/* Section 5: Work Schedule */}
      <section id="schedule" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 scroll-mt-20">
        <m.div 
          className="container px-4 mx-auto sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Header */}
          <m.div variants={itemVariants} className="mb-16 text-center">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary">
              Volunteer Load
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Working Schedule (Foreign Teacher)
            </h2>
            <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Details of your weekly work load, evening free-talk shifts, and flexible hours.
            </p>
          </m.div>

          <div className="grid max-w-6xl grid-cols-1 lg:grid-cols-3 gap-8 mx-auto">
            {/* Hours card */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-2">
                <span className="text-xs font-extrabold text-primary uppercase tracking-widest flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4" /> Weekly Commitments
                </span>
                <h3 className="font-bold text-slate-900 text-2xl">Speaking Hours</h3>
              </div>
              <div className="my-6">
                <span className="text-6xl font-black text-primary tracking-tight">15–18</span>
                <span className="text-xs font-bold text-slate-450 block mt-2 uppercase tracking-wider">Hours Per Week Total</span>
              </div>
              <p className="text-muted-foreground text-xs leading-relaxed">
                A flexible schedule that leaves mornings and afternoons free for cultural trips, resting, and exploring Hanoi.
              </p>
            </m.div>

            {/* Primary shift */}
            <m.div
              variants={itemVariants}
              className="lg:col-span-2 relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-gradient-to-br from-primary/10 to-secondary/5 rounded-xl border-primary/20"
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-primary/5 rounded-bl-[200px] pointer-events-none" />
              
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20 w-fit">
                  ★ Primary Evening Shift
                </span>
                <h3 className="font-bold text-slate-900 text-xl">Speaking &amp; Free Talk Classes</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
                  Your primary responsibility is to join student free talk practices, encouraging local learners to practice conversational English confidently in real settings.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border/50 pt-6 mt-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Shifts</span>
                  <span className="font-extrabold text-base text-foreground mt-1">Monday – Saturday</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Daily Hours</span>
                  <span className="font-extrabold text-base text-primary font-mono mt-1">7:30 PM – 9:30 PM</span>
                </div>
              </div>
            </m.div>
          </div>

          <m.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-6xl mx-auto">
            {/* Occasional */}
            <div className="md:col-span-2 p-6 md:p-8 bg-card border border-border/50 rounded-xl flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-bold text-foreground text-sm flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary animate-pulse" />
                  Occasional Sessions (Not Regular)
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  In addition to evening blocks, there might be occasional short shifts scheduled.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  {[
                    "Morning or afternoon shifts",
                    "Averages about 1 hour each",
                    "Flexible & not fixed daily"
                  ].map((feat, i) => (
                    <div key={i} className="flex gap-2 items-center text-xs text-muted-foreground font-semibold">
                      <ArrowRight className="w-3.5 h-3.5 text-primary shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Teaching Focus Note */}
            <div className="p-6 md:p-8 bg-primary/10 border border-primary/20 rounded-xl flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-bold text-primary text-xs uppercase tracking-wider">Key Note</h4>
                <p className="text-xs text-primary leading-relaxed font-semibold">
                  This volunteer role is flexible but evening-focused. Your main objective is helping students build real talking confidence in natural conversations.
                </p>
              </div>
            </div>
          </m.div>
        </m.div>
      </section>


      {/* Quick Summary Banner */}
      <section className="pb-20 md:pb-28 bg-linear-to-br from-muted/30 to-background">
        <m.div 
          className="container px-4 mx-auto sm:px-6 lg:px-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >

          {/* Quick Summary Banner */}
          <m.div variants={itemVariants} className="mt-16 max-w-4xl mx-auto">
            <div className="p-6 md:p-8 rounded-xl bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-bl-[200px] pointer-events-none" />
              <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-lime-300 mb-6">Quick Overview Summary</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold">
                {[
                  { label: "Arrival / Drop", val: "Flexible & Luggage Free" },
                  { label: "Checking Out", val: "Flexible & Room Cleaned" },
                  { label: "Strict Rules", val: "No Smoking or Alcohol" },
                  { label: "Local Transport", val: "Bus Station Close By" }
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-lg flex flex-col justify-between min-h-[90px]">
                    <span className="text-[10px] text-white/55 font-bold uppercase tracking-wider">{item.label}</span>
                    <span className="font-extrabold text-lime-350 mt-2 leading-tight">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          </m.div>

        </m.div>
      </section>

      <Footer />

    </div>
  );
}
