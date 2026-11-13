import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function OurMission() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO namespace="mission" />
      <Header />
      
      {/* Hero Section with Animated Background */}
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
            data-testid="heading-our-mission"
          >
            Our Mission
          </h1>
        </div>
      </section>

      {/* Mission Statements - Clean Transitions */}
      <section className="container mx-auto px-4 pb-12 max-w-6xl">
        <div className="space-y-16 md:space-y-24">
          {/* Statement 1 */}
          <div 
            className="opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.2s_forwards]"
            data-testid="text-mission-statement-1"
          >
            <p className="text-2xl md:text-4xl leading-relaxed font-light text-center max-w-5xl mx-auto">
              Learning starts with a book, syllabus, or certification. <span className="font-semibold text-foreground">Whoever controls that asset, controls the class, credentials, learning experience, and economics.</span>
            </p>
          </div>

          {/* Statement 2 */}
          <div 
            className="opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.4s_forwards]"
            data-testid="text-mission-statement-2"
          >
            <p className="text-2xl md:text-4xl leading-relaxed font-light text-center max-w-5xl mx-auto">
              LearnPack <span className="font-semibold text-primary">decentralizes this power</span>, cutting creation costs/time up to <span className="font-semibold text-primary">80%</span>, democratizing publishing in the educational world. <span className="font-semibold text-foreground">Empowering teachers, experts, and corporations to create, distribute, monetize training.</span>
            </p>
          </div>

          {/* Statement 3 */}
          <div 
            className="opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.6s_forwards]"
            data-testid="text-mission-statement-3"
          >
            <p className="text-2xl md:text-4xl leading-relaxed font-light text-center max-w-5xl mx-auto">
              Our <span className="font-semibold text-primary">AI agent</span> lets creators transform any PDF, video, or document into production-ready courses or augmented books published <span className="font-semibold text-primary">in minutes</span>.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-32 text-center opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          <div className="inline-flex flex-col items-center gap-8">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Ready to Transform Education?
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Join thousands of educators, trainers, and experts democratizing learning content creation.
            </p>
            <a
              href={`${import.meta.env.VITE_LEARNPACK_CREATOR || 'https://app.learnpack.co'}/signup`}
              className="inline-flex items-center justify-center h-14 px-10 bg-primary text-primary-foreground font-semibold rounded-lg hover-elevate active-elevate-2 transition-all text-lg"
              data-testid="button-get-started"
            >
              Get Started Free
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
