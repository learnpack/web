import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Info, 
  Flame,
  BookOpen,
  Code2,
  Mic,
  Terminal,
  Store,
  Bot,
  Users,
  Download,
  BookText,
  Palette,
  ShieldCheck,
  Headphones,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { analytics } from '@/lib/analytics';
import { 
  fetchPlans, 
  fetchServiceItems, 
  fetchCoupons 
} from '@/lib/breathcode-api';
import { 
  processPlans,
  type ProcessedPlan 
} from '@/lib/pricing-processor';

// Icon mapping
const iconMap: Record<string, any> = {
  BookOpen,
  Code2,
  Mic,
  Terminal,
  Store,
  Bot,
  Users,
  Download,
  BookText,
  Palette,
  ShieldCheck,
  Headphones,
};

export default function PricingTeaser() {
  const { t, i18n } = useTranslation('pricing');
  const [isAnnual, setIsAnnual] = useState(false);
  const [plans, setPlans] = useState<ProcessedPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPricingData();
  }, [i18n.language]);

  async function loadPricingData() {
    setLoading(true);
    setError(null);

    try {
      const language = i18n.language === 'es' ? 'es' : 'en';
      const countryCode = language === 'es' ? 'ES' : 'US';

      // Fetch base data
      const apiPlans = await fetchPlans(language);

      if (apiPlans.length === 0) {
        setError('No pricing plans available at this time.');
        setLoading(false);
        return;
      }

      // Fetch service items and coupons for each plan
      const serviceItemsByPlan: Record<string, any[]> = {};
      const couponsByPlan: Record<string, any[]> = {};

      await Promise.all(
        apiPlans.map(async (plan) => {
          const [serviceItems, coupons] = await Promise.all([
            fetchServiceItems(plan.slug, language, countryCode),
            fetchCoupons(plan.slug),
          ]);
          serviceItemsByPlan[plan.slug] = serviceItems;
          couponsByPlan[plan.slug] = coupons;
        })
      );

      // Process and merge data
      const processed = await processPlans(
        apiPlans,
        serviceItemsByPlan,
        couponsByPlan,
        language
      );

      setPlans(processed);
    } catch (err) {
      console.error('Error loading pricing data:', err);
      setError('Failed to load pricing information. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  const handleChoosePlan = (planSlug: string) => {
    analytics.ctaClick(`choose_plan_${planSlug}`, 'pricing_teaser');
    
    // Find the plan details
    const plan = plans.find(p => p.slug === planSlug);
    if (!plan) return;
    
    // Construct checkout path with plan details
    const frequency = isAnnual ? 'annual' : 'monthly';
    const checkoutPath = `/plan-checkout?plan=${planSlug}&name=${encodeURIComponent(plan.title)}&frequency=${frequency}`;
    
    // Base64 encode the checkout path and URL-encode it for safe query string usage
    const encodedPath = encodeURIComponent(btoa(checkoutPath));
    
    // Redirect to login with next parameter
    const platformUrl = import.meta.env.VITE_LEARNPACK_PLATFORM || 'https://app.learnpack.co';
    window.location.href = `${platformUrl}/login?next=${encodedPath}`;
  };

  function formatPrice(price: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  }

  function renderFeatureIcon(iconName: string) {
    const IconComponent = iconMap[iconName] || Info;
    return <IconComponent className="w-4 h-4 text-primary flex-shrink-0" />;
  }

  if (loading) {
    return (
      <section id="pricing" className="pb-24 px-4 bg-muted/50" data-testid="section-pricing">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">{t('pricing.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('pricing.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <Skeleton className="h-6 w-32 mb-4" />
                  <Skeleton className="h-10 w-24 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="pb-24 px-4 bg-muted/50" data-testid="section-pricing">
        <div className="container mx-auto max-w-2xl">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="mt-4 text-center">
            <Button onClick={loadPricingData} variant="outline">
              <Loader2 className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className="pb-24 px-4 bg-muted/50 pt-10" data-testid="section-pricing">
      <div className="container mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold"
            data-testid="text-pricing-title"
          >
            {t('pricing.title')}
          </h2>
          <p 
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-pricing-subtitle"
          >
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                !isAnnual 
                  ? 'bg-background shadow-sm text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="button-monthly-billing"
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isAnnual 
                  ? 'bg-background shadow-sm text-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              data-testid="button-annual-billing"
            >
              Annual
              <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const basePrice = isAnnual ? plan.annualPrice / 12 : plan.monthlyPrice;
            const discountedPrice = isAnnual 
              ? (plan.discountedAnnual ? plan.discountedAnnual / 12 : null)
              : plan.discountedMonthly;
            const showDiscount = discountedPrice !== null && plan.coupon;

            return (
              <Card 
                key={plan.slug} 
                className={`hover-elevate h-full relative flex flex-col ${
                  plan.isMostPopular ? 'ring-2 ring-primary/20 shadow-lg' : ''
                }`}
                data-testid={`card-pricing-tier-${index}`}
              >
                {/* Popular Badge */}
                {plan.isMostPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Current Plan Badge */}
                {plan.isCurrentPlan && (
                  <div className="absolute -top-3 right-4">
                    <Badge variant="secondary" className="px-3 py-1">
                      Current Plan
                    </Badge>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle 
                    className="text-xl"
                    data-testid={`text-tier-name-${index}`}
                  >
                    {plan.title}
                  </CardTitle>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      {showDiscount && (
                        <div className="flex items-center gap-2">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-lg text-muted-foreground line-through">
                            {formatPrice(basePrice, plan.currency)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-baseline">
                      <span 
                        className={`text-4xl font-bold ${showDiscount ? 'text-primary' : ''}`}
                        data-testid={`text-tier-price-${index}`}
                      >
                        {formatPrice(showDiscount ? discountedPrice! : basePrice, plan.currency)}
                      </span>
                      <span 
                        className="text-muted-foreground ml-1"
                        data-testid={`text-tier-period-${index}`}
                      >
                        /month
                      </span>
                    </div>
                    {showDiscount && plan.discountPercentage && (
                      <Badge variant="outline" className="text-orange-500 border-orange-500">
                        Save {plan.discountPercentage}%
                      </Badge>
                    )}
                    {isAnnual && (
                      <p className="text-xs text-muted-foreground">
                        Billed annually
                      </p>
                    )}
                    <p 
                      className="text-sm text-muted-foreground leading-relaxed mt-2"
                      data-testid={`text-tier-description-${index}`}
                    >
                      {plan.description}
                    </p>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground mb-3 font-medium">
                      {plan.included}
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li 
                          key={feature.slug} 
                          className="flex items-start gap-3 text-sm"
                          data-testid={`text-tier-feature-${index}-${featureIndex}`}
                        >
                          {renderFeatureIcon(feature.icon)}
                          <div className="flex-1 flex items-start gap-2">
                            <span className="flex-1">{feature.title}</span>
                            {(feature.description || feature.buyMore) && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <button 
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    data-testid={`button-feature-info-${index}-${featureIndex}`}
                                  >
                                    <Info className="w-4 h-4" />
                                  </button>
                                </PopoverTrigger>
                                <PopoverContent className="w-80" align="end">
                                  <div className="space-y-2">
                                    <h4 className="font-semibold text-sm">{feature.title}</h4>
                                    {feature.description && (
                                      <p className="text-sm text-muted-foreground">
                                        {feature.description}
                                      </p>
                                    )}
                                    {feature.buyMore && (
                                      <div className="pt-2 border-t">
                                        <p className="text-xs text-muted-foreground font-medium">
                                          Buy more:
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                          {feature.buyMore}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4 mt-auto">
                    <Button 
                      className="w-full"
                      variant={plan.isMostPopular ? 'default' : 'outline'}
                      onClick={() => handleChoosePlan(plan.slug)}
                      disabled={plan.isCurrentPlan}
                      data-testid={`button-choose-plan-${plan.slug}`}
                    >
                      {plan.isCurrentPlan ? 'Current Plan' : 'Choose Plan'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
