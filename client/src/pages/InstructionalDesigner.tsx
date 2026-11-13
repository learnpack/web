import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { useState, useRef, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PageBackground } from '@/components/ui/page-background';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { UnifiedFAQ } from '@/components/ui/unified-faq';
import { Stepper, Step } from '@/components/Stepper';
import CardSwap, { Card as SwapCard } from '@/components/CardSwap';
import { Link } from 'wouter';
import { gsap } from 'gsap';
import { 
  ArrowRight,
  Upload,
  Bot,
  FileEdit,
  Archive,
  RefreshCw,
  Clock,
  Layers,
  FileX,
  AlertTriangle,
  Zap,
  BookOpen,
  Edit3,
  Languages,
  Package,
  CheckCircle,
  Users,
  ShoppingBag,
  Shield,
  Wrench,
  TrendingUp,
  Quote,
  FileText,
  Briefcase
} from 'lucide-react';
import { analytics } from '@/lib/analytics';

const SPOTLIGHT_RADIUS = 300;

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

export default function InstructionalDesigner() {
  const { t, i18n } = useTranslation('instructionalDesigner');
  const [hoveredSide, setHoveredSide] = useState<'before' | 'after' | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  const handleTryClick = () => {
    analytics.ctaClick('try_learnpack', 'instructional_designer_page');
    const platformUrl = import.meta.env.VITE_LEARNPACK_PLATFORM || 'https://app.learnpack.co';
    window.location.href = `${platformUrl}/signup`;
  };

  const handleDemoClick = () => {
    analytics.ctaClick('book_demo', 'instructional_designer_page');
    window.location.href = '/contact';
  };

  const problemItems = [
    { key: 'updating', icon: RefreshCw },
    { key: 'contentChanges', icon: Clock },
    { key: 'versionDebt', icon: Layers },
    { key: 'patchingDesign', icon: FileX },
    { key: 'legacyCourses', icon: AlertTriangle }
  ];

  const capabilityCards = [
    { key: 'regeneration', icon: RefreshCw },
    { key: 'structure', icon: BookOpen },
    { key: 'editing', icon: Edit3 },
    { key: 'localization', icon: Languages },
    { key: 'publishing', icon: Package }
  ];

  const realExamples = [
    { key: 'onboarding', icon: Users, source: 'PDF handbook + org chart', result: '8-module onboarding program' },
    { key: 'product', icon: ShoppingBag, source: 'Product docs + release notes', result: 'Interactive product training' },
    { key: 'compliance', icon: Shield, source: 'Policy documents', result: 'Compliance course with assessments' },
    { key: 'internalTools', icon: Wrench, source: 'Tool documentation + screenshots', result: 'Step-by-step tool training' }
  ];

  const faqItems = [
    { id: 'control', question: t('faq.items.control.question'), answer: t('faq.items.control.answer') },
    { id: 'changes', question: t('faq.items.changes.question'), answer: t('faq.items.changes.answer') },
    { id: 'lms', question: t('faq.items.lms.question'), answer: t('faq.items.lms.answer') }
  ];

  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 12}s`,
        duration: `${5 + Math.random() * 7}s`,
        size: Math.random() > 0.7 ? 2.5 : Math.random() > 0.4 ? 1.5 : 1,
      })),
    []
  );

  useEffect(() => {
    if (!gridRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('section');
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll('.border-glow-card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        cards.forEach(card => {
          (card as HTMLElement).style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(SPOTLIGHT_RADIUS);
      let minDistance = Infinity;

      cards.forEach(card => {
        const cardElement = card as HTMLElement;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - 
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, SPOTLIGHT_RADIUS);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity = minDistance <= proximity
        ? 0.8
        : minDistance <= fadeDistance
          ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
          : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gridRef.current?.querySelectorAll('.border-glow-card').forEach(card => {
        (card as HTMLElement).style.setProperty('--glow-intensity', '0');
      });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (spotlightRef.current) {
        spotlightRef.current.remove();
        spotlightRef.current = null;
      }
    };
  }, []);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LearnPack Instructional Designer AI",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": t('meta.description'),
    "featureList": [
      "AI Course Generation",
      "Course Regeneration from Source",
      "Notion-style Editing",
      "Automatic Localization",
      "SCORM Export",
      "LMS Integration"
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
        <link rel="canonical" href="https://learnpack.co/ai-content-assistant" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="hero-animated-bg relative overflow-hidden">
        <PageBackground starCount={50} />

        {/* 1) HERO SECTION */}
        <section 
          className="section-hero relative min-h-[80vh] flex items-center"
          data-testid="section-instructional-designer-hero"
        >
          <div className="content-container relative z-10">
            <ScrollFade>
              <div className="max-w-4xl mx-auto text-center">
                <h1 
                  className="heading-hero mb-8"
                  data-testid="heading-instructional-designer-hero"
                >
                  {t('hero.title')}
                </h1>
                <p className="body-lg mb-12 max-w-3xl mx-auto">
                  {t('hero.subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={handleTryClick}
                    data-testid="button-hero-try"
                  >
                    {t('hero.ctaTry')}
                    <ArrowRight className="ml-2 h-4 w-4" />
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

                {/* Workflow Preview Visual */}
                <ScrollFade delay={0.2}>
                  <div className="mt-16 flex items-center justify-center gap-4 flex-wrap">
                    {['Upload', 'Generate', 'Review', 'Publish', 'Archive'].map((step, index) => (
                      <div key={step} className="flex items-center gap-4">
                        <div 
                          className="px-4 py-2 rounded-lg border border-primary/20 bg-background/50 text-sm font-medium"
                          style={{
                            boxShadow: '0 0 20px rgba(56, 189, 248, 0.1)'
                          }}
                        >
                          {step}
                        </div>
                        {index < 4 && (
                          <ArrowRight className="h-4 w-4 text-primary/40" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollFade>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* 2) DEFINITION BOX - Enhanced prominence */}
        <section className="section-standard relative z-10" data-testid="section-definition">
          <div className="content-container">
            <ScrollFade>
              <div 
                className="max-w-3xl mx-auto rounded-xl p-10 text-center"
                style={{
                  background: 'rgba(10, 20, 60, 0.6)',
                  border: '2px solid rgba(56, 189, 248, 0.4)',
                  boxShadow: '0 0 60px rgba(56, 189, 248, 0.15), 0 0 100px rgba(56, 189, 248, 0.08), inset 0 0 40px rgba(56, 189, 248, 0.05)'
                }}
              >
                <p className="text-lg md:text-xl font-light leading-relaxed">
                  {t('definition.en')}
                </p>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* 3) WHY INSTRUCTIONAL DESIGN BREAKS AT SCALE - TrainingChallenges style */}
        <section 
          className="relative py-20 md:py-24 lg:py-28 overflow-hidden bg-background"
          data-testid="section-problems"
        >
          <div className="section-transition-top" aria-hidden="true" />
          <div className="section-ambient-glow section-ambient-glow--primary absolute top-1/4 left-1/4 w-[400px] h-[400px]" aria-hidden="true" />
          
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {stars.map((star, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-primary"
                style={{
                  left: star.left,
                  top: star.top,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animation: `starTwinkleUnified ${star.duration} ease-in-out ${star.delay} infinite`,
                }}
              />
            ))}
          </div>
          
          <div className="section-transition-bottom" aria-hidden="true" />

          <div className="content-container relative z-10">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-problems">
                {t('problems.title')}
              </h2>
            </div>

            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problemItems.map(({ key, icon: Icon }, index) => (
                <Card 
                  key={key} 
                  className="bg-card border-card-border border-glow-card shadow-[0_0_8px_rgba(59,130,246,0.12)]"
                  style={{ backgroundColor: 'rgba(10,20,60,0.5)' }}
                  data-testid={`item-problem-${key}`}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">
                      {t(`problems.items.${key}.title`)}
                    </h3>
                    <p className="text-muted-foreground">
                      {t(`problems.items.${key}.description`)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 4) FROM SOURCE TO COURSE - Stepper component */}
        <section 
          className="relative py-20 md:py-24 lg:py-28 bg-background overflow-hidden"
          data-testid="section-workflow"
          aria-labelledby="workflow-title"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {stars.map((star, i) => (
              <div
                key={`workflow-star-${i}`}
                className="absolute rounded-full bg-primary"
                style={{
                  left: star.left,
                  top: star.top,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animation: `starTwinkleUnified ${star.duration} ease-in-out ${star.delay} infinite`,
                }}
              />
            ))}
          </div>

          <div className="section-ambient-glow section-ambient-glow--primary absolute top-1/3 right-1/4 w-[400px] h-[400px]" aria-hidden="true" />

          <div className="content-container relative z-10">
            <h2 
              id="workflow-title" 
              className="text-3xl md:text-4xl font-bold text-center mb-6"
              data-testid="heading-workflow"
            >
              {t('workflow.title')}
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
              {t('workflow.subtitle')}
            </p>

            <Stepper>
              <Step title={t('workflow.steps.upload.title')}>
                {t('workflow.steps.upload.description')}
              </Step>
              <Step title={t('workflow.steps.generate.title')}>
                {t('workflow.steps.generate.description')}
              </Step>
              <Step title={t('workflow.steps.review.title')}>
                {t('workflow.steps.review.description')}
              </Step>
              <Step title={t('workflow.steps.publish.title')}>
                {t('workflow.steps.publish.description')}
              </Step>
            </Stepper>
          </div>
        </section>

        {/* 5) BEFORE VS AFTER */}
        <section 
          className="section-standard relative z-10"
          data-testid="section-before-after"
        >
          <div className="content-container">
            <ScrollFade>
              <div className="text-center mb-14 md:mb-20">
                <h2 className="heading-section mb-4" data-testid="heading-before-after">
                  {t('beforeAfter.title')}
                </h2>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Before */}
                <div 
                  className="relative rounded-xl p-8 transition-all duration-300 cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: hoveredSide === 'before' ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: hoveredSide === 'before' ? '0 0 30px rgba(239, 68, 68, 0.1)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredSide('before')}
                  onMouseLeave={() => setHoveredSide(null)}
                  data-testid="card-before"
                >
                  <h3 className="text-lg font-semibold mb-6 text-red-400/80">
                    {t('beforeAfter.before.title')}
                  </h3>
                  <ul className="space-y-3 mb-6">
                    {(t('beforeAfter.before.items', { returnObjects: true }) as string[]).map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div 
                    className="overflow-hidden transition-all duration-300"
                    style={{ 
                      maxHeight: hoveredSide === 'before' ? '60px' : '0',
                      opacity: hoveredSide === 'before' ? 1 : 0
                    }}
                  >
                    <p className="text-xs text-muted-foreground italic border-t border-white/10 pt-4">
                      {t('beforeAfter.before.hoverText')}
                    </p>
                  </div>
                </div>

                {/* After */}
                <div 
                  className="relative rounded-xl p-8 transition-all duration-300 cursor-pointer"
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: hoveredSide === 'after' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: hoveredSide === 'after' ? '0 0 30px rgba(56, 189, 248, 0.15)' : 'none'
                  }}
                  onMouseEnter={() => setHoveredSide('after')}
                  onMouseLeave={() => setHoveredSide(null)}
                  data-testid="card-after"
                >
                  <h3 className="text-lg font-semibold mb-6 text-primary/80">
                    {t('beforeAfter.after.title')}
                  </h3>
                  <ul className="space-y-3 mb-6">
                    {(t('beforeAfter.after.items', { returnObjects: true }) as string[]).map((item, index) => (
                      <li key={index} className="flex items-center gap-3 text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div 
                    className="overflow-hidden transition-all duration-300"
                    style={{ 
                      maxHeight: hoveredSide === 'after' ? '60px' : '0',
                      opacity: hoveredSide === 'after' ? 1 : 0
                    }}
                  >
                    <p className="text-xs text-muted-foreground italic border-t border-white/10 pt-4">
                      {t('beforeAfter.after.hoverText')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* 6) CORE CAPABILITIES - CardSwap component like SolutionShowcase */}
        <section 
          className="relative py-20 md:py-24 lg:py-28 bg-background overflow-hidden"
          data-testid="section-capabilities"
        >
          <div className="section-transition-top" aria-hidden="true" />
          <div className="section-ambient-glow section-ambient-glow--primary absolute top-1/3 right-1/4 w-[400px] h-[400px]" aria-hidden="true" />
          
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {stars.map((star, i) => (
              <div
                key={`cap-star-${i}`}
                className="absolute rounded-full bg-primary"
                style={{
                  left: star.left,
                  top: star.top,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animation: `starTwinkleUnified ${star.duration} ease-in-out ${star.delay} infinite`,
                }}
              />
            ))}
          </div>
          
          <div className="section-transition-bottom" aria-hidden="true" />

          <div className="content-container relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start min-h-[750px]">
              <div className="space-y-6 text-left lg:pr-12">
                <h2 
                  className="text-3xl md:text-4xl font-bold leading-tight"
                  data-testid="heading-capabilities"
                >
                  {t('capabilities.title')}
                </h2>
                <div className="space-y-4">
                  <p className="text-base md:text-lg font-semibold text-primary leading-relaxed">
                    {t('capabilities.headline')}
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t('capabilities.body')}
                  </p>
                </div>
              </div>

              <div className="relative h-[750px]">
                <CardSwap
                  width={580}
                  height={380}
                  cardDistance={46}
                  verticalDistance={55}
                  delay={5000}
                  pauseOnHover={true}
                  easing="elastic"
                >
                  {capabilityCards.map(({ key, icon: Icon }) => (
                    <SwapCard key={key} data-testid={`card-capability-${key}`}>
                      <div className="py-8 h-full flex flex-col justify-start items-start text-left">
                        <div className="flex items-center gap-3 mb-4 px-8">
                          <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                          <h3 className="text-base font-semibold text-cyan-400 tracking-wide">
                            {t(`capabilities.items.${key}.title`)}
                          </h3>
                        </div>
                        <div className="w-full h-px bg-white/20 mb-4" />
                        <p className="text-base text-white leading-relaxed px-8">
                          {t(`capabilities.items.${key}.description`)}
                        </p>
                      </div>
                    </SwapCard>
                  ))}
                </CardSwap>
              </div>
            </div>
          </div>
        </section>

        {/* 7) REAL EXAMPLES - New merged section */}
        <section 
          className="relative py-20 md:py-24 lg:py-28 bg-background overflow-hidden"
          data-testid="section-examples"
        >
          <div className="section-transition-top" aria-hidden="true" />
          <div className="section-ambient-glow section-ambient-glow--primary absolute top-1/4 left-1/3 w-[400px] h-[400px]" aria-hidden="true" />
          
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {stars.map((star, i) => (
              <div
                key={`ex-star-${i}`}
                className="absolute rounded-full bg-primary"
                style={{
                  left: star.left,
                  top: star.top,
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  animation: `starTwinkleUnified ${star.duration} ease-in-out ${star.delay} infinite`,
                }}
              />
            ))}
          </div>
          
          <div className="section-transition-bottom" aria-hidden="true" />

          <div className="content-container relative z-10">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold" data-testid="heading-examples">
                {t('examples.title')}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t('examples.subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {realExamples.map(({ key, icon: Icon }) => (
                <Card 
                  key={key}
                  className="bg-card border-card-border border-glow-card shadow-[0_0_8px_rgba(59,130,246,0.12)]"
                  style={{ backgroundColor: 'rgba(10,20,60,0.5)' }}
                  data-testid={`card-example-${key}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-3">
                          {t(`examples.items.${key}.title`)}
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              <span className="text-foreground/70 font-medium">{t('examples.source')}:</span> {t(`examples.items.${key}.source`)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-primary/70" />
                            <span className="text-sm text-primary/90">
                              <span className="text-foreground/70 font-medium">{t('examples.result')}:</span> {t(`examples.items.${key}.result`)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 8) OUTCOMES - Scroll-based reveal */}
        <section 
          className="section-standard relative z-10"
          data-testid="section-outcomes"
        >
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(56, 189, 248, 0.05) 0%, transparent 60%)'
            }}
            aria-hidden="true"
          />

          <div className="content-container relative z-10">
            <ScrollFade>
              <div className="text-center mb-14 md:mb-20">
                <h2 className="heading-section mb-4" data-testid="heading-outcomes">
                  {t('outcomes.title')}
                </h2>
              </div>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto mb-8">
                {['cost', 'speed', 'reaction', 'completion'].map((metric, index) => (
                  <ScrollFade key={metric} delay={0.1 + index * 0.1}>
                    <div 
                      className="text-center py-6"
                      data-testid={`metric-${metric}`}
                    >
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                        {metric === 'cost' && 'Up to '}
                        {t(`outcomes.metrics.${metric}.value`)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {t(`outcomes.metrics.${metric}.label`)}
                      </div>
                    </div>
                  </ScrollFade>
                ))}
              </div>
            </ScrollFade>

            <ScrollFade delay={0.3}>
              <div className="text-center">
                <Link href="/results">
                  <Button variant="ghost" className="text-primary hover:text-primary/80">
                    {t('outcomes.link')}
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* 9) TESTIMONIAL */}
        <section 
          className="section-standard relative z-10"
          data-testid="section-testimonial"
        >
          <div className="content-container">
            <ScrollFade>
              <div 
                className="max-w-3xl mx-auto rounded-xl p-10"
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(56, 189, 248, 0.15)',
                  boxShadow: '0 0 40px rgba(56, 189, 248, 0.06)'
                }}
                data-testid="card-testimonial"
              >
                <Quote className="h-8 w-8 text-primary/30 mb-6" />
                <blockquote className="text-xl md:text-2xl font-light mb-6 leading-relaxed">
                  "{t('testimonial.quote')}"
                </blockquote>
                <p className="text-muted-foreground mb-8">
                  {t('testimonial.attribution')}
                </p>
                
                <div className="border-t border-white/10 pt-6 mb-8">
                  <div className="flex flex-wrap gap-4 justify-center">
                    {(t('testimonial.outcomes', { returnObjects: true }) as string[]).map((outcome, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-primary/60" />
                        {outcome}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <Link href="/results">
                    <Button variant="outline">
                      {t('testimonial.cta')}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* 10) FAQ */}
        <UnifiedFAQ 
          title={t('faq.title')} 
          items={faqItems}
          lastUpdated=""
        />

        {/* 11) FINAL CTA */}
        <section 
          className="section-standard relative z-10"
          data-testid="section-final-cta"
        >
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 70% 60% at 50% 80%, rgba(56, 189, 248, 0.06) 0%, transparent 50%)'
            }}
            aria-hidden="true"
          />

          <div className="content-container relative z-10">
            <ScrollFade>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="heading-section mb-8" data-testid="heading-final-cta">
                  {t('finalCta.title')}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={handleTryClick}
                    data-testid="button-final-cta-start"
                  >
                    {t('finalCta.ctaStart')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={handleDemoClick}
                    data-testid="button-final-cta-demo"
                  >
                    {t('finalCta.ctaDemo')}
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
