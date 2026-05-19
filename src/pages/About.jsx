 
import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import {
  Heart,
  Eye,
  Star,
  Award,
  Zap,
  Book,
  Globe,
  CheckCircle2,
  Quote,
  GraduationCap,
  Clock,
  Briefcase,
} from "lucide-react";

import heroAbout from "@/assets/aboutus.png";
import heroAcademics from "@/assets/acdemics.png";
import heroAdmissions from "@/assets/admission.png";
import heroCalendar from "@/assets/calenderpage.png";
import heroContact from "@/assets/conatctus.png";
import heroHome from "@/assets/hero-home.jpg";
import schoolHome from "@/assets/schoolhome.png";

import {
  loadAboutFacilities,
  loadAboutContent,
  loadAboutFaculty,
  defaultAboutContent,
  defaultFaculty,
} from "@/lib/aboutContent";

import { useLanguage } from "@/contexts/LanguageContext";

const getInitials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");

// Stagger container variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const About = () => {
  const { t, language } = useLanguage();

  const [content, setContent] = useState(defaultAboutContent);
  const [faculty, setFaculty] = useState(defaultFaculty);

  const c = (enKey, hiKey) =>
    language === "hi"
      ? content[hiKey] || content[enKey]
      : content[enKey];

  const timeline = [
    {
      year: "2005",
      title: t("about.timeline.2005.title"),
      desc: t("about.timeline.2005.desc"),
    },
    {
      year: "2012",
      title: t("about.timeline.2012.title"),
      desc: t("about.timeline.2012.desc"),
    },
    {
      year: "2018",
      title: t("about.timeline.2018.title"),
      desc: t("about.timeline.2018.desc"),
    },
    {
      year: "2023",
      title: t("about.timeline.2023.title"),
      desc: t("about.timeline.2023.desc"),
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: t("about.achievement1.title"),
      desc: t("about.achievement1.desc"),
    },
    {
      icon: Star,
      title: t("about.achievement2.title"),
      desc: t("about.achievement2.desc"),
    },
    {
      icon: Globe,
      title: t("about.achievement3.title"),
      desc: t("about.achievement3.desc"),
    },
    {
      icon: Zap,
      title: t("about.achievement4.title"),
      desc: t("about.achievement4.desc"),
    },
  ];

  const translatedFacilities = [
    {
      title: t("about.facility1.title"),
      desc: t("about.facility1.desc"),
      image: heroAcademics,
    },
    {
      title: t("about.facility2.title"),
      desc: t("about.facility2.desc"),
      image: heroAdmissions,
    },
    {
      title: t("about.facility3.title"),
      desc: t("about.facility3.desc"),
      image: heroHome,
    },
    {
      title: t("about.facility4.title"),
      desc: t("about.facility4.desc"),
      image: heroCalendar,
    },
    {
      title: t("about.facility5.title"),
      desc: t("about.facility5.desc"),
      image: heroContact,
    },
    {
      title: t("about.facility6.title"),
      desc: t("about.facility6.desc"),
      image: schoolHome,
    },
  ];

  const team = [
    {
      name: t("about.team1.name"),
      role: t("about.team1.role"),
      expertise: t("about.team1.expertise"),
    },
    {
      name: t("about.team2.name"),
      role: t("about.team2.role"),
      expertise: t("about.team2.expertise"),
    },
  ];

  useEffect(() => {
    loadAboutFacilities();
    setContent(loadAboutContent());
    setFaculty(loadAboutFaculty());
  }, []);

  return (
    <>
      <PageHero
        title={t("about.heroTitle")}
        sanskrit={t("about.heroSanskrit")}
        subtitle={t("about.heroSubtitle")}
        image={heroAbout}
        size="full"
      />

      {/* ── Mission Vision Values ── */}
      <section className="container-narrow py-20 relative overflow-hidden">
        <MandalaBg className="absolute left-0 top-10 w-80 h-80 opacity-10 pointer-events-none" />

        <div className="relative z-10">
          <SectionHeader
            eyebrow={t("about.mvv.eyebrow")}
            title={t("about.mvv.title")}
            subtitle={t("about.mvv.subtitle")}
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          className="grid gap-6 md:grid-cols-3 relative z-10"
        >
          {[
            {
              icon: Heart,
              label: "01",
              title: t("about.mission.title"),
              desc: c("mission", "missionHi"),
              footer: t("about.mission.footer"),
              color: "from-orange-500 to-red-500",
            },
            {
              icon: Eye,
              label: "02",
              title: t("about.vision.title"),
              desc: c("vision", "visionHi"),
              footer: t("about.vision.footer"),
              color: "from-amber-500 to-orange-500",
            },
            {
              icon: Star,
              label: "03",
              title: t("about.values.title"),
              desc: c("values", "valuesHi"),
              footer: t("about.values.footer"),
              color: "from-yellow-500 to-amber-500",
            },
          ].map((m) => (
            <motion.div
              key={m.title}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: {
                  duration: 0.2,
                },
              }}
              className="group relative overflow-hidden rounded-3xl section-surface ornate-frame border border-gold/30 shadow-soft hover:shadow-warm transition-shadow duration-300 flex flex-col h-full"
            >
              <div className={`h-2 w-full bg-gradient-to-r ${m.color}`} />

              {/* dot pattern on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  backgroundImage:
                    "radial-gradient(hsl(22 88% 52% / 0.05) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />

              {/* hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_12%_12%,hsl(43_88%_55%/0.16),transparent_42%)]" />

              {/* shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

              <div className="relative z-10 p-7 md:p-8 flex flex-col flex-grow">
                <div className="flex items-start justify-between gap-4">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      rotate: 12,
                      scale: 1.2,
                    }}
                    className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${m.color} text-white shadow-warm`}
                  >
                    <m.icon className="h-7 w-7" />
                  </motion.div>

                  <div
                    className={`rounded-full border border-gold/30 bg-gradient-to-br ${m.color} bg-opacity-10 px-3 py-1 text-xs font-bold tracking-[0.22em] text-white`}
                    style={{
                      background: "hsl(43 88% 55% / 0.12)",
                    }}
                  >
                    {m.label}
                  </div>
                </div>

                <h3 className="mt-5 font-display text-2xl md:text-[1.75rem] text-secondary">
                  {m.title}
                </h3>

                <p className="mt-3 text-muted-foreground leading-relaxed text-[0.98rem]">
                  {m.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </>
  );
};

export default About;