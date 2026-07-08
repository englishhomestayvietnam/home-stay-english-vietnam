import { CheckCircle2 } from "lucide-react";
import { motion, Variants } from "framer-motion";

const Requirements = () => {
  const requirements = [
    {
      title: "Fluent English Speaker",
      description: "Native or non-native speakers welcome - what matters is clear communication"
    },
    {
      title: "Friendly & Open-Minded",
      description: "Respect for cultural differences and enthusiasm for learning"
    },
    {
      title: "Willing to Share Culture",
      description: "Eager to exchange stories, traditions, and perspectives"
    },
    {
      title: "Minimum Stay: 2 Weeks",
      description: "Longer stays (1-3 months) are preferred for deeper connections"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="requirements" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Who Can Join?
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 bg-primary mx-auto mb-6 origin-left"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {"We welcome volunteers from all backgrounds. Here's what makes you a great fit:"}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Requirements Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 gap-6"
          >
            {requirements.map((req, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex gap-4 p-6 bg-background rounded-xl shadow-card hover:shadow-soft transition-smooth border border-primary/20 group"
              >
                <motion.div 
                  className="shrink-0 mt-1"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <CheckCircle2 className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {req.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {req.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Call-to-Action Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 p-8 bg-linear-to-r from-primary/5 to-secondary/5 rounded-xl text-center border-2 border-primary/20 hover:border-primary/30 transition-colors duration-300"
          >
            <p className="text-xl font-semibold text-foreground mb-3">
              {"Not sure if you're a good fit?"}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {"Don't worry! If you have a passion for cultural exchange and are willing to share your time and knowledge, you're exactly who we're looking for. Let's have a chat!"}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Requirements;