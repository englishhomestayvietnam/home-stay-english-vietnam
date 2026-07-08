"use client";

import { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard,
  Home as HomeIcon,
  Info,
  Heart,
  Image as ImageIcon,
  Handshake,
  Mail,
  Sparkles,
  BookOpen,
  Map,
  Video,
  MessageSquare,
  Compass,
  Smile,
  Backpack,
  ChevronDown,
  Clock,
  ShieldAlert,
  Wifi,
  Phone,
  HelpCircle,
  Calendar,
  MapPin,
  DollarSign,
  Utensils
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface SubItem {
  label: string;
  id: string;
  href: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface MenuItem {
  label: string;
  path: string;
  subItems: SubItem[];
}

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
  
  // Mobile accordion state (which menu is expanded)
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

  // Sync banner state and custom event
  useEffect(() => {
    const isDismissed = sessionStorage.getItem("promo-banner-dismissed");
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsBannerVisible(true);
      }
    }, 0);
    const handleBannerDismiss = () => {
      setIsBannerVisible(false);
    };
    window.addEventListener("promo-banner-dismissed", handleBannerDismiss);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("promo-banner-dismissed", handleBannerDismiss);
    };
  }, []);

  // Simple scroll detection + active section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);

      const sections = [
        "home", "about", "benefits", "gallery", "partnership", "contact", // Home sections
        "overview", "check-in-out", "rules", "wifi-info", "emergency", "schedule", "faq", // Welcome Book sections
        "getting-here", "sim-internet", "money-payments", "local-transport-tips", "local-food-guide" // Guide sections
      ];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Adjust offset to trigger active state correctly
          return rect.top <= 160 && rect.bottom >= 160;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper for hash changes on load / history changes
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    handleHashScroll();
    window.addEventListener("hashchange", handleHashScroll);
    return () => window.removeEventListener("hashchange", handleHashScroll);
  }, [pathname]);

  const handleItemClick = (href: string, id: string) => {
    setIsMobileMenuOpen(false);
    setHoveredMenu(null);

    const [targetPath, targetHash] = href.split("#");
    
    if (pathname === targetPath) {
      // Same page navigation: scroll smoothly
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      } else {
        // Fallback to top if element not found
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      // Different page: push to router
      router.push(href);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  const menuItems: MenuItem[] = [
    {
      label: "Home",
      path: "/",
      subItems: [
        {
          label: "Overview",
          id: "home",
          href: "/#home",
          description: "Introduction and volunteer call.",
          icon: HomeIcon,
        },
        {
          label: "About Us",
          id: "about",
          href: "/#about",
          description: "Our story, mission, and vision.",
          icon: Info,
        },
        {
          label: "Benefits",
          id: "benefits",
          href: "/#benefits",
          description: "Free housing, meals, and local perks.",
          icon: Heart,
        },
        {
          label: "Gallery",
          id: "gallery",
          href: "/#gallery",
          description: "Visual moments of host family life.",
          icon: ImageIcon,
        },
        {
          label: "Partnership",
          id: "partnership",
          href: "/#partnership",
          description: "How we work with schools and communities.",
          icon: Handshake,
        },
        {
          label: "Contact Us",
          id: "contact",
          href: "/#contact",
          description: "Reach out for questions and support.",
          icon: Mail,
        },
      ],
    },
    {
      label: "Welcome",
      path: "/welcome",
      subItems: [
        {
          label: "Welcome Hub",
          id: "overview",
          href: "/welcome#overview",
          description: "Homestay details and address.",
          icon: Sparkles,
        },
        {
          label: "Check-In / Out",
          id: "check-in-out",
          href: "/welcome#check-in-out",
          description: "Self check-in and departure steps.",
          icon: Clock,
        },
        {
          label: "House Rules",
          id: "rules",
          href: "/welcome#rules",
          description: "Smoking, cleanliness, and respect.",
          icon: ShieldAlert,
        },
        {
          label: "WiFi & Info",
          id: "wifi-info",
          href: "/welcome#wifi-info",
          description: "Internet credentials and voltage.",
          icon: Wifi,
        },
        {
          label: "Emergency Contacts",
          id: "emergency",
          href: "/welcome#emergency",
          description: "Hotlines and local hospital info.",
          icon: Phone,
        },
        {
          label: "Work Schedule",
          id: "schedule",
          href: "/welcome#schedule",
          description: "Evening talk hours & weekly stats.",
          icon: Calendar,
        },
        {
          label: "FAQs",
          id: "faq",
          href: "/welcome#faq",
          description: "Helpful Q&A for volunteers.",
          icon: HelpCircle,
        },
      ],
    },
    {
      label: "Homestay Guides",
      path: "/homestay-guides",
      subItems: [
        {
          label: "Getting Here",
          id: "getting-here",
          href: "/homestay-guides#getting-here",
          description: "Airport bus & Grab directions.",
          icon: MapPin,
        },
        {
          label: "SIM & Internet",
          id: "sim-internet",
          href: "/homestay-guides#sim-internet",
          description: "eSIM, physical SIM, and carriers.",
          icon: Wifi,
        },
        {
          label: "Money & Payment",
          id: "money-payments",
          href: "/homestay-guides#money-payments",
          description: "Cash exchanges, ATMs, and cards.",
          icon: DollarSign,
        },
        {
          label: "Transport & Tips",
          id: "local-transport-tips",
          href: "/homestay-guides#local-transport-tips",
          description: "Hanoi traffic, weather, and apps.",
          icon: Compass,
        },
        {
          label: "Local Food Guide",
          id: "local-food-guide",
          href: "/homestay-guides#local-food-guide",
          description: "Budget meals & daily strategies.",
          icon: Utensils,
        },
      ],
    },
  ];

  const isSuperUser = user?.role === "superUser" || user?.role === "superAdmin" || user?.role === "admin";

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md py-3"
            : "bg-transparent py-5"
        }`}
        style={{ top: isBannerVisible && !isScrolled ? "44px" : "0px" }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">

            {/* Logo + One-Line Brand Name */}
            <button
              onClick={() => handleItemClick("/#home", "home")}
              className="flex items-center gap-3 hover:scale-105 transition-transform"
            >
              <Image
                src="/logo.svg"
                alt="English Homestay Vietnam"
                width={48}
                height={48}
                className={`drop-shadow-md transition-all duration-300 ${
                  isScrolled ? "h-10 w-10" : "h-12 w-12"
                }`}
              />
              <span
                className={`font-black tracking-tight transition-colors duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white"
                } text-base sm:text-lg md:text-xl`}
              >
                English Homestay Vietnam
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              {menuItems.map((menu) => {
                const isActiveMainPage = pathname === menu.path;
                return (
                  <div
                    key={menu.label}
                    className="relative py-2"
                    onMouseEnter={() => setHoveredMenu(menu.label)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <button
                      className={`relative flex items-center gap-1.5 px-4 py-2 text-sm font-semibold transition-colors ${
                        isScrolled
                          ? "text-gray-700 hover:text-emerald-600"
                          : "text-white/90 hover:text-white"
                      }`}
                    >
                      {menu.label}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        hoveredMenu === menu.label ? "rotate-180 text-emerald-500" : ""
                      }`} />
                      {isActiveMainPage && (
                        <motion.div
                          layoutId="active-underline"
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-emerald-400 to-lime-400 rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>

                    {/* Desktop Hover Dropdown Menu */}
                    <AnimatePresence>
                      {hoveredMenu === menu.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 15 }}
                          transition={{ duration: 0.2 }}
                          className={`absolute mt-2 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100/50 p-4 z-50 flex flex-col gap-1.5 ${
                            menu.label === "Homestay Guides" ? "right-0" : "left-0"
                          }`}
                        >
                          <div className="text-[10px] font-bold text-gray-400 tracking-wider uppercase px-3 pb-2 border-b border-gray-100">
                            {menu.label} Pages
                          </div>
                          {menu.subItems.map((sub) => {
                            const Icon = sub.icon;
                            const isSectionActive = activeSection === sub.id && isActiveMainPage;
                            return (
                              <button
                                key={sub.id}
                                onClick={() => handleItemClick(sub.href, sub.id)}
                                className={`flex items-start gap-3 p-2.5 rounded-xl text-left transition-all group hover:bg-slate-50 ${
                                  isSectionActive ? "bg-emerald-50/50" : ""
                                }`}
                              >
                                <div className={`p-2 rounded-lg transition-colors shrink-0 ${
                                  isSectionActive 
                                    ? "bg-emerald-500 text-white" 
                                    : "bg-gray-100 text-gray-500 group-hover:bg-emerald-100 group-hover:text-emerald-600"
                                }`}>
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex flex-col">
                                  <span className={`text-sm font-bold transition-colors ${
                                    isSectionActive 
                                      ? "text-emerald-700" 
                                      : "text-gray-800 group-hover:text-emerald-600"
                                  }`}>
                                    {sub.label}
                                  </span>
                                  <span className="text-xs text-gray-400 font-medium leading-tight mt-0.5">
                                    {sub.description}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {!user ? (
                <Button 
                  asChild 
                  className="ml-6 rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white font-bold shadow-lg transition-transform transform hover:scale-105"
                >
                  <Link href="/sign-in">
                    Sign In
                  </Link>
                </Button>
              ) : (
                <div className="ml-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-10 w-10 cursor-pointer border-2 border-white/20 hover:border-emerald-500 transition-colors">
                        <AvatarImage src={user.image || ""} alt={user.name || "User"} />
                        <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                          {user.name?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-2">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      
                      {isSuperUser && (
                        <>
                          <DropdownMenuItem asChild>
                            <Link href="/admin" className="cursor-pointer w-full">
                              <LayoutDashboard className="mr-2 h-4 w-4" />
                              Dashboard
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}

                      <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={handleSignOut}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-gray-800" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%", transition: { duration: 0.3, ease: "easeInOut" } }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 right-0 bg-white shadow-2xl z-50 overflow-y-auto max-h-[95vh] rounded-b-3xl"
              style={{ paddingTop: "max(env(safe-area-inset-top), 1rem)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b">
                <div className="flex items-center gap-3">
                  <Image src="/logo.svg" alt="Logo" width={40} height={40} className="h-10 w-10" />
                  <span className="font-black text-lg text-gray-900">
                    English Homestay Vietnam
                  </span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X size={28} className="text-gray-700" />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 py-8 space-y-4">
                 {/* Mobile User Profile */}
                 {user && (
                  <div className="mb-4 p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-4">
                    <Avatar className="h-12 w-12 border border-white shadow-sm">
                      <AvatarImage src={user.image || ""} />
                      <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                         {user.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                  </div>
                )}

                {/* Collapsible Accordions for Menus */}
                <div className="space-y-2">
                  {menuItems.map((menu) => {
                    const isExpanded = expandedMobileMenu === menu.label;
                    const isActiveMainPage = pathname === menu.path;
                    return (
                      <div key={menu.label} className="border border-slate-100 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setExpandedMobileMenu(isExpanded ? null : menu.label)}
                          className={`flex items-center justify-between w-full px-5 py-4 text-base font-bold transition-colors text-left ${
                            isActiveMainPage ? "text-emerald-600 bg-emerald-50/20" : "text-gray-800"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            {menu.label}
                            {isActiveMainPage && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                          </span>
                          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                            isExpanded ? "rotate-180 text-emerald-500" : ""
                          }`} />
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="overflow-hidden bg-slate-50/50 border-t border-slate-100"
                            >
                              <div className="p-3 flex flex-col gap-1.5">
                                {menu.subItems.map((sub) => {
                                  const Icon = sub.icon;
                                  const isSectionActive = activeSection === sub.id && isActiveMainPage;
                                  return (
                                    <button
                                      key={sub.id}
                                      onClick={() => handleItemClick(sub.href, sub.id)}
                                      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors ${
                                        isSectionActive
                                          ? "bg-emerald-500 text-white font-bold"
                                          : "text-gray-700 hover:bg-gray-100"
                                      }`}
                                    >
                                      <Icon className={`w-4 h-4 ${isSectionActive ? "text-white" : "text-gray-500"}`} />
                                      <span className="text-sm font-semibold">{sub.label}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Sign In / Sign Out CTAs */}
                <div className="pt-6 space-y-4">
                  {!user ? (
                    <Link
                      href="/sign-in"
                      className="block w-full text-center py-4 text-lg font-bold text-white rounded-xl shadow-lg bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
                    >
                      Sign In
                    </Link>
                  ) : (
                    <>
                      {isSuperUser && (
                        <Link
                          href="/admin"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center justify-center gap-2 w-full text-center py-3.5 text-base font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors"
                        >
                          <LayoutDashboard className="h-5 w-5" />
                          Dashboard
                        </Link>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        className="w-full justify-center text-red-600 hover:text-red-700 hover:bg-red-50 text-base py-6 border border-red-100 rounded-xl"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        Sign Out
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;