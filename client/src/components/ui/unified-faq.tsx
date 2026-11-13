import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { StarBackground } from './star-background';
import { ScrollFade } from './scroll-fade';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  hasHtml?: boolean;
}

interface UnifiedFAQProps {
  title?: string;
  lastUpdated?: string;
  items: FAQItem[];
  className?: string;
}

export function UnifiedFAQ({ 
  title = 'FAQs',
  lastUpdated = 'Last updated: December 2025',
  items, 
  className = '' 
}: UnifiedFAQProps) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <section 
      className={`section-standard relative overflow-hidden ${className}`}
      aria-labelledby="faq-title"
    >
      <StarBackground starCount={35} />
      
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 30%, hsl(var(--primary) / 0.04) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="content-container relative z-10">
        <ScrollFade>
          <div className="text-center mb-12 md:mb-16">
            <h2 id="faq-title" className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {title}
            </h2>
            <p className="text-muted-foreground text-base">
              {lastUpdated}
            </p>
          </div>
        </ScrollFade>

        <ScrollFade delay={0.1}>
          <div className="max-w-3xl mx-auto rounded-xl overflow-hidden" style={{ background: 'hsl(220 13% 12% / 0.8)' }}>
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className={`border-b border-white/5 last:border-b-0`}
              >
                <h3 className="m-0">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left text-foreground font-medium hover:bg-white/[0.02] transition-colors"
                    aria-expanded={openItem === item.id}
                    aria-controls={`faq-content-${item.id}`}
                  >
                    <span className="pr-4 text-base">{item.question}</span>
                    <motion.span
                      animate={{ rotate: openItem === item.id ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="flex-shrink-0 text-muted-foreground"
                    >
                      <ChevronDown className="w-5 h-5" />
                    </motion.span>
                  </button>
                </h3>
                
                <AnimatePresence initial={false}>
                  {openItem === item.id && (
                    <motion.div
                      id={`faq-content-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      {item.hasHtml ? (
                        <div 
                          className="px-6 pb-5 text-muted-foreground text-base leading-relaxed prose prose-invert prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: item.answer }}
                        />
                      ) : (
                        <p className="px-6 pb-5 text-muted-foreground text-base leading-relaxed m-0">{item.answer}</p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </ScrollFade>
      </div>
    </section>
  );
}
