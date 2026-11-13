import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Clock, Rocket, Target, Users, Globe, Zap } from 'lucide-react';

export default function Timeline() {
  const milestones = [
    {
      year: '2019',
      title: 'The Beginning',
      description: 'LearnPack was founded with a simple mission: democratize learning content creation.',
      icon: Rocket,
    },
    {
      year: '2020',
      title: 'First Platform Launch',
      description: 'Released our first AI-powered course creation tool, helping educators save 80% of their time.',
      icon: Zap,
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description: 'Expanded to support multiple languages and reached 10,000+ active creators worldwide.',
      icon: Globe,
    },
    {
      year: '2022',
      title: 'Enterprise Solutions',
      description: 'Launched enterprise-grade features for Fortune 500 companies and training centers.',
      icon: Users,
    },
    {
      year: '2023',
      title: 'AI Revolution',
      description: 'Introduced hyperpersonalized learning and adaptive course intelligence powered by advanced AI.',
      icon: Target,
    },
    {
      year: '2024',
      title: 'The Future',
      description: 'Continuing to innovate and empower millions of educators and learners globally.',
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO namespace="timeline" />
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
            data-testid="heading-timeline"
          >
            Our Journey
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            From a vision to a global movement in education technology
          </p>
        </div>
      </section>

      {/* Timeline Content */}
      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border"></div>

          {/* Timeline Items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const Icon = milestone.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div
                  key={milestone.year}
                  className={`relative opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_${0.2 + index * 0.1}s_forwards]`}
                  data-testid={`timeline-item-${milestone.year}`}
                >
                  <div className="flex items-center gap-8 md:gap-16">
                    {/* Desktop: Left side content for even items */}
                    <div className={`hidden md:block md:w-1/2 ${!isEven ? 'order-2' : ''}`}>
                      {isEven && (
                        <div className="text-right pr-8">
                          <div className="text-3xl font-bold text-primary mb-2">{milestone.year}</div>
                          <h3 className="text-2xl font-semibold mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </div>
                      )}
                    </div>

                    {/* Timeline Dot */}
                    <div className="absolute left-8 md:left-1/2 md:-ml-6 flex items-center justify-center w-12 h-12 rounded-full bg-primary border-4 border-background">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>

                    {/* Mobile & Desktop: Right side content for odd items, mobile content for even items */}
                    <div className={`md:w-1/2 ml-20 md:ml-0 ${!isEven ? 'md:pl-8' : ''}`}>
                      <div className={`md:hidden mb-2 text-2xl font-bold text-primary`}>{milestone.year}</div>
                      {!isEven && (
                        <div className="hidden md:block md:pl-8">
                          <div className="text-3xl font-bold text-primary mb-2">{milestone.year}</div>
                          <h3 className="text-2xl font-semibold mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground">{milestone.description}</p>
                        </div>
                      )}
                      {isEven && (
                        <div className="md:hidden">
                          <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                          <p className="text-muted-foreground text-sm">{milestone.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-32 text-center opacity-0 translate-y-8 animate-[fadeInUp_0.8s_ease-out_0.8s_forwards]">
          <div className="inline-flex flex-col items-center gap-8">
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Write Your Own Chapter
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Join thousands of creators shaping the future of education with LearnPack.
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
