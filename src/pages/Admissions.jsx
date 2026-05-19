

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

import Holistic from "../assets/Holistic.png";
import HolisticDev from "../assets/HolisticDev.webp";
import ExpertFaculty from "../assets/ExpertFaculty.jpg";
import RichCurriculum from "../assets/Rich Curriculum.jpg";
import ProvenExcellence from "../assets/Proven Excellence.webp";

import {
  Clock,
  MessageCircle,
  GraduationCap,
  Building,
} from "lucide-react";

import {
  Heart,
  Users,
  BookOpen,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  ChevronDown,
} from "lucide-react";

import { toast } from "sonner";
import heroAdmissions from "@/assets/admission.png";

/* ─── Static config (icons / colours only) ─────────────── */

const stepsMeta = [
  {
    num: "01",
    devanagari: "१",
    accent: "hsl(38 95% 58%)",
    accentMuted: "hsl(38 95% 58% / 0.12)",
    accentBorder: "hsl(38 95% 58% / 0.35)",
    iconBg: "from-amber-400 to-orange-500",
  },
  {
    num: "02",
    devanagari: "२",
    accent: "hsl(22 88% 52%)",
    accentMuted: "hsl(22 88% 52% / 0.10)",
    accentBorder: "hsl(22 88% 52% / 0.30)",
    iconBg: "from-primary to-orange-400",
  },
  {
    num: "03",
    devanagari: "३",
    accent: "hsl(22 88% 52%)",
    accentMuted: "hsl(22 88% 52% / 0.10)",
    accentBorder: "hsl(22 88% 52% / 0.30)",
    iconBg: "from-orange-500 to-amber-500",
  },
  {
    num: "04",
    devanagari: "४",
    accent: "hsl(43 78% 52%)",
    accentMuted: "hsl(43 78% 52% / 0.12)",
    accentBorder: "hsl(43 78% 52% / 0.35)",
    iconBg: "from-gold to-amber-400",
  },
];

const whyMeta = [
  {
    icon: Heart,
    image: HolisticDev,
    stat: "100%",
    color: "from-primary to-orange-400",
  },
  {
    icon: Users,
    image: ExpertFaculty,
    stat: "40+",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: BookOpen,
    image: RichCurriculum,
    stat: "CBSE",
    color: "from-amber-600 to-primary",
  },
  {
    icon: Trophy,
    image: ProvenExcellence,
    stat: "98%",
    color: "from-gold to-amber-500",
  },
];

const docKeys = ["doc1", "doc2", "doc3", "doc4", "doc5", "doc6"];
const faqCount = [1, 2, 3, 4, 5, 6, 7];

/* ─── FAQ Item ──────────────────────────────────────────── */

const faqIcons = ["🎓", "📝", "📋", "💰", "👥", "📅", "🚌"];

const FaqItem = ({ question, answer, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.09,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group"
    >
      <div
        className={`relative overflow-hidden rounded-2xl border transition-all duration-400 ${
          open
            ? "border-primary/40 bg-white shadow-[0_8px_32px_hsl(22_88%_52%/0.12)]"
            : "border-gold/20 bg-white/80 hover:border-gold/40 hover:bg-white shadow-[0_2px_12px_hsl(43_78%_52%/0.07)] hover:shadow-[0_4px_20px_hsl(43_78%_52%/0.13)]"
        }`}
      >
        {/* Left accent bar — only visible when open */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-gold to-amber-400 transition-all duration-400 rounded-l-2xl ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Question row */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full flex items-center gap-4 px-5 py-5 md:px-6 text-left"
        >
          {/* Number + emoji badge */}
          <div
            className={`shrink-0 flex flex-col items-center justify-center h-11 w-11 rounded-xl border transition-all duration-300 ${
              open
                ? "bg-gradient-to-br from-primary to-orange-400 border-transparent text-white shadow-[0_4px_12px_hsl(22_88%_52%/0.35)]"
                : "bg-gold/8 border-gold/25 text-primary group-hover:border-gold/50"
            }`}
          >
            <span className="text-base leading-none">{faqIcons[index]}</span>

            <span
              className={`text-[9px] font-bold tracking-wider mt-0.5 ${
                open ? "text-white/80" : "text-primary/60"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Question text */}
          <span
            className={`flex-1 font-display text-sm md:text-base lg:text-lg leading-snug transition-colors duration-200 ${
              open
                ? "text-primary"
                : "text-secondary group-hover:text-primary/80"
            }`}
          >
            {question}
          </span>

          {/* Chevron */}
          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`shrink-0 h-7 w-7 rounded-full flex items-center justify-center border transition-all duration-300 ${
              open
                ? "bg-primary/10 border-primary/30 text-primary"
                : "border-gold/25 text-muted-foreground group-hover:border-gold/50"
            }`}
          >
            <ChevronDown className="h-3.5 w-3.5" />
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="pl-[4.25rem] pr-5 md:pr-6 pb-5 pt-0">
                {/* Thin gold rule */}
                <div className="h-px w-full bg-gradient-to-r from-primary/20 via-gold/30 to-transparent mb-4" />

                <p className="text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed">
                  {answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ─── Component ─────────────────────────────────────────── */

const Admissions = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const { t } = useLanguage();

  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    parent: "",
    child: "",
    email: "",
    phone: "",
    grade: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const [validFields, setValidFields] = useState({});

  const validateField = (name, value) => {
    if (name === "email") {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

      setValidFields((p) => ({
        ...p,
        [name]: ok && value.length > 0,
      }));

      setErrors((p) => ({
        ...p,
        [name]: !ok && value.length > 0,
      }));
    } else if (name === "phone") {
      const ok = /^[\d\s+\-()]{10,}$/.test(value);

      setValidFields((p) => ({
        ...p,
        [name]: ok,
      }));

      setErrors((p) => ({
        ...p,
        [name]: !ok && value.length > 0,
      }));
    } else {
      setValidFields((p) => ({
        ...p,
        [name]: value.trim().length > 0,
      }));

      setErrors((p) => ({
        ...p,
        [name]: false,
      }));
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((p) => ({
      ...p,
      [id]: value,
    }));

    validateField(id, value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    await new Promise((r) => setTimeout(r, 1800));

    setIsSubmitting(false);

    setSubmitted(true);

    toast.success("Application received! We'll be in touch soon. 🪔");
  };

  const isFormValid =
    Object.keys(formData)
      .filter((k) => k !== "message")
      .every(
        (k) => formData[k].trim().length > 0
      ) && !Object.values(errors).some(Boolean);

  return (
    <>
      {/* Your remaining JSX stays EXACTLY SAME */}

      {/* Only TypeScript-specific things removed:
          - : string
          - : number
          - React.ChangeEvent<>
          - React.FormEvent
          - Record<string, boolean>
          - as const
          - keyof typeof
      */}
    </>
  );
};

export default Admissions;