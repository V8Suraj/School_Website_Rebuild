import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { MandalaBg } from "@/components/MandalaBg";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  BookOpen, FlaskConical, Palette, Trophy, Award, Sparkles, ArrowRight,
  Megaphone, FileText, Wallet, CalendarDays, Star, ChevronRight, Users,
} from "lucide-react";
import heroHome from "@/assets/hero-home.jpg";
import heroVideo from "@/assets/herosection.mp4";
import heroHomeMobile from "@/assets/mobilevertficateimage.png";
import heroAbout from "@/assets/aboutus.png";
import heroAcademics from "@/assets/acdemics.png";
import heroAdmissions from "@/assets/admission.png";
import heroCalendar from "@/assets/calenderpage.png";
import heroContact from "@/assets/conatctus.png";
import heroHero from "@/assets/hero-home.jpg";
import schoolHome from "@/assets/schoolhome.png";
import { announcements, calendarEvents } from "@/data/schoolData";

// ─── static data (icons/colors are language-independent) ──────────────────────
const featureIcons = [BookOpen, FlaskConical, Palette, Trophy];
const featureKeys = [
  { title: "home.feat1.title", desc: "home.feat1.desc" },
  { title: "home.feat2.title", desc: "home.feat2.desc" },
  { title: "home.feat3.title", desc: "home.feat3.desc" },
  { title: "home.feat4.title", desc: "home.feat4.desc" },
];

const stats = [
  { value: 20, suffix: "+", label: "home.stat1.label" },
  { value: 2400, suffix: "", label: "home.stat2.label", group: true },
  { value: 180, suffix: "+", label: "home.stat3.label" },
  { value: 98, suffix: "%", label: "home.stat4.label" },
];

const quickLinkDefs = [
  { to: "/notices", icon: FileText, labelKey: "home.ql1.label", subKey: "home.ql1.sub", color: "from-orange-500 to-red-500" },
  { to: "/fees", icon: Wallet, labelKey: "home.ql2.label", subKey: "home.ql2.sub", color: "from-yellow-500 to-orange-500" },
  { to: "/calendar", icon: CalendarDays, labelKey: "home.ql3.label", subKey: "home.ql3.sub", color: "from-orange-400 to-amber-500" },
  { to: "/admissions", icon: BookOpen, labelKey: "home.ql4.label", subKey: "home.ql4.sub", color: "from-amber-500 to-orange-600" },
];

const testimonialKeys = [
  { name: "home.test1.name", role: "home.test1.role", text: "home.test1.text" },
  { name: "home.test2.name", role: "home.test2.role", text: "home.test2.text" },
  { name: "home.test3.name", role: "home.test3.role", text: "home.test3.text" },
];

const galleryItems = [
  { src: heroHero, labelKey: "home.gallery.l1", sanskrit: "विद्यालयः सर्वेषां गृहम्" },
  { src: heroAcademics, labelKey: "home.gallery.l2", sanskrit: "ज्ञानं परमं बलम्" },
  { src: heroAdmissions, labelKey: "home.gallery.l3", sanskrit: "प्रवेशः नवजीवनस्य द्वारम्" },
  { src: heroCalendar, labelKey: "home.gallery.l4", sanskrit: "उत्सवः जीवनस्य सारः" },
  { src: heroContact, labelKey: "home.gallery.l5", sanskrit: "सङ्घे शक्तिः कलौ युगे" },
  { src: heroAbout, labelKey: "home.gallery.l6", sanskrit: "शरीरमाद्यं खलु धर्मसाधनम्" },
  { src: schoolHome, labelKey: "home.gallery.l7", sanskrit: "गृहं हि प्रथमा पाठशाला" },
];

// ─── animated counter ──────────────────────────────────────────────────────────
const AnimatedCounter = ({ end, duration = 1.6, suffix = "", group = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let frameId = 0;
    let startTime = 0;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const progress = Math.min((time - startTime) / (duration * 1000), 1);
      const eased = 1 - (1 - progress) ** 3;
      setCount(Math.round(end * eased));
      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [duration, end, isInView]);

  const display = group ? count.toLocaleString("en-IN") : String(count);
  return <span ref={ref}>{display}{suffix}</span>;
};

// ─── page ──────────────────────────────────────────────────────────────────────
const Index = () => {
  const { language, t } = useLanguage();

  return (
    <>
      {/* ── Hero ── */}
      <PageHero
        title={t("home.heroTitle")}
        sanskrit="॥ विद्यया अमृतमश्नुते ॥"
        subtitle={t("home.heroSubtitle")}
        image={heroHome}
        video={heroVideo}
        mobileImage={heroHomeMobile}
        imageFit="cover"
        imagePosition="center center"
        size="full"
      >
        <Button asChild variant="hero" size="xl">
          <Link to="/admissions">
            {t("home.beginJourney")}
            <ArrowRight className={`h-5 w-5 ${language === "hi" ? "hidden" : ""}`} />
          </Link>
        </Button>
        <Button asChild variant="hero" size="xl" className="opacity-90 hover:opacity-100">
          <Link to="/about">{t("home.discoverUs")}</Link>
        </Button>
      </PageHero>

      {/* ── Stats ── */}
      <section className="container-narrow mt-10 md:mt-14 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { ...stats[0], icon: Trophy, gradient: "from-orange-500 to-amber-500" },
            { ...stats[1], icon: Users, gradient: "from-amber-500 to-yellow-500" },
            { ...stats[2], icon: BookOpen, gradient: "from-orange-600 to-red-500" },
            { ...stats[3], icon: Award, gradient: "from-amber-600 to-orange-500" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative overflow-hidden rounded-2xl border border-gold/25 bg-card shadow-soft"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-festive" />
              <div className="relative p-6 text-center">
                <div className={`mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.gradient} text-white`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-4xl md:text-5xl font-bold text-gradient-saffron">
                  <AnimatedCounter end={s.value} suffix={s.suffix} group={s.group || false} />
                </div>
                <div className="mt-1.5 text-sm text-muted-foreground">{t(s.label)}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Announcements + Upcoming Events ── */}
      <section className="container-narrow mt-10 grid gap-6 md:grid-cols-2">
        <motion.div className="rounded-3xl bg-card shadow-soft overflow-hidden">
          <div className="bg-gradient-festive px-6 py-4">
            <h3 className="text-white font-bold">{t("home.announcements.title")}</h3>
          </div>
          <ul>
            {announcements.slice(0, 4).map((a, i) => (
              <li key={a.id} className="px-5 py-4">
                <p className="text-sm font-semibold">{a.title}</p>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div className="rounded-3xl bg-card shadow-soft overflow-hidden">
          <div className="bg-gradient-festive px-6 py-4">
            <h3 className="text-white font-bold">{t("home.events.title")}</h3>
          </div>
          <ul>
            {calendarEvents.slice(0, 4).map((e) => (
              <li key={e.id} className="px-5 py-4">
                <p className="text-sm font-semibold">{e.title}</p>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ── Quick Links ── */}
      <section className="container-narrow mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinkDefs.map(({ to, icon: Icon, labelKey }, i) => (
          <Link key={to} to={to} className="p-5 rounded-2xl bg-card border">
            <Icon className="h-5 w-5" />
            <div>{t(labelKey)}</div>
          </Link>
        ))}
      </section>

      {/* ── Features ── */}
      <section className="container-narrow py-24">
        <SectionHeader
          eyebrow="॥ विद्यालय विशेषता ॥"
          title={t("home.features.title")}
          subtitle={t("home.features.sub")}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featureKeys.map((k, i) => {
            const Icon = featureIcons[i];
            return (
              <div key={i} className="rounded-3xl bg-card p-6 border">
                <Icon className="h-6 w-6" />
                <h3>{t(k.title)}</h3>
                <p>{t(k.desc)}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Index;