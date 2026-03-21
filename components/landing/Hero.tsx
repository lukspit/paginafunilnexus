"use client"

import { motion } from "framer-motion"
import { ArrowRight, Zap, Check, Cross } from "lucide-react"

interface HeroProps {
  onCTAClick: () => void
}

const chatMessages = [
  { from: "patient", text: "Boa tarde! Gostaria de marcar uma consulta", time: "14:02" },
  { from: "nexus",   text: "Boa tarde! Que bom que entrou em contato. Tenho horários essa semana. Você tem preferência por algum dia?", time: "14:02" },
  { from: "patient", text: "Quinta, se possível", time: "14:03" },
  { from: "nexus",   text: "Na quinta tenho às 14h e às 16h30. Qual fica melhor pra você?", time: "14:03" },
  { from: "patient", text: "14h perfeito!", time: "14:04" },
  { from: "nexus",   text: "Ótimo! Consulta marcada para quinta às 14h. Vou te mandar a confirmação e o endereço em seguida.", time: "14:04" },
  { from: "patient", text: "Obrigada!", time: "14:04" },
  { from: "nexus",   text: "Por nada! Qualquer dúvida é só chamar aqui.", time: "14:05" },
]

export default function Hero({ onCTAClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-16 overflow-hidden bg-white">
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* — Coluna esquerda: copy — */}
          <div className="max-w-xl">
            {/* Tag */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#4A90E2]/30 bg-[#4A90E2]/5 mb-7"
            >
              <Zap size={13} className="text-[#4A90E2]" strokeWidth={2.5} />
              <span className="text-xs font-semibold text-[#4A90E2] tracking-wide uppercase">
                Atendimento 24h no WhatsApp
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2.6rem] sm:text-5xl lg:text-[4rem] xl:text-[4.5rem] font-bold tracking-tight text-[#111827] leading-[1.08] mb-5"
            >
              Pare de perder
              <br />
              <span className="text-[#4A90E2]">consultas.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-gray-500 leading-relaxed mb-8"
            >
              A Nexus responde seus pacientes no WhatsApp, agenda consultas e
              recupera quem quase desistiu. Tudo automático, enquanto você trabalha ou descansa.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
            >
              <button
                onClick={onCTAClick}
                className="group flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#4A90E2] text-white font-semibold text-base hover:bg-[#3a80d2] transition-all shadow-lg shadow-[#4A90E2]/20 cursor-pointer"
              >
                Quero automatizar minha clínica
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
              <a
                href="#como-funciona"
                className="text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors underline-offset-4 hover:underline"
              >
                Ver como funciona
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 border-t border-gray-100"
            >
              <StatItem value="7x" label="mais conversão respondendo em 1h" />
              <div className="w-px h-8 bg-gray-200 hidden sm:block" />
              <StatItem value="24h" label="atendimento sem pausas" />
              <div className="w-px h-8 bg-gray-200 hidden sm:block" />
              <StatItem value="73%" label="desistem com resposta lenta" />
            </motion.div>
          </div>

          {/* — Coluna direita: mockup WhatsApp — */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="hidden lg:flex justify-center items-center relative"
          >
            {/* Glow atrás do phone */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-72 h-72 rounded-full bg-[#4A90E2]/8 blur-3xl" />
            </div>

            {/* Phone frame */}
            <div className="relative w-[360px] rounded-[2.5rem] border-[6px] border-gray-200 bg-white shadow-2xl overflow-hidden">

              {/* WhatsApp header */}
              <div className="bg-[#075E54] px-4 pt-5 pb-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <Cross size={16} className="text-[#075E54]" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[13px] font-semibold leading-none mb-0.5">
                    Sua Clínica
                  </div>
                  <div className="text-white/60 text-[11px]">online agora</div>
                </div>
              </div>

              {/* Chat */}
              <div
                className="bg-[#ece5dd] px-3 py-3 flex flex-col gap-1.5 overflow-hidden"
                style={{ minHeight: 340 }}
              >
                {chatMessages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: 0.6 + i * 0.18 }}
                    className={`flex ${msg.from === "patient" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[270px] rounded-lg px-3 py-2 shadow-sm ${
                        msg.from === "patient"
                          ? "bg-[#dcf8c6] rounded-tr-none"
                          : "bg-white rounded-tl-none"
                      }`}
                    >
                      <p className="text-[12px] text-gray-800 leading-snug">
                        {msg.text}
                      </p>
                      <div className="flex items-center justify-end gap-1 mt-0.5">
                        <span className="text-[10px] text-gray-400">{msg.time}</span>
                        {msg.from === "patient" && (
                          <Check size={10} className="text-[#4A90E2]" strokeWidth={3} />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Badge flutuante — tempo de resposta */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.8 }}
              className="absolute -bottom-2 -left-4 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3"
            >
              <div className="text-[11px] text-gray-400 mb-0.5">Respondido em</div>
              <div className="text-xl font-black text-[#111827] tabular-nums leading-none">
                3 seg
              </div>
            </motion.div>

            {/* Badge flutuante — consulta confirmada */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 2.0 }}
              className="absolute -top-2 -right-4 bg-[#111827] rounded-2xl shadow-xl px-4 py-3"
            >
              <div className="text-[11px] text-gray-400 mb-0.5">Agendamentos hoje</div>
              <div className="text-xl font-black text-white tabular-nums leading-none">
                12
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-2xl font-bold text-[#111827] tabular-nums">{value}</span>
      <span className="text-sm text-gray-500 max-w-[130px] leading-snug">{label}</span>
    </div>
  )
}
