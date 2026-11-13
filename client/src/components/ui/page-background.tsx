import { StarBackground } from './star-background';

interface PageBackgroundProps {
  starCount?: number;
  className?: string;
}

export function PageBackground({ starCount = 50, className = '' }: PageBackgroundProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`} aria-hidden="true">
      <StarBackground starCount={starCount} />
      
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)',
        }}
      />
      
      <div 
        className="absolute top-[30%] left-[-10%] w-[700px] h-[700px] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 60%)',
        }}
      />
      
      <div 
        className="absolute top-[55%] right-[-5%] w-[600px] h-[600px] blur-[100px]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 60%)',
        }}
      />
      
      <div 
        className="absolute bottom-[10%] left-[20%] w-[600px] h-[600px] blur-[120px]"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.05) 0%, transparent 60%)',
        }}
      />
    </div>
  );
}
