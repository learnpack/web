import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PageBackground } from '@/components/ui/page-background';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { UnifiedFAQ } from '@/components/ui/unified-faq';
import { 
  Bot,
  Users,
  Wrench,
  Shield,
  GraduationCap,
  ArrowRight,
  Zap,
  Focus,
  Brain,
  Compass,
  SlidersHorizontal,
  Globe,
  Clock
} from 'lucide-react';
import { analytics } from '@/lib/analytics';

export default function Hyperpersonalization() {
  const { t, i18n } = useTranslation('hyperpersonalization');

  const handleStartClick = () => {
    analytics.ctaClick('start_free', 'hyperpersonalization_page');
    const platformUrl = import.meta.env.VITE_LEARNPACK_PLATFORM || 'https://app.learnpack.co';
    window.location.href = `${platformUrl}/signup`;
  };

  const handleDemoClick = () => {
    analytics.ctaClick('book_demo', 'hyperpersonalization_page');
    window.location.href = '/contact';
  };

  const useCaseItems = [
    { key: 'onboarding', icon: Users },
    { key: 'tools', icon: Wrench },
    { key: 'compliance', icon: Shield },
    { key: 'technical', icon: GraduationCap }
  ];

  const iconMap = {
    zap: Zap,
    focus: Focus,
    brain: Brain,
    compass: Compass,
    sliders: SlidersHorizontal,
    globe: Globe,
    clock: Clock,
  } as const;

  const features = t('aiTutor.features', { returnObjects: true }) as Array<{
    icon: string;
    title: string;
    description: string;
  }>;

  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  
  const timelineRef = useRef<HTMLDivElement>(null);
  const isTimelineInView = useInView(timelineRef, { once: true, margin: "-100px" });
  const whyMattersBullets = t('whyMatters.bullets', { returnObjects: true }) as string[];

  const nextFeature = useCallback(() => {
    setActiveFeatureIndex((prev) => (prev + 1) % features.length);
  }, [features.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextFeature, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextFeature]);

  const faqItems = [
    {
      id: 'faq-1',
      question: t('faq.questions.q1.question'),
      answer: t('faq.questions.q1.answer')
    },
    {
      id: 'faq-2',
      question: t('faq.questions.q2.question'),
      answer: t('faq.questions.q2.answer')
    },
    {
      id: 'faq-3',
      question: t('faq.questions.q3.question'),
      answer: t('faq.questions.q3.answer')
    },
    {
      id: 'faq-4',
      question: t('faq.questions.q4.question'),
      answer: t('faq.questions.q4.answer')
    }
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LearnPack Hyperpersonalized Learning System",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": t('meta.description'),
    "featureList": [
      "Hyperpersonalization System",
      "Learner Profiling",
      "Adaptive Course Experience",
      "AI Tutor Support",
      "Role-based Examples",
      "Personalized Explanations"
    ]
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet key={i18n.language}>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content={t('meta.keywords')} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('meta.ogTitle')} />
        <meta property="og:description" content={t('meta.ogDescription')} />
        <meta property="og:site_name" content="LearnPack" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('meta.ogTitle')} />
        <meta name="twitter:description" content={t('meta.ogDescription')} />
        <link rel="canonical" href="https://learnpack.co/features/hyperpersonalized-learning" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="hero-animated-bg relative overflow-hidden">
        <PageBackground starCount={50} />

        <section 
          className="section-hero relative z-10"
          data-testid="section-hero"
        >
          <div className="content-container">
            <ScrollFade>
              <div className="max-w-4xl mx-auto text-center">
                <h1 
                  className="heading-hero mb-6"
                  data-testid="heading-hero"
                >
                  {t('hero.title')}
                </h1>
                <p className="body-lg mb-10 max-w-3xl mx-auto">
                  {t('hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={handleStartClick}
                    data-testid="button-hero-start"
                  >
                    {t('hero.ctaStart')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={handleDemoClick}
                    data-testid="button-hero-demo"
                  >
                    {t('hero.ctaDemo')}
                  </Button>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard relative z-10"
          data-testid="section-system"
        >
          <div className="content-container">
            <ScrollFade>
              <div className="text-center mb-14">
                <h2 className="heading-section mb-4">
                  {t('system.title')}
                </h2>
                <p className="body-lg">
                  {t('system.subtitle')}
                </p>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={0.1}>
              <div 
                className="max-w-3xl mx-auto"
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div 
                  className="flex gap-6 md:gap-10 mb-10 cursor-pointer transition-all duration-300"
                  style={{
                    opacity: hoveredStep === null ? 1 : hoveredStep === 1 ? 1 : 0.4,
                    transform: hoveredStep === 1 ? 'scale(1.02)' : 'scale(1)',
                  }}
                  onMouseEnter={() => setHoveredStep(1)}
                  data-testid="flow-step-1"
                >
                  <div className="relative flex flex-col items-center">
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold transition-all duration-300"
                      style={{
                        backgroundColor: hoveredStep === 1 ? 'rgba(48, 79, 254, 0.25)' : 'rgba(48, 79, 254, 0.15)',
                        border: hoveredStep === 1 ? '1px solid rgba(48, 79, 254, 0.6)' : '1px solid rgba(48, 79, 254, 0.4)',
                        boxShadow: hoveredStep === 1 ? '0 0 50px rgba(48, 79, 254, 0.35)' : '0 0 30px rgba(48, 79, 254, 0.2)',
                        color: 'rgb(96, 165, 250)',
                      }}
                    >
                      01
                    </div>
                    <div 
                      className="w-0.5 flex-1 mt-4"
                      style={{
                        background: 'linear-gradient(180deg, rgba(48, 79, 254, 0.5) 0%, rgba(48, 79, 254, 0.2) 100%)',
                        boxShadow: '0 0 6px rgba(48, 79, 254, 0.4)',
                        minHeight: '40px',
                      }}
                    />
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 
                      className="font-semibold mb-2 text-foreground transition-all duration-300"
                      style={{
                        fontSize: hoveredStep === 1 ? '1.5rem' : undefined,
                      }}
                    >
                      <span className="text-xl md:text-2xl">{t('system.step1.title')}</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('system.step1.description')}
                    </p>
                  </div>
                </div>
                
                <div 
                  className="flex gap-6 md:gap-10 mb-10 cursor-pointer transition-all duration-300"
                  style={{
                    opacity: hoveredStep === null ? 1 : hoveredStep === 2 ? 1 : 0.4,
                    transform: hoveredStep === 2 ? 'scale(1.02)' : 'scale(1)',
                  }}
                  onMouseEnter={() => setHoveredStep(2)}
                  data-testid="flow-step-2"
                >
                  <div className="relative flex flex-col items-center">
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold transition-all duration-300"
                      style={{
                        backgroundColor: hoveredStep === 2 ? 'rgba(48, 79, 254, 0.25)' : 'rgba(48, 79, 254, 0.15)',
                        border: hoveredStep === 2 ? '1px solid rgba(48, 79, 254, 0.6)' : '1px solid rgba(48, 79, 254, 0.4)',
                        boxShadow: hoveredStep === 2 ? '0 0 50px rgba(48, 79, 254, 0.35)' : '0 0 30px rgba(48, 79, 254, 0.2)',
                        color: 'rgb(96, 165, 250)',
                      }}
                    >
                      02
                    </div>
                    <div 
                      className="w-0.5 flex-1 mt-4"
                      style={{
                        background: 'linear-gradient(180deg, rgba(48, 79, 254, 0.5) 0%, rgba(48, 79, 254, 0.2) 100%)',
                        boxShadow: '0 0 6px rgba(48, 79, 254, 0.4)',
                        minHeight: '40px',
                      }}
                    />
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 
                      className="font-semibold mb-2 text-foreground transition-all duration-300"
                      style={{
                        fontSize: hoveredStep === 2 ? '1.5rem' : undefined,
                      }}
                    >
                      <span className="text-xl md:text-2xl">{t('system.step2.title')}</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('system.step2.description')}
                    </p>
                  </div>
                </div>
                
                <div 
                  className="flex gap-6 md:gap-10 cursor-pointer transition-all duration-300"
                  style={{
                    opacity: hoveredStep === null ? 1 : hoveredStep === 3 ? 1 : 0.4,
                    transform: hoveredStep === 3 ? 'scale(1.02)' : 'scale(1)',
                  }}
                  onMouseEnter={() => setHoveredStep(3)}
                  data-testid="flow-step-3"
                >
                  <div className="relative flex flex-col items-center">
                    <div 
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold transition-all duration-300"
                      style={{
                        backgroundColor: hoveredStep === 3 ? 'rgba(48, 79, 254, 0.3)' : 'rgba(48, 79, 254, 0.2)',
                        border: hoveredStep === 3 ? '1px solid rgba(48, 79, 254, 0.7)' : '1px solid rgba(48, 79, 254, 0.5)',
                        boxShadow: hoveredStep === 3 ? '0 0 60px rgba(48, 79, 254, 0.4)' : '0 0 40px rgba(48, 79, 254, 0.25)',
                        color: 'rgb(129, 140, 248)',
                      }}
                    >
                      03
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 
                      className="font-semibold mb-2 text-foreground transition-all duration-300"
                      style={{
                        fontSize: hoveredStep === 3 ? '1.5rem' : undefined,
                      }}
                    >
                      <span className="text-xl md:text-2xl">{t('system.step3.title')}</span>
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('system.step3.description')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard relative z-10"
          data-testid="section-example"
        >
          <div className="content-container">
            <ScrollFade>
              <div className="text-center mb-12">
                <h2 className="heading-section mb-4">
                  {t('example.title')}
                </h2>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={0.1}>
              <div className="max-w-3xl mx-auto">
                <div 
                  className="mx-auto max-w-md px-6 py-4 rounded-xl text-center mb-2"
                  style={{
                    backgroundColor: 'rgba(10, 20, 60, 0.7)',
                    border: '1px solid rgba(48, 79, 254, 0.4)',
                    boxShadow: '0 0 25px rgba(48, 79, 254, 0.15)',
                  }}
                  data-testid="example-base-course"
                >
                  <p className="text-sm text-muted-foreground mb-1">{t('example.intro')}</p>
                  <p className="font-semibold text-primary">Same base lesson</p>
                </div>
                
                <div className="relative h-16 flex justify-center">
                  <div 
                    className="absolute top-0 w-0.5 h-6"
                    style={{
                      background: 'linear-gradient(180deg, rgba(48, 79, 254, 0.5) 0%, rgba(48, 79, 254, 0.3) 100%)',
                      boxShadow: '0 0 6px rgba(48, 79, 254, 0.4)',
                    }}
                  />
                  <div 
                    className="absolute top-6 h-0.5"
                    style={{
                      width: '60%',
                      background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.4) 0%, rgba(48, 79, 254, 0.3) 50%, rgba(168, 85, 247, 0.4) 100%)',
                      boxShadow: '0 0 6px rgba(48, 79, 254, 0.3)',
                    }}
                  />
                  <div 
                    className="absolute top-6 left-[20%] w-0.5 h-10"
                    style={{
                      background: 'linear-gradient(180deg, rgba(34, 197, 94, 0.4) 0%, rgba(34, 197, 94, 0.6) 100%)',
                      boxShadow: '0 0 6px rgba(34, 197, 94, 0.4)',
                    }}
                  />
                  <div 
                    className="absolute top-6 right-[20%] w-0.5 h-10"
                    style={{
                      background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0.6) 100%)',
                      boxShadow: '0 0 6px rgba(168, 85, 247, 0.4)',
                    }}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className="p-5 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(10, 20, 60, 0.5)',
                      border: '1px solid rgba(34, 197, 94, 0.3)',
                      boxShadow: '0 0 25px rgba(34, 197, 94, 0.1)',
                    }}
                    data-testid="example-marco"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                        style={{
                          backgroundColor: 'rgba(34, 197, 94, 0.2)',
                          color: 'rgb(134, 239, 172)',
                        }}
                      >
                        M
                      </div>
                      <div>
                        <p className="font-semibold">{t('example.marco.name')}</p>
                        <p className="text-xs text-muted-foreground">{t('example.marco.profile')}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {t('example.marco.result')}
                    </p>
                  </div>
                  
                  <div 
                    className="p-5 rounded-xl"
                    style={{
                      backgroundColor: 'rgba(10, 20, 60, 0.5)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      boxShadow: '0 0 25px rgba(168, 85, 247, 0.1)',
                    }}
                    data-testid="example-laura"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                        style={{
                          backgroundColor: 'rgba(168, 85, 247, 0.2)',
                          color: 'rgb(216, 180, 254)',
                        }}
                      >
                        L
                      </div>
                      <div>
                        <p className="font-semibold">{t('example.laura.name')}</p>
                        <p className="text-xs text-muted-foreground">{t('example.laura.profile')}</p>
                      </div>
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {t('example.laura.result')}
                    </p>
                  </div>
                </div>
                
                <p className="text-center text-lg font-medium text-primary mt-8">
                  {t('example.conclusion')}
                </p>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard relative z-10"
          data-testid="section-ai-tutor"
        >
          <div className="content-container">
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <ScrollFade>
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-lg flex items-center justify-center border border-primary/25"
                        style={{
                          backgroundColor: 'rgba(31, 111, 235, 0.12)',
                        }}
                      >
                        <Bot className="w-5 h-5 text-primary" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-medium text-primary uppercase tracking-wider">AI Tutor</span>
                    </div>
                    <h2 className="heading-section mb-4">
                      {t('aiTutor.title')}
                    </h2>
                    <p className="body-lg">
                      {t('aiTutor.subtitle')}
                    </p>
                  </div>
                </ScrollFade>
                
                <ScrollFade delay={0.15}>
                  <div 
                    className="rounded-xl p-5 relative"
                    style={{
                      backgroundColor: 'rgba(10, 20, 60, 0.6)',
                      border: '1px solid rgba(48, 79, 254, 0.2)',
                      boxShadow: '0 0 40px rgba(48, 79, 254, 0.1)',
                    }}
                    data-testid="ai-tutor-mock"
                  >
                    <div className="space-y-4">
                      <div 
                        className="p-3 rounded-lg text-sm"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        "The key to effective project management is understanding resource allocation and timeline dependencies..."
                      </div>
                    </div>
                    
                    <div className="flex gap-3 items-start mt-4">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'rgba(48, 79, 254, 0.3)' }}
                      >
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                      <div 
                        className="flex-1 p-3 rounded-lg text-sm"
                        style={{
                          backgroundColor: 'rgba(48, 79, 254, 0.1)',
                          border: '1px solid rgba(48, 79, 254, 0.2)',
                        }}
                      >
                        <p className="text-xs text-primary mb-1 font-medium">AI Tutor</p>
                        <p className="text-foreground/80 italic">
                          "Think of it like coaching a sports team - you need to know your players' strengths and plan the game accordingly."
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollFade>
              </div>
            </div>
          </div>
        </section>

        <section 
          className="section-standard relative z-10"
          data-testid="section-ai-tutor-features"
        >
          <div className="content-container">
            <ScrollFade>
              <div 
                className="max-w-3xl mx-auto" 
                data-testid="ai-tutor-features"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <h3 className="heading-section mb-12 text-center">
                  {t('aiTutor.featuresTitle')}
                </h3>
                
                <div className="relative">
                  <div 
                    className="flex flex-col items-center text-center p-10 md:p-12 rounded-2xl transition-all duration-500"
                    style={{
                      backgroundColor: 'rgba(10, 20, 60, 0.5)',
                      border: '1px solid rgba(48, 79, 254, 0.2)',
                      boxShadow: '0 0 80px rgba(48, 79, 254, 0.1)',
                    }}
                  >
                    {features[activeFeatureIndex] && (() => {
                      const iconKey = features[activeFeatureIndex].icon as keyof typeof iconMap;
                      const IconComponent = iconMap[iconKey];
                      return (
                        <>
                          <div 
                            className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300"
                            style={{
                              backgroundColor: 'rgba(48, 79, 254, 0.2)',
                              border: '1px solid rgba(48, 79, 254, 0.4)',
                              boxShadow: '0 0 40px rgba(48, 79, 254, 0.25)',
                            }}
                          >
                            {IconComponent && <IconComponent className="w-10 h-10 text-primary" strokeWidth={1.5} />}
                          </div>
                          <h4 className="text-2xl font-semibold mb-4 text-foreground">
                            {features[activeFeatureIndex].title}
                          </h4>
                          <p className="body-lg max-w-lg">
                            {features[activeFeatureIndex].description}
                          </p>
                        </>
                      );
                    })()}
                  </div>
                  
                  <div className="flex justify-center gap-3 mt-8">
                    {features.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveFeatureIndex(index)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${
                          index === activeFeatureIndex 
                            ? 'bg-primary w-8' 
                            : 'bg-foreground/20 hover:bg-foreground/40 w-2.5'
                        }`}
                        aria-label={`Go to feature ${index + 1}`}
                        data-testid={`carousel-dot-${index}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard relative z-10"
          data-testid="section-why-matters"
        >
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section mb-16 text-center">
                {t('whyMatters.title')}
              </h2>
            </ScrollFade>
            
            <div 
              ref={timelineRef}
              className="max-w-4xl mx-auto"
            >
              <div className="hidden md:block relative">
                <div 
                  className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(48, 79, 254, 0.6) 20%, rgba(48, 79, 254, 0.6) 80%, transparent 100%)',
                  }}
                />
                
                <div className="flex justify-between items-center relative">
                  {whyMattersBullets.map((bullet, index) => {
                    const isAbove = index % 2 === 0;
                    
                    return (
                      <div 
                        key={index}
                        className="flex-1 flex flex-col items-center group"
                      >
                        {isAbove && (
                          <motion.div 
                            className="mb-6 px-3 text-center relative cursor-default"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                          >
                            <p className="text-sm lg:text-base text-foreground/90 leading-relaxed">
                              {bullet}
                            </p>
                            <div 
                              className="absolute bottom-0 left-1/2 h-px w-0 group-hover:w-full -translate-x-1/2 transition-all duration-500"
                              style={{
                                background: 'linear-gradient(90deg, transparent, rgba(48, 79, 254, 0.5), transparent)',
                              }}
                            />
                          </motion.div>
                        )}
                        
                        <motion.div 
                          className="relative z-10"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={isTimelineInView ? { scale: 1, opacity: 1 } : {}}
                          transition={{ delay: index * 0.15 + 0.2, duration: 0.4, type: "spring" }}
                        >
                          <motion.div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                            style={{
                              backgroundColor: 'rgba(10, 20, 60, 0.9)',
                              border: '2px solid rgba(48, 79, 254, 0.5)',
                              color: 'rgb(96, 165, 250)',
                            }}
                            animate={isTimelineInView ? {
                              boxShadow: [
                                '0 0 0px rgba(48, 79, 254, 0)',
                                '0 0 20px rgba(48, 79, 254, 0.6)',
                                '0 0 10px rgba(48, 79, 254, 0.3)',
                              ],
                            } : {}}
                            transition={{ 
                              delay: index * 0.2 + 0.3,
                              duration: 1,
                              times: [0, 0.5, 1],
                            }}
                          >
                            {index + 1}
                          </motion.div>
                        </motion.div>
                        
                        {!isAbove && (
                          <motion.div 
                            className="mt-6 px-3 text-center relative cursor-default"
                            initial={{ opacity: 0, y: -20 }}
                            animate={isTimelineInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.15, duration: 0.5 }}
                          >
                            <p className="text-sm lg:text-base text-foreground/90 leading-relaxed">
                              {bullet}
                            </p>
                            <div 
                              className="absolute bottom-0 left-1/2 h-px w-0 group-hover:w-full -translate-x-1/2 transition-all duration-500"
                              style={{
                                background: 'linear-gradient(90deg, transparent, rgba(48, 79, 254, 0.5), transparent)',
                              }}
                            />
                          </motion.div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="md:hidden relative pl-8">
                <div 
                  className="absolute left-3 top-0 bottom-0 w-px"
                  style={{
                    background: 'linear-gradient(180deg, transparent 0%, rgba(48, 79, 254, 0.6) 10%, rgba(48, 79, 254, 0.6) 90%, transparent 100%)',
                  }}
                />
                
                <div className="space-y-8">
                  {whyMattersBullets.map((bullet, index) => (
                    <motion.div 
                      key={index}
                      className="relative"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isTimelineInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.15, duration: 0.5 }}
                    >
                      <motion.div 
                        className="absolute -left-8 top-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold"
                        style={{
                          backgroundColor: 'rgba(10, 20, 60, 0.9)',
                          border: '2px solid rgba(48, 79, 254, 0.5)',
                          color: 'rgb(96, 165, 250)',
                        }}
                        animate={isTimelineInView ? {
                          boxShadow: [
                            '0 0 0px rgba(48, 79, 254, 0)',
                            '0 0 15px rgba(48, 79, 254, 0.6)',
                            '0 0 8px rgba(48, 79, 254, 0.3)',
                          ],
                        } : {}}
                        transition={{ 
                          delay: index * 0.2 + 0.3,
                          duration: 1,
                          times: [0, 0.5, 1],
                        }}
                      >
                        {index + 1}
                      </motion.div>
                      
                      <p className="text-sm text-foreground/90 leading-relaxed">
                        {bullet}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section 
          className="section-standard relative z-10"
          data-testid="section-use-cases"
        >
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section mb-10 text-center">
                {t('useCases.title')}
              </h2>
            </ScrollFade>
            
            <ScrollFade delay={0.1}>
              <div className="max-w-4xl mx-auto">
                <div 
                  className="p-6 rounded-xl mb-5 flex items-start gap-5"
                  style={{
                    backgroundColor: 'rgba(10, 20, 60, 0.5)',
                    border: '1px solid rgba(48, 79, 254, 0.25)',
                    boxShadow: '0 0 30px rgba(48, 79, 254, 0.1)',
                  }}
                  data-testid="use-case-onboarding"
                >
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/30"
                    style={{
                      backgroundColor: 'rgba(31, 111, 235, 0.15)',
                    }}
                  >
                    <Users className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {t('useCases.items.onboarding.title')}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {t('useCases.items.onboarding.description')}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {useCaseItems.slice(1).map(({ key, icon: Icon }) => (
                    <div 
                      key={key}
                      className="p-4 rounded-xl"
                      style={{
                        backgroundColor: 'rgba(10, 20, 60, 0.35)',
                        border: '1px solid rgba(48, 79, 254, 0.15)',
                      }}
                      data-testid={`use-case-${key}`}
                    >
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center mb-3 border border-primary/20"
                        style={{
                          backgroundColor: 'rgba(31, 111, 235, 0.08)',
                        }}
                      >
                        <Icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {t(`useCases.items.${key}.title`)}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-snug">
                        {t(`useCases.items.${key}.description`)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <UnifiedFAQ
          title="FAQs"
          lastUpdated="Last updated: December 2025"
          items={faqItems}
        />

        <section 
          className="section-standard relative z-10"
          data-testid="section-final-cta"
        >
          <div className="content-container">
            <ScrollFade>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="heading-section mb-8">
                  {t('cta.title')}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    className="px-10"
                    onClick={handleStartClick}
                    data-testid="button-cta-start"
                  >
                    {t('cta.ctaStart')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    onClick={handleDemoClick}
                    data-testid="button-cta-demo"
                  >
                    {t('cta.ctaDemo')}
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
