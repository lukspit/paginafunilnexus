"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Minus } from "lucide-react"

interface PricingSectionProps {
  onCTAClick: () => void
}

const plans = [
  {
    name: "Base",
    price: "497",
    description: "Para profissionais em consultório particular.",
    featured: false,
    features: [
      { text: "Atendimento IA no WhatsApp", included: true },
      { text: "1 agenda (Google Calendar)", included: true },
      { text: "Até 300 atendimentos/mês", included: true },
      { text: "Suporte via e-mail", included: true },
      { text: "IA Ativa (follow-up)", included: false },
      { text: "Dashboard analítico", included: false },
      { text: "Múltiplas agendas", included: false },
    ],
    cta: "Agendar demonstração",
  },
  {
    name: "Pro",
    price: "697",
    description: "Para clínicas que precisam recuperar leads e gerir múltiplos médicos.",
    featured: true,
    badge: "Mais assinado",
    features: [
      { text: "Atendimento IA no WhatsApp", included: true },
      { text: "Até 3 agendas (Google Calendar)", included: true },
      { text: "Até 1.500 atendimentos/mês", included: true },
      { text: "Suporte prioritário via WhatsApp", included: true },
      { text: "IA Ativa: follow-up de recuperação", included: true },
      { text: "Dashboard analítico avançado", included: true },
      { text: "Lembretes automáticos de consulta", included: true },
    ],
    cta: "Agendar demonstração",
  },
  {
    name: "Enterprise",
    price: null,
    description: "Para redes de clínicas ou alto volume de consultas.",
    featured: false,
    features: [
      { text: "Tudo do plano Pro", included: true },
      { text: "5.000+ atendimentos/mês", included: true },
      { text: "Agendas ilimitadas", included: true },
      { text: "Treinamento de IA com dados internos", included: true },
      { text: "SLA de resposta garantido", included: true },
      { text: "Customer Success dedicado", included: true },
    ],
    cta: "Falar com equipe",
  },
]

export default function PricingSection({ onCTAClick }: PricingSectionProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="planos" ref={ref} className="bg-[#0A0F1E] py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <span className="text-xs font-semibold text-[#4A90E2]/70 tracking-widest uppercase">
            Planos e preços
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Sem contrato. Cancele quando quiser.
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Todos os planos incluem{" "}
            <span className="text-white font-semibold">Garantia de 7 dias ou seu dinheiro de volta.</span>
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.featured
                  ? "bg-[#4A90E2] ring-2 ring-[#4A90E2]"
                  : "bg-white/5 border border-white/10"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-white text-[#111827] text-xs font-bold tracking-wide">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={`text-sm font-semibold tracking-wide uppercase mb-2 ${
                    plan.featured ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mb-3">
                  {plan.price ? (
                    <>
                      <span
                        className={`text-4xl font-black tracking-tight ${
                          plan.featured ? "text-white" : "text-white"
                        }`}
                      >
                        R$ {plan.price}
                      </span>
                      <span
                        className={`text-sm ${
                          plan.featured ? "text-white/70" : "text-gray-500"
                        }`}
                      >
                        /mês
                      </span>
                    </>
                  ) : (
                    <span className="text-3xl font-black text-white">
                      Sob consulta
                    </span>
                  )}
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    plan.featured ? "text-white/80" : "text-gray-400"
                  }`}
                >
                  {plan.description}
                </p>
              </div>

              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check
                        size={15}
                        className={`mt-0.5 shrink-0 ${
                          plan.featured ? "text-white" : "text-[#6DA08D]"
                        }`}
                        strokeWidth={2.5}
                      />
                    ) : (
                      <Minus
                        size={15}
                        className="mt-0.5 shrink-0 text-gray-600"
                        strokeWidth={2}
                      />
                    )}
                    <span
                      className={`text-sm ${
                        feature.included
                          ? plan.featured
                            ? "text-white"
                            : "text-gray-300"
                          : "text-gray-600"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={onCTAClick}
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  plan.featured
                    ? "bg-white text-[#4A90E2] hover:bg-gray-100"
                    : "bg-white/10 text-white hover:bg-white/15 border border-white/10"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
