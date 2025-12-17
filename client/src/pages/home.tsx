import { useEffect, useState } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import ProductShowcase from "@/components/sections/product-showcase";
import Benefits from "@/components/sections/benefits";

import Testimonials from "@/components/sections/testimonials";
import SignupForm from "@/components/sections/signup-form";
import Contact from "@/components/sections/contact";
import Newsletter from "@/components/sections/newsletter";
import { useScrollSpy } from "@/lib/animations";
import { apiRequest } from "@/lib/queryClient";

const sectionIds = [
  "hero",
  "features",
  "showcase",
  "benefits",
  "testimonials",
  "signup",
  "contact"
];

export default function Home() {
  const activeSection = useScrollSpy(sectionIds);
  
  // Record page view for analytics
  useEffect(() => {
    const recordPageView = async () => {
      try {
        await apiRequest("POST", "/api/analytics/pageview", { page: "home" });
      } catch (error) {
        console.error("Failed to record page view:", error);
      }
    };
    recordPageView();
  }, []);

  return (
    <div className="scroll-smooth">
      <Header activeSection={activeSection} />
      <main>
        <Hero />
        <Features />
        <ProductShowcase />
        <Benefits />
        <Testimonials />
        <SignupForm />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
