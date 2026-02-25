import { setRequestLocale } from 'next-intl/server';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import DemoSection from '@/components/sections/DemoSection';
import PrivacySection from '@/components/sections/PrivacySection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PricingSection from '@/components/sections/PricingSection';
import CleanupSection from '@/components/sections/CleanupSection';
import CtaSection from '@/components/sections/CtaSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav locale={locale} />
      <main>
        <HeroSection />
        <DemoSection />
        <PrivacySection />
        <FeaturesSection />
        <PricingSection />
        <CleanupSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
