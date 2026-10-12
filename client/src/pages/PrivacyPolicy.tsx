import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function PrivacyPolicy() {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/content/privacy-policy.md')
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(error => console.error('Error loading privacy policy:', error));
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO namespace="legal" metaPath="privacy.meta" />
      <Header />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg prose-slate dark:prose-invert max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </main>
      <Footer />
    </div>
  );
}