"use client";

import { useState } from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function FloatingActionButtons() {
  const [isOpen, setIsOpen] = useState(false);

  const phoneNumber = "+84968199900"; // Based on site layout
  const whatsappNumber = "84968199900";
  const whatsappMessage = encodeURIComponent(
    "Hi Harry! I found your website and I’m interested in your English Homestay. Could you tell me more?"
  );

  const actions = [
    {
      id: "whatsapp",
      label: "Chat on WhatsApp",
      icon: <MessageCircle className="w-5 h-5" />,
      href: `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
      color: "bg-[#25D366] hover:bg-[#128C7E]", // Official WhatsApp colors
      target: "_blank",
      rel: "noopener noreferrer",
    },
    {
      id: "call",
      label: "Call Now",
      icon: <Phone className="w-5 h-5" />,
      href: `tel:${phoneNumber}`,
      color: "bg-orange-500 hover:bg-orange-600",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-end space-y-3 mb-4"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-3 group"
              >
                <span className="bg-white/95 backdrop-blur-sm text-gray-800 text-sm font-semibold py-1.5 px-3.5 rounded-full shadow-lg border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {action.label}
                </span>
                {action.target ? (
                  <a
                    href={action.href}
                    target={action.target}
                    rel={action.rel}
                    className={`p-3.5 rounded-full text-white shadow-lg transition-transform duration-200 hover:scale-110 ${action.color}`}
                    aria-label={action.label}
                  >
                    {action.icon}
                  </a>
                ) : (
                  <Link
                    href={action.href}
                    className={`p-3.5 rounded-full text-white shadow-lg transition-transform duration-200 hover:scale-110 ${action.color}`}
                    aria-label={action.label}
                  >
                    {action.icon}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-4 rounded-full text-white shadow-2xl transition-all duration-300 hover:scale-105 ${
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
        }`}
        aria-label="Contact options"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.div>
      </button>
    </div>
  );
}
