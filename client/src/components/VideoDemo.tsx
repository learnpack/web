import { Card, CardContent } from '@/components/ui/card';
import { analytics } from '@/lib/analytics';
import { useTranslation } from 'react-i18next';

export default function VideoDemo() {
  const { t } = useTranslation('home');
  const handleVideoLoad = () => {
    analytics.ctaClick('watch_demo', 'video_demo');
  };

  return (
    <section id="videoDemo" className="py-24 px-4" data-testid="section-video-demo">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 
              className="text-3xl md:text-4xl font-bold"
              data-testid="text-video-demo-title"
            >
              {t('videoDemo.title')}
            </h2>
            <p 
              className="text-xl text-muted-foreground"
              data-testid="text-video-demo-subtitle"
            >
              {t('videoDemo.subtitle')}
            </p>
          </div>
          
          <Card className="hover-elevate overflow-hidden">
            <CardContent className="p-4">
              <div className="relative aspect-video rounded-md overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/dBjKIashs4Y?modestbranding=1&controls=0&showinfo=0&rel=0&iv_load_policy=3"
                  title={t('videoDemo.iframeTitle')}
                  className="w-full h-full"
                  frameBorder="0"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={handleVideoLoad}
                  data-testid="iframe-demo-video"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}