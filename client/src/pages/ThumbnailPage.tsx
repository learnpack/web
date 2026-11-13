import { useLocation } from 'wouter';
import { useTranslation } from 'react-i18next';
import learnpackLogoDark from '@assets/logo-small-learnpack-dark_1759003192973.png';

export default function ThumbnailPage() {
  const [location] = useLocation();
  const { t } = useTranslation();
  
  const params = new URLSearchParams(window.location.search);
  const path = params.get('path') || '/';
  
  const getThumbnailContent = () => {
    switch (path) {
      case '/':
      case '/home':
        return {
          namespace: 'home',
          title: t('home:hero.title', 'Turn ideas into interactive learning packages in minutes'),
          subtitle: t('home:hero.trustLine', 'Cut training creation costs by 80% and double completion rates.'),
          gradient: 'from-purple-600 via-purple-400 to-purple-600'
        };
      
      case '/pricing':
        return {
          namespace: 'pricing',
          title: t('pricing:pricing.title', 'Transparent Pricing'),
          subtitle: t('pricing:pricing.subtitle', 'Choose the components you need. Scale as you grow.'),
          gradient: 'from-blue-600 via-purple-400 to-purple-600'
        };
      
      case '/our-mission':
        return {
          namespace: 'mission',
          title: t('mission:hero.title', 'Our Mission'),
          subtitle: 'Democratizing education by decentralizing content creation',
          gradient: 'from-purple-600 via-pink-400 to-purple-600'
        };
      
      case '/terms-and-conditions':
        return {
          namespace: 'legal',
          title: 'Terms and Conditions',
          subtitle: 'Legal terms and conditions for using LearnPack',
          gradient: 'from-purple-600 via-indigo-400 to-purple-600'
        };
      
      case '/privacy-policy':
        return {
          namespace: 'legal',
          title: 'Privacy Policy',
          subtitle: 'How we protect and handle your data',
          gradient: 'from-purple-600 via-blue-400 to-purple-600'
        };
      
      default:
        return {
          namespace: 'home',
          title: 'LearnPack',
          subtitle: 'Turn ideas into interactive learning packages',
          gradient: 'from-purple-600 via-purple-400 to-purple-600'
        };
    }
  };

  const content = getThumbnailContent();

  return (
    <div 
      className="relative overflow-hidden bg-gradient-to-br from-[#0f1419] to-[#1a1f2e]"
      style={{ 
        width: '1200px', 
        height: '630px',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-between p-16">
        {/* Header with Logo */}
        <div className="flex items-center gap-4">
          <img 
            src={learnpackLogoDark} 
            alt="LearnPack" 
            className="h-12 w-auto"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl">
          <h1 
            className={`text-7xl font-bold mb-6 bg-gradient-to-r ${content.gradient} bg-clip-text text-transparent leading-tight`}
            style={{ lineHeight: '1.1' }}
          >
            {content.title}
          </h1>
          <p className="text-3xl text-gray-300 font-light leading-relaxed">
            {content.subtitle}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-gray-400 text-xl">
            learnpack.co{path !== '/' ? path : ''}
          </div>
          <div className="flex items-center gap-6 text-gray-400 text-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>AI-Powered</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
              <span>Export Anywhere</span>
            </div>
          </div>
        </div>
      </div>

      {/* Glass morphism overlay on right side */}
      <div 
        className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
        style={{
          background: 'rgba(139, 92, 246, 0.1)',
          backdropFilter: 'blur(40px)',
          border: '1px solid rgba(139, 92, 246, 0.2)'
        }}
      />
    </div>
  );
}
