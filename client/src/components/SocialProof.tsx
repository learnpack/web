import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import CompanyLogo from './CompanyLogo';
import mdcLogo from '@assets/mdc-ce-logo_1758030096307.png';
import geeksLogo from '@assets/4geeksacademy-logo-old_1758030377841.webp';
import ucabLogo from '@assets/ucab_1758030385497.png';
import utecLogo from '@assets/utec logo_1758570957500.webp';

const companies = [
  {
    name: 'Miami Dade College School of Continuing Education',
    logo: mdcLogo,
    alt: 'Miami Dade College School of Continuing Education logo'
  },
  {
    name: '4Geeks Academy',
    logo: geeksLogo,
    alt: '4Geeks Academy logo'
  },
  {
    name: 'Universidad Católica Andrés Bello',
    logo: ucabLogo,
    alt: 'Universidad Católica Andrés Bello logo'
  },
  {
    name: 'UTEC - Universidad Tecnológica',
    logo: utecLogo,
    alt: 'UTEC Universidad Tecnológica logo'
  }
];

export default function SocialProof() {
  const { t } = useTranslation('home');
  
  // Create duplicated logos for seamless scrolling
  const duplicatedLogos = [...companies, ...companies, ...companies];
  
  // Memoize scattered star positions to prevent repositioning on re-renders
  // Moderate density with lighter stars for carousel section
  const stars = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 12}s`,
        duration: `${5 + Math.random() * 7}s`,
        size: Math.random() > 0.8 ? 2 : Math.random() > 0.5 ? 1.5 : 1,
      })),
    []
  );
  
  return (
    <section className="social-proof-section relative py-20 md:py-24 lg:py-28 overflow-hidden" data-testid="section-social-proof">
      {/* Animated star background - elegant twinkle effect, lighter for carousel section */}
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
              animation: `starTwinkleLight ${star.duration} ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}
      </div>

      <div className="content-container relative z-10">
        <div className="text-center">
          <p 
            className="text-muted-foreground font-medium mb-12"
            data-testid="text-social-proof-title"
          >
            {t('socialProof.title')}
          </p>
        </div>
      </div>
      
      {/* Animated Logo Carousel - visible immediately */}
      <div className="relative w-full opacity-100">
        <div 
          className="flex animate-scroll-logos gap-0 opacity-100"
          style={{ 
            animationDuration: '10s'
          }}
        >
          {duplicatedLogos.map((company, index) => (
            <CompanyLogo
              key={`${company.name}-${index}`}
              src={company.logo}
              alt={company.alt}
              name={company.name}
            />
          ))}
        </div>
        
        {/* Fade out edges - using same gradient colors as hero background */}
        <div className="social-proof-fade-left absolute inset-y-0 left-0 w-32 pointer-events-none z-10"></div>
        <div className="social-proof-fade-right absolute inset-y-0 right-0 w-32 pointer-events-none z-10"></div>
      </div>
    </section>
  );
}