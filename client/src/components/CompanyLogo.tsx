interface CompanyLogoProps {
  src: string;
  alt: string;
  name: string;
}

export default function CompanyLogo({ src, alt, name }: CompanyLogoProps) {
  // Special case for UTEC - no invert filter since it already has good contrast
  const isUtec = name.includes('UTEC');
  
  // Dark mode friendly logo styling:
  // - Base: grayscale with light brightness for light mode
  // - Dark mode: invert to make logos white/light colored for visibility
  const filterClasses = isUtec 
    ? "h-12 md:h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-all duration-300 mx-8"
    : "h-12 md:h-16 w-auto object-contain opacity-80 hover:opacity-100 dark:brightness-0 dark:invert transition-all duration-300 mx-8";
    
  return (
    <div 
      className="flex items-center justify-center flex-shrink-0"
      data-testid={`logo-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
    >
      <img
        src={src}
        alt={alt}
        width={120}
        height={64}
        loading="lazy"
        decoding="async"
        className={filterClasses}
      />
    </div>
  );
}