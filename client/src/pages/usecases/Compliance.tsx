import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PageBackground } from '@/components/ui/page-background';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { UnifiedFAQ } from '@/components/ui/unified-faq';
import { 
  FileText,
  ArrowRight,
  Clock,
  Eye,
  RefreshCw,
  Building2,
  Heart,
  Factory,
  CheckCircle2,
  BarChart3,
  BookOpen,
  Upload,
  Sparkles,
  ClipboardCheck,
  Monitor,
  TrendingUp
} from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Compliance() {
  const { t, i18n } = useTranslation('compliance');
  const [activeToggle, setActiveToggle] = useState<'before' | 'with'>('with');
  const [activeHeroStep, setActiveHeroStep] = useState(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  // Auto-animate hero workflow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroStep((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Auto-animate timeline workflow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTimelineStep((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleDemoClick = () => {
    analytics.ctaClick('book_demo', 'compliance_page');
    window.location.href = '/contact';
  };

  const handleResultsClick = () => {
    analytics.ctaClick('see_results', 'compliance_page');
    window.location.href = '/results';
  };

  const handleStartClick = () => {
    analytics.ctaClick('start_free', 'compliance_page');
    const platformUrl = import.meta.env.VITE_LEARNPACK_PLATFORM || 'https://app.learnpack.co';
    window.location.href = `${platformUrl}/signup`;
  };

  const signalIcons = [
    { key: 'versionDrift', icon: RefreshCw },
    { key: 'lowCompletion', icon: TrendingUp },
    { key: 'noProof', icon: Eye },
    { key: 'manualUpdates', icon: Clock }
  ];

  const toggleRows = ['contentUpdates', 'auditEvidence', 'learnerSupport', 'lmsDeployment'];

  const heroSteps = [
    { label: 'Policy / SOP', icon: FileText },
    { label: 'Course generated', icon: Sparkles },
    { label: 'Practice + checks', icon: BookOpen },
    { label: 'Reports + SCORM', icon: BarChart3 },
    { label: 'LMS / Archive', icon: Monitor }
  ];

  const timelineSteps = [
    { key: 'import', icon: Upload },
    { key: 'generate', icon: Sparkles },
    { key: 'approve', icon: ClipboardCheck },
    { key: 'deliver', icon: Monitor },
    { key: 'prove', icon: BarChart3 }
  ];

  const departmentCards = [
    { key: 'banking', icon: Building2 },
    { key: 'healthcare', icon: Heart },
    { key: 'manufacturing', icon: Factory }
  ];

  const faqItems = [
    { id: 'scorm', question: t('faqs.items.scorm.question'), answer: t('faqs.items.scorm.answer') },
    { id: 'certified', question: t('faqs.items.certified.question'), answer: t('faqs.items.certified.answer') },
    { id: 'updates', question: t('faqs.items.updates.question'), answer: t('faqs.items.updates.answer') }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LearnPack Compliance Training",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": t('meta.description'),
    "featureList": [
      "Compliance Training Automation",
      "SCORM Export",
      "Audit-Ready Analytics",
      "AI Tutor Support",
      "Multilingual Delivery"
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet key={i18n.language}>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="hero-animated-bg relative overflow-hidden">
        <PageBackground starCount={50} />

        {/* SECTION 1: Hero */}
        <section className="section-hero relative z-10">
          <div className="content-container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <ScrollFade>
                <h1 className="heading-hero mb-4" data-testid="heading-compliance-hero">
                  {t('hero.title')}
                </h1>
                <p className="body-lg mb-6 max-w-xl">
                  {t('hero.subtitle')}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm text-muted-foreground">
                  <span>{t('hero.metrics.cost')}</span>
                  <span className="hidden md:inline">·</span>
                  <span>{t('hero.metrics.completion')}</span>
                  <span className="hidden md:inline">·</span>
                  <span>{t('hero.metrics.scorm')}</span>
                  <span className="hidden md:inline">·</span>
                  <span>{t('hero.metrics.analytics')}</span>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" onClick={handleDemoClick} data-testid="button-hero-demo">
                    {t('hero.ctaDemo')}
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleResultsClick} data-testid="button-hero-results">
                    {t('hero.ctaResults')}
                  </Button>
                </div>
              </ScrollFade>

              {/* Animated Horizontal Workflow Strip */}
              <ScrollFade delay={0.2} className="relative">
                <div 
                  className="p-6 md:p-8 rounded-xl border border-primary/20 relative"
                  style={{ 
                    boxShadow: '0 0 30px rgba(56, 189, 248, 0.08)',
                    backgroundColor: '#0a1125'
                  }}
                >
                  {/* Connecting line - positioned at exact circle center: padding (32px) + half circle height (28px) = 60px */}
                  <div 
                    className="absolute left-8 right-8 h-0.5 hidden sm:block" 
                    style={{ 
                      top: '60px',
                      background: 'linear-gradient(to right, rgba(56, 189, 248, 0.15), rgba(56, 189, 248, 0.3), rgba(56, 189, 248, 0.15))',
                      zIndex: 0
                    }} 
                  />
                  
                  <div className="flex items-center justify-between gap-1 sm:gap-2 relative">
                    {heroSteps.map((step, index) => {
                      const isActive = activeHeroStep === index;
                      const isPast = index < activeHeroStep;
                      
                      return (
                        <div key={step.label} className="flex items-center gap-1 sm:gap-2">
                          <motion.div
                            className="flex flex-col items-center text-center relative z-10"
                            initial={{ opacity: 0.6 }}
                            animate={{ 
                              opacity: isActive ? 1 : isPast ? 0.8 : 0.6,
                              scale: isActive ? 1.05 : 1
                            }}
                            transition={{ duration: 0.4 }}
                          >
                            {/* Solid background circle - fully opaque to mask the line */}
                            <motion.div 
                              className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-500 ${
                                isActive 
                                  ? 'border-primary' 
                                  : isPast 
                                    ? 'border-primary/50' 
                                    : 'border-border/50'
                              }`}
                              style={{
                                backgroundColor: '#0a1125', // Using hex for absolute opacity
                                zIndex: 10
                              }}
                              animate={isActive ? {
                                boxShadow: ['0 0 20px rgba(56, 189, 248, 0.3)', '0 0 35px rgba(56, 189, 248, 0.5)', '0 0 20px rgba(56, 189, 248, 0.3)']
                              } : {
                                boxShadow: '0 0 0px rgba(56, 189, 248, 0)'
                              }}
                              transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
                            >
                              <step.icon className={`w-4 h-4 sm:w-6 sm:h-6 transition-colors duration-300 ${
                                isActive ? 'text-primary' : isPast ? 'text-primary/70' : 'text-foreground/50'
                              }`} />
                            </motion.div>
                            <motion.span 
                              className={`text-[10px] sm:text-xs max-w-[60px] sm:max-w-[80px] transition-colors duration-300 ${
                                isActive ? 'text-foreground' : 'text-foreground/60'
                              }`}
                              animate={{ opacity: isActive ? 1 : 0.7 }}
                            >
                              {step.label}
                            </motion.span>
                          </motion.div>
                          
                          {index < 4 && (
                            <motion.div
                              className="relative z-10"
                              animate={{ 
                                opacity: isPast || isActive ? 1 : 0.3,
                                scale: isActive ? 1.2 : 1
                              }}
                              transition={{ duration: 0.3 }}
                            >
                              <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 hidden sm:block transition-colors duration-300 ${
                                isPast || isActive ? 'text-primary' : 'text-primary/30'
                              }`} />
                            </motion.div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* SECTION 2: Definition Box - English only */}
        <section className="section-tight relative z-10">
          <div className="content-container">
            <ScrollFade>
              <div 
                className="rounded-xl p-7 md:p-9 max-w-4xl mx-auto border border-primary/15 transition-all duration-300 hover:border-primary/25"
                style={{
                  backgroundColor: 'rgba(10, 17, 37, 0.8)',
                  boxShadow: '0 0 40px rgba(48, 79, 254, 0.1)',
                }}
              >
                <p className="body-lg text-foreground/85 text-center">
                  {t('definition.en')}
                </p>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 3: Why compliance training fails - 60/40 layout with centered bullets */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section mb-8 text-center" data-testid="heading-why-fails">
                {t('whyFails.title')}
              </h2>
            </ScrollFade>

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 max-w-5xl mx-auto items-center">
              {/* Left column - 60% (3/5) */}
              <ScrollFade className="lg:col-span-3">
                <p className="body-lg text-muted-foreground leading-relaxed">
                  {t('whyFails.narrative')}
                </p>
              </ScrollFade>

              {/* Right column - 40% (2/5) - vertically centered */}
              <ScrollFade delay={0.1} className="lg:col-span-2">
                <div className="space-y-3">
                  {signalIcons.map((signal, index) => (
                    <motion.div
                      key={signal.key}
                      className="flex items-center gap-3 p-2.5 rounded-lg transition-colors hover:bg-primary/5"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <div className="w-9 h-9 rounded-lg border border-destructive/30 bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        <signal.icon className="w-4 h-4 text-destructive" />
                      </div>
                      <span className="text-sm text-foreground/80 font-medium">
                        {t(`whyFails.signals.${signal.key}`)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* SECTION 4: Toggle - Before/With LearnPack - Enhanced styling */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section mb-10 text-center" data-testid="heading-toggle">
                {t('toggle.title')}
              </h2>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-8">
                  <div className="inline-flex p-1 rounded-lg border border-border/40 bg-card/30 backdrop-blur-sm">
                    <button
                      onClick={() => setActiveToggle('before')}
                      className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                        activeToggle === 'before'
                          ? 'bg-destructive/20 text-destructive border border-destructive/30'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t('toggle.tabBefore')}
                    </button>
                    <button
                      onClick={() => setActiveToggle('with')}
                      className={`px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-300 ${
                        activeToggle === 'with'
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {t('toggle.tabWith')}
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeToggle}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border border-primary/20 overflow-hidden"
                    style={{ 
                      backgroundColor: 'rgba(10, 20, 60, 0.4)',
                      boxShadow: '0 0 30px rgba(56, 189, 248, 0.08)'
                    }}
                  >
                    <div className="divide-y divide-border/20">
                      {toggleRows.map((row) => (
                        <div key={row} className="flex items-start">
                          {/* Left column - white titles */}
                          <div className="w-44 flex-shrink-0 p-5 flex items-center">
                            <span className="text-sm font-semibold text-white">
                              {t(`toggle.rows.${row}.label`)}
                            </span>
                          </div>
                          
                          {/* Glowing vertical divider */}
                          <div 
                            className="w-px self-stretch"
                            style={{
                              background: 'linear-gradient(to bottom, transparent, rgba(56, 189, 248, 0.4), transparent)',
                              boxShadow: '0 0 8px rgba(56, 189, 248, 0.3)'
                            }}
                          />
                          
                          {/* Right column - explanation text */}
                          <div className="flex-1 p-5">
                            <span className={`text-sm ${activeToggle === 'before' ? 'text-muted-foreground' : 'text-foreground/90'}`}>
                              {t(`toggle.rows.${row}.${activeToggle}`)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                <p className="text-sm text-muted-foreground text-center mt-6 max-w-2xl mx-auto">
                  {t('toggle.footnote')}
                </p>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 5: Timeline - Auto-animated workflow */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section mb-12 text-center" data-testid="heading-timeline">
                {t('timeline.title')}
              </h2>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <div className="max-w-5xl mx-auto">
                {/* Desktop view - auto-animated */}
                <div className="hidden md:block relative">
                  {/* Background connecting line - positioned behind circles with z-index */}
                  <div 
                    className="absolute left-0 right-0 h-0.5" 
                    style={{ 
                      top: '32px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      zIndex: 0
                    }} 
                  />
                  
                  {/* Animated progress line - also behind circles */}
                  <motion.div 
                    className="absolute left-0 h-0.5"
                    style={{ 
                      top: '32px',
                      background: 'linear-gradient(to right, rgba(56, 189, 248, 0.8), rgba(56, 189, 248, 0.4))',
                      boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)',
                      zIndex: 1
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${(activeTimelineStep / 4) * 100}%` }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                  
                  <div className="flex justify-between relative">
                    {timelineSteps.map((step, index) => {
                      const isActive = activeTimelineStep === index;
                      const isPast = index < activeTimelineStep;
                      
                      return (
                        <motion.div
                          key={step.key}
                          className="flex flex-col items-center text-center relative"
                          style={{ zIndex: 10 }}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {/* Solid background circle that cuts the line */}
                          <motion.div
                            className={`w-16 h-16 rounded-full border-2 flex items-center justify-center mb-4 transition-all duration-500 ${
                              isActive
                                ? 'border-primary'
                                : isPast
                                  ? 'border-primary/60'
                                  : 'border-border/50'
                            }`}
                            style={{
                              backgroundColor: isActive 
                                ? 'rgba(10, 20, 45, 1)' 
                                : isPast 
                                  ? 'rgba(10, 18, 40, 1)' 
                                  : 'rgba(8, 15, 35, 1)',
                              zIndex: 10
                            }}
                            animate={isActive ? {
                              boxShadow: ['0 0 15px rgba(56, 189, 248, 0.3)', '0 0 30px rgba(56, 189, 248, 0.5)', '0 0 15px rgba(56, 189, 248, 0.3)'],
                              scale: [1, 1.08, 1]
                            } : {
                              boxShadow: isPast ? '0 0 10px rgba(56, 189, 248, 0.2)' : '0 0 0px rgba(56, 189, 248, 0)',
                              scale: 1
                            }}
                            transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
                          >
                            <step.icon className={`w-6 h-6 transition-colors duration-300 ${
                              isActive ? 'text-primary' : isPast ? 'text-primary/70' : 'text-foreground/50'
                            }`} />
                          </motion.div>
                          
                          <motion.h4 
                            className={`font-semibold text-sm mb-2 max-w-[120px] transition-colors duration-300 ${
                              isActive ? 'text-foreground' : 'text-foreground/70'
                            }`}
                            animate={{ opacity: isActive || isPast ? 1 : 0.6 }}
                          >
                            {t(`timeline.steps.${step.key}.title`)}
                          </motion.h4>
                          
                          <motion.p
                            className="text-xs text-muted-foreground max-w-[140px]"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ 
                              opacity: isActive ? 1 : 0,
                              height: isActive ? 'auto' : 0
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {t(`timeline.steps.${step.key}.description`)}
                          </motion.p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile view - stacked cards */}
                <div className="md:hidden space-y-4">
                  {timelineSteps.map((step, index) => {
                    const isActive = activeTimelineStep === index;
                    
                    return (
                      <motion.div
                        key={step.key}
                        className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-300 ${
                          isActive 
                            ? 'border-primary/40 bg-primary/10' 
                            : 'border-border/40 bg-card/20'
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        animate={isActive ? { 
                          boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)' 
                        } : {
                          boxShadow: '0 0 0px rgba(56, 189, 248, 0)'
                        }}
                      >
                        <motion.div 
                          className={`w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isActive ? 'border-primary bg-primary/20' : 'border-primary/30 bg-primary/10'
                          }`}
                          animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
                          transition={{ duration: 1, repeat: isActive ? Infinity : 0 }}
                        >
                          <step.icon className={`w-5 h-5 ${isActive ? 'text-primary' : 'text-primary/70'}`} />
                        </motion.div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{t(`timeline.steps.${step.key}.title`)}</h4>
                          <p className="text-xs text-muted-foreground">{t(`timeline.steps.${step.key}.description`)}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 6: Built for regulated environments */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section mb-10 text-center" data-testid="heading-regulated">
                {t('regulated.title')}
              </h2>
            </ScrollFade>

            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 max-w-5xl mx-auto">
              <ScrollFade>
                <div className="space-y-3">
                  {(t('regulated.bullets', { returnObjects: true }) as string[]).map((bullet, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      viewport={{ once: true }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{bullet}</span>
                    </motion.div>
                  ))}
                </div>
              </ScrollFade>

              <ScrollFade delay={0.1}>
                <div 
                  className="p-5 rounded-xl border border-primary/20"
                  style={{ backgroundColor: 'rgba(10, 20, 60, 0.4)' }}
                >
                  <div className="flex flex-wrap gap-2">
                    {(t('regulated.badges', { returnObjects: true }) as string[]).map((badge, index) => (
                      <motion.span
                        key={index}
                        className="px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs text-primary font-medium"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.08 }}
                        viewport={{ once: true }}
                      >
                        {badge}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* SECTION 7: Examples by department */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section mb-10 text-center" data-testid="heading-departments">
                {t('departments.title')}
              </h2>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {departmentCards.map((card, index) => (
                  <motion.div
                    key={card.key}
                    className="p-6 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
                    style={{ boxShadow: '0 0 20px rgba(48, 79, 254, 0.05)' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center">
                        <card.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {t(`departments.cards.${card.key}.title`)}
                      </h3>
                    </div>
                    <ul className="space-y-2 mb-4">
                      {(t(`departments.cards.${card.key}.outcomes`, { returnObjects: true }) as string[]).map((outcome, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          {outcome}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-3 border-t border-border/30">
                      <p className="text-xs text-muted-foreground">
                        <span className="text-foreground/70">{t(`departments.cards.${card.key}.input`)}</span>
                        <ArrowRight className="w-3 h-3 inline mx-1 text-primary" />
                        <span className="text-foreground/70">{t(`departments.cards.${card.key}.output`)}</span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 8: Case Story */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <div 
                className="max-w-4xl mx-auto rounded-xl border border-border/40 overflow-hidden"
                style={{ backgroundColor: 'rgba(10, 20, 60, 0.4)' }}
              >
                <div className="p-6 md:p-8 border-b border-border/30">
                  <h3 className="font-semibold text-lg text-foreground">{t('caseStory.title')}</h3>
                </div>
                <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/30">
                  {['challenge', 'approach', 'outcome'].map((section) => (
                    <div key={section} className="p-5 md:p-6">
                      <span className="label-sm text-primary block mb-3 uppercase">
                        {t(`caseStory.${section}.label`)}
                      </span>
                      <p className="text-sm text-foreground/80">
                        {t(`caseStory.${section}.text`)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-border/30 bg-card/20">
                  <p className="text-xs text-muted-foreground text-center italic">
                    {t('caseStory.footnote')}
                  </p>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 9: FAQs */}
        <UnifiedFAQ
          title={t('faqs.title')}
          lastUpdated={t('faqs.lastUpdated')}
          items={faqItems}
        />

        {/* SECTION 10: Final CTA */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <div
                className="max-w-3xl mx-auto text-center p-8 md:p-12 rounded-xl border border-primary/20 group transition-all duration-500 relative overflow-hidden"
                style={{
                  backgroundColor: 'rgba(10, 20, 60, 0.5)',
                  boxShadow: '0 0 30px rgba(48, 79, 254, 0.1)',
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse 80% 50% at 50% 100%, rgba(56, 189, 248, 0.12) 0%, transparent 70%)'
                  }}
                />
                
                <h2 className="heading-section mb-4 relative z-10">
                  {t('cta.headline')}
                </h2>
                <p className="body-md text-muted-foreground mb-8 relative z-10">
                  {t('cta.subline')}
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                  <Button size="lg" onClick={handleDemoClick} data-testid="button-cta-demo">
                    {t('cta.ctaDemo')}
                  </Button>
                  <Button size="lg" variant="outline" onClick={handleStartClick} data-testid="button-cta-start">
                    {t('cta.ctaStart')}
                  </Button>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
