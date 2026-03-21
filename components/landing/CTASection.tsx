"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight } from "lucide-react"

interface CTASectionProps {
  onCTAClick: () => void
}

export default function CTASection({ onCTAClick }: CTASectionProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="bg-[#f9fafb] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative bg-[#111827] rounded-3xl px-8 py-16 lg:px-16 lg:py-20 overflow-hidden"
        >
          {/* Background dot grid */}
          <div className="absolute inset-0 dot-grid opacity-20" />

          {/* Corner accent */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#4A90E2]/10 blur-3xl" />

          <div className="relative max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
              Sua clínica pode estar
              <br />
              atendendo agora.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-10">
              Enquanto você lê isso, algum paciente está mandando mensagem para uma
              clínica concorrente que vai responder antes de você. Com a Nexus, você
              nunca perde esse momento.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onCTAClick}
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#4A90E2] text-white font-semibold text-base hover:bg-[#3a80d2] transition-all shadow-lg shadow-[#4A90E2]/30 cursor-pointer"
              >
                Quero automatizar minha clínica
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </button>
              <span className="text-sm text-gray-500">
                Garantia de 7 dias ou seu dinheiro de volta
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 mt-10 pt-10 border-t border-white/10">
              <Stat value="7 dias" label="de garantia" />
              <div className="w-px h-8 bg-white/10" />
              <Stat value="24h" label="para configurar" />
              <div className="w-px h-8 bg-white/10" />
              <Stat value="0" label="contratos de fidelidade" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500 mt-0.5">{label}</div>
    </div>
  )
}
