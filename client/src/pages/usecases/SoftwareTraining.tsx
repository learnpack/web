import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageBackground } from '@/components/ui/page-background';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { UnifiedFAQ } from '@/components/ui/unified-faq';

export default function SoftwareTraining() {
  const { t, i18n } = useTranslation('softwareToolTraining');
  const [activeNode, setActiveNode] = useState<'upload' | 'generate' | 'practice'>('upload');
  const [activeDeployment, setActiveDeployment] = useState<'url' | 'iframe' | 'scorm'>('url');
  const [activeStep, setActiveStep] = useState(0);
  const [stepperAutoPaused, setStepperAutoPaused] = useState(false);
  const [exampleAOpen, setExampleAOpen] = useState(false);
  const [exampleBOpen, setExampleBOpen] = useState(false);
  const [exampleAHovered, setExampleAHovered] = useState(false);
  const [exampleBHovered, setExampleBHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [autoCyclePaused, setAutoCyclePaused] = useState(false);
  
  const stepperRef = useRef<HTMLDivElement>(null);
  const step0Ref = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  
  // Note: Removed useInView for stepper - now uses click/auto-advance only

  const nodes = ['upload', 'generate', 'practice'] as const;

  const handleNodeClick = useCallback((node: typeof nodes[number]) => {
    setActiveNode(node);
    setAutoCyclePaused(true);
    setTimeout(() => setAutoCyclePaused(false), 10000);
  }, []);

  useEffect(() => {
    if (autoCyclePaused) return;
    
    const interval = setInterval(() => {
      setActiveNode((current) => {
        const currentIndex = nodes.indexOf(current);
        const nextIndex = (currentIndex + 1) % nodes.length;
        return nodes[nextIndex];
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [autoCyclePaused]);

  // Stepper auto-advance: cycle 1->2->3->4->1 every 4 seconds
  useEffect(() => {
    if (stepperAutoPaused) return;
    
    const interval = setInterval(() => {
      setActiveStep((current) => (current + 1) % 4);
    }, 4000);

    return () => clearInterval(interval);
  }, [stepperAutoPaused]);

  // Handle stepper click - pause auto-advance for 10 seconds
  const handleStepClick = useCallback((index: number) => {
    setActiveStep(index);
    setStepperAutoPaused(true);
    setTimeout(() => setStepperAutoPaused(false), 10000);
  }, []);

  // Detect touch device for examples hover behavior
  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();
  }, []);

  const handleDemoClick = () => {
    analytics.ctaClick('book_demo', 'software_tool_training');
    window.location.href = '/contact';
  };

  const handleStartClick = () => {
    analytics.ctaClick('start_free', 'software_tool_training');
    const platformUrl = import.meta.env.VITE_LEARNPACK_PLATFORM || 'https://app.learnpack.co';
    window.location.href = `${platformUrl}/signup`;
  };

  const stepKeys = ['setup', 'generate', 'refine', 'publish'];
  const stepRefs = [step0Ref, step1Ref, step2Ref, step3Ref];
  
  const trainerItems = t('split.trainers.items', { returnObjects: true }) as string[];
  const learnerBubbles = t('split.learners.bubbles', { returnObjects: true }) as string[];
  const stepDetails = (key: string) => t(`stepper.steps.${key}.details`, { returnObjects: true }) as string[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LearnPack Software & Tool Training",
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
      "Built-in AI Tutor",
      "Real-Time Analytics",
      "SCORM Export",
      "iFrame Embedding"
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

        {/* SECTION 1: Hero - Compact 2-column layout */}
        <section className="section-hero relative z-10">
          <div className="content-container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              {/* Left column - Content */}
              <ScrollFade>
                <h1 
                  className="heading-hero mb-4"
                  data-testid="heading-hero"
                >
                  {t('hero.title')}
                </h1>
                <p className="body-lg mb-3 max-w-xl">
                  {t('hero.subtitle')}
                </p>
                <p className="body-md mb-6 max-w-lg">
                  {t('hero.supporting')}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    onClick={handleDemoClick}
                    data-testid="button-hero-demo"
                  >
                    {t('hero.ctaDemo')}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={handleStartClick}
                    data-testid="button-hero-start"
                  >
                    {t('hero.ctaStart')}
                  </Button>
                </div>
              </ScrollFade>

              {/* Right column - Auto-cycling 3-node diagram */}
              <ScrollFade delay={0.2} className="relative">
                {/* Three nodes with connecting line */}
                <div className="flex items-center justify-center gap-3 md:gap-5 mb-6">
                  {nodes.map((node, index) => (
                    <div key={node} className="flex items-center">
                      <motion.button
                        onClick={() => handleNodeClick(node)}
                        className={`px-4 py-2.5 md:px-5 md:py-3 rounded-full border-2 text-sm md:text-base font-medium transition-colors duration-300 ${
                          activeNode === node
                            ? 'border-primary bg-primary/15 text-primary'
                            : 'border-border/60 bg-card/30 text-foreground/70 hover:border-primary/40 hover:bg-card/50'
                        }`}
                        animate={activeNode === node ? {
                          boxShadow: '0 0 25px rgba(56, 189, 248, 0.35)',
                          scale: 1.02,
                        } : {
                          boxShadow: '0 0 0px rgba(56, 189, 248, 0)',
                          scale: 1,
                        }}
                        transition={{ duration: 0.4 }}
                        data-testid={`node-${node}`}
                      >
                        {t(`workflow.${node}.label`)}
                      </motion.button>
                      {index < 2 && (
                        <motion.div 
                          className="w-6 md:w-10 h-0.5 mx-1"
                          animate={{
                            background: activeNode === node || activeNode === nodes[index + 1]
                              ? 'linear-gradient(90deg, rgba(56, 189, 248, 0.6) 0%, rgba(56, 189, 248, 0.6) 100%)'
                              : 'linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.15) 100%)'
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </div>
                  ))}
                </div>

                {/* Shared detail panel with crossfade */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeNode}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 md:p-6 rounded-xl border border-primary/20 bg-card/40 backdrop-blur-sm text-center"
                    style={{
                      boxShadow: '0 0 30px rgba(56, 189, 248, 0.08)'
                    }}
                  >
                    <p className="text-base md:text-lg text-foreground/90">
                      {t(`workflow.${activeNode}.text`)}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* SECTION 2: Metrics Strip - Clean 3-column container */}
        <section className="section-tight relative z-10">
          <div className="content-container">
            <ScrollFade>
              <div
                className="max-w-4xl mx-auto rounded-xl border border-border/40 bg-card/20 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-primary/30"
                style={{
                  boxShadow: '0 0 20px rgba(56, 189, 248, 0.05)'
                }}
              >
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/30">
                {['cost', 'completion', 'engagement'].map((metric) => (
                  <div key={metric} className="px-6 py-5 text-center">
                    <span className="text-sm md:text-base text-foreground/85 leading-relaxed">
                      {t(`hero.metrics.${metric}`)}
                    </span>
                  </div>
                ))}
              </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 3: Definition Box */}
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
                <span className="label-sm mb-4 block">
                  What is LearnPack
                </span>
                <p className="body-lg mb-3 text-foreground/85">
                  LearnPack turns any idea or documentation into interactive training packages.
                </p>
                <p className="body-lg">
                  It generates production ready courses and includes a built in AI Tutor plus real time insight into engagement and frustration.
                </p>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 4: Where tool training breaks */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 
                className="heading-section mb-5 text-center"
                data-testid="heading-problems"
              >
                {t('problems.title')}
              </h2>
              <p className="body-lg text-center mb-12 md:mb-14 max-w-2xl mx-auto">
                {t('problems.intro')}
              </p>
            </ScrollFade>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
              {['cost', 'slow', 'completion', 'visibility'].map((key, index) => (
                <ScrollFade key={key} delay={index * 0.1}>
                  <div 
                    className="p-5 md:p-7 rounded-xl border border-primary/20 relative overflow-visible transition-all duration-300 hover:border-primary/35 h-full"
                    style={{
                      backgroundColor: 'rgba(10, 20, 60, 0.5)',
                      backgroundImage: 'linear-gradient(180deg, rgba(59, 130, 246, 0.04) 0%, transparent 100%)',
                      boxShadow: '0 0 12px rgba(59, 130, 246, 0.12), 0 0 40px rgba(48, 79, 254, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    }}
                    data-testid={`problem-${key}`}
                  >
                    <h3 className="heading-sub mb-2">
                      {t(`problems.items.${key}.title`)}
                    </h3>
                    <p className="body-md">
                      {t(`problems.items.${key}.text`)}
                    </p>
                  </div>
                </ScrollFade>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: Stepper - Compact content-driven module with auto-advance */}
        <section className="section-standard relative z-10" ref={stepperRef}>
          <div className="content-container">
            <ScrollFade>
              <h2 
                className="heading-section mb-10 md:mb-12 text-center"
                data-testid="heading-stepper"
              >
                {t('stepper.title')}
              </h2>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <div 
                className="max-w-4xl mx-auto rounded-xl border border-primary/15"
                style={{
                  backgroundColor: 'rgba(10, 17, 37, 0.5)',
                  boxShadow: '0 0 25px rgba(48, 79, 254, 0.08)',
                }}
              >
              <div className="flex flex-col lg:flex-row">
                {/* Left side - Step list */}
                <div className="p-5 md:p-6 lg:w-[45%] lg:border-r border-border/20 relative">
                  {/* Progress line - z-index 0 (lowest layer) */}
                  <div 
                    className="absolute left-9 md:left-10 top-6 bottom-6 w-px bg-border/20 rounded-full"
                    style={{ zIndex: 0 }}
                  >
                    <motion.div 
                      className="w-full bg-primary/50 rounded-full"
                      style={{ height: `${((activeStep + 1) / 4) * 100}%` }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    />
                  </div>

                  {/* Steps */}
                  <div className="space-y-3 relative">
                    {stepKeys.map((key, index) => (
                      <motion.div
                        key={key} 
                        ref={stepRefs[index]} 
                        className="pl-10 py-2 pr-3 relative text-left w-full cursor-pointer rounded-lg transition-all duration-300"
                        onClick={() => handleStepClick(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleStepClick(index)}
                        style={{ zIndex: 10 }}
                        animate={activeStep === index ? {
                          backgroundColor: 'rgba(56, 189, 248, 0.08)',
                          boxShadow: 'inset 0 0 20px rgba(56, 189, 248, 0.06)'
                        } : {
                          backgroundColor: 'transparent',
                          boxShadow: 'none'
                        }}
                        whileHover={{
                          backgroundColor: activeStep === index ? 'rgba(56, 189, 248, 0.1)' : 'rgba(255, 255, 255, 0.02)'
                        }}
                      >
                        {/* Step marker - z-index 20 with opaque background */}
                        <motion.div 
                          className={`absolute left-0 top-2.5 w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-semibold transition-colors duration-300 ${
                            activeStep >= index 
                              ? 'border-primary text-primary' 
                              : 'border-border/40 text-muted-foreground'
                          }`}
                          style={{ 
                            zIndex: 20, 
                            backgroundColor: activeStep >= index ? 'rgba(10, 17, 37, 1)' : 'rgba(10, 17, 37, 1)',
                            backgroundImage: activeStep >= index ? 'linear-gradient(135deg, rgba(56, 189, 248, 0.15) 0%, rgba(56, 189, 248, 0.05) 100%)' : 'none'
                          }}
                          animate={activeStep === index ? { 
                            boxShadow: '0 0 12px rgba(56, 189, 248, 0.4), 0 0 4px rgba(56, 189, 248, 0.2)'
                          } : activeStep > index ? {
                            boxShadow: '0 0 8px rgba(56, 189, 248, 0.2)'
                          } : {
                            boxShadow: 'none'
                          }}
                        >
                          {index + 1}
                        </motion.div>

                        {/* Step title */}
                        <h3 className={`font-medium text-sm md:text-base transition-colors duration-300 ${
                          activeStep === index ? 'text-foreground' : 'text-foreground/60 hover:text-foreground/80'
                        }`}>
                          {t(`stepper.steps.${key}.title`)}
                        </h3>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right side - Detail panel with crossfade - z-index 30 */}
                <div 
                  className="p-5 md:p-6 lg:w-[55%]"
                  style={{
                    zIndex: 30,
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.02) 0%, transparent 60%)',
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStep}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <h4 className="text-base md:text-lg font-semibold text-primary mb-4">
                        {t(`stepper.steps.${stepKeys[activeStep]}.title`)}
                      </h4>
                      <ul className="space-y-2.5">
                        {stepDetails(stepKeys[activeStep]).map((detail, i) => (
                          <li key={i} className="text-sm md:text-base text-foreground/80 flex items-start gap-2.5">
                            <span className="w-1 h-1 rounded-full bg-primary/50 mt-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 6: Trainers and Learners - Side by side on desktop */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 
                className="heading-section mb-12 md:mb-14 text-center"
                data-testid="heading-split"
              >
                {t('split.title')}
              </h2>
            </ScrollFade>

            <div className="grid lg:grid-cols-2 gap-6 lg:gap-0 max-w-5xl mx-auto">
              {/* Left: What trainers get */}
              <ScrollFade>
                <div
                  className="p-6 md:p-8 rounded-xl lg:rounded-r-none border border-primary/15 lg:border-r-0 h-full"
                  style={{
                    backgroundColor: 'rgba(10, 17, 37, 0.4)',
                  }}
                >
                  <h3 className="heading-sub mb-6">{t('split.trainers.title')}</h3>
                  <ul className="space-y-3">
                    {trainerItems.map((item, index) => (
                      <li 
                        key={index}
                        className="flex items-start gap-3 body-md"
                      >
                        <span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-xs font-semibold flex-shrink-0 flex items-center justify-center mt-0.5">
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollFade>

              {/* Right: What learners get - Bigger chat mock, vertically centered */}
              <ScrollFade delay={0.1}>
                <div
                  className="p-6 md:p-8 rounded-xl lg:rounded-l-none border border-primary/15 flex flex-col justify-center h-full"
                  style={{
                    background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.04) 0%, rgba(10, 17, 37, 0.4) 60%)',
                  }}
                >
                  <h3 className="heading-sub mb-6">{t('split.learners.title')}</h3>
                  
                  <div className="space-y-4 mb-6">
                    {learnerBubbles.map((bubble, index) => (
                      <div
                        key={index}
                        className={`p-4 md:p-5 rounded-xl body-md transition-all duration-300 hover:scale-[1.01] ${
                          index === 0 ? 'max-w-[95%] bg-primary/12 border border-primary/25 ml-auto' :
                          index === 1 ? 'max-w-[90%] bg-card/60 border border-border/50' :
                          'max-w-[85%] bg-primary/8 border border-primary/20 ml-auto'
                        }`}
                        style={{
                          boxShadow: index % 2 === 0 ? '0 0 18px rgba(56, 189, 248, 0.1)' : 'none'
                        }}
                      >
                        {bubble}
                      </div>
                    ))}
                  </div>

                  <p className="label-md text-primary/80 font-medium">
                    {t('split.learners.supporting')}
                  </p>
                </div>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* SECTION 7: Deployment options */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 
                className="heading-section mb-4 text-center"
                data-testid="heading-deployment"
              >
                {t('deployment.title')}
              </h2>
              <p className="body-lg text-center mb-10">
                {t('deployment.microcopy')}
              </p>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <div className="max-w-2xl mx-auto">
                {/* Segmented controls */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex p-1.5 rounded-full border border-border/40 bg-card/30 backdrop-blur-sm">
                    {(['url', 'iframe', 'scorm'] as const).map((option) => (
                      <button
                        key={option}
                        onClick={() => setActiveDeployment(option)}
                        className={`relative px-5 py-2.5 rounded-full text-sm md:text-base font-medium transition-all duration-300 ${
                          activeDeployment === option
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        data-testid={`chip-deployment-${option}`}
                      >
                        {activeDeployment === option && (
                          <motion.div
                            layoutId="activeDeployment"
                            className="absolute inset-0 rounded-full bg-primary/15 border border-primary/30"
                            style={{
                              boxShadow: '0 0 15px rgba(56, 189, 248, 0.2)'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{t(`deployment.options.${option}.label`)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Detail panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeDeployment}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="text-center p-6 md:p-8 rounded-xl border border-primary/15"
                    style={{
                      backgroundColor: 'rgba(10, 17, 37, 0.6)',
                      boxShadow: '0 0 30px rgba(48, 79, 254, 0.08)',
                    }}
                  >
                    <p className="body-lg text-foreground/85">
                      {t(`deployment.options.${activeDeployment}.detail`)}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 8: The AI Tutor Difference - Always visible comparison */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 
                className="heading-section mb-12 md:mb-14 text-center"
                data-testid="heading-impact"
              >
                The AI Tutor Difference
              </h2>
            </ScrollFade>
            <ScrollFade delay={0.1}>
              <div
                className="max-w-4xl mx-auto rounded-xl border border-primary/20 p-6 md:p-8"
                style={{
                  backgroundColor: 'rgba(10, 20, 60, 0.4)',
                  boxShadow: '0 0 30px rgba(48, 79, 254, 0.12)',
                }}
              >
                <div className="grid md:grid-cols-2 gap-5 mb-4">
                  {/* Without AI Tutor */}
                  <div className="p-5 rounded-xl border border-border/40 bg-card/20">
                    <h4 className="font-semibold mb-4 text-base md:text-lg">Without AI Tutor</h4>
                    
                    <div className="mb-4">
                      <p className="text-xs font-bold text-muted-foreground uppercase mb-2">During learning</p>
                      <ul className="space-y-1.5 text-sm md:text-base text-muted-foreground">
                        <li>"Learners follow static content."</li>
                        <li>"Help depends on external support."</li>
                        <li>"Confusion often leads to drop off."</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase mb-2">What gets tracked</p>
                      <ul className="space-y-1.5 text-sm md:text-base text-muted-foreground">
                        <li>"Mostly clicks and progress."</li>
                        <li>"Little visibility into frustration."</li>
                      </ul>
                    </div>
                  </div>

                  {/* With AI Tutor */}
                  <div className="p-5 rounded-xl border border-primary/30 bg-primary/5">
                    <h4 className="font-semibold mb-4 text-base md:text-lg text-primary">With AI Tutor</h4>
                    
                    <div className="mb-4">
                      <p className="text-xs font-bold text-primary/60 uppercase mb-2">During learning</p>
                      <ul className="space-y-1.5 text-sm md:text-base text-muted-foreground">
                        <li>"Learners get contextual support."</li>
                        <li>"Guidance is proactive and available 24/7."</li>
                        <li>"Socratic questions reduce disengagement."</li>
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-xs font-bold text-primary/60 uppercase mb-2">What gets tracked</p>
                      <ul className="space-y-1.5 text-sm md:text-base text-muted-foreground">
                        <li>"Engagement beyond clicking through."</li>
                        <li>"Signals of learner frustration."</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <p className="text-[10px] md:text-xs text-muted-foreground/50 italic text-center">
                  Publishing: unique URL, iFrame embed, SCORM export.
                </p>
              </div>
            </ScrollFade>
          </div>
        </section>


        <UnifiedFAQ
          title="FAQs"
          lastUpdated="Last updated: December 2025"
          items={[
            { id: 'speed', question: t('faqs.items.speed.question'), answer: t('faqs.items.speed.answer') },
            { id: 'tutor', question: t('faqs.items.tutor.question'), answer: t('faqs.items.tutor.answer') },
            { id: 'deploy', question: t('faqs.items.deploy.question'), answer: t('faqs.items.deploy.answer') },
          ]}
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
                
                <h2 className="heading-section mb-8 relative z-10">
                  {t('cta.headline')}
                </h2>
                
                <div className="flex flex-wrap justify-center gap-4 relative z-10">
                  <Button 
                    size="lg" 
                    onClick={handleDemoClick}
                    data-testid="button-cta-demo"
                  >
                    {t('cta.ctaDemo')}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={handleStartClick}
                    data-testid="button-cta-start"
                  >
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
