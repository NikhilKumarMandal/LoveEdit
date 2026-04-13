import CTA from "@/components/landing/cta";
import Faq from "@/components/landing/faq";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import Stats from "@/components/landing/stats";
import Testimonials from "@/components/landing/testimonials";
import { Plans } from "./billing/plans/plans";

export default function Home() {
  return (
    <div className="w-full relative flex flex-col pt-16">
      <Hero />
      {/* <HowItWorks /> */}
      <Features />
      <section className="w-full py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Pricing</h2>
          <Plans />
        </div>
      </section>
      <Faq />
      <Stats />
      {/* <Testimonials /> */}
      <CTA />
      <Footer/>
    </div>
  );
}