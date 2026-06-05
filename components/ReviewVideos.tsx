'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { X, Play } from "lucide-react";

const ReviewVideos = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [activeModalVideo, setActiveModalVideo] = useState<number | null>(null);

  const getVimeoId = (input: string) => {
    if (!input) return null;
    if (/^\d+$/.test(input)) return input;
    try {
      const url = new URL(input);
      if (url.hostname === "player.vimeo.com") {
        const id = url.pathname.replace("/video/", "");
        return /^\d+$/.test(id) ? id : null;
      }
      const vimeoMatch = url.pathname.match(/\/(\d+)/);
      if (vimeoMatch) return vimeoMatch[1];
    } catch {
      return null;
    }
    return null;
  };

  const toVimeoEmbedUrl = (input: string, autoplay = false) => {
    const id = getVimeoId(input);
    if (!id) return null;
    const embedUrl = new URL(`https://player.vimeo.com/video/${id}`);
    embedUrl.searchParams.set("title", "0");
    embedUrl.searchParams.set("byline", "0");
    embedUrl.searchParams.set("portrait", "0");
    embedUrl.searchParams.set("badge", "0");
    embedUrl.searchParams.set("autopause", "0");
    embedUrl.searchParams.set("controls", "1");
    embedUrl.searchParams.set("playbutton", "1");
    embedUrl.searchParams.set("transparent", "1");
    embedUrl.searchParams.set("background", "0");
    if (autoplay) {
      embedUrl.searchParams.set("autoplay", "1");
    }
    return embedUrl.toString();
  };

  const videos = [
    { src: `https://player.vimeo.com/video/1197374581` },
    { src: `https://player.vimeo.com/video/1197379399` },
    { src: `https://player.vimeo.com/video/1197367712` },
    { src: `https://player.vimeo.com/video/1197367684` },
    { src: `https://player.vimeo.com/video/1197365149` },
  ];

  const VideoCard = ({
    video,
    index,
    isActive,
    onActivate,
  }: {
    video: { src: string };
    index: number;
    isActive: boolean;
    onActivate: () => void;
  }) => {
    const videoLabel = `Volunteer review video ${index + 1}`;
    const embedUrl = toVimeoEmbedUrl(video.src, isActive);

    return (
      <div
        className="relative overflow-hidden rounded-xl shadow-lg bg-black"
        style={{ aspectRatio: "9/16" }}
      >
        {embedUrl ? (
          <>
            <iframe
              src={embedUrl}
              title={videoLabel}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              className="absolute inset-0 h-full w-full"
              style={{ pointerEvents: isActive ? "auto" : "none" }}
            />
            {/* Overlay blocks touch/click until user explicitly taps play */}
            {!isActive && (
              <button
                onClick={onActivate}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  onActivate();
                }}
                className="absolute inset-0 z-10 flex items-center justify-center w-full h-full bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                aria-label={`Play ${videoLabel}`}
              >
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 shadow-lg">
                  <Play className="w-6 h-6 text-black fill-black ml-1" />
                </div>
              </button>
            )}
          </>
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
        )}
      </div>
    );
  };

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
                    <VideoCard
                      video={video}
                      index={index}
                      isActive={activeVideo === index}
                      onActivate={() => setActiveVideo(index)}
                    />
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
          See All Videos
        </button>
      </motion.div>

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
                    <VideoCard
                      video={video}
                      index={index}
                      isActive={activeModalVideo === index}
                      onActivate={() => setActiveModalVideo(index)}
                    />
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