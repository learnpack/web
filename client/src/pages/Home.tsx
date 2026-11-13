import Header from '@/components/Header';
import Hero from '@/components/Hero';
import SocialProof from '@/components/SocialProof';
import TrainingChallenges from '@/components/TrainingChallenges';
import SolutionShowcase from '@/components/SolutionShowcase';
import HowItWorksSection from '@/components/HowItWorksSection';
import FeaturesSection from '@/components/FeaturesSection';
import ImpactMetrics from '@/components/ImpactMetrics';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO namespace="home" />
      <Header />
      <main>
        {/* Hero and SocialProof share the same background for seamless continuity */}
        <div className="hero-animated-bg">
          <Hero />
          <SocialProof />
        </div>
        <TrainingChallenges />
        <SolutionShowcase />
        <HowItWorksSection />
        <FeaturesSection />
        <ImpactMetrics />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}