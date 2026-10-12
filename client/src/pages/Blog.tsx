import { Helmet } from 'react-helmet-async';

export default function Blog() {
  return (
    <>
      <Helmet>
        <title>Blog & Insights - LearnPack</title>
        <meta name="description" content="Latest updates, insights, and best practices for corporate training and AI-powered learning." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6" data-testid="heading-blog">Blog & Insights</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Latest updates, resources, and insights on AI-powered corporate training.
            </p>
            <div className="prose prose-lg dark:prose-invert">
              <p>Blog posts coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
