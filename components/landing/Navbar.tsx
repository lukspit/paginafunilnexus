"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface NavbarProps {
  onCTAClick: () => void
}

export default function Navbar({ onCTAClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <Image
            src="/logos/nexus_logo_equalized.png"
            alt="Nexus Clínicas"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#como-funciona"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Como funciona
          </a>
          <a
            href="#planos"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Planos
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            FAQ
          </a>
        </nav>

        <button
          onClick={onCTAClick}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-lg bg-[#111827] text-white text-sm font-semibold hover:bg-[#1f2937] transition-colors cursor-pointer"
        >
          <span className="sm:hidden">Agendar demo</span>
          <span className="hidden sm:inline">Agendar demonstração</span>
        </button>
      </div>
    </header>
  )
}
