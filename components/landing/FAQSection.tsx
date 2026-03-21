"use client"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    q: "Precisa de algum conhecimento técnico para configurar?",
    a: "Não. A configuração é feita pelo nosso time em até 24h. Você apenas conecta seu WhatsApp e Google Calendar através de um processo simples e guiado. Sem programação, sem API keys, sem n8n.",
  },
  {
    q: "A IA responde em nome do meu consultório? Parece humano?",
    a: "Sim. A IA é treinada com o tom e as informações da sua clínica: horários, serviços, valores e localização. Os pacientes não percebem que estão falando com uma IA na grande maioria das interações.",
  },
  {
    q: "O que acontece se um paciente fizer uma pergunta complexa?",
    a: "A IA identifica quando a pergunta foge do escopo dela e transfere a conversa para você com um resumo do que foi dito. Você sempre tem controle e pode intervir a qualquer momento.",
  },
  {
    q: "Funciona com qualquer número de WhatsApp?",
    a: "Funciona com WhatsApp Business ou pessoal, via Z-API. O número permanece ativo e você continua usando normalmente. A IA só assume quando você não está respondendo.",
  },
  {
    q: "Os planos têm fidelidade ou contrato?",
    a: "Não. Todos os planos são mensais, sem fidelidade. Você cancela quando quiser, sem multa. E todos têm garantia de 7 dias: se a Nexus não funcionar pra sua clínica, devolvemos tudo.",
  },
  {
    q: "O que é a IA Ativa do plano Pro?",
    a: "É a função de follow-up automático. Quando um lead chega mas não agenda, a IA retoma a conversa no momento certo, depois de algumas horas ou no dia seguinte, com uma mensagem natural para tentar reconverter. Funciona também para confirmação de consultas e lembretes.",
  },
  {
    q: "Quantas clínicas já usam a Nexus?",
    a: "Ainda estamos em fase de acesso antecipado com beta testers selecionados. Nosso foco agora é garantir que cada clínica tenha uma implantação impecável antes de escalar. As vagas são limitadas.",
  },
  {
    q: "Qual a diferença entre a Nexus e contratar uma agência para fazer automação?",
    a: "Agências geralmente montam uma estrutura com n8n, Make ou ferramentas genéricas que você não controla, com custo de implementação alto e manutenção constante. A Nexus é um produto construído especificamente para clínicas. Você tem um dashboard próprio, suporte especializado e atualizações automáticas, sem depender de ninguém.",
  },
]

export default function FAQSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" ref={ref} className="bg-white py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Sticky header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <span className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
              Dúvidas frequentes
            </span>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold tracking-tight text-[#111827] leading-tight">
              Perguntas que clínicas nos fazem
            </h2>
            <p className="mt-4 text-gray-500 text-[15px] leading-relaxed">
              Não encontrou o que procurava? Nossa equipe responde em menos de 24h.
            </p>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col divide-y divide-gray-100"
          >
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex items-start justify-between gap-4 w-full text-left cursor-pointer group"
                >
                  <span className="text-[15px] font-semibold text-[#111827] group-hover:text-[#4A90E2] transition-colors leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center shrink-0 mt-0.5 transition-transform ${
                      open === i ? "rotate-45 border-[#4A90E2]" : ""
                    }`}
                  >
                    <Plus
                      size={14}
                      className={`${open === i ? "text-[#4A90E2]" : "text-gray-400"}`}
                      strokeWidth={2.5}
                    />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-[15px] text-gray-500 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
