'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { X, Play } from "lucide-react";

const ReviewVideos = () => {
  const [showAll, setShowAll] = useState(false);

  const getYouTubeId = (input: string) => {
    if (!input) return null;

    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;

    try {
      const url = new URL(input);

      if (url.hostname === "youtu.be") {
        const id = url.pathname.replace("/", "");
        return /^[a-zA-Z0-9_-]{11}$/.test(id) ? id : null;
      }

      const shortsMatch = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
      if (shortsMatch) return shortsMatch[1];

      const watchId = url.searchParams.get("v");
      if (watchId && /^[a-zA-Z0-9_-]{11}$/.test(watchId)) return watchId;

      const embedMatch = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embedMatch) return embedMatch[1];
    } catch {
      return null;
    }

    return null;
  };

  const toYouTubeEmbedUrl = (input: string) => {
    const id = getYouTubeId(input);
    if (!id) return null;
    const embedUrl = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
    embedUrl.searchParams.set("playsinline", "1");
    embedUrl.searchParams.set("rel", "0");
    return embedUrl.toString();
  };
  
  const videos = [
    { src: `https://youtube.com/shorts/2Sb5rf7y9H0?feature=share` },
    { src: `https://youtube.com/shorts/db6jDhdhENY?feature=share` },
    { src: `https://youtube.com/shorts/Q6NCwnlXhw4?feature=share` },
    { src: `https://youtube.com/shorts/qP7QchuxWqQ?feature=share` },
    { src: `https://youtube.com/shorts/DMmL1NiM9Dg?feature=share` },
    { src: `https://youtube.com/shorts/_qmCOwT4Zzo?feature=share` },
    { src: `https://youtube.com/shorts/8auCzW566qQ?feature=share` },
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
                      {(() => {
                        const videoLabel = `Volunteer review video ${index + 1}`;
                        const embedUrl = toYouTubeEmbedUrl(video.src);

                        return embedUrl ? (
                          <iframe
                            src={embedUrl}
                            title={videoLabel}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            className="absolute inset-0 h-full w-full"
                          />
                        ) : (
                          <video
                            src={video.src}
                            title={videoLabel}
                            aria-label={videoLabel}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-contain"
                          />
                        );
                      })()}
                    </div>
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
                      {(() => {
                        const videoLabel = `Volunteer review video ${index + 1}`;
                        const embedUrl = toYouTubeEmbedUrl(video.src);

                        return embedUrl ? (
                          <iframe
                            src={embedUrl}
                            title={videoLabel}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            loading="lazy"
                            className="absolute inset-0 h-full w-full"
                          />
                        ) : (
                          <video
                            src={video.src}
                            title={videoLabel}
                            aria-label={videoLabel}
                            controls
                            playsInline
                            preload="metadata"
                            className="w-full h-full object-contain"
                          />
                        );
                      })()}
                    </div>
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
