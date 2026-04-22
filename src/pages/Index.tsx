import { Navbar } from "@/components/barberalia/Navbar";
import { Hero } from "@/components/barberalia/Hero";
import { WhatWorks } from "@/components/barberalia/WhatWorks";
import { DemoSection } from "@/components/barberalia/DemoSection";
import { RelatoriosTeaser } from "@/components/barberalia/RelatoriosTeaser";
import { Dashboard } from "@/components/barberalia/Dashboard";
import { Roadmap } from "@/components/barberalia/Roadmap";
import { Projecao } from "@/components/barberalia/Projecao";
import { Footer } from "@/components/barberalia/Footer";
import { Divider } from "@/components/barberalia/Shared";
import { useReveal } from "@/hooks/use-barberalia";

const Index = () => {
  useReveal();
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Divider />
        <WhatWorks />
        <Divider />
        <DemoSection />
        <RelatoriosTeaser />
        <Dashboard />
        <Roadmap />
        <Projecao />
        <Footer />
      </main>
    </>
  );
};

export default Index;
