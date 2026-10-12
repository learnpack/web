import { Helmet } from 'react-helmet-async';

export default function TrainingCenters() {
  return (
    <>
      <Helmet>
        <title>Training Centers - LearnPack</title>
        <meta name="description" content="Explore LearnPack's network of training centers and learning hubs for corporate teams." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6" data-testid="heading-training-centers">Training Centers</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Access our global network of training centers and learning resources.
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
