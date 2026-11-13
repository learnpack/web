import { Helmet } from 'react-helmet-async';

export default function PlatformOverview() {
  return (
    <>
      <Helmet>
        <title>Platform Overview - LearnPack</title>
        <meta name="description" content="Discover how LearnPack transforms corporate training with AI-powered course creation and personalized learning experiences." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6" data-testid="heading-platform-overview">Platform Overview</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Learn how LearnPack revolutionizes corporate training with end-to-end AI automation, 
              hyperpersonalized learning paths, and adaptive course intelligence.
            </p>
            <div className="prose prose-lg dark:prose-invert">
              <p>Content coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
