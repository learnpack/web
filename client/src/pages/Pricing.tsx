import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingTeaser from "@/components/PricingTeaser";
import SEO from "@/components/SEO";

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO namespace="pricing" />
      <Header />
      <main>
        <PricingTeaser />
      </main>
      <Footer />
    </div>
  );
}
