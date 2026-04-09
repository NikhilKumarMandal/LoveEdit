import CTA from "@/components/landing/cta";
import Faq from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Stats from "@/components/landing/stats";
import Testimonials from "@/components/landing/testimonials";

export default function Home() {
  return (
    <div className="w-full relative flex flex-col pt-16">
      <Hero />
      <HowItWorks />
      <Features />
      <Faq />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer/>
    </div>
  );
}