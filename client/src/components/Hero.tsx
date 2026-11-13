import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createPackage } from "@/lib/createPackage";
import { analytics } from "@/lib/analytics";
import ShinyText from "./ShinyText";

export default function Hero() {
  const { t } = useTranslation('home');
  const [topic, setTopic] = useState("");
  const [purpose, setPurpose] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const PURPOSE_OPTIONS = [
    {
      value: "skill-building-facilitator",
      label: t("hero.purposeOptions.skillBuilding"),
    },
    { value: "exam-homework-prep", label: t("hero.purposeOptions.examPrep") },
    {
      value: "certification-prep",
      label: t("hero.purposeOptions.certificationPrep"),
    },
  ];

  const handleInputFocus = () => {
    analytics.heroInputFocus();
  };

  const handlePurposeChange = (value: string) => {
    setPurpose(value);
    analytics.purposeChange(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic.trim()) {
      toast({
        title: t("hero.errors.topicRequired"),
        description: t("hero.errors.topicDescription"),
        variant: "destructive",
      });
      return;
    }

    if (!purpose) {
      toast({
        title: t("hero.errors.purposeRequired"),
        description: t("hero.errors.purposeDescription"),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    analytics.heroSubmit(topic, purpose);

    try {
      // Create URL with query parameters
      const params = new URLSearchParams({
        description: topic.trim(),
        purpose: purpose,
        new: "true",
      });

      const creatorUrl = import.meta.env.VITE_LEARNPACK_CREATOR || 'https://app.learnpack.co';
      const redirectUrl = `${creatorUrl}/creator?${params.toString()}`;

      analytics.createSuccess(topic, purpose);

      // Redirect to external LearnPack app
      window.location.href = redirectUrl;
    } catch (error) {
      toast({
        title: t("common.error"),
        description: t("hero.errors.createFailed"),
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      {/* Vite-inspired Animated Background */}
      <div className="absolute inset-0 animated-bg-container">
        {/* Central glowing orb */}
        <div className="central-orb"></div>

        {/* Animated connection lines */}
        <div
          className="connection-line line-1"
          style={{ "--rotation": "-45deg" } as React.CSSProperties}
        ></div>
        <div
          className="connection-line line-2"
          style={{ "--rotation": "30deg" } as React.CSSProperties}
        ></div>
        <div
          className="connection-line line-3"
          style={{ "--rotation": "120deg" } as React.CSSProperties}
        ></div>
        <div
          className="connection-line line-4"
          style={{ "--rotation": "-120deg" } as React.CSSProperties}
        ></div>
        <div
          className="connection-line line-5"
          style={{ "--rotation": "60deg" } as React.CSSProperties}
        ></div>
        <div
          className="connection-line line-6"
          style={{ "--rotation": "-90deg" } as React.CSSProperties}
        ></div>

        {/* Glowing endpoint dots */}
        <div className="endpoint-dot dot-1"></div>
        <div className="endpoint-dot dot-2"></div>
        <div className="endpoint-dot dot-3"></div>
        <div className="endpoint-dot dot-4"></div>
        <div className="endpoint-dot dot-5"></div>
        <div className="endpoint-dot dot-6"></div>

        {/* Floating particles */}
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
      </div>

      {/* Subtle overlay for better text contrast */}
      <div className="absolute inset-0 bg-background/20" />

      <div className="content-container relative z-10">
        {/* 2-column grid on desktop, single column on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-start">
          {/* Left Column: Content (left-aligned on desktop, centered on mobile) */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-6">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug"
                data-testid="text-hero-title"
              >
                {t("hero.title")}
              </h1>

              <p
                className="text-xl max-w-2xl mx-auto lg:mx-0"
                data-testid="text-hero-subtitle"
              >
                <ShinyText text={t("hero.subtitle")} speed={4} />
              </p>
            </div>

            {/* Package Creation Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              aria-busy={isLoading}
            >
              <div className="bg-card/90 backdrop-blur-sm border border-card-border rounded-xl p-4 max-w-2xl mx-auto lg:mx-0 shadow-md transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12),0_0_20px_rgba(99,102,241,0.25)] hover:-translate-y-1">
                <div className="flex flex-col gap-3">
                  <Textarea
                    placeholder={t("hero.inputPlaceholder")}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onFocus={handleInputFocus}
                    onKeyDown={handleKeyDown}
                    className="min-h-[60px] text-base resize-none border-0 bg-transparent p-0 focus-visible:ring-0 focus:border-0 focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:outline-none placeholder:text-muted-foreground/70 !focus-visible:ring-0 !focus:ring-0 !focus:border-0 transition-shadow duration-200 hover:shadow-sm"
                    disabled={isLoading}
                    data-testid="input-topic"
                  />

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-2">
                      <Select
                        value={purpose}
                        onValueChange={handlePurposeChange}
                        disabled={isLoading}
                      >
                        <SelectTrigger
                          className="h-8 w-auto border-0 bg-muted/50 hover:bg-muted text-xs rounded-md transition-shadow duration-200 hover:shadow-md"
                          data-testid="select-purpose"
                        >
                          <SelectValue placeholder={t("hero.purposeLabel")} />
                        </SelectTrigger>
                        <SelectContent>
                          {PURPOSE_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {purpose && (
                        <div className="h-8 px-3 bg-primary/10 text-primary rounded-md flex items-center text-xs font-medium">
                          {
                            PURPOSE_OPTIONS.find((opt) => opt.value === purpose)
                              ?.label
                          }
                        </div>
                      )}
                    </div>

                    <Button
                      type="submit"
                      size="sm"
                      disabled={isLoading || !topic.trim()}
                      className="h-8 px-4"
                      data-testid="button-create-package"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          {t("hero.creating")}
                        </>
                      ) : (
                        t("hero.createButton")
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              <p
                className="text-sm text-muted-foreground text-center lg:text-left"
                data-testid="text-trust-line"
              >
                {t("hero.trustLine")}
              </p>
            </form>
          </div>

          {/* Right Column: Video */}
          <div className="mt-8 lg:mt-0" data-testid="hero-right-column">
            <div className="relative rounded-xl overflow-hidden shadow-[0_0_40px_rgba(99,102,241,0.35)]">
              {/* 16:9 Aspect Ratio Container */}
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/dBjKIashs4Y"
                  title="LearnPack Demo Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
