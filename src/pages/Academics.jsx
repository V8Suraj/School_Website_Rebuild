import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen,
  FlaskConical,
  Calculator,
  Globe,
  Music,
  Dumbbell,
  Code,
  Palette,
  CheckCircle2,
  GraduationCap,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  Trophy,
  Lightbulb,
  Atom,
  Brain,
} from "lucide-react";

import heroAcademics from "@/assets/acdemics.png";

/* ─── Static colour/icon config (language-independent) ─── */

const statsMeta = [
  {
    key: "statsPassRate",
    value: 98,
    icon: Star,
    color: "from-amber-500 to-orange-500",
  },
  {
    key: "statsUniversity",
    value: 150,
    icon: GraduationCap,
    color: "from-primary to-orange-400",
  },
  {
    key: "statsExperts",
    value: 40,
    icon: Users,
    color: "from-amber-600 to-primary",
  },
  {
    key: "statsOlympiad",
    value: 25,
    icon: Trophy,
    color: "from-gold to-amber-400",
  },
];

const programsMeta = [
  {
    idx: 1,
    emoji: "🌱",
    color: "from-amber-500/15 to-orange-400/10",
    border: "border-amber-400/30",
    accent: "text-amber-700",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    idx: 2,
    emoji: "📚",
    color: "from-primary/15 to-orange-500/10",
    border: "border-primary/30",
    accent: "text-primary",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    idx: 3,
    emoji: "🎯",
    color: "from-orange-500/15 to-amber-400/10",
    border: "border-orange-400/30",
    accent: "text-orange-700",
    badge: "bg-orange-50 text-orange-700 border-orange-200",
  },
  {
    idx: 4,
    emoji: "🏛️",
    color: "from-secondary/15 to-primary/10",
    border: "border-secondary/25",
    accent: "text-secondary",
    badge: "bg-red-50 text-secondary border-secondary/20",
  },
];

const pillarIcons = [Brain, Atom, Lightbulb, Sparkles];

const pillarsMeta = [
  {
    num: "01",
    devanagari: "१",
    accent: "hsl(38 95% 58%)",
    accentClass: "text-amber-500",
    borderClass: "border-amber-400/30",
    glowClass: "from-amber-500/10",
    barClass: "from-amber-400 to-orange-500",
    tagClass: "bg-amber-100 text-amber-700 border-amber-200",
    tag: "Critical Thinking",
  },
  {
    num: "02",
    devanagari: "२",
    accent: "hsl(22 88% 58%)",
    accentClass: "text-orange-500",
    borderClass: "border-orange-400/30",
    glowClass: "from-orange-500/10",
    barClass: "from-primary to-orange-400",
    tagClass: "bg-orange-100 text-orange-700 border-orange-200",
    tag: "STEM",
  },
  {
    num: "03",
    devanagari: "३",
    accent: "hsl(340 70% 60%)",
    accentClass: "text-rose-500",
    borderClass: "border-rose-400/30",
    glowClass: "from-rose-500/10",
    barClass: "from-secondary to-rose-500",
    tagClass: "bg-rose-100 text-rose-700 border-rose-200",
    tag: "Creative",
  },
  {
    num: "04",
    devanagari: "४",
    accent: "hsl(43 88% 60%)",
    accentClass: "text-amber-600",
    borderClass: "border-gold/30",
    glowClass: "from-gold/10",
    barClass: "from-gold to-amber-400",
    tagClass: "bg-yellow-100 text-yellow-700 border-yellow-200",
    tag: "Culture",
  },
];

const subjectsMeta = [
  {
    icon: BookOpen,
    color: "from-amber-500 to-orange-500",
    ritual: "🪔",
    sanskritName: "वाक् विद्या",
    ritualLabel: "Saraswati Puja",
  },
  {
    icon: Calculator,
    color: "from-primary to-orange-400",
    ritual: "🔢",
    sanskritName: "गणित शास्त्र",
    ritualLabel: "Vedic Ganit",
  },
  {
    icon: FlaskConical,
    color: "from-amber-600 to-primary",
    ritual: "🌿",
    sanskritName: "प्रकृति विज्ञान",
    ritualLabel: "Pancha Bhuta",
  },
  {
    icon: Globe,
    color: "from-orange-500 to-amber-400",
    ritual: "🗺️",
    sanskritName: "भूगोल इतिहास",
    ritualLabel: "Dharti Mata",
  },
  {
    icon: Code,
    color: "from-primary to-amber-500",
    ritual: "⚙️",
    sanskritName: "संगणक विद्या",
    ritualLabel: "Yantra Shastra",
  },
  {
    icon: Palette,
    color: "from-secondary to-primary",
    ritual: "🎨",
    sanskritName: "चित्र कला",
    ritualLabel: "Shilpa Shastra",
  },
  {
    icon: Music,
    color: "from-amber-500 to-secondary",
    ritual: "🎵",
    sanskritName: "संगीत नृत्य",
    ritualLabel: "Gandharva Veda",
  },
  {
    icon: Dumbbell,
    color: "from-gold to-amber-500",
    ritual: "🧘",
    sanskritName: "शारीरिक शिक्षा",
    ritualLabel: "Sharir Dharma",
  },
];

/* ─── Animated number component with counter animation ─── */

const AnimatedNumber = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.8,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);

      const startTime = performance.now();

      const startValue = 0;
      const endValue = value;

      const duration = 2000;

      const easingFn = (t) => t * (2 - t);

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;

        if (elapsed >= duration) {
          setDisplayValue(endValue);
          return;
        }

        const progress = easingFn(Math.min(1, elapsed / duration));

        const currentValue = Math.floor(
          startValue + (endValue - startValue) * progress
        );

        setDisplayValue(currentValue);

        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [isInView, value, hasAnimated]);

  return (
    <span ref={ref} className="transition-all duration-700">
      {displayValue.toLocaleString()}
    </span>
  );
};

/* ─── Component ─────────────────────────────────────────── */

const Academics = () => {
  const { t } = useLanguage();

  const [activeProgram, setActiveProgram] = useState(0);

  const programs = programsMeta.map((m) => ({
    ...m,
    level: t(`academics.prog${m.idx}Level`),
    grades: t(`academics.prog${m.idx}Grades`),
    desc: t(`academics.prog${m.idx}Desc`),
    highlights: [
      t(`academics.prog${m.idx}h1`),
      t(`academics.prog${m.idx}h2`),
      t(`academics.prog${m.idx}h3`),
      t(`academics.prog${m.idx}h4`),
    ],
  }));

  const pillars = pillarIcons.map((Icon, i) => ({
    Icon,
    title: t(
      [
        "academics.pillar1Title",
        "academics.pillar2Title",
        "academics.pillar3Title",
        "academics.pillar4Title",
      ][i]
    ),
    desc: t(
      [
        "academics.pillar1Desc",
        "academics.pillar2Desc",
        "academics.pillar3Desc",
        "academics.pillar4Desc",
      ][i]
    ),
  }));

  const subjects = subjectsMeta.map(
    ({ icon: Icon, color, ritual, sanskritName, ritualLabel }, i) => ({
      Icon,
      color,
      ritual,
      sanskritName,
      ritualLabel,
      name: t(
        [
          "academics.subj1Name",
          "academics.subj2Name",
          "academics.subj3Name",
          "academics.subj4Name",
          "academics.subj5Name",
          "academics.subj6Name",
          "academics.subj7Name",
          "academics.subj8Name",
        ][i]
      ),
      desc: t(
        [
          "academics.subj1Desc",
          "academics.subj2Desc",
          "academics.subj3Desc",
          "academics.subj4Desc",
          "academics.subj5Desc",
          "academics.subj6Desc",
          "academics.subj7Desc",
          "academics.subj8Desc",
        ][i]
      ),
    })
  );

  return (
    <>
      {/* your full JSX stays SAME below */}
    </>
  );
};

export default Academics;