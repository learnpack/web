import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { PageBackground } from '@/components/ui/page-background';
import { ScrollFade } from '@/components/ui/scroll-fade';
import { UnifiedFAQ } from '@/components/ui/unified-faq';
import { 
  Eye,
  Brain,
  Zap,
  CheckCircle,
  Users,
  Shield,
  Monitor,
  GraduationCap,
  TrendingUp,
  Activity,
  Target,
  Layers,
  Radio,
  Clock,
  ArrowRight
} from 'lucide-react';
import { analytics } from '@/lib/analytics';
import { useState } from 'react';

const adaptationMetrics = {
  extraExample: { engagement: { before: 40, after: 85, change: '+45%' }, completion: { before: 35, after: 95, change: '+60%' }, difficulty: { before: 25, after: 95, change: '+70%' } },
  difficulty: { engagement: { before: 50, after: 80, change: '+30%' }, completion: { before: 40, after: 85, change: '+45%' }, difficulty: { before: 20, after: 90, change: '+70%' } },
  reinforced: { engagement: { before: 45, after: 90, change: '+45%' }, completion: { before: 30, after: 80, change: '+50%' }, difficulty: { before: 35, after: 85, change: '+50%' } },
  translation: { engagement: { before: 30, after: 75, change: '+45%' }, completion: { before: 25, after: 70, change: '+45%' }, difficulty: { before: 40, after: 80, change: '+40%' } },
};

export default function AdaptiveIntelligence() {
  const { t, i18n } = useTranslation('adaptive');
  const [selectedAdaptation, setSelectedAdaptation] = useState<keyof typeof adaptationMetrics>('extraExample');

  const handleTryClick = () => {
    analytics.ctaClick('try_adaptive', 'adaptive_page');
    const platformUrl = import.meta.env.VITE_LEARNPACK_PLATFORM || 'https://app.learnpack.co';
    window.location.href = `${platformUrl}/signup`;
  };

  const handleDemoClick = () => {
    analytics.ctaClick('book_demo', 'adaptive_page');
    window.location.href = '/contact';
  };

  const faqItems = [
    {
      id: 'q1',
      question: t('faq.questions.q1.question'),
      answer: t('faq.questions.q1.answer'),
    },
    {
      id: 'q2',
      question: t('faq.questions.q2.question'),
      answer: t('faq.questions.q2.answer'),
    },
    {
      id: 'q3',
      question: t('faq.questions.q3.question'),
      answer: t('faq.questions.q3.answer'),
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "LearnPack Adaptive Course Intelligence",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": t('meta.description'),
    "featureList": [
      "Real-time Content Adaptation",
      "Behavior Analysis",
      "Frustration Detection",
      "Difficulty Adjustment",
      "Learning Path Optimization"
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
        <link rel="canonical" href="https://learnpack.co/features/adaptive-intelligence" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Header />

      <main className="hero-animated-bg relative overflow-hidden">
        <PageBackground starCount={50} />

        <section 
          className="section-hero"
          data-testid="section-adaptive-hero"
        >
          <div className="content-container relative z-10">
            <ScrollFade>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className="text-center lg:text-left">
                  <h1 
                    className="heading-hero text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white"
                    data-testid="heading-adaptive-hero"
                  >
                    {t('hero.title')}
                  </h1>
                  <p className="body-lg text-lg md:text-xl text-white/70 mb-8 leading-relaxed max-w-xl">
                    {t('hero.subtitle')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button 
                      size="lg" 
                      onClick={handleTryClick}
                      className="bg-[#1F6FEB] hover:bg-[#3A8DFF] text-white border-[#3A8DFF]"
                      data-testid="button-hero-try"
                    >
                      {t('hero.ctaTry')}
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={handleDemoClick}
                      className="border-white/30 text-white hover:bg-white/10"
                      data-testid="button-hero-demo"
                    >
                      {t('hero.ctaDemo')}
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div 
                    className="relative w-full max-w-md rounded-xl p-6"
                    style={{
                      backgroundColor: '#0E1629',
                      border: '1px solid rgba(31, 111, 235, 0.3)',
                      boxShadow: '0 0 40px rgba(31, 111, 235, 0.12)',
                    }}
                    data-testid="mockup-adaptive-course"
                  >
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                      <div className="w-3 h-3 rounded-full bg-red-500/60" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                      <div className="w-3 h-3 rounded-full bg-green-500/60" />
                      <span className="ml-4 text-xs text-white/40">course-module.tsx</span>
                    </div>
                    
                    <div className="space-y-3 mb-6">
                      <div className="h-3 bg-white/10 rounded w-3/4" />
                      <div className="h-3 bg-white/10 rounded w-full" />
                      <div className="h-3 bg-white/10 rounded w-5/6" />
                      <div className="h-3 bg-white/10 rounded w-2/3" />
                    </div>
                    
                    <div className="space-y-3">
                      <div 
                        className="px-4 py-3 rounded-lg text-sm"
                        style={{ backgroundColor: 'rgba(31, 111, 235, 0.15)', border: '1px solid rgba(31, 111, 235, 0.3)' }}
                      >
                        <span className="text-[#3A8DFF]">{t('hero.mockup.stuck')}</span>
                      </div>
                      <div 
                        className="px-4 py-3 rounded-lg text-sm"
                        style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}
                      >
                        <span className="text-green-400">{t('hero.mockup.extraExample')}</span>
                      </div>
                      <div 
                        className="px-4 py-3 rounded-lg text-sm"
                        style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)' }}
                      >
                        <span className="text-amber-400">{t('hero.mockup.difficultyAdjusted')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard"
          data-testid="section-definition"
        >
          <div className="content-container">
            <ScrollFade>
              <div className="max-w-3xl mx-auto">
                <p className="text-xs font-medium tracking-widest text-white/50 mb-4 text-center uppercase">
                  {t('definition.label')}
                </p>
                <div 
                  className="px-8 py-8 md:px-12 md:py-10 text-center rounded-xl"
                  style={{ 
                    backgroundColor: '#0A1A2F',
                    border: '1px solid #1F6FEB',
                    boxShadow: '0 0 40px rgba(31, 111, 235, 0.15)',
                  }}
                >
                  <p className="body-lg text-lg md:text-xl leading-relaxed text-white/90">
                    {t('definition.text')}
                  </p>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard"
          data-testid="section-problem"
        >
          <div className="content-container">
            <ScrollFade>
              <div className="text-center mb-12">
                <h2 className="heading-section text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-white">
                  {t('problem.title')}
                </h2>
                <p className="body-lg text-lg text-white/60 max-w-2xl mx-auto">
                  {t('problem.subtitle')}
                </p>
              </div>
            </ScrollFade>
            
            <ScrollFade delay={0.1}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                <div 
                  className="rounded-xl p-8 text-center relative"
                  style={{
                    backgroundColor: '#0A1220',
                    border: '1px solid rgba(31, 111, 235, 0.2)',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                  }}
                  data-testid="card-problem-1"
                >
                  <div className="relative mx-auto mb-6 w-16 h-16">
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(31, 111, 235, 0.25) 0%, transparent 70%)',
                        filter: 'blur(8px)',
                      }}
                    />
                    <div 
                      className="relative w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'rgba(31, 111, 235, 0.12)',
                        border: '1px solid rgba(31, 111, 235, 0.3)',
                      }}
                    >
                      <Layers className="w-7 h-7 text-[#3A8DFF]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {t('problem.cards.oneSize.title')}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {t('problem.cards.oneSize.description')}
                  </p>
                </div>
                
                <div 
                  className="rounded-xl p-8 text-center relative"
                  style={{
                    backgroundColor: '#0A1220',
                    border: '1px solid rgba(31, 111, 235, 0.2)',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                  }}
                  data-testid="card-problem-2"
                >
                  <div className="relative mx-auto mb-6 w-16 h-16">
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(31, 111, 235, 0.25) 0%, transparent 70%)',
                        filter: 'blur(8px)',
                      }}
                    />
                    <div 
                      className="relative w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'rgba(31, 111, 235, 0.12)',
                        border: '1px solid rgba(31, 111, 235, 0.3)',
                      }}
                    >
                      <Radio className="w-7 h-7 text-[#3A8DFF]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {t('problem.cards.noSignals.title')}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {t('problem.cards.noSignals.description')}
                  </p>
                </div>
                
                <div 
                  className="rounded-xl p-8 text-center relative"
                  style={{
                    backgroundColor: '#0A1220',
                    border: '1px solid rgba(31, 111, 235, 0.2)',
                    boxShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
                  }}
                  data-testid="card-problem-3"
                >
                  <div className="relative mx-auto mb-6 w-16 h-16">
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, rgba(31, 111, 235, 0.25) 0%, transparent 70%)',
                        filter: 'blur(8px)',
                      }}
                    />
                    <div 
                      className="relative w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ 
                        backgroundColor: 'rgba(31, 111, 235, 0.12)',
                        border: '1px solid rgba(31, 111, 235, 0.3)',
                      }}
                    >
                      <Clock className="w-7 h-7 text-[#3A8DFF]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {t('problem.cards.outdated.title')}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {t('problem.cards.outdated.description')}
                  </p>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard"
          data-testid="section-what-it-does"
        >
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section text-2xl md:text-3xl lg:text-4xl font-bold mb-16 text-center text-white">
                {t('whatItDoes.title')}
              </h2>
            </ScrollFade>
            
            <ScrollFade delay={0.1}>
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative">
                  <div 
                    className="hidden md:block absolute top-12 left-[18%] right-[18%] h-[1px]"
                    style={{ 
                      backgroundColor: 'rgba(31, 111, 235, 0.5)',
                      boxShadow: '0 0 8px rgba(31, 111, 235, 0.4), 0 0 16px rgba(31, 111, 235, 0.2)',
                    }}
                    aria-hidden="true"
                  />
                  
                  <div className="flex flex-col items-center text-center relative z-10 flex-1" data-testid="block-detects">
                    <div 
                      className="w-24 h-24 flex items-center justify-center mb-5 relative"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        backgroundColor: '#0A1A2F',
                      }}
                    >
                      <div 
                        className="absolute inset-0"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          background: 'linear-gradient(135deg, rgba(31, 111, 235, 0.6), rgba(31, 111, 235, 0.2))',
                        }}
                      />
                      <div 
                        className="absolute inset-[2px] flex items-center justify-center"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          backgroundColor: '#0A1A2F',
                          boxShadow: '0 0 30px rgba(31, 111, 235, 0.3)',
                        }}
                      >
                        <Eye className="w-9 h-9 text-[#3A8DFF]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {t('whatItDoes.blocks.detects.title')}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed max-w-[200px]">
                      {t('whatItDoes.blocks.detects.description')}
                    </p>
                  </div>

                  <ArrowRight className="md:hidden w-6 h-6 text-[#3A8DFF] rotate-90" aria-hidden="true" />
                  
                  <div className="flex flex-col items-center text-center relative z-10 flex-1" data-testid="block-adjusts">
                    <div 
                      className="w-24 h-24 flex items-center justify-center mb-5 relative"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        backgroundColor: '#0A1A2F',
                      }}
                    >
                      <div 
                        className="absolute inset-0"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          background: 'linear-gradient(135deg, rgba(31, 111, 235, 0.6), rgba(31, 111, 235, 0.2))',
                        }}
                      />
                      <div 
                        className="absolute inset-[2px] flex items-center justify-center"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          backgroundColor: '#0A1A2F',
                          boxShadow: '0 0 30px rgba(31, 111, 235, 0.3)',
                        }}
                      >
                        <Brain className="w-9 h-9 text-[#3A8DFF]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {t('whatItDoes.blocks.adjusts.title')}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed max-w-[200px]">
                      {t('whatItDoes.blocks.adjusts.description')}
                    </p>
                  </div>

                  <ArrowRight className="md:hidden w-6 h-6 text-[#3A8DFF] rotate-90" aria-hidden="true" />
                  
                  <div className="flex flex-col items-center text-center relative z-10 flex-1" data-testid="block-guides">
                    <div 
                      className="w-24 h-24 flex items-center justify-center mb-5 relative"
                      style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        backgroundColor: '#0A1A2F',
                      }}
                    >
                      <div 
                        className="absolute inset-0"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          background: 'linear-gradient(135deg, rgba(31, 111, 235, 0.6), rgba(31, 111, 235, 0.2))',
                        }}
                      />
                      <div 
                        className="absolute inset-[2px] flex items-center justify-center"
                        style={{
                          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                          backgroundColor: '#0A1A2F',
                          boxShadow: '0 0 30px rgba(31, 111, 235, 0.3)',
                        }}
                      >
                        <Zap className="w-9 h-9 text-[#3A8DFF]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {t('whatItDoes.blocks.guides.title')}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed max-w-[200px]">
                      {t('whatItDoes.blocks.guides.description')}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard relative"
          data-testid="section-engine"
        >
          <div className="content-container relative z-10">
            <ScrollFade>
              <h2 className="heading-section text-2xl md:text-3xl lg:text-4xl font-bold mb-14 text-center text-white">
                {t('engine.title')}
              </h2>
            </ScrollFade>
            
            <ScrollFade delay={0.1}>
              <div className="flex justify-center">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-28 items-center justify-center">
                  <div className="flex justify-center">
                    <div className="space-y-0">
                      {[
                        { key: 'observe', icon: Eye },
                        { key: 'interpret', icon: Brain },
                        { key: 'act', icon: Zap },
                        { key: 'validate', icon: CheckCircle }
                      ].map(({ key, icon: Icon }, index) => (
                        <div key={key} className="flex items-start gap-5" data-testid={`step-${key}`}>
                          <div className="flex flex-col items-center">
                            <div 
                              className="w-12 h-12 rounded-full flex items-center justify-center"
                              style={{
                                backgroundColor: '#1F6FEB',
                                boxShadow: '0 0 20px rgba(31, 111, 235, 0.4)',
                              }}
                            >
                              <Icon className="w-6 h-6 text-white" />
                            </div>
                            {index < 3 && (
                              <div 
                                className="w-[2px] h-14"
                                style={{ backgroundColor: '#1F6FEB' }}
                              />
                            )}
                          </div>
                          <div className="pt-3 pb-6">
                            <h3 className="text-xl font-semibold text-white">
                              {t(`engine.steps.${key}`)}
                            </h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <div 
                      className="rounded-xl p-6 w-80"
                      style={{
                        backgroundColor: '#0E1629',
                        border: '1px solid rgba(31, 111, 235, 0.2)',
                      }}
                    >
                      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
                        <div className="w-3 h-3 rounded-full bg-red-500/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                        <div className="w-3 h-3 rounded-full bg-green-500/60" />
                        <span className="ml-4 text-xs text-white/40">LearnPack Course</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-4 bg-white/10 rounded flex-1" />
                          <div 
                            className="px-2 py-1 rounded text-[10px] font-medium"
                            style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#4ade80' }}
                          >
                            Adapted
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div className="h-16 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                            <span className="text-[10px] text-white/30">Module 1</span>
                          </div>
                          <div 
                            className="h-16 rounded flex items-center justify-center relative overflow-visible"
                            style={{ 
                              backgroundColor: 'rgba(31, 111, 235, 0.15)',
                              border: '1px solid rgba(31, 111, 235, 0.4)',
                            }}
                          >
                            <span className="text-[10px] text-[#3A8DFF]">Module 2</span>
                            <div 
                              className="absolute inset-0 rounded pointer-events-none"
                              style={{ boxShadow: '0 0 15px rgba(31, 111, 235, 0.3)' }}
                            />
                          </div>
                          <div className="h-16 bg-white/5 rounded border border-white/10 flex items-center justify-center">
                            <span className="text-[10px] text-white/30">Module 3</span>
                          </div>
                        </div>
                        
                        <div 
                          className="px-3 py-2 rounded-lg flex items-center gap-2"
                          style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', border: '1px solid rgba(251, 191, 36, 0.3)' }}
                        >
                          <Activity className="w-4 h-4 text-amber-400" />
                          <span className="text-xs text-amber-400">Difficulty adjusted to match pace</span>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4 pt-4 border-t border-white/10">
                          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full w-2/3 bg-[#1F6FEB] rounded-full" />
                          </div>
                          <span className="text-xs text-white/40">67%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard"
          data-testid="section-examples"
        >
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center text-white">
                {t('examples.title')}
              </h2>
              
              <p className="body-lg text-center text-white/60 mb-12 max-w-xl mx-auto">
                {t('examples.instruction')}
              </p>
            </ScrollFade>
            
            <ScrollFade delay={0.1}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
                <div className="relative">
                  <div className="space-y-4">
                    {(['extraExample', 'difficulty', 'reinforced', 'translation'] as const).map((card) => {
                      const isActive = selectedAdaptation === card;
                      return (
                        <div 
                          key={card}
                          onClick={() => setSelectedAdaptation(card)}
                          className="px-6 py-4 rounded-lg transition-all duration-300 cursor-pointer hover:translate-x-2"
                          style={{
                            backgroundColor: isActive ? '#1F6FEB' : 'rgba(10, 26, 47, 0.7)',
                            border: `1px solid ${isActive ? '#3A8DFF' : 'rgba(31, 111, 235, 0.15)'}`,
                            boxShadow: isActive ? '0 0 25px rgba(31, 111, 235, 0.3)' : 'none',
                          }}
                          data-testid={`card-example-${card}`}
                        >
                          <span className={`font-medium ${isActive ? 'text-white' : 'text-white/50'}`}>
                            {t(`examples.cards.${card}`)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div 
                  className="rounded-xl p-6"
                  style={{
                    backgroundColor: '#0E1629',
                    border: '1px solid rgba(31, 111, 235, 0.2)',
                  }}
                >
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                        <span>Engagement</span>
                        <span className="text-green-400">{adaptationMetrics[selectedAdaptation].engagement.change}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="text-[10px] text-white/40 mb-1">Before</div>
                          <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-white/40 rounded-full transition-all duration-500" 
                              style={{ width: `${adaptationMetrics[selectedAdaptation].engagement.before}%` }}
                            />
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#3A8DFF] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-[10px] text-white/40 mb-1">After</div>
                          <div className="h-4 bg-[#1F6FEB]/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#1F6FEB] rounded-full transition-all duration-500" 
                              style={{ width: `${adaptationMetrics[selectedAdaptation].engagement.after}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                        <span>Completion Rate</span>
                        <span className="text-green-400">{adaptationMetrics[selectedAdaptation].completion.change}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="text-[10px] text-white/40 mb-1">Before</div>
                          <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-white/40 rounded-full transition-all duration-500" 
                              style={{ width: `${adaptationMetrics[selectedAdaptation].completion.before}%` }}
                            />
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#3A8DFF] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-[10px] text-white/40 mb-1">After</div>
                          <div className="h-4 bg-[#1F6FEB]/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#1F6FEB] rounded-full transition-all duration-500" 
                              style={{ width: `${adaptationMetrics[selectedAdaptation].completion.after}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between text-xs text-white/60 mb-2">
                        <span>Difficulty Match</span>
                        <span className="text-green-400">{adaptationMetrics[selectedAdaptation].difficulty.change}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="text-[10px] text-white/40 mb-1">Before</div>
                          <div className="h-4 bg-white/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-white/40 rounded-full transition-all duration-500" 
                              style={{ width: `${adaptationMetrics[selectedAdaptation].difficulty.before}%` }}
                            />
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#3A8DFF] flex-shrink-0" />
                        <div className="flex-1">
                          <div className="text-[10px] text-white/40 mb-1">After</div>
                          <div className="h-4 bg-[#1F6FEB]/20 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#1F6FEB] rounded-full transition-all duration-500" 
                              style={{ width: `${adaptationMetrics[selectedAdaptation].difficulty.after}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard"
          data-testid="section-analytics"
        >
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section text-2xl md:text-3xl lg:text-4xl font-bold mb-14 text-center text-white">
                {t('analytics.title')}
              </h2>
            </ScrollFade>
            
            <ScrollFade delay={0.1}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{
                    backgroundColor: 'rgba(16, 44, 76, 0.4)',
                    border: '1px solid rgba(58, 141, 255, 0.15)',
                  }}
                  data-testid="metric-dropout"
                >
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {t('analytics.metrics.dropout.value')}
                  </p>
                  <p className="text-sm text-white/60">
                    {t('analytics.metrics.dropout.label')}
                  </p>
                </div>
                
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{
                    backgroundColor: 'rgba(16, 44, 76, 0.4)',
                    border: '1px solid rgba(58, 141, 255, 0.15)',
                  }}
                  data-testid="metric-completion"
                >
                  <p className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {t('analytics.metrics.completion.value')}
                  </p>
                  <p className="text-sm text-white/60">
                    {t('analytics.metrics.completion.label')}
                  </p>
                </div>
                
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{
                    backgroundColor: 'rgba(16, 44, 76, 0.4)',
                    border: '1px solid rgba(58, 141, 255, 0.15)',
                  }}
                  data-testid="metric-heatmaps"
                >
                  <Activity className="w-10 h-10 text-[#3A8DFF] mx-auto mb-3" />
                  <p className="text-sm text-white/60">
                    {t('analytics.metrics.heatmaps.label')}
                  </p>
                </div>
                
                <div 
                  className="rounded-xl p-6 text-center"
                  style={{
                    backgroundColor: 'rgba(16, 44, 76, 0.4)',
                    border: '1px solid rgba(58, 141, 255, 0.15)',
                  }}
                  data-testid="metric-prediction"
                >
                  <Target className="w-10 h-10 text-[#3A8DFF] mx-auto mb-3" />
                  <p className="text-sm text-white/60">
                    {t('analytics.metrics.prediction.label')}
                  </p>
                </div>
              </div>
            </ScrollFade>
          </div>
        </section>

        <section 
          className="section-standard"
          data-testid="section-use-cases"
        >
          <div className="content-container">
            <ScrollFade>
              <h2 className="heading-section text-2xl md:text-3xl lg:text-4xl font-bold mb-12 text-center text-white">
                {t('useCases.title')}
              </h2>
            </ScrollFade>
            
            <ScrollFade delay={0.1}>
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    { key: 'onboarding', icon: Users },
                    { key: 'compliance', icon: Shield },
                    { key: 'software', icon: Monitor },
                  ].map(({ key, icon: Icon }) => (
                    <div 
                      key={key}
                      className="px-6 py-3 rounded-full flex items-center gap-3"
                      style={{
                        backgroundColor: 'rgba(10, 26, 47, 0.8)',
                        border: '1px solid rgba(31, 111, 235, 0.35)',
                      }}
                      data-testid={`usecase-${key}`}
                    >
                      <Icon className="w-5 h-5 text-[#3A8DFF]" />
                      <span className="text-sm font-medium text-white/90">
                        {t(`useCases.items.${key}`)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {[
                    { key: 'customer', icon: GraduationCap },
                    { key: 'sales', icon: TrendingUp },
                  ].map(({ key, icon: Icon }) => (
                    <div 
                      key={key}
                      className="px-6 py-3 rounded-full flex items-center gap-3"
                      style={{
                        backgroundColor: 'rgba(10, 26, 47, 0.8)',
                        border: '1px solid rgba(31, 111, 235, 0.35)',
                      }}
                      data-testid={`usecase-${key}`}
                    >
                      <Icon className="w-5 h-5 text-[#3A8DFF]" />
                      <span className="text-sm font-medium text-white/90">
                        {t(`useCases.items.${key}`)}
                      </span>
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
          className="section-standard"
          data-testid="section-cta"
        >
          <div className="content-container">
            <ScrollFade>
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="heading-section text-2xl md:text-3xl lg:text-4xl font-bold mb-10 text-white">
                  {t('cta.title')}
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    onClick={handleTryClick}
                    className="bg-[#1F6FEB] hover:bg-[#3A8DFF] text-white border-[#3A8DFF]"
                    data-testid="button-cta-try"
                  >
                    {t('cta.ctaTry')}
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    onClick={handleDemoClick}
                    className="border-white/30 text-white hover:bg-white/10"
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
