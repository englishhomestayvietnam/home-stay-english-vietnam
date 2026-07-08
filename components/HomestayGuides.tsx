"use client";

import { m, Variants } from "framer-motion";
import { 
  Compass, 
  Map, 
  Check, 
  Smartphone, 
  DollarSign, 
  Utensils, 
  Clock, 
  Sparkles, 
  MapPin, 
  CreditCard, 
  Wallet, 
  ArrowRight, 
  AlertTriangle, 
  Wifi, 
  Zap,
  Home
} from "lucide-react";

export default function HomestayGuides() {
  // Framer motion variants to match homepage/welcome sections
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
    <div className="w-full bg-background">
      
      {/* Section 1: Getting Here */}
      <section id="getting-here" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 scroll-mt-20">
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
              Arrival Guide
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Getting to the Homestay
            </h2>
            <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Detailed transit and budget options from Nội Bài Airport to our homestay.
            </p>
          </m.div>

          <div className="grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
            {/* Option 1: Bus */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary transition-all duration-300">
                    <Compass className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Option 1: Public Bus</h3>
                    <p className="text-xs text-primary font-bold uppercase tracking-wider">Cheapest &amp; Recommended ⭐</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    The best choice for budget travelers. Safe, highly reliable, and very simple.
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="flex gap-3 items-start">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <strong className="text-foreground block">Route Details</strong>
                        Airport (Nội Bài) → city bus system → Transfer to local bus near homestay. The local bus station is within walking distance. Use Google Maps to verify live transfer routes.
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <strong className="text-foreground block">Total Trip Cost</strong>
                        <span className="font-bold text-primary">Usually $1.00 – $2.00 USD total max</span> (Airport bus: $0.50–$2.00, local bus: $0.30–$0.60 per ride).
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <strong className="text-foreground block">Travel Time</strong>
                        60 – 90 minutes.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>

            {/* Option 2: Grab / Ride Hailing */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary transition-all duration-300">
                    <Smartphone className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Option 2: Ride Hailing Apps</h3>
                    <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Fast &amp; Direct</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Best for late-night arrivals, heavy luggage, or groups of volunteers who want to split the fare.
                  </p>
                  <div className="space-y-3 pt-2">
                    <div className="flex gap-3 items-start">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <strong className="text-foreground block">Mobile Apps</strong>
                        Grab, Be, or Xanh SM (reliable electric taxis).
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <strong className="text-foreground block">Total Trip Cost</strong>
                        <span className="font-bold text-primary">$10.00 – $15.00 USD</span> (directly from airport to homestay coordinates).
                      </div>
                    </div>
                    <div className="flex gap-3 items-start">
                      <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm text-muted-foreground">
                        <strong className="text-foreground block">Travel Time</strong>
                        40 – 60 minutes.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </m.div>
          </div>

          {/* Quick Tip Banner */}
          <m.div variants={itemVariants} className="mt-12 p-5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-4 items-start max-w-4xl mx-auto">
            <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-amber-900 text-sm">Quick Travel Tips</h5>
              <p className="text-amber-800 text-xs mt-1 leading-relaxed">
                • <strong>Budget Route</strong>: Take the BUS ($1–2 total) • <strong>Comfort Route</strong>: Use Grab ($10–15) • <strong>Notice</strong>: Avoid standard street taxis outside the terminal, as they are often much more expensive.
              </p>
            </div>
          </m.div>
        </m.div>
      </section>

      {/* Section 2: SIM & Internet */}
      <section id="sim-internet" className="py-20 md:py-28 bg-linear-to-br from-muted/30 to-background scroll-mt-20">
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
              Connectivity
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              SIM Cards &amp; Mobile Internet
            </h2>
            <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              How to secure mobile internet and stay connected on arrival.
            </p>
          </m.div>

          <div className="grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
            {/* Purchase Points */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">Where to Buy</h3>
                </div>
                <ul className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>Airport arrival hall (fast &amp; convenient)</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>Convenience stores (Circle K, WinMart)</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>eSIM online (recommended before flight)</span>
                  </li>
                </ul>
              </div>
            </m.div>

            {/* Network Providers */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">Best Networks</h3>
                </div>
                <ul className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>🟢 <strong>Viettel</strong> (best coverage - recommended)</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>🟡 <strong>Vinaphone</strong> (very stable data speeds)</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>🔵 <strong>Mobifone</strong> (good within urban areas)</span>
                  </li>
                </ul>
              </div>
            </m.div>

            {/* Estimated Costs */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <DollarSign className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">Estimated Cost</h3>
                </div>
                <ul className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>Physical SIM: <strong>$4 – $12 USD</strong></span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>eSIM (Online): <strong>$5 – $15 USD</strong></span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0" />
                    <span>Data plans: Large/unlimited packages</span>
                  </li>
                </ul>
              </div>
            </m.div>
          </div>

          <m.div variants={itemVariants} className="mt-12 p-5 rounded-xl bg-primary/10 border border-primary/20 flex gap-4 items-start max-w-4xl mx-auto">
            <Sparkles className="w-6 h-6 text-primary shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-primary text-sm">Best Recommendation</h5>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">
                Buy and install an <strong>eSIM online</strong> prior to your arrival for instant data on landing. If your phone does not support eSIM, buy a physical Viettel SIM at the airport arrival hall.
              </p>
            </div>
          </m.div>
        </m.div>
      </section>

      {/* Section 3: Money & Payments */}
      <section id="money-payments" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 scroll-mt-20">
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
              Finance &amp; Cards
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Money &amp; Payments
            </h2>
            <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Managing currency exchange, local payments, and cash in Vietnam.
            </p>
          </m.div>

          <div className="grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
            {/* Local Currency */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">Local Currency</h3>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Vietnam uses the <strong>Vietnamese Dong (VND)</strong>. Paper and polymer banknotes are color-coded. Note denominations go from 1,000 to 500,000 VND.
                </p>
              </div>
            </m.div>

            {/* Money Exchange */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <Home className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">Exchanges</h3>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  • <strong>Airport</strong>: Convenient but slightly higher rates.<br />
                  • <strong>City Banks (Best rates)</strong>: Vietcombank, BIDV, or Techcombank.
                </p>
              </div>
            </m.div>

            {/* ATM withdrawal */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg">ATMs</h3>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  ATMs are widely accessible in Hanoi. TPBank, VPBank, and MB Bank accept international debit cards with low transaction fees ($1–2 USD).
                </p>
              </div>
            </m.div>
          </div>

          <m.div variants={itemVariants} className="mt-12 p-5 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-4 items-start max-w-4xl mx-auto">
            <AlertTriangle className="w-6 h-6 text-red-650 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-red-900 text-sm">Important: Small Shops are Cash Only</h5>
              <p className="text-red-800 text-xs mt-1 leading-relaxed">
                Vietnam is heavily cash-based. Small local shops, street food stalls, and public buses **only accept cash**. Always keep small change bills on you. Cards are accepted in malls and large hotels.
              </p>
            </div>
          </m.div>
        </m.div>
      </section>

      {/* Section 4: Local Transport & Tips */}
      <section id="local-transport-tips" className="py-20 md:py-28 bg-linear-to-br from-muted/30 to-background scroll-mt-20">
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
              Getting Around
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Local Transport &amp; Practical Tips
            </h2>
            <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Hanoi traffic rules, local ride apps, weather tips, and safety guide.
            </p>
          </m.div>

          <div className="grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
            {/* Transport Options */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-base">🛵 Local Transport Options</h4>
                <ul className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span><strong>Grab / Be / Xanh SM</strong>: Convenient app-based booking for cars and motorbike taxis. Local rides usually cost between $2 to $10 USD.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-primary shrink-0 mt-1" />
                    <span><strong>Public Bus</strong>: Extremely cheap ($0.30–$0.60 USD per ticket). Bus stations are very close to the homestay, safe, and heavily used by university students.</span>
                  </li>
                </ul>
              </div>
            </m.div>

            {/* Local Tips */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-base">🚦 Hanoi Living Tips</h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                  <li className="flex gap-2 items-center">
                    <span>🏍 <strong>Traffic</strong>: Busy motorbikes. Walk slowly, look both sides.</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <span>🌤 <strong>Weather</strong>: Hot &amp; humid. Raincoat recommended in wet months.</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <span>📱 <strong>Apps</strong>: Google Maps, Grab, and Google Translate.</span>
                  </li>
                  <li className="flex gap-2 items-center">
                    <span>🛡 <strong>Safety</strong>: Keep phones &amp; wallets secure. Hanoi is very safe.</span>
                  </li>
                </ul>
              </div>
            </m.div>
          </div>
        </m.div>
      </section>

      {/* Section 5: Local Food Guide */}
      <section id="local-food-guide" className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/30 scroll-mt-20">
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
              Budget Eating
            </span>
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
              Local Food &amp; Budget Guide
            </h2>
            <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
              Area: Trâu Quỳ – Gia Lâm – Hanoi. Eat like locals to save money and enjoy authentic dishes.
            </p>
          </m.div>

          <div className="grid max-w-6xl grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
            {/* Breakfast */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <h4 className="font-bold text-primary text-base">🌅 Breakfast (7:00 – 10:30)</h4>
                <ul className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                  <li>
                    <strong>🥖 Bánh Mì</strong> ($0.60 – $1.00)<br />
                    Bread + meat/egg + vegetables. Fast, cheap, and easy!
                  </li>
                  <li>
                    <strong>🍚 Xôi (Sticky Rice)</strong> ($0.80 – $1.20)<br />
                    Sticky rice + egg/pork/chicken. Very filling.
                  </li>
                  <li>
                    <strong>🍲 Phở / Bún</strong> ($1.50 – $2.50)<br />
                    Light beef or chicken rice noodle soup.
                  </li>
                </ul>
              </div>
            </m.div>

            {/* Lunch */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <h4 className="font-bold text-primary text-base">🌞 Lunch (11:00 – 14:00)</h4>
                <ul className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                  <li>
                    <strong>🍛 Cơm Bình Dân / Buffet Rice</strong> ($1.50 – $2.00)<br />
                    Rice + meat + vegetables + soup. <span className="text-primary font-bold">Cheapest full meal! ⭐</span>
                  </li>
                  <li>
                    <strong>🍲 Phở / Bún</strong> ($1.50 – $2.50)<br />
                    Rice noodle soup in standard lunch portions.
                  </li>
                  <li>
                    <strong>🥩 Bún Chả</strong> ($2.00 – $2.50)<br />
                    Grilled pork with rice noodles and local herbs.
                  </li>
                </ul>
              </div>
            </m.div>

            {/* Dinner */}
            <m.div
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-6 sm:p-8 overflow-hidden border bg-card/85 backdrop-blur-xs rounded-xl border-border/50"
            >
              <div className="space-y-4">
                <h4 className="font-bold text-primary text-base">🌙 Dinner (17:00 – 22:00)</h4>
                <ul className="space-y-3.5 text-xs sm:text-sm text-muted-foreground">
                  <li>
                    <strong>🍛 Buffet Rice (Cơm Bình Dân)</strong> ($1.50 – $2.00)<br />
                    Best budget dinner selection.
                  </li>
                  <li>
                    <strong>🍲 Noodle Dishes</strong> ($1.50 – $2.50)<br />
                    Phở, bún, or bún chả.
                  </li>
                  <li>
                    <strong>🍢 Street Snacks</strong> ($1.00 – $3.00)<br />
                    Skewers, local pancakes, and traditional drinks.
                  </li>
                </ul>
              </div>
            </m.div>
          </div>

          {/* Budget Strategy Cards */}
          <m.div variants={itemVariants} className="mt-12 p-6 rounded-xl bg-primary/10 border border-primary/20 max-w-5xl mx-auto">
            <h4 className="font-bold text-gray-900 text-sm mb-4 uppercase tracking-widest text-primary">💡 Daily Budget Strategies</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 bg-white/70 border border-border/50 rounded-xl">
                <span className="font-bold text-slate-500 block uppercase">Super Budget Plan</span>
                <span className="text-lg font-black text-primary mt-1 block">$2 – $3 USD / day</span>
                <p className="text-muted-foreground mt-1.5 leading-relaxed">Combine breakfast &amp; lunch into one brunch (bánh mì/xôi) and eat Cơm Bình Dân for dinner.</p>
              </div>
              <div className="p-4 bg-white/70 border border-border/50 rounded-xl">
                <span className="font-bold text-slate-500 block uppercase">Standard Budget Plan</span>
                <span className="text-lg font-black text-primary mt-1 block">$4 – $6 USD / day</span>
                <p className="text-muted-foreground mt-1.5 leading-relaxed">Eat breakfast (bánh mì/xôi), lunch (cơm bình dân), and dinner (phở/bún) standard meals daily.</p>
              </div>
              <div className="p-4 bg-white/70 border border-border/50 rounded-xl">
                <span className="font-bold text-slate-500 block uppercase">Comfort Budget Plan</span>
                <span className="text-lg font-black text-primary mt-1 block">$6 – $10 USD / day</span>
                <p className="text-muted-foreground mt-1.5 leading-relaxed">Eat standard meals, buy coffee, and try street food snacks freely throughout the day.</p>
              </div>
            </div>
          </m.div>
        </m.div>
      </section>

    </div>
  );
}
