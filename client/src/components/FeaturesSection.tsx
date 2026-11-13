import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Sparkles, MessageCircle, Upload, BarChart3, Globe, Wand2 } from "lucide-react";
import "./FeaturesSection.css";

export default function FeaturesSection() {
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

  const features = [
    { key: 'aiCourseGeneration', Icon: Sparkles },
    { key: 'aiTutor', Icon: MessageCircle },
    { key: 'scormExport', Icon: Upload },
    { key: 'analytics', Icon: BarChart3 },
    { key: 'translations', Icon: Globe },
    { key: 'aiEditing', Icon: Wand2 },
  ];

  return (
    <section 
      className="features-section" 
      aria-labelledby="features-title"
      data-testid="section-features"
    >
      {/* Delicate background stars */}
      <div className="features-stars" aria-hidden="true">
        {stars.map((star, i) => (
          <div
            key={i}
            className="features-star"
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
      <div className="features-glow features-glow--top-right" aria-hidden="true" />
      <div className="features-glow features-glow--bottom-left" aria-hidden="true" />
      
      {/* Central radial glow for depth */}
      <div className="features-center-glow" aria-hidden="true" />
      
      {/* Subtle diagonal light lines */}
      <div className="features-light-line features-light-line--1" aria-hidden="true" />
      <div className="features-light-line features-light-line--2" aria-hidden="true" />
      <div className="features-light-line features-light-line--3" aria-hidden="true" />

      <div className="features-inner content-container">
        <h2 
          id="features-title" 
          className="features-title"
          data-testid="text-features-title"
        >
          {t('features.title')}
        </h2>
        <p 
          className="features-subtitle"
          data-testid="text-features-subtitle"
        >
          {t('features.subtitle')}
        </p>

        <div className="features-grid">
          {features.map(({ key, Icon }, index) => (
            <div 
              key={key} 
              className="feature-item"
              data-testid={`card-feature-${index + 1}`}
            >
              <div className="feature-icon-wrapper">
                <Icon className="feature-icon" aria-hidden="true" />
              </div>
              <h3 
                className="feature-name"
                data-testid={`text-feature-title-${index + 1}`}
              >
                {t(`features.items.${key}.title`)}
              </h3>
              <p 
                className="feature-description"
                data-testid={`text-feature-desc-${index + 1}`}
              >
                {t(`features.items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
