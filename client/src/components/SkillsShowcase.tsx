import { useTranslation } from 'react-i18next';

const skillTopics = [
  { name: "Python Programming", color: "bg-blue-500" },
  { name: "React Development", color: "bg-cyan-400" },
  { name: "Machine Learning", color: "bg-purple-500" },
  { name: "Digital Marketing", color: "bg-pink-500" },
  { name: "Data Science", color: "bg-emerald-500" },
  { name: "UI/UX Design", color: "bg-orange-500" },
  { name: "Leadership Skills", color: "bg-red-500" },
  { name: "Spanish Language", color: "bg-yellow-500" },
  { name: "Photography", color: "bg-indigo-500" },
  { name: "Financial Planning", color: "bg-teal-500" },
  { name: "Node.js Backend", color: "bg-green-600" },
  { name: "Public Speaking", color: "bg-rose-500" },
  { name: "Blockchain Basics", color: "bg-violet-500" },
  { name: "Guitar Playing", color: "bg-amber-500" },
  { name: "Project Management", color: "bg-sky-500" },
  { name: "Japanese Language", color: "bg-lime-500" },
  { name: "Video Editing", color: "bg-fuchsia-500" },
  { name: "Excel Mastery", color: "bg-slate-500" },
  { name: "Creative Writing", color: "bg-emerald-400" },
  { name: "Cloud Computing", color: "bg-blue-400" },
  { name: "Sales Techniques", color: "bg-red-400" },
  { name: "Yoga Practice", color: "bg-green-400" },
  { name: "Cybersecurity", color: "bg-gray-600" },
  { name: "Cooking Skills", color: "bg-yellow-400" },
  { name: "Time Management", color: "bg-purple-400" },
  { name: "Docker & DevOps", color: "bg-blue-600" },
  { name: "Negotiation Skills", color: "bg-orange-400" },
  { name: "Drawing & Art", color: "bg-pink-400" },
  { name: "Database Design", color: "bg-cyan-500" },
  { name: "Meditation", color: "bg-indigo-400" },
  { name: "French Language", color: "bg-red-300" },
  { name: "Mobile Development", color: "bg-green-500" },
  { name: "SEO Optimization", color: "bg-blue-300" },
  { name: "3D Modeling", color: "bg-purple-300" },
  { name: "Content Strategy", color: "bg-orange-300" },
  { name: "Game Development", color: "bg-pink-300" },
  { name: "Social Media", color: "bg-cyan-300" },
  { name: "Accounting", color: "bg-yellow-300" },
  { name: "Architecture", color: "bg-indigo-300" },
  { name: "Psychology", color: "bg-teal-300" },
  { name: "Music Production", color: "bg-rose-300" },
  { name: "E-commerce", color: "bg-violet-300" },
  { name: "AI & Automation", color: "bg-amber-300" },
  { name: "Interior Design", color: "bg-sky-300" },
  { name: "German Language", color: "bg-lime-300" },
  { name: "Fitness Training", color: "bg-emerald-300" },
  { name: "Legal Studies", color: "bg-slate-300" },
  { name: "Marketing Analytics", color: "bg-blue-200" },
  { name: "Podcast Creation", color: "bg-green-300" },
  { name: "Fashion Design", color: "bg-pink-200" },
  { name: "Web Security", color: "bg-gray-500" },
  { name: "Investment Strategy", color: "bg-yellow-200" },
  { name: "Voice Acting", color: "bg-purple-200" },
  { name: "Drone Piloting", color: "bg-orange-200" },
  { name: "Graphic Design", color: "bg-cyan-200" },
  { name: "Renewable Energy", color: "bg-green-200" },
];

export default function SkillsShowcase() {
  const { t } = useTranslation('home');
  
  // Create multiple rows for a more dense cloud effect
  const createTagRow = (startIndex: number, reverse: boolean = false, delayOffset: number = 0) => {
    const rowTags = skillTopics.slice(startIndex, startIndex + 18);
    const animationClass = reverse ? 'animate-scroll-left-to-right' : 'animate-scroll-right-to-left';
    
    // Create enough duplicates to fill entire screen width + ensure seamless loop
    const duplicatedTags = [...rowTags, ...rowTags, ...rowTags, ...rowTags];
    
    return (
      <div 
        key={startIndex}
        className={`flex ${animationClass} gap-6 mb-4`}
        style={{ 
          animationDuration: '120s', // Very slow - 2 minutes per cycle
          animationDelay: `-${delayOffset}s` // Negative delay to start animation mid-cycle
        }}
      >
        {duplicatedTags.map((topic, index) => (
          <div
            key={`${startIndex}-${index}`}
            className={`${topic.color} text-white px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap shadow-md hover:scale-105 transition-transform duration-300 flex-shrink-0`}
            data-testid={`tag-${topic.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index}`}
          >
            {topic.name}
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-24 bg-card/20 overflow-hidden" data-testid="section-skills-showcase">
      <div className="content-container">
        <div className="text-center space-y-4 mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold"
            data-testid="text-skills-title"
          >
            {t('skills.title')}
          </h2>
          <p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-skills-subtitle"
          >
            {t('skills.subtitle')}
          </p>
        </div>
      </div>
      
      {/* Full Width Animated Tag Cloud */}
      <div className="relative w-full">
        <div className="flex flex-col">
          {createTagRow(0, false, 0)}    {/* Row 1: Right to Left, start at beginning */}
          {createTagRow(18, true, 40)}   {/* Row 2: Left to Right, start 1/3 through */}
          {createTagRow(36, false, 80)}  {/* Row 3: Right to Left, start 2/3 through */}
        </div>
        
        {/* Fade out edges for smooth effect */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent pointer-events-none z-10"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent pointer-events-none z-10"></div>
      </div>
    </section>
  );
}