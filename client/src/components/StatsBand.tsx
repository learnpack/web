import { useEffect, useState } from 'react';

interface Stat {
  value: string;
  label: string;
  animated?: boolean;
}

const stats: Stat[] = [
  { value: '80%', label: 'cost reduction', animated: true },
  { value: '2×', label: 'completion rates', animated: true },
  { value: '1,500+', label: 'active users', animated: true }
];

function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const increment = target / 50;
    const timer = setInterval(() => {
      setCurrent(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{Math.floor(current)}{suffix}</span>;
}

export default function StatsBand() {
  return (
    <section className="py-16 border-y bg-card/50" data-testid="section-stats">
      <div className="content-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="space-y-2" data-testid={`stat-item-${index}`}>
              <div 
                className="text-4xl md:text-5xl font-bold text-primary"
                data-testid={`text-stat-value-${index}`}
              >
                {stat.value === '80%' ? (
                  <><AnimatedNumber target={80} />%</>
                ) : stat.value === '2×' ? (
                  <>2×</>
                ) : stat.value === '1,500+' ? (
                  <><AnimatedNumber target={1500} />+</>
                ) : (
                  stat.value
                )}
              </div>
              <p 
                className="text-muted-foreground font-medium"
                data-testid={`text-stat-label-${index}`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground" data-testid="text-methodology">
            * Based on customer surveys and internal analytics methodology
          </p>
        </div>
      </div>
    </section>
  );
}