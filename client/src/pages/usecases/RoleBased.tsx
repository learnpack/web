import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageBackground } from '@/components/ui/page-background';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { UnifiedFAQ } from '@/components/ui/unified-faq';

type RoleType = 'sales' | 'support' | 'operations' | 'manager' | 'newHire';

export default function RoleBased() {
  const { t, i18n } = useTranslation('roleBased');
  const [activeRole, setActiveRole] = useState<RoleType>('sales');
  const [activeStep, setActiveStep] = useState(0);
  const [autoCyclePaused, setAutoCyclePaused] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);

  const roles: RoleType[] = ['sales', 'support', 'operations', 'manager', 'newHire'];

  const matrixRows = t('matrix.rows', { returnObjects: true }) as string[];
  const matrixColumns = t('matrix.columns', { returnObjects: true }) as string[];
  const matrixDataRows = useMemo(() => {
    const keys = ['examples', 'exercises', 'difficulty', 'language', 'compliance', 'analytics'];
    return keys.map(key => t(`matrix.data.${key}`, { returnObjects: true }) as string[]);
  }, [t]);

  const handleRoleClick = useCallback((role: RoleType) => {
    setActiveRole(role);
    setAutoCyclePaused(true);
    setTimeout(() => setAutoCyclePaused(false), 10000);
  }, []);

  useEffect(() => {
    if (autoCyclePaused) return;
    
    const interval = setInterval(() => {
      setActiveRole((current) => {
        const currentIndex = roles.indexOf(current);
        const nextIndex = (currentIndex + 1) % roles.length;
        return roles[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [autoCyclePaused]);

  const handleDemoClick = () => {
    analytics.ctaClick('book_demo', 'role_based');
    window.location.href = '/contact';
  };

  const handleStartClick = () => {
    analytics.ctaClick('start_free', 'role_based');
    const platformUrl = import.meta.env.VITE_LEARNPACK_PLATFORM || 'https://app.learnpack.co';
    window.location.href = `${platformUrl}/signup`;
  };

  const featureList = t('meta.featureList', { returnObjects: true }) as string[];
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LearnPack Role-Based Development",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": t('meta.description'),
    "featureList": featureList
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
              {/* Left column - Content */}
              <ScrollFade>
                <h1 
                  className="heading-hero mb-4"
                  data-testid="heading-hero"
                >
                  {t('hero.title')}
                </h1>
                <p className="body-lg mb-6 max-w-xl">
                  {t('hero.subtitle')}
                </p>

                {/* Metrics row */}
                <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-sm text-muted-foreground">
                  <span>{t('hero.metrics.cost')}</span>
                  <span className="hidden md:inline">·</span>
                  <span>{t('hero.metrics.launch')}</span>
                  <span className="hidden md:inline">·</span>
                  <span>{t('hero.metrics.completion')}</span>
                </div>

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

              {/* Right column - Role Switcher Preview */}
              <ScrollFade delay={0.2} className="relative">
                {/* Role tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-5">
                  {roles.map((role) => (
                    <motion.button
                      key={role}
                      onClick={() => handleRoleClick(role)}
                      className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors duration-300 ${
                        activeRole === role
                          ? 'border-primary bg-primary/15 text-primary'
                          : 'border-border/60 bg-card/30 text-foreground/70 hover:border-primary/40 hover:bg-card/50'
                      }`}
                      animate={activeRole === role ? {
                        boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)',
                        scale: 1.02,
                      } : {
                        boxShadow: '0 0 0px rgba(56, 189, 248, 0)',
                        scale: 1,
                      }}
                      transition={{ duration: 0.3 }}
                      data-testid={`tab-role-${role}`}
                    >
                      {t(`roles.${role}.label`)}
                    </motion.button>
                  ))}
                </div>

                {/* Preview panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRole}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="p-5 md:p-6 rounded-xl border border-primary/20 bg-card/40 backdrop-blur-sm"
                    style={{
                      boxShadow: '0 0 30px rgba(56, 189, 248, 0.08)'
                    }}
                  >
                    <div className="space-y-4">
                      <div>
                        <span className="text-xs font-bold text-primary/70 uppercase tracking-wider">{t('roleSwitcher.labels.scenario')}</span>
                        <p className="text-foreground/90 mt-1">{t(`roles.${activeRole}.scenario`)}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-primary/70 uppercase tracking-wider">{t('roleSwitcher.labels.practice')}</span>
                        <p className="text-foreground/90 mt-1">{t(`roles.${activeRole}.practice`)}</p>
                      </div>
                      <div>
                        <span className="text-xs font-bold text-primary/70 uppercase tracking-wider">{t('roleSwitcher.labels.quiz')}</span>
                        <p className="text-foreground/90 mt-1">{t(`roles.${activeRole}.quiz`)}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* SECTION 2: Definition Box */}
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
                  {t('definition.label')}
                </span>
                <p className="body-lg mb-3 text-foreground/85">
                  {t('definition.line1')}
                </p>
                <p className="body-lg text-muted-foreground">
                  {t('definition.line2')}
                </p>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 3: Problem - Two column layout */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">
              <ScrollFade>
                <h2 
                  className="heading-section mb-5"
                  data-testid="heading-problem"
                >
                  {t('problem.title')}
                </h2>
                <p className="body-lg text-muted-foreground">
                  {t('problem.body')}
                </p>
              </ScrollFade>

              {/* Right - Visual diagram */}
              <ScrollFade delay={0.1}>
                <div 
                  className="p-6 md:p-8 rounded-xl border border-primary/20"
                  style={{
                    backgroundColor: 'rgba(10, 20, 60, 0.4)',
                    boxShadow: '0 0 25px rgba(48, 79, 254, 0.08)',
                  }}
                >
                  <div className="flex items-center justify-center">
                    {/* Source */}
                    <div className="text-center">
                      <div 
                        className="w-20 h-20 md:w-24 md:h-24 rounded-xl border-2 border-primary/40 bg-primary/10 flex items-center justify-center mb-2"
                        style={{ boxShadow: '0 0 20px rgba(56, 189, 248, 0.15)' }}
                      >
                        <span className="text-sm font-medium text-primary">{t('diagram.source')}</span>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="mx-4 md:mx-6">
                      <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                        <path d="M0 10H35M35 10L28 3M35 10L28 17" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="2"/>
                      </svg>
                    </div>

                    {/* Role variants */}
                    <div className="flex flex-col gap-2">
                      {roles.map((role) => (
                        <motion.div
                          key={role}
                          className="px-3 py-1.5 rounded-lg border border-border/50 bg-card/30 text-xs md:text-sm text-foreground/80 transition-all duration-200 hover:border-primary/40 hover:bg-primary/10 cursor-default"
                          whileHover={{ 
                            scale: 1.05,
                            boxShadow: '0 0 12px rgba(56, 189, 248, 0.2)'
                          }}
                        >
                          {t(`roles.${role}.label`)}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollFade>
            </div>
          </div>
        </section>

        {/* SECTION 4: Role Switcher (Core Section) */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 
                className="heading-section mb-4 text-center"
                data-testid="heading-role-switcher"
              >
                {t('roleSwitcher.title')}
              </h2>
              <p className="body-lg text-center mb-10 max-w-2xl mx-auto text-muted-foreground">
                {t('roleSwitcher.subtitle')}
              </p>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <div className="max-w-4xl mx-auto">
                {/* Role tabs */}
                <div className="flex justify-center mb-8">
                  <div className="inline-flex flex-wrap justify-center gap-2 p-2 rounded-xl border border-border/40 bg-card/30 backdrop-blur-sm">
                    {roles.map((role) => (
                      <button
                        key={role}
                        onClick={() => handleRoleClick(role)}
                        className={`relative px-4 py-2.5 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
                          activeRole === role
                            ? 'text-primary'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                        data-testid={`tab-switcher-${role}`}
                      >
                        {activeRole === role && (
                          <motion.div
                            layoutId="activeRole"
                            className="absolute inset-0 rounded-lg bg-primary/15 border border-primary/30"
                            style={{
                              boxShadow: '0 0 15px rgba(56, 189, 248, 0.2)'
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="relative z-10">{t(`roles.${role}.label`)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Content panel */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRole}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-xl border border-primary/20 overflow-hidden"
                    style={{
                      backgroundColor: 'rgba(10, 20, 60, 0.5)',
                      boxShadow: '0 0 30px rgba(48, 79, 254, 0.1)',
                    }}
                  >
                    <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/30">
                      <div className="p-5 md:p-6">
                        <span className="label-sm text-primary block mb-3 uppercase">{t('roleSwitcher.labels.challenge')}</span>
                        <p className="body-md text-foreground/90 whitespace-pre-line">{t(`roles.${activeRole}.challenge`)}</p>
                      </div>
                      <div className="p-5 md:p-6">
                        <span className="label-sm text-primary block mb-3 uppercase">{t('roleSwitcher.labels.adaptation')}</span>
                        <p className="body-md text-foreground/90 whitespace-pre-line">{t(`roles.${activeRole}.adaptation`)}</p>
                      </div>
                      <div className="p-5 md:p-6">
                        <span className="label-sm text-primary block mb-3 uppercase">{t('roleSwitcher.labels.outcome')}</span>
                        <p className="body-md text-foreground/90 whitespace-pre-line">{t(`roles.${activeRole}.outcome`)}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 5: How It Works - Horizontal Stepper */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 
                className="heading-section mb-12 text-center"
                data-testid="heading-how-it-works"
              >
                {t('howItWorks.title')}
              </h2>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              <div className="max-w-4xl mx-auto">
                {/* Stepper */}
                <div className="flex items-start justify-between mb-8 relative">
                  {/* Connecting line */}
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-border/30 hidden md:block" />
                  
                  {[
                    { step: '1', title: t('howItWorks.steps.generate.title'), desc: t('howItWorks.steps.generate.desc') },
                    { step: '2', title: t('howItWorks.steps.define.title'), desc: t('howItWorks.steps.define.desc') },
                    { step: '3', title: t('howItWorks.steps.refine.title'), desc: t('howItWorks.steps.refine.desc') }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex flex-col items-center text-center flex-1 px-2 relative z-10"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold mb-4 transition-all duration-300 ${
                          activeStep === index 
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card/50 border border-border/50 text-foreground/70'
                        }`}
                        style={activeStep === index ? { boxShadow: '0 0 20px rgba(56, 189, 248, 0.3)' } : {}}
                        onClick={() => setActiveStep(index)}
                      >
                        {item.step}
                      </div>
                      <h4 className="font-semibold text-sm md:text-base mb-2">{item.title}</h4>
                      <p className="text-xs md:text-sm text-muted-foreground max-w-[200px]">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Inline examples for Step 3 */}
                <div 
                  className="p-5 md:p-6 rounded-xl border border-border/40 bg-card/20"
                  style={{ boxShadow: '0 0 15px rgba(48, 79, 254, 0.05)' }}
                >
                  <p className="text-sm text-muted-foreground mb-3">{t('howItWorks.examples.label')}</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      t('howItWorks.examples.items.support'),
                      t('howItWorks.examples.items.quiz'),
                      t('howItWorks.examples.items.translate')
                    ].map((example, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-sm text-foreground/80"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 6: Role Matrix */}
        <section className="section-standard relative z-10">
          <div className="content-container">
            <ScrollFade>
              <h2 
                className="heading-section mb-10 text-center"
                data-testid="heading-matrix"
              >
                {t('matrix.title')}
              </h2>
            </ScrollFade>

            <ScrollFade delay={0.1}>
              {/* Desktop Table */}
              <div className="hidden md:block max-w-5xl mx-auto overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="p-4 text-left text-sm font-semibold text-muted-foreground border-b border-border/30"></th>
                      {matrixColumns.map((col, i) => (
                        <th 
                          key={col}
                          className={`p-4 text-center text-sm font-semibold border-b border-border/30 transition-colors duration-200 ${
                            hoveredColumn === i ? 'text-primary bg-primary/5' : 'text-foreground/80'
                          }`}
                          onMouseEnter={() => setHoveredColumn(i)}
                          onMouseLeave={() => setHoveredColumn(null)}
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrixRows.map((row, rowIndex) => (
                      <tr 
                        key={row}
                        className="transition-colors duration-200 hover:bg-primary/5"
                      >
                        <td className="p-4 text-sm font-medium text-foreground/80 border-b border-border/20">{row}</td>
                        {matrixDataRows[rowIndex]?.map((cell, colIndex) => (
                          <td 
                            key={colIndex}
                            className={`p-4 text-sm text-center border-b border-border/20 transition-colors duration-200 ${
                              hoveredColumn === colIndex ? 'bg-primary/5' : ''
                            }`}
                            onMouseEnter={() => setHoveredColumn(colIndex)}
                            onMouseLeave={() => setHoveredColumn(null)}
                          >
                            <span className="text-muted-foreground">{cell}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile stacked view */}
              <div className="md:hidden space-y-6">
                {matrixColumns.slice(1).map((role, roleIndex) => (
                  <div 
                    key={role}
                    className="p-5 rounded-xl border border-border/40 bg-card/20"
                  >
                    <h4 className="font-semibold text-primary mb-4">{role}</h4>
                    <div className="space-y-3">
                      {matrixRows.map((row, rowIndex) => (
                        <div key={row} className="flex justify-between items-start gap-4">
                          <span className="text-sm text-muted-foreground flex-shrink-0">{row}</span>
                          <span className="text-sm text-right">{matrixDataRows[rowIndex]?.[roleIndex + 1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollFade>
          </div>
        </section>

        {/* SECTION 8: FAQ */}
        <UnifiedFAQ
          title={t('faqs.title')}
          lastUpdated={t('faqs.lastUpdated')}
          items={[
            { id: 'separate', question: t('faqs.items.separate.question'), answer: t('faqs.items.separate.answer') },
            { id: 'tutor', question: t('faqs.items.tutor.question'), answer: t('faqs.items.tutor.answer') },
            { id: 'export', question: t('faqs.items.export.question'), answer: t('faqs.items.export.answer') },
          ]}
        />

        {/* SECTION 9: Final CTA */}
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
