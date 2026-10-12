import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ChevronDown, Settings, Brain, BarChart3, FileCheck2, Laptop, Users, CheckSquare, TrendingUp, Mail, Building2 } from 'lucide-react';
import { analytics } from '@/lib/analytics';
import learnpackLogoDark from '@assets/logo-small-learnpack-dark_1759003192973.png';
import learnpackLogoLight from '@assets/logo-small-learnpack-light_1759003192973.png';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useTranslation();
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Detect dark mode
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSignIn = () => {
    analytics.ctaClick('sign_in', 'header');
    const platformUrl = import.meta.env.VITE_LEARNPACK_PLATFORM || 'https://app.learnpack.co';
    window.location.href = `${platformUrl}/login`;
  };

  const handleTryFree = () => {
    analytics.ctaClick('try_free', 'header');
    const platformUrl = import.meta.env.VITE_LEARNPACK_PLATFORM || 'https://app.learnpack.co';
    window.location.href = `${platformUrl}/signup`;
  };

  const openDropdown = (name: string) => {
    setActiveDropdown(name);
  };

  const toggleDropdown = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-border' 
          : 'bg-background border-transparent'
      }`}
      data-testid="header-main"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/">
            <img 
              src={isDarkMode ? learnpackLogoDark : learnpackLogoLight} 
              alt="LearnPack" 
              width={132}
              height={32}
              className="h-8 w-auto cursor-pointer"
              loading="eager"
              decoding="async"
              data-testid="img-logo"
            />
          </Link>
          
          {/* Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Product Dropdown */}
            <div 
              className="relative" 
              data-dropdown="product"
              onMouseEnter={() => openDropdown('product')}
              onMouseLeave={closeDropdown}
            >
              <button
                onClick={() => toggleDropdown('product')}
                onFocus={() => openDropdown('product')}
                className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover-elevate"
                data-testid="button-product-menu"
              >
                Product
                <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'product' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'product' && (
                <>
                  {/* Invisible hover bridge to prevent gap */}
                  <div className="absolute top-full left-0 w-full h-2 bg-transparent" />
                  
                  <div className="absolute top-full left-0 mt-2 w-[600px] bg-card border border-border rounded-lg shadow-lg overflow-hidden">
                    <div className="p-4">
                    {/* Platform Overview - Destacado arriba */}
                    <Link 
                      href="/platform-overview"
                      className="block p-2.5 rounded-md hover-elevate cursor-pointer mb-3"
                      data-testid="link-platform-overview"
                      onClick={closeDropdown}
                    >
                      <div className="font-medium text-foreground">Platform Overview</div>
                      <div className="text-sm text-muted-foreground mt-0.5">See how LearnPack transforms training</div>
                    </Link>

                    {/* Two Column Layout: Features | Use Cases */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Features Column - Izquierda */}
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2.5">Features</div>
                        <div className="space-y-0.5">
                          <Link 
                            href="/features/automation"
                            className="flex gap-2.5 p-2.5 rounded-md hover-elevate cursor-pointer"
                            data-testid="link-feature-automation"
                            onClick={closeDropdown}
                          >
                            <Settings className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm">End-to-End Automation</div>
                              <div className="text-xs text-muted-foreground mt-0.5">Turn any document into a course</div>
                            </div>
                          </Link>

                          <Link 
                            href="/features/hyperpersonalization"
                            className="flex gap-2.5 p-2.5 rounded-md hover-elevate cursor-pointer"
                            data-testid="link-feature-personalization"
                            onClick={closeDropdown}
                          >
                            <Brain className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm">Hyperpersonalized Learning</div>
                              <div className="text-xs text-muted-foreground mt-0.5">AI adapts each learner's content</div>
                            </div>
                          </Link>

                          <Link 
                            href="/features/adaptive-intelligence"
                            className="flex gap-2.5 p-2.5 rounded-md hover-elevate cursor-pointer"
                            data-testid="link-feature-intelligence"
                            onClick={closeDropdown}
                          >
                            <BarChart3 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm">Adaptive Course Intelligence</div>
                              <div className="text-xs text-muted-foreground mt-0.5">Real-time data & insights</div>
                            </div>
                          </Link>

                          <Link 
                            href="/features/analytics-compliance"
                            className="flex gap-2.5 p-2.5 rounded-md hover-elevate cursor-pointer"
                            data-testid="link-feature-analytics"
                            onClick={closeDropdown}
                          >
                            <FileCheck2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm">Analytics & Compliance</div>
                              <div className="text-xs text-muted-foreground mt-0.5">Measure results & export SCORM</div>
                            </div>
                          </Link>
                        </div>
                      </div>

                      {/* Use Cases Column - Derecha */}
                      <div>
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2.5">Use Cases</div>
                        <div className="space-y-0.5">
                          <Link 
                            href="/use-cases/software-training"
                            className="flex gap-2.5 p-2.5 rounded-md hover-elevate cursor-pointer"
                            data-testid="link-usecase-software"
                            onClick={closeDropdown}
                          >
                            <Laptop className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm">Software & Tool Training</div>
                              <div className="text-xs text-muted-foreground mt-0.5">Train teams on internal tools</div>
                            </div>
                          </Link>

                          <Link 
                            href="/use-cases/role-based"
                            className="flex gap-2.5 p-2.5 rounded-md hover-elevate cursor-pointer"
                            data-testid="link-usecase-role"
                            onClick={closeDropdown}
                          >
                            <Users className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm">Role-Based Development</div>
                              <div className="text-xs text-muted-foreground mt-0.5">Upskill by job function</div>
                            </div>
                          </Link>

                          <Link 
                            href="/use-cases/compliance"
                            className="flex gap-2.5 p-2.5 rounded-md hover-elevate cursor-pointer"
                            data-testid="link-usecase-compliance"
                            onClick={closeDropdown}
                          >
                            <CheckSquare className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm">Compliance & Certification</div>
                              <div className="text-xs text-muted-foreground mt-0.5">Automate audits & renewals</div>
                            </div>
                          </Link>

                          {/* Prominent divider to separate comparison from use cases */}
                          <div className="relative my-3">
                            <div className="border-t-2 border-border"></div>
                          </div>

                          {/* LearnPack vs Competition - positioned here for visual balance */}
                          <Link 
                            href="/learnpack-vs-bootcamp"
                            className="flex gap-2.5 p-2.5 rounded-md hover-elevate cursor-pointer"
                            data-testid="link-comparison"
                            onClick={closeDropdown}
                          >
                            <TrendingUp className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-foreground text-sm">LearnPack vs Competition</div>
                              <div className="text-xs text-muted-foreground mt-0.5">See how we compare</div>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Instructional Designer */}
            <Link 
              href="/ai-content-assistant" 
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover-elevate"
              data-testid="link-ai-assistant"
            >
              Instructional Designer
            </Link>

            {/* Pricing */}
            <Link 
              href="/pricing" 
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover-elevate"
              data-testid="link-pricing"
            >
              Pricing
            </Link>

            {/* Docs */}
            <a 
              href="https://docs.learnpack.co/" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover-elevate"
              data-testid="link-docs"
            >
              Docs
            </a>

            {/* About Dropdown */}
            <div 
              className="relative" 
              data-dropdown="about"
              onMouseEnter={() => openDropdown('about')}
              onMouseLeave={closeDropdown}
            >
              <button
                onClick={() => toggleDropdown('about')}
                onFocus={() => openDropdown('about')}
                className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover-elevate"
                data-testid="button-about-menu"
              >
                About
                <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'about' && (
                <>
                  {/* Invisible hover bridge */}
                  <div className="absolute top-full left-0 w-full h-2 bg-transparent" />
                  
                  <div className="absolute top-full right-0 mt-2 w-[280px] bg-card border border-border rounded-lg shadow-lg overflow-visible">
                    <div className="p-3 space-y-0.5">
                      {/* Contact */}
                      <Link 
                        href="/contact"
                        className="flex gap-2.5 p-2.5 rounded-md hover-elevate cursor-pointer"
                        data-testid="link-contact"
                        onClick={closeDropdown}
                      >
                        <Mail className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm">Contact</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Get in touch with our team</div>
                        </div>
                      </Link>

                      {/* Company */}
                      <Link 
                        href="/our-mission"
                        className="flex gap-2.5 p-2.5 rounded-md hover-elevate cursor-pointer"
                        data-testid="link-company"
                        onClick={closeDropdown}
                      >
                        <Building2 className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm">Company</div>
                          <div className="text-xs text-muted-foreground mt-0.5">Learn about our story</div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </nav>
        </div>

        {/* CTAs */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleSignIn}
            data-testid="button-signin"
            className="hidden sm:inline-flex"
          >
            {t('nav.signIn')}
          </Button>
          <Button 
            size="sm"
            onClick={handleTryFree}
            data-testid="button-try-free"
          >
            {t('nav.tryFree')}
          </Button>
        </div>
      </div>
    </header>
  );
}
