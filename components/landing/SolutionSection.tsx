"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Link2, MessageSquare, CalendarCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Link2,
    title: "Conecta em minutos",
    description:
      "Você conecta seu WhatsApp e Google Calendar. A Nexus aprende sobre sua clínica, horários disponíveis e serviços oferecidos. Zero configuração técnica.",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "A IA atende como uma recepcionista experiente",
    description: (
      <>
        <p>
          Cada mensagem é respondida em segundos, mantendo o tom de voz e o estilo da sua própria clínica.
        </p>
        <p className="mt-2.5">
          Esqueça os robôs engessados: nossa IA entende o contexto das dúvidas, responde objeções e conduz o paciente até o agendamento de forma 100% natural.
        </p>
      </>
    ),
  },
  {
    number: "03",
    icon: CalendarCheck,
    title: "Você acompanha no dashboard",
    description:
      "Todas as conversas, agendamentos confirmados e leads recuperados em um painel simples. Você intervém quando quiser, a IA cuida do resto.",
  },
]

export default function SolutionSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="como-funciona" ref={ref} className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            Como funciona
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] leading-tight">
            Três passos para sua
            <br />
            clínica no piloto automático
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px bg-gray-100 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="flex flex-col"
                >
                  {/* Number + icon header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center shadow-sm shrink-0">
                      <Icon size={22} className="text-[#4A90E2]" strokeWidth={1.8} />
                    </div>
                    <span className="text-5xl font-black text-gray-100 leading-none select-none">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#111827] mb-3">
                    {step.title}
                  </h3>
                  <div className="text-gray-500 text-[15px] leading-relaxed">
                    {step.description}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
