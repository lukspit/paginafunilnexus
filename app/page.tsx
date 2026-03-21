"use client"

import { useState } from "react"
import Navbar from "@/components/landing/Navbar"
import Hero from "@/components/landing/Hero"
import PainSection from "@/components/landing/PainSection"
import SolutionSection from "@/components/landing/SolutionSection"
import FeaturesSection from "@/components/landing/FeaturesSection"
import CompareSection from "@/components/landing/CompareSection"
import IntegrationsSection from "@/components/landing/IntegrationsSection"
import PricingSection from "@/components/landing/PricingSection"
import FAQSection from "@/components/landing/FAQSection"
import CTASection from "@/components/landing/CTASection"
import Footer from "@/components/landing/Footer"
import ConversationalForm from "@/components/ConversationalForm"

export default function Home() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <>
      <Navbar onCTAClick={() => setFormOpen(true)} />

      <main>
        <Hero onCTAClick={() => setFormOpen(true)} />
        <PainSection />
        <SolutionSection />
        <FeaturesSection />
        <CompareSection />
        <IntegrationsSection />
        <PricingSection onCTAClick={() => setFormOpen(true)} />
        <FAQSection />
        <CTASection onCTAClick={() => setFormOpen(true)} />
      </main>

      <Footer />

      <ConversationalForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
      />
    </>
  )
}
