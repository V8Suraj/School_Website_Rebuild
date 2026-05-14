import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";

interface PageHeroProps {
  title: string;
  sanskrit?: string;
  subtitle?: string;
  image: string;
  video?: string;
  mobileImage?: string;
  align?: "center" | "left";
  imageFit?: "cover" | "contain";
  imagePosition?: string;
  size?: "default" | "compact" | "full";
  children?: React.ReactNode;
  preloaderBgImage?: string; // New prop for preloader background
  horseImage?: string; // New prop for horse image
}

export const PageHero = ({ 
  title, 
  sanskrit, 
  subtitle, 
  image, 
  video, 
  mobileImage, 
  align = "center", 
  imageFit = "cover", 
  imagePosition = "center center", 
  size = "default", 
  children,
  preloaderBgImage,
  horseImage
}: PageHeroProps) => {
  const { language } = useLanguage();
  const isHindi = language === "hi";
  const [showMainContent, setShowMainContent] = useState(!video || !preloaderBgImage || !horseImage);

  useEffect(() => {
    // Only show preloader if we have video and preloader assets
    if (video && preloaderBgImage && horseImage) {
      const timer = setTimeout(() => {
        setShowMainContent(true);
      }, 3000); // Animation duration
      
      return () => clearTimeout(timer);
    }
  }, [video, preloaderBgImage, horseImage]);

  return (
    <section className={`relative w-full overflow-hidden bg-gradient-temple flex items-center ${
      size === "full"
        ? "min-h-[80svh] md:min-h-[82vh]"
        : size === "compact"
        ? "min-h-[65vh] md:min-h-[68vh]"
        : "min-h-[72vh] md:min-h-[75vh]"
    }`}>
      
      {/* Background - Show preloader or main content */}
      <div className="absolute inset-0 w-full h-full">
        {!showMainContent && preloaderBgImage && horseImage ? (
          /* Preloader with horse animation */
          <>
            {/* Preloader background image */}
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${preloaderBgImage})`,
              }}
            />
            
            {/* Dark overlay for preloader */}
            <div className="absolute inset-0 bg-black/60" />
            
            {/* Horse animation - coming from right side */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute h-full top-1/2 -translate-y-1/2 animate-horse-ride">
                <img
                  src={horseImage}
                  alt="Horse"
                  className="h-auto max-h-[80vh] w-auto object-contain"
                  style={{ maxWidth: "300px" }}
                />
              </div>
            </div>
          </>
        ) : (
          /* Main content background */
          <>
            {video ? (
              /* Video background — plays only first 6 seconds then loops */
              <video
                autoPlay
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: imagePosition }}
                onTimeUpdate={(e) => {
                  const v = e.currentTarget;
                  if (v.currentTime >= 6) {
                    v.currentTime = 0;
                  }
                }}
              >
                <source src={video} type="video/mp4" />
                <img src={image} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
              </video>
            ) : imageFit === "contain" ? (
              /* For contain: use CSS background so the full image shows without cropping */
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundColor: "#0d0500",
                }}
              />
            ) : mobileImage ? (
              <picture className="absolute inset-0 h-full w-full">
                <source media="(max-width: 767px)" srcSet={mobileImage} />
                <img
                  src={image}
                  alt=""
                  aria-hidden
                  style={{ objectPosition: imagePosition }}
                  className="absolute inset-0 h-full w-full object-cover object-center opacity-90 animate-fade-in"
                />
              </picture>
            ) : (
              <img
                src={image}
                alt=""
                aria-hidden
                style={{ objectPosition: imagePosition }}
                className="absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-90 animate-fade-in"
              />
            )}
            {/* Dark scrim */}
            <div className={`absolute inset-0 ${imageFit === "contain" && !video ? "bg-black/50" : "bg-black/55"}`} />
            {/* Warm gradient overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(160deg,hsl(20_60%_10%/0.65)_0%,hsl(20_40%_12%/0.35)_60%,transparent_100%)]" />
            {/* Festive radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(22_88%_52%/0.15),transparent_55%)]" />
          </>
        )}
      </div>

      {/* Content - Only show when main content is ready */}
      {showMainContent && (
        <div className={`container-narrow relative w-full z-10 ${size === "compact" ? "py-8 md:py-12" : size === "full" ? "py-14 md:py-20" : "py-10 md:py-16"} ${align === "center" ? "text-center" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className={`max-w-3xl px-1 md:px-0 ${align === "center" ? "mx-auto" : ""}`}
          >
            {sanskrit && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="font-sanskrit text-base md:text-2xl tracking-wide text-gold mb-3 drop-shadow-[0_2px_8px_hsl(20_40%_12%/0.6)]"
              >
                {sanskrit}
              </motion.div>
            )}

            <h1
              className={`font-bold drop-shadow-[0_10px_24px_hsl(20_40%_12%/0.62)] ${
                isHindi ? "font-sanskrit" : "font-display"
              } ${
                size === "compact" ? "text-2xl md:text-5xl lg:text-[3.4rem]" : "text-3xl md:text-6xl lg:text-[4rem]"
              }`}
              style={{ lineHeight: isHindi ? 1.45 : 1.2 }}
            >
              {isHindi ? (
                <span
                  style={{
                    background: "linear-gradient(90deg, hsl(43 95% 86%) 0%, hsl(38 90% 68%) 28%, hsl(22 88% 58%) 55%, hsl(43 95% 86%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    display: "inline",
                    paddingTop: "0.15em",
                    paddingBottom: "0.05em",
                  }}
                >
                  {title}
                </span>
              ) : (
                <span
                  className="bg-clip-text text-transparent inline-block pb-1"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, hsl(43 95% 86%) 0%, hsl(38 90% 68%) 28%, hsl(22 88% 58%) 55%, hsl(43 95% 86%) 100%)",
                  }}
                >
                  {title}
                </span>
              )}
            </h1>

            {/* Animated divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className={`${isHindi ? "mt-2" : "mt-4"} flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}
            >
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
              <span className="text-gold animate-flame text-lg">✦</span>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
            </motion.div>

            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className={`font-display text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] tracking-wide ${
                  size === "compact"
                    ? `${isHindi ? "mt-2 font-sanskrit" : "mt-3"} text-base md:text-xl`
                    : `${isHindi ? "mt-3 font-sanskrit" : "mt-5"} text-lg md:text-2xl font-medium`
                }`}
              >
                {subtitle}
              </motion.p>
            )}

            {children && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className={`mt-6 flex flex-wrap gap-4 overflow-x-clip ${align === "center" ? "justify-center" : ""}`}
              >
                {children}
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};