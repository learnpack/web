import { Helmet } from 'react-helmet-async';

export default function Results() {
  return (
    <>
      <Helmet>
        <title>Results & Case Studies - LearnPack</title>
        <meta name="description" content="See how companies achieve 2x completion rates and 80% cost savings with LearnPack's AI-powered training platform." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6" data-testid="heading-results">Results & Case Studies</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Real results from companies using LearnPack to transform their training programs.
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
