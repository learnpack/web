import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Zap, TrendingDown, RefreshCw, Maximize2, FileCheck, Heart } from "lucide-react";
import CardSwap, { Card } from "./CardSwap";

export default function SolutionShowcase() {
  const { t } = useTranslation('home');

  // Increased star density for richer visual presence
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

  const solutions = [
    {
      need: t('solutionShowcase.cards.deployment.need'),
      solution: t('solutionShowcase.cards.deployment.solution'),
      icon: Zap,
    },
    {
      need: t('solutionShowcase.cards.cost.need'),
      solution: t('solutionShowcase.cards.cost.solution'),
      icon: TrendingDown,
    },
    {
      need: t('solutionShowcase.cards.adaptability.need'),
      solution: t('solutionShowcase.cards.adaptability.solution'),
      icon: RefreshCw,
    },
    {
      need: t('solutionShowcase.cards.scalability.need'),
      solution: t('solutionShowcase.cards.scalability.solution'),
      icon: Maximize2,
    },
    {
      need: t('solutionShowcase.cards.compliance.need'),
      solution: t('solutionShowcase.cards.compliance.solution'),
      icon: FileCheck,
    },
    {
      need: t('solutionShowcase.cards.engagement.need'),
      solution: t('solutionShowcase.cards.engagement.solution'),
      icon: Heart,
    },
  ];

  return (
    <section className="relative py-20 md:py-24 lg:py-28 bg-background overflow-hidden" data-testid="section-solution-showcase">
      {/* Smooth top transition gradient */}
      <div className="section-transition-top" aria-hidden="true" />
      
      {/* Single ambient glow - simplified */}
      <div className="section-ambient-glow section-ambient-glow--primary absolute top-1/3 right-1/4 w-[400px] h-[400px]" aria-hidden="true" />
      
      {/* Animated star background - elegant twinkle effect */}
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
      
      {/* Smooth bottom transition gradient */}
      <div className="section-transition-bottom" aria-hidden="true" />

      <div className="content-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start min-h-[750px]">
          <div className="space-y-6 text-left lg:pr-12">
            <h2 
              className="text-3xl md:text-4xl font-bold leading-tight"
              data-testid="text-solution-title"
            >
              {t('solutionShowcase.title')}
            </h2>
            <div className="space-y-4" data-testid="container-value-proposition">
              <p 
                className="text-base md:text-lg font-semibold text-primary leading-relaxed"
                data-testid="text-solution-headline"
              >
                {t('solutionShowcase.headline')}
              </p>
              <p 
                className="text-base md:text-lg text-muted-foreground leading-relaxed"
                data-testid="text-solution-body"
              >
                {t('solutionShowcase.body')}
              </p>
            </div>
          </div>

          <div 
            className="relative h-[750px]"
            data-testid="container-card-stack"
          >
            <CardSwap
              width={580}
              height={380}
              cardDistance={46}
              verticalDistance={55}
              delay={5000}
              pauseOnHover={true}
              easing="elastic"
            >
              {solutions.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} data-testid={`card-solution-${index + 1}`}>
                    <div className="py-8 h-full flex flex-col justify-start items-start text-left">
                      <div className="flex items-center gap-3 mb-4 px-8">
                        <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" aria-hidden="true" />
                        <h3 
                          className="text-base font-semibold text-cyan-400 tracking-wide"
                          data-testid={`text-solution-need-${index + 1}`}
                        >
                          {item.need}
                        </h3>
                      </div>
                      <div className="w-full h-px bg-white/20 mb-4" />
                      <p 
                        className="text-base text-white leading-relaxed px-8"
                        data-testid={`text-solution-text-${index + 1}`}
                      >
                        {item.solution}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}
