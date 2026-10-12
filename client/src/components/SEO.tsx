import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface SEOProps {
  namespace: string;
  metaPath?: string;
}

export default function SEO({ namespace, metaPath = 'meta' }: SEOProps) {
  const { t, i18n } = useTranslation(namespace);
  const [canonicalUrl, setCanonicalUrl] = useState('');
  
  useEffect(() => {
    // Set canonical URL client-side to avoid window references during SSR
    setCanonicalUrl(window.location.href.split('?')[0]);
  }, []);
  
  const title = t(`${metaPath}.title`);
  const description = t(`${metaPath}.description`);
  const keywords = t(`${metaPath}.keywords`, '');
  const ogTitle = t(`${metaPath}.ogTitle`, title);
  const ogDescription = t(`${metaPath}.ogDescription`, description);
  const twitterTitle = t(`${metaPath}.twitterTitle`, title);
  const twitterDescription = t(`${metaPath}.twitterDescription`, description);
  
  // Map i18n language codes to locale codes for og:locale
  const locale = i18n.language === 'es' ? 'es_ES' : 'en_US';

  return (
    <Helmet key={i18n.language}>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      <meta property="og:description" content={ogDescription} />
      <meta property="og:site_name" content="LearnPack" />
      <meta property="og:locale" content={locale} />
      {i18n.language === 'en' && <meta property="og:locale:alternate" content="es_ES" />}
      {i18n.language === 'es' && <meta property="og:locale:alternate" content="en_US" />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={twitterTitle} />
      <meta name="twitter:description" content={twitterDescription} />
      <meta name="twitter:creator" content="@learnpack" />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content={i18n.language === 'es' ? 'Spanish' : 'English'} />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="LearnPack" />
      
      {/* Canonical URL - set client-side to avoid SSR issues */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
}
