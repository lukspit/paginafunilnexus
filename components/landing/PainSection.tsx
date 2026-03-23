"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Clock, PhoneOff, CalendarX, TrendingDown } from "lucide-react"

const pains = [
  {
    icon: Clock,
    headline: "Lead chega, secretária não está",
    description:
      "Fora do expediente ou no fim de semana, o paciente manda mensagem e fica sem resposta. O resultado? Ele fecha com a primeira clínica que atender.",
    stat: "60x menos chance de converter após 24h sem resposta",
  },
  {
    icon: PhoneOff,
    headline: "Respondeu, mas demorou demais",
    description:
      "Mesmo no horário comercial, a fila de conversas acumula. Quando a secretária finalmente consegue responder, o paciente já está falando com o concorrente.",
    stat: "4x menos chance em 10 minutos vs. 5 minutos",
  },
  {
    icon: CalendarX,
    headline: "Lead sumiu sem marcar consulta",
    description:
      "Pessoas que pedem informações e somem. Sem tempo para fazer um follow-up organizado, esse lead esfria e o investimento em marketing é desperdiçado.",
    stat: "Clínicas perdem em média 30% dos leads sem follow-up",
  },
  {
    icon: TrendingDown,
    headline: "Agenda com buracos toda semana",
    description:
      "Cancelamentos de última hora e horários ociosos. Uma agenda incompleta significa profissionais parados e dinheiro deixado na mesa todos os dias.",
    stat: "25–30% do custo operacional de clínicas é administrativo",
  },
]

export default function PainSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="bg-[#f9fafb] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            O problema
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] leading-tight lg:whitespace-nowrap">
            O que acontece na sua clínica hoje
          </h2>
        </motion.div>

        {/* Grid 2x2 simétrico */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {pains.map((pain, i) => {
            const Icon = pain.icon
            return (
              <motion.div
                key={pain.headline}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group bg-white rounded-2xl border border-gray-100 p-8 hover:border-gray-200 hover:shadow-md transition-all flex flex-col gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-red-500" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-semibold text-[#111827]">
                    {pain.headline}
                  </h3>
                </div>

                <p className="text-gray-500 text-[15px] leading-relaxed">
                  {pain.description}
                </p>

                <div className="inline-block self-start px-3 py-1.5 rounded-md bg-gray-50 border border-gray-100">
                  <span className="text-xs font-medium text-gray-500">
                    {pain.stat}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
