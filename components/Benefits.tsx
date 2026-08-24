'use client'
import { Home, Utensils, Users, Calendar, FileText, Heart } from "lucide-react";
import { motion, Variants } from "framer-motion";

const Benefits = ({ content }: { content?: any }) => {
  const benefits = [
    {
      icon: <Home className="w-8 h-8 text-primary" />,
      title: "Free Accommodation",
      description: "Comfortable shared homestay with your host family"
    },
    {
      icon: <Utensils className="w-8 h-8 text-primary" />,
      title: "Authentic Vietnamese Food",
      description: "Experience real Vietnamese cuisine and cooking traditions"
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Meet Locals & Travelers",
      description: "Build lasting friendships with both locals and other internationals"
    },
    {
      icon: <Calendar className="w-8 h-8 text-primary" />,
      title: "Flexible Schedule",
      description: "Only around 18–20 hours per week, plenty of time to explore"
    },
    {
      icon: <FileText className="w-8 h-8 text-primary" />,
      title: "Visa Guidance",
      description: "We provide support and guidance for visa requirements"
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Life-Changing Experience",
      description: "Create memories and connections that last a lifetime"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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
    <section id="benefits" className="py-20 bg-linear-to-br from-muted/30 to-background">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <motion.h2
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-4 text-4xl font-bold md:text-5xl text-foreground"
          >
            {content?.title || "Why Choose Us?"}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-20 h-1 mx-auto mb-6 origin-left bg-linear-to-r from-primary to-secondary"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            {content?.description || "We offer more than just a place to stay. Join our community and discover the benefits of cultural exchange."}
          </motion.p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid max-w-6xl grid-cols-2 gap-4 mx-auto lg:grid-cols-3 sm:gap-6 lg:gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative flex flex-col justify-between h-full p-4 overflow-hidden transition-all duration-500 border group bg-card/80 backdrop-blur-xs sm:p-6 rounded-xl border-border/50 hover:border-primary/30 hover:-translate-y-2"
            >
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-4 transition-all duration-300 rounded-full bg-linear-to-br from-primary/10 to-secondary/10 group-hover:bg-primary/20">
                  {benefit.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold transition-colors duration-300 text-foreground group-hover:text-primary">
                  {benefit.title}
                </h3>
                <p className="flex-1 leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
              {/* Sweeping light animation */}
              <div className="absolute inset-0 -translate-x-[150%] transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%] bg-linear-to-r from-transparent via-primary/10 to-transparent skew-x-12 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;