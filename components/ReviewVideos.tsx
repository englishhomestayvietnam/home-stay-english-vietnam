'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { X, Play } from "lucide-react";

const ReviewVideos = () => {
  const [showAll, setShowAll] = useState(false);
  const imageKitEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;
  
  const videos = [
    { src: `${imageKitEndpoint}/cms/review_1.mp4`, title: "Volunteer Review 1" },
    { src: `${imageKitEndpoint}/cms/review_2.mp4`, title: "Volunteer Review 2" },
    { src: `${imageKitEndpoint}/cms/review_3.mp4`, title: "Volunteer Review 3" },
    { src: `${imageKitEndpoint}/cms/review_4.mp4`, title: "Volunteer Review 4" },
  ];

  return (
    <section id="review-videos" className="py-16 sm:py-20 overflow-hidden bg-background">
      <div className="container px-4 mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-12 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl text-foreground leading-tight">
            Volunteer Video Testimonials
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-20 h-1 mx-auto mb-6 origin-left bg-primary"
          />
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground px-2">
            Hear directly from our volunteers about their amazing experiences living with Vietnamese host families.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="max-w-5xl mx-auto">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {videos.map((video, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-[75%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="p-1 sm:p-2">
                    <div
                      className="relative overflow-hidden rounded-xl shadow-lg bg-black"
                      style={{ aspectRatio: '9/16' }}
                    >
                      <video
                        src={video.src}
                        title={video.title}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="mt-2 text-center text-xs sm:text-sm text-muted-foreground font-medium">
                      {video.title}
                    </p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation */}
            <CarouselPrevious className="-left-4 md:-left-12" />
            <CarouselNext className="-right-4 md:-right-12" />
          </Carousel>

          {/* Mobile swipe hint */}
          <p className="mt-3 text-center text-xs text-muted-foreground/60 md:hidden select-none">
            Swipe to see more →
          </p>
        </div>

        {/* See All Videos Button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-10 sm:mt-12"
        >
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold text-sm sm:text-base shadow-md hover:opacity-90 active:scale-95 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <Play className="w-4 h-4 fill-current" />
            See All Videos
          </button>
        </motion.div>
      </div>

      {/* All Videos Modal */}
      <AnimatePresence>
        {showAll && (
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-6 px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowAll(false); }}
          >
            <motion.div
              key="modal-panel"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl bg-background rounded-2xl shadow-2xl p-5 sm:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  All Volunteer Reviews
                </h3>
                <button
                  onClick={() => setShowAll(false)}
                  className="p-2 rounded-full hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Grid of all videos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {videos.map((video, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.07 }}
                  >
                    <div
                      className="relative overflow-hidden rounded-xl shadow-md bg-black"
                      style={{ aspectRatio: '9/16' }}
                    >
                      <video
                        src={video.src}
                        title={video.title}
                        controls
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="mt-1.5 text-center text-xs text-muted-foreground font-medium">
                      {video.title}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ReviewVideos;
