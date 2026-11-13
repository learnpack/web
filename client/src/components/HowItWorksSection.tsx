import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Stepper, Step } from "./Stepper";
import ShinyText from "./ShinyText";
import "./HowItWorksSection.css";

export default function HowItWorksSection() {
  const { t } = useTranslation('home');

  // Generate delicate background stars - increased density for richer visual presence
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

  return (
    <section 
      className="how-it-works-section" 
      aria-labelledby="how-it-works-title"
      data-testid="section-how-it-works"
    >
      {/* Delicate background stars */}
      <div className="how-it-works-stars" aria-hidden="true">
        {stars.map((star, i) => (
          <div
            key={i}
            className="how-it-works-star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      {/* Soft ambient glow spots */}
      <div className="how-it-works-glow how-it-works-glow--top-left" aria-hidden="true" />
      <div className="how-it-works-glow how-it-works-glow--center-right" aria-hidden="true" />
      <div className="how-it-works-glow how-it-works-glow--bottom-left" aria-hidden="true" />
      
      {/* Soft circular glow behind timeline */}
      <div className="how-it-works-timeline-glow" aria-hidden="true" />

      <div className="how-it-works-inner content-container">
        <h2 
          id="how-it-works-title" 
          className="how-it-works-title"
          data-testid="text-how-it-works-title"
        >
          {t('howItWorksNew.title')}
        </h2>
        <p 
          className="how-it-works-subtitle"
          data-testid="text-how-it-works-subtitle"
        >
          <ShinyText text={t('howItWorksNew.subtitle')} speed={4} />
        </p>

        <Stepper>
          <Step title={t('howItWorksNew.step1.title')}>
            {t('howItWorksNew.step1.text')}
          </Step>
          <Step title={t('howItWorksNew.step2.title')}>
            {t('howItWorksNew.step2.text')}
          </Step>
          <Step title={t('howItWorksNew.step3.title')}>
            {t('howItWorksNew.step3.text')}
          </Step>
        </Stepper>
      </div>
    </section>
  );
}
