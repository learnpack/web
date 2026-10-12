import { Helmet } from 'react-helmet-async';

export default function AIContentAssistant() {
  return (
    <>
      <Helmet>
        <title>AI Content Assistant - LearnPack</title>
        <meta name="description" content="Create interactive training content 10x faster with LearnPack's AI-powered content creation assistant." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6" data-testid="heading-ai-assistant">AI Content Assistant</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Transform any document, video, or idea into a complete interactive course with AI assistance.
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
