import { Hero } from '@/components/sections/Hero';
import { Features } from '@/components/sections/Features';
import { Testimonials } from '@/components/sections/Testimonials';
import { Pricing } from '@/components/sections/Pricing';
import { DownloadSection } from '@/components/sections/Download';
import { Faq } from '@/components/sections/Faq';



export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <Faq />
      <DownloadSection />
    </>
  );
}
