'use client';

import React from "react";
import { Languages, Clock, Home, Map, Users } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Types for the component
interface ProgramFeature {
  icon: React.ReactNode;
  text: string;
}

interface ProgramData {
  title: string;
  description: string;
  image: string;
  features: ProgramFeature[];
}

interface ProgramContent {
  title?: string;
  description?: string;
}

interface ProgramsProps {
  content?: ProgramContent;
}

// Mocking UI components with TypeScript
interface UIComponentProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<UIComponentProps> = ({ children, className }) => (
  <div className={`rounded-xl border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
);

const CardHeader: React.FC<UIComponentProps> = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle: React.FC<UIComponentProps> = ({ children, className }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
);

const CardDescription: React.FC<UIComponentProps> = ({ children, className }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>{children}</p>
);

const CardContent: React.FC<UIComponentProps> = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Programs: React.FC<ProgramsProps> = ({ content }) => {
  const program: ProgramData = {
    title: "Language & Cultural Immersion",
    description: "Join our community-focused exchange program. Spend your evenings engaging in meaningful English conversations with local Vietnamese people and your days exploring the rich heritage of the region.",
    image: "/home_stay_vietnam_1.jpg",
    features: [
      { icon: <Clock className="w-5 h-5 text-primary" />, text: "Schedule: Mon - Sat, 7:30 PM to 9:30 PM" },
      { icon: <Users className="w-5 h-5 text-primary" />, text: "English conversation with local residents" },
      { icon: <Map className="w-5 h-5 text-primary" />, text: "Explore authentic Vietnamese culture" },
      { icon: <Home className="w-5 h-5 text-primary" />, text: "Free local accommodation included" },
    ],
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section id="programs" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <motion.span 
            className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Unified Program
          </motion.span>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl text-foreground">
            {content?.title || "Exchange & Explore"}
          </h2>
          <div className="w-20 h-1.5 mx-auto mb-6 rounded-full bg-primary" />
        </div>

        {/* Single Centered Card */}
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Card className="flex flex-col overflow-hidden border-none shadow-2xl md:flex-row bg-card group">
            {/* Image Section */}
            <div className="relative w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
              <Image
                src={program.image}
                alt={program.title}
                width={200}
                height={400}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-center w-full p-2 md:w-1/2 md:p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-bold md:text-3xl text-primary">
                  {program.title}
                </CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {program.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                      <div className="flex-shrink-0">
                        {feature.icon}
                      </div>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-8">
                  <Link
                    href="/apply" 
                    className="inline-block w-full py-4 text-center text-sm font-bold tracking-widest uppercase transition-all rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg active:scale-95"
                  >
                    Apply for this Program
                  </Link>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;