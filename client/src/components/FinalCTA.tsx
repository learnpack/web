import { Button } from '@/components/ui/button';
import { analytics } from '@/lib/analytics';

export default function FinalCTA() {
  const handleStartCreating = () => {
    analytics.ctaClick('start_creating', 'final_cta');
    const platformUrl = import.meta.env.VITE_LEARNPACK_PLATFORM || 'https://app.learnpack.co';
    window.location.href = `${platformUrl}/signup`;
  };

  const handleWatchDemo = () => {
    analytics.ctaClick('watch_demo', 'final_cta');
    // Scroll to video demo section
    const videoSection = document.getElementById('videoDemo');
    if (videoSection) {
      videoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className="py-24 bg-primary/5" data-testid="section-final-cta">
      <div className="content-container">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          <h2 
            className="text-4xl md:text-5xl font-bold"
            data-testid="text-final-cta-title"
          >
            Create once. Teach anywhere. Learn better.
          </h2>
          
          <p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-final-cta-subtitle"
          >
            Join thousands of educators and trainers who are transforming how people learn.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="px-8"
              onClick={handleStartCreating}
              data-testid="button-start-creating"
            >
              Start Creating
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8"
              onClick={handleWatchDemo}
              data-testid="button-watch-demo"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}