"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, X } from "lucide-react"

const rows = [
  {
    attribute: "Tempo para funcionar",
    nexus: "24 horas",
    agency: "Semanas ou meses",
  },
  {
    attribute: "Custo de entrada",
    nexus: "Zero implementação",
    agency: "Taxa de setup + mensalidade",
  },
  {
    attribute: "Quem controla",
    nexus: "Você, pelo dashboard",
    agency: "A agência",
  },
  {
    attribute: "Se algo mudar na clínica",
    nexus: "Você ajusta na hora",
    agency: "Abre chamado e aguarda",
  },
  {
    attribute: "Atualização do sistema",
    nexus: "Automática, inclusa",
    agency: "Cobrada à parte",
  },
  {
    attribute: "Cancelamento",
    nexus: "A qualquer momento",
    agency: "Contrato com multa",
  },
]

export default function CompareSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="bg-white py-24 lg:py-32 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-14"
        >
          <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            Por que não uma agência
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#111827] leading-tight">
            Pronto em 24h.
            <br />
            Sem implementação, sem dependência.
          </h2>
          <p className="mt-5 text-gray-500 text-base sm:text-lg leading-relaxed">
            Muitas clínicas já tentaram automatizar antes: contrataram agências,
            pagaram caro pela implementação e ficaram presas em sistemas complexos 
            que não controlam. A Nexus é um produto pronto para uso, feito para simplificar.
          </p>
        </motion.div>

        {/* Tabela de comparação */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl overflow-hidden border border-gray-100"
        >
          {/* Cabeçalho da tabela */}
          <div className="grid grid-cols-3 bg-[#f9fafb] border-b border-gray-100">
            <div className="py-3 px-3 sm:py-4 sm:px-6">
              <span className="text-[10px] sm:text-xs font-semibold text-gray-400 tracking-widest uppercase">
                Item
              </span>
            </div>
            <div className="py-3 px-3 sm:py-4 sm:px-6 border-l border-gray-100 bg-[#111827]">
              <span className="text-[10px] sm:text-xs font-semibold text-[#4A90E2] tracking-widest uppercase">
                Nexus
              </span>
            </div>
            <div className="py-3 px-3 sm:py-4 sm:px-6 border-l border-gray-100">
              <span className="text-[10px] sm:text-xs font-semibold text-gray-400 tracking-widest uppercase">
                Agência/n8n
              </span>
            </div>
          </div>

          {/* Linhas */}
          {rows.map((row, i) => (
            <motion.div
              key={row.attribute}
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
              className="grid grid-cols-3 border-b border-gray-100 last:border-b-0"
            >
              <div className="py-3 px-3 sm:py-4 sm:px-6 flex items-center">
                <span className="text-[11px] sm:text-sm font-medium text-gray-600 leading-tight sm:leading-snug break-words">
                  {row.attribute}
                </span>
              </div>

              <div className="py-3 px-2 sm:py-4 sm:px-6 border-l border-gray-100 bg-[#111827] flex items-center gap-1.5 sm:gap-2.5">
                <Check
                  size={14}
                  className="text-[#4A90E2] shrink-0 hidden sm:block"
                  strokeWidth={2.5}
                />
                <span className="text-[11px] sm:text-sm font-semibold text-white leading-tight sm:leading-snug">
                  {row.nexus}
                </span>
              </div>

              <div className="py-3 px-2 sm:py-4 sm:px-6 border-l border-gray-100 flex items-center gap-1.5 sm:gap-2.5">
                <X
                  size={14}
                  className="text-gray-400 shrink-0 hidden sm:block"
                  strokeWidth={2.5}
                />
                <span className="text-[11px] sm:text-sm text-gray-500 leading-tight sm:leading-snug">
                  {row.agency}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Nota de rodapé */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-sm text-gray-400 text-center"
        >
          Configuração feita pelo nosso time. Você aprova e já começa a usar.
        </motion.p>
      </div>
    </section>
  )
}
