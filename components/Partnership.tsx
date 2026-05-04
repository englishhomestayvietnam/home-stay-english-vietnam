"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";

const Partnership = ({ content }: { content?: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const title = content?.title || "Our Partner in Thailand";
  const subtitle = content?.subtitle || "Looking for the same experience in Thailand?";
  const description = content?.description || "Our friend runs an English-teaching homestay in Chiang Mai with the same warmth, the same family dinners, and the same idea: real conversations beat scripted lessons. If your route takes you to Northern Thailand, they'd love to host you.";
  const link = content?.videoUrl || "https://workexchang-szvkwmug.manus.space/";

  return (
    <section id="partnership" className="py-20 bg-muted/30" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {title}
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />
          
          <motion.div 
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-card p-8 md:p-12 rounded-3xl border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-500 relative overflow-hidden group"
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full -ml-12 -mb-12 transition-transform group-hover:scale-150 duration-700" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-semibold mb-6 text-foreground">
                {subtitle}
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl mx-auto">
                {description}
              </p>
              <Button 
                size="lg" 
                asChild 
                className="rounded-full px-10 py-7 text-lg font-medium shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group/btn"
              >
                <a href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  Visit Partner Site
                  <ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </a>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Partnership;
