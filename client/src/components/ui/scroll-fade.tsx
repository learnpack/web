import { useRef, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

interface ScrollFadeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ScrollFade({ children, className = '', delay = 0 }: ScrollFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}

interface ScrollFadeSectionProps {
  children: ReactNode;
  className?: string;
}

export function ScrollFadeSection({ 
  children, 
  className = ''
}: ScrollFadeSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
