import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQSection() {
  const { t } = useTranslation('home');

  // Generate delicate background stars - matching other sections
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 12}s`,
        duration: `${5 + Math.random() * 7}s`,
        size: Math.random() > 0.7 ? 2.5 : Math.random() > 0.4 ? 1.5 : 1,
      })),
    []
  );

  const faqItems = [
    {
      id: 'what-is-learnpack',
      question: t('faq.items.whatIsLearnpack.question'),
      answer: t('faq.items.whatIsLearnpack.answer'),
    },
    {
      id: 'ai-difference',
      question: t('faq.items.aiDifference.question'),
      answer: t('faq.items.aiDifference.answer'),
      hasHtml: true,
    },
    {
      id: 'lms-integration',
      question: t('faq.items.lmsIntegration.question'),
      answer: t('faq.items.lmsIntegration.answer'),
    },
    {
      id: 'time-cost',
      question: t('faq.items.timeCost.question'),
      answer: t('faq.items.timeCost.answer'),
    },
    {
      id: 'training-types',
      question: t('faq.items.trainingTypes.question'),
      answer: t('faq.items.trainingTypes.answer'),
    },
    {
      id: 'data-security',
      question: t('faq.items.dataSecurity.question'),
      answer: t('faq.items.dataSecurity.answer'),
    },
  ];

  return (
    <section
      className="relative py-20 md:py-28 lg:py-32 bg-background overflow-hidden"
      aria-labelledby="faq-title"
      data-testid="section-faq"
    >
      {/* Smooth top transition gradient */}
      <div className="section-transition-top" aria-hidden="true" />

      {/* Soft blue radial gradient - simplified */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 30%, rgba(59, 130, 246, 0.05) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      {/* Animated star background - elegant twinkle effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animation: `starTwinkleUnified ${star.duration} ease-in-out ${star.delay} infinite`,
            }}
          />
        ))}
      </div>

      {/* Smooth bottom transition gradient */}
      <div className="section-transition-bottom" aria-hidden="true" />

      <div className="content-container relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="faq-title"
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
            data-testid="text-faq-title"
          >
            {t('faq.title')}
          </h2>
          <p
            className="text-muted-foreground text-base md:text-lg"
            data-testid="text-faq-subtitle"
          >
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Accordion - centered with max-width */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border border-white/[0.08] rounded-xl px-5 md:px-6 data-[state=open]:border-primary/20 transition-colors duration-200"
                data-testid={`faq-item-${index}`}
              >
                <AccordionTrigger
                  className="text-left hover:no-underline"
                  data-testid={`faq-trigger-${index}`}
                >
                  <span className="text-base md:text-lg font-semibold text-foreground pr-4 text-left">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent
                  className="pb-5 md:pb-6"
                  data-testid={`faq-content-${index}`}
                >
                  {item.hasHtml ? (
                    <div
                      className="text-muted-foreground text-sm md:text-base leading-relaxed prose prose-invert prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: item.answer }}
                    />
                  ) : (
                    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                      {item.answer}
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
