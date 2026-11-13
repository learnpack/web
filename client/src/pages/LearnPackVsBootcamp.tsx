import { Helmet } from 'react-helmet-async';

export default function LearnPackVsBootcamp() {
  return (
    <>
      <Helmet>
        <title>LearnPack vs Traditional Bootcamps - Comparison</title>
        <meta name="description" content="See how LearnPack's AI-powered platform compares to traditional coding bootcamps and training programs." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6" data-testid="heading-comparison">LearnPack vs Traditional Bootcamps</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover why companies are choosing LearnPack over traditional training methods.
            </p>
            <div className="prose prose-lg dark:prose-invert">
              <p>Comparison details coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
