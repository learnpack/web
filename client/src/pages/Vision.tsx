import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function Vision() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO namespace="vision" />
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-[30vh] flex items-center justify-center px-4 overflow-hidden">
        {/* Vite-inspired Animated Background */}
        <div className="absolute inset-0 animated-bg-container opacity-30">
          <div className="central-orb"></div>
          <div
            className="connection-line line-1"
            style={{ "--rotation": "-45deg" } as React.CSSProperties}
          ></div>
          <div
            className="connection-line line-2"
            style={{ "--rotation": "30deg" } as React.CSSProperties}
          ></div>
          <div
            className="connection-line line-3"
            style={{ "--rotation": "120deg" } as React.CSSProperties}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto max-w-6xl text-center">
          <h1 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent animate-gradient"
            data-testid="heading-vision"
          >
            Our Vision
          </h1>
        </div>
      </section>

      {/* Vision Content */}
      <section className="container mx-auto px-4 pb-12 max-w-6xl">
        <div className="space-y-16 md:space-y-24">
          {/* Vision Statement 1 */}
          <div 
            className="opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]"
            data-testid="text-vision-statement-1"
          >
            <p className="text-2xl md:text-4xl leading-relaxed font-light text-center max-w-5xl mx-auto">
              We envision a world where <span className="font-semibold text-primary">every expert can become a publisher</span>, where knowledge flows freely, and where learning content is created at the speed of thought.
            </p>
          </div>

          {/* Vision Statement 2 */}
          <div 
            className="opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]"
            data-testid="text-vision-statement-2"
          >
            <p className="text-2xl md:text-4xl leading-relaxed font-light text-center max-w-5xl mx-auto">
              Through <span className="font-semibold text-primary">AI-powered automation</span> and <span className="font-semibold text-foreground">hyperpersonalized learning experiences</span>, we're building the infrastructure for the next generation of education.
            </p>
          </div>

          {/* Vision Statement 3 */}
          <div 
            className="opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]"
            data-testid="text-vision-statement-3"
          >
            <p className="text-2xl md:text-4xl leading-relaxed font-light text-center max-w-5xl mx-auto">
              By 2030, LearnPack will power <span className="font-semibold text-primary">1 million learning experiences</span> across industries, languages, and cultures, making quality education accessible to everyone, everywhere.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-32 text-center opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          <div className="inline-flex flex-col items-center gap-8">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Join Us on This Journey
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Be part of the movement that's democratizing learning content creation worldwide.
            </p>
            <a
              href={`${import.meta.env.VITE_LEARNPACK_CREATOR || 'https://app.learnpack.co'}/signup`}
              className="inline-flex items-center justify-center h-14 px-10 bg-primary text-primary-foreground font-semibold rounded-lg hover-elevate active-elevate-2 transition-all text-lg"
              data-testid="button-get-started"
            >
              Start Creating Today
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
