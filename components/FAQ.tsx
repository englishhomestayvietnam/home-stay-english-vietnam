"use client";

import React, { useState } from "react";
import { m, AnimatePresence, Variants } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqCategories = [
    {
      category: "1. About the Program",
      faqs: [
        { q: "What is English Homestay Vietnam?", quick: "Community", details: "English Homestay Vietnam is a language and cultural exchange community where international volunteers help Vietnamese learners improve their English." },
        { q: "How does the program work?", quick: "Live & Teach", details: "You live with our community, teach conversational English, and join daily activities with local students." },
        { q: "Why is accommodation free?", quick: "Exchange", details: "Accommodation is provided in exchange for your volunteer contribution." },
        { q: "Is this a volunteer program?", quick: "Yes", details: "This is a cultural exchange and volunteer program." },
        { q: "Who can apply?", quick: "Anyone", details: "Anyone who enjoys cultural exchange, teaching, and meeting new people." }
      ]
    },
    {
      category: "2. Eligibility",
      faqs: [
        { q: "Do I need teaching experience?", quick: "No", details: "A friendly attitude and willingness to help are more important." },
        { q: "Do I need a TESOL certificate?", quick: "No", details: "No, but it is a plus." },
        { q: "Do I have to be a native English speaker?", quick: "No", details: "-" },
        { q: "Can non-native English speakers apply?", quick: "Yes", details: "You should have at least an intermediate level of spoken English." },
        { q: "Is there an age limit?", quick: "18+", details: "Applicants should be at least 18 years old." },
        { q: "Can retired people join?", quick: "Yes", details: "Everyone is welcome." },
        { q: "Can university students apply?", quick: "Yes", details: "Absolutely." }
      ]
    },
    {
      category: "3. Teaching",
      faqs: [
        { q: "What will I teach?", quick: "English", details: "Conversational English and speaking practice." },
        { q: "How many hours do I teach each week?", quick: "15–18 hrs", details: "Around 15–18 hours per week." },
        { q: "Will I teach alone?", quick: "No", details: "Usually not. Our local team will support you." },
        { q: "Are lesson materials provided?", quick: "Yes", details: "-" },
        { q: "What are the class sizes?", quick: "4–8", details: "Usually 4–8 students." },
        { q: "What English level are the students?", quick: "Beginner+", details: "Mostly beginner to intermediate." }
      ]
    },
    {
      category: "4. Accommodation",
      faqs: [
        { q: "What type of accommodation is provided?", quick: "Shared", details: "Shared accommodation in our English Homestay." },
        { q: "Will I have my own room?", quick: "No", details: "Usually shared rooms." },
        { q: "Is Wi-Fi included?", quick: "Yes", details: "-" },
        { q: "Is air conditioning available?", quick: "Yes", details: "-" },
        { q: "Are laundry facilities available?", quick: "Yes", details: "-" },
        { q: "Is there a kitchen?", quick: "Yes", details: "A shared kitchen is available." },
        { q: "Can I invite friends over?", quick: "Yes", details: "Yes, with prior permission." }
      ]
    },
    {
      category: "5. Food & Daily Life",
      faqs: [
        { q: "Are meals included?", quick: "No", details: "Volunteers prepare or buy their own meals." },
        { q: "Is vegetarian food available?", quick: "Yes", details: "-" },
        { q: "Is vegan food available?", quick: "Yes", details: "-" },
        { q: "What is daily life like?", quick: "Mixed", details: "A mix of teaching, cultural exchange, and free time." },
        { q: "What do volunteers do during free time?", quick: "Free", details: "Explore Hanoi, travel, socialize, or relax." }
      ]
    },
    {
      category: "6. Cost",
      faqs: [
        { q: "Is the program really free?", quick: "Yes", details: "Accommodation is free." },
        { q: "Are there any hidden fees?", quick: "No", details: "-" },
        { q: "How much money should I bring?", quick: "150–300 USD", details: "Around USD 150–300 per month, depending on your lifestyle." }
      ]
    },
    {
      category: "7. Safety",
      faqs: [
        { q: "Is Hanoi safe?", quick: "Yes", details: "Hanoi is generally safe for travelers." },
        { q: "What if I get sick?", quick: "Support", details: "We will help you access nearby medical services." }
      ]
    },
    {
      category: "8. Application",
      faqs: [
        { q: "How do I apply?", quick: "Form / WA", details: "Complete our application form. For faster processing, contact us on WhatsApp." },
        { q: "How long does the application process take?", quick: "2–7 days", details: "Usually 2–7 days. For faster processing, contact us on WhatsApp." },
        { q: "When should I apply?", quick: "Anytime", details: "-" },
        { q: "What is the minimum stay?", quick: "1 week", details: "-" },
        { q: "Can I extend my stay?", quick: "Yes", details: "Subject to availability." },
        { q: "Can couples apply together?", quick: "Yes", details: "-" },
        { q: "Can friends apply together?", quick: "Yes", details: "-" }
      ]
    },
    {
      category: "9. Community",
      faqs: [
        { q: "Will I meet other international volunteers?", quick: "Yes", details: "-" },
        { q: "Are there weekend activities?", quick: "Yes", details: "We regularly organize community activities." },
        { q: "Can I travel around Vietnam during my stay?", quick: "Yes", details: "Yes, during your free time." }
      ]
    },
    {
      category: "10. After the Program",
      faqs: [
        { q: "Will I receive a certificate?", quick: "Yes", details: "Yes, after successfully completing the program." },
        { q: "Can I return as a volunteer again?", quick: "Yes", details: "Absolutely. We'd love to welcome you back." }
      ]
    },
    {
      category: "11. General Homestay",
      faqs: [
        { q: "Can I pay by card to the shops or stores?", quick: "No", details: "Mostly NO. Cash (Vietnamese Dong - VND) is highly preferred in local shops, street food vendors, and markets in Vietnam. It is best to keep some cash on you at all times." },
        { q: "Can I cook in the homestay?", quick: "Yes", details: "You are welcome to use the shared kitchen to prepare your meals. Just make sure to wash your dishes immediately and clean up after yourself." },
        { q: "Is laundry available in the homestay?", quick: "Yes", details: "Washing machines are available on the rooftop for your convenience. Please ask the hosts first so they can show you how to operate the machines properly." },
        { q: "Can I check in early?", quick: "Yes", details: "Early check-in is possible if your room is clean and ready. If not, you are welcome to drop off your luggage and hang out in the common living area." },
        { q: "How far is the bus station?", quick: "Close", details: "The bus station is very close to the homestay, within short walking distance or a quick motor ride, making it easy to catch buses into central Hanoi." },
        { q: "Is it safe?", quick: "Yes", details: "Trâu Quỳ is a peaceful university town and the area is generally very safe. However, please secure your personal belongings and lock your doors when leaving." }
      ]
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-linear-to-br from-muted/30 to-background scroll-mt-20">
      <m.div 
        className="container px-4 mx-auto sm:px-6 lg:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <m.div variants={itemVariants} className="mb-16 text-center">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary">
            Volunteer Q&amp;A
          </span>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Answers to common concerns and daily life queries from our volunteers.
          </p>
        </m.div>

        <m.div variants={itemVariants} className="space-y-4 max-w-5xl mx-auto">
          {faqCategories.map((category, catIndex) => {
            const isOpen = openFaq === catIndex.toString();
            return (
              <div key={catIndex} className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => setOpenFaq(isOpen ? null : catIndex.toString())}
                  className="w-full flex items-center justify-between p-5 hover:bg-muted/40 transition-colors"
                >
                  <h3 className="font-black text-foreground text-lg border-l-4 border-l-primary pl-3 text-left">
                    {category.category}
                  </h3>
                  <div className="shrink-0 p-1.5 rounded-full bg-muted/50 text-muted-foreground ml-4">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <m.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="overflow-x-auto border-t border-border/50">
                        <table className="w-full text-left text-sm sm:text-base border-collapse">
                          <thead>
                            <tr className="bg-primary/5 text-primary border-b border-border/50">
                              <th className="p-4 font-bold w-2/5 min-w-[200px]">Question</th>
                              <th className="p-4 font-bold w-1/5 min-w-[120px] text-center">Status</th>
                              <th className="p-4 font-bold w-2/5 min-w-[250px]">Details & Reason</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-border/50">
                            {category.faqs.map((faq, faqIndex) => {
                              let badgeClass = "bg-muted text-muted-foreground border-border/50";
                              if (faq.quick === "Yes") badgeClass = "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
                              else if (faq.quick === "No") badgeClass = "bg-rose-500/10 text-rose-600 border-rose-500/20";
                              else badgeClass = "bg-primary/10 text-primary border-primary/20";

                              return (
                                <tr key={faqIndex} className="hover:bg-muted/20 transition-colors group">
                                  <td className="p-4 font-semibold text-foreground align-top border-r border-border/20 group-hover:text-primary transition-colors">
                                    {faq.q}
                                  </td>
                                  <td className="p-4 align-top border-r border-border/20 text-center">
                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold border ${badgeClass} shadow-sm whitespace-nowrap`}>
                                      {faq.quick}
                                    </span>
                                  </td>
                                  <td className="p-4 text-muted-foreground align-top leading-relaxed text-sm">
                                    {faq.details}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </m.div>
      </m.div>
    </section>
  );
}
