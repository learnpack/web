import { useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, DollarSign, Wrench, Globe, Puzzle, TrendingDown } from "lucide-react";
import { gsap } from "gsap";

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

export default function TrainingChallenges() {
  const { t } = useTranslation('home');
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  const challenges = [
    {
      icon: Clock,
      title: t('trainingChallenges.cards.slowDeployment.title'),
      text: t('trainingChallenges.cards.slowDeployment.text'),
    },
    {
      icon: DollarSign,
      title: t('trainingChallenges.cards.highCost.title'),
      text: t('trainingChallenges.cards.highCost.text'),
    },
    {
      icon: Wrench,
      title: t('trainingChallenges.cards.hardToUpdate.title'),
      text: t('trainingChallenges.cards.hardToUpdate.text'),
    },
    {
      icon: Globe,
      title: t('trainingChallenges.cards.noScalability.title'),
      text: t('trainingChallenges.cards.noScalability.text'),
    },
    {
      icon: Puzzle,
      title: t('trainingChallenges.cards.fragmentedTools.title'),
      text: t('trainingChallenges.cards.fragmentedTools.text'),
    },
    {
      icon: TrendingDown,
      title: t('trainingChallenges.cards.lowEngagement.title'),
      text: t('trainingChallenges.cards.lowEngagement.text'),
    },
  ];

  // Memoize scattered star positions to prevent repositioning on re-renders
  // Increased density for richer visual presence
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

  // Setup spotlight effect
  useEffect(() => {
    if (!gridRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Create spotlight element
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

  return (
    <section className="relative py-20 md:py-24 lg:py-28 overflow-hidden bg-background" data-testid="section-training-challenges">
      {/* Smooth top transition gradient */}
      <div className="section-transition-top" aria-hidden="true" />
      
      {/* Single ambient glow - simplified */}
      <div className="section-ambient-glow section-ambient-glow--primary absolute top-1/4 left-1/4 w-[400px] h-[400px]" aria-hidden="true" />
      
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
        <div className="text-center space-y-4 mb-12">
          <h2 
            className="text-3xl md:text-4xl font-bold"
            data-testid="text-challenges-title"
          >
            {t('trainingChallenges.title')}
          </h2>
          <p 
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            data-testid="text-challenges-subtitle"
          >
            {t('trainingChallenges.subtitle')}
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, index) => {
            const Icon = challenge.icon;
            return (
              <Card 
                key={index} 
                className="bg-card border-card-border border-glow-card shadow-[0_0_8px_rgba(59,130,246,0.12)]"
                style={{ backgroundColor: 'rgba(10,20,60,0.5)' }}
                data-testid={`card-challenge-${index + 1}`}
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold" data-testid={`text-challenge-title-${index + 1}`}>
                    {challenge.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-challenge-text-${index + 1}`}>
                    {challenge.text}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
