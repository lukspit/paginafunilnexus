"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Zap, Calendar, RefreshCw, BarChart3 } from "lucide-react"

export default function FeaturesSection() {
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
            Diferenciais
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] leading-tight">
            O que a Nexus faz
            <br />pela sua clínica
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Card grande — ocupa 2 colunas no lg */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="lg:col-span-2 bg-[#111827] rounded-2xl p-8 lg:p-10 flex flex-col justify-between min-h-[280px]"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#4A90E2]/20 flex items-center justify-center mb-6">
                <Zap size={20} className="text-[#4A90E2]" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Resposta em segundos, a qualquer hora
              </h3>
              <p className="text-gray-400 text-[15px] leading-relaxed max-w-lg">
                Enquanto outras clínicas levam horas para responder, a Nexus responde
                em menos de 5 segundos. Pesquisas da HBR mostram que responder em
                até 1 hora gera{" "}
                <span className="text-white font-semibold">7x mais chance</span> de
                fechar. A Nexus faz isso em escala, sem custo extra por volume.
              </p>
            </div>
            {/* Visual de velocidade */}
            <div className="flex items-end gap-1.5 mt-8">
              {[20, 40, 60, 80, 95, 100, 100, 95, 88].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.04 }}
                  style={{ height: `${h * 0.5}px` }}
                  className={`w-5 rounded-sm origin-bottom ${
                    i >= 5 ? "bg-[#4A90E2]" : "bg-[#374151]"
                  }`}
                />
              ))}
              <div className="ml-3 text-xs text-gray-500 leading-snug self-start pt-1">
                Volume de
                <br />respostas/hora
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col justify-between min-h-[280px]"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#6DA08D]/15 flex items-center justify-center mb-6">
                <Calendar size={20} className="text-[#6DA08D]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">
                Agendamento sem intervenção humana
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                A IA verifica horários disponíveis no Google Calendar e confirma o
                agendamento direto na conversa do WhatsApp. Sem duplo trabalho, sem
                erro humano.
              </p>
            </div>
            {/* Mini agenda visual */}
            <div className="mt-6 grid grid-cols-5 gap-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-6 rounded-md ${
                    [2, 5, 9, 11].includes(i)
                      ? "bg-[#6DA08D]/30"
                      : [3, 7, 13].includes(i)
                      ? "bg-[#4A90E2]/20"
                      : "bg-gray-100"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col justify-between min-h-[240px]"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[#4A90E2]/10 flex items-center justify-center mb-6">
                <RefreshCw size={20} className="text-[#4A90E2]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">
                Recuperação automática de leads
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                Paciente não respondeu? A IA retoma a conversa no momento certo,
                sem soar invasiva. Recupera quem estava prestes a desistir.
              </p>
            </div>
          </motion.div>

          {/* Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-2 lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-8 flex flex-col lg:flex-row lg:items-center gap-8"
          >
            <div className="flex-1">
              <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
                <BarChart3 size={20} className="text-[#111827]" strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-3">
                Dashboard com visão completa
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed">
                Acompanhe conversas em tempo real, consultas agendadas, taxa de
                conversão e volume de atendimentos. Tudo em um painel simples,
                sem precisar abrir o WhatsApp.
              </p>
            </div>
            {/* Mini stats visual */}
            <div className="flex flex-col gap-3 min-w-[180px]">
              {[
                { label: "Atendimentos", value: "—", color: "bg-[#4A90E2]" },
                { label: "Agendamentos", value: "—", color: "bg-[#6DA08D]" },
                { label: "Taxa de conversão", value: "—", color: "bg-[#111827]" },
              ].map((item) => (
                <div key={item.label} className="bg-gray-50 rounded-xl p-4">
                  <div className="text-2xl font-bold text-[#111827] tabular-nums">
                    {item.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
