"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight } from "lucide-react"
import Image from "next/image"

interface ConversationalFormProps {
  isOpen: boolean
  onClose: () => void
}

type Step = {
  id: string
  question: string
  type: "choice" | "text"
  options?: string[]
  placeholder?: string
  disqualifyIf?: string
}

const steps: Step[] = [
  {
    id: "is_owner",
    question: "Olá! Antes de tudo, você é o dono ou gestor responsável pela clínica?",
    type: "choice",
    options: ["Sim, sou o dono", "Sou gestor / sócio", "Não"],
    disqualifyIf: "Não",
  },
  {
    id: "specialty",
    question: "Qual é a especialidade da sua clínica?",
    type: "choice",
    options: ["Odontologia", "Psicologia", "Fisioterapia", "Medicina geral", "Outra especialidade"],
  },
  {
    id: "monthly_appointments",
    question: "Quantos atendimentos a clínica realiza por mês, em média?",
    type: "choice",
    options: ["Menos de 50", "50 a 150", "150 a 300", "Mais de 300"],
  },
  {
    id: "monthly_revenue",
    question: "Qual é o faturamento mensal estimado da clínica?",
    type: "choice",
    options: [
      "Menos de R$ 15.000",
      "R$ 15.000 a R$ 50.000",
      "R$ 50.000 a R$ 80.000",
      "Acima de R$ 80.000",
    ],
  },
  {
    id: "whatsapp_leads",
    question: "Quantos pacientes entram em contato pelo WhatsApp por mês?",
    type: "choice",
    options: ["Menos de 20", "20 a 50", "50 a 100", "Mais de 100"],
  },
  {
    id: "has_secretary",
    question: "A clínica tem secretária ou recepcionista hoje?",
    type: "choice",
    options: ["Sim, em tempo integral", "Sim, em meio período", "Não temos"],
  },
  {
    id: "name",
    question: "Perfeito. Qual é o seu nome?",
    type: "text",
    placeholder: "Seu nome completo",
  },
  {
    id: "whatsapp",
    question: "E qual é o seu WhatsApp para contato?",
    type: "text",
    placeholder: "(11) 99999-9999",
  },
]

type Message =
  | { from: "bot"; text: string; id: string }
  | { from: "user"; text: string; id: string }

function isQualified(answers: Record<string, string>): boolean {
  const revenueRanks: Record<string, number> = {
    "Menos de R$ 15.000": 0,
    "R$ 15.000 a R$ 50.000": 1,
    "R$ 50.000 a R$ 80.000": 2,
    "Acima de R$ 80.000": 3,
  }
  const appointmentRanks: Record<string, number> = {
    "Menos de 50": 0,
    "50 a 150": 1,
    "150 a 300": 2,
    "Mais de 300": 3,
  }
  const revenueRank = revenueRanks[answers.monthly_revenue] ?? 0
  const appointmentRank = appointmentRanks[answers.monthly_appointments] ?? 0
  return revenueRank >= 1 || appointmentRank >= 1
}

export default function ConversationalForm({ isOpen, onClose }: ConversationalFormProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [inputValue, setInputValue] = useState("")
  const [phase, setPhase] = useState<"chat" | "qualified" | "unqualified">("chat")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [didInit, setDidInit] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset when opened
  useEffect(() => {
    if (isOpen && !didInit) {
      setMessages([])
      setCurrentStep(0)
      setAnswers({})
      setInputValue("")
      setPhase("chat")
      setDidInit(true)
      // First message with a delay
      setTimeout(() => sendBotMessage(steps[0].question, "bot-0"), 600)
    }
    if (!isOpen) {
      setDidInit(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  function sendBotMessage(text: string, id: string) {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      setMessages((prev) => [...prev, { from: "bot", text, id }])
    }, 1200)
  }

  function handleChoice(option: string) {
    setIsTyping(true)
    const step = steps[currentStep]
    const userMsgId = `user-${currentStep}`
    setMessages((prev) => [...prev, { from: "user", text: option, id: userMsgId }])

    const newAnswers = { ...answers, [step.id]: option }
    setAnswers(newAnswers)

    // Check for disqualification
    if (step.disqualifyIf && option === step.disqualifyIf) {
      setTimeout(() => {
        setPhase("unqualified")
      }, 800)
      return
    }

    const nextStep = currentStep + 1
    setCurrentStep(nextStep)

    if (nextStep >= steps.length) {
      // All answered, submit
      submitLead(newAnswers)
      return
    }

    setTimeout(() => {
      sendBotMessage(steps[nextStep].question, `bot-${nextStep}`)
    }, 500)
  }

  function handleTextSubmit() {
    const trimmed = inputValue.trim()
    if (!trimmed) return
    setIsTyping(true)

    const step = steps[currentStep]
    const userMsgId = `user-${currentStep}`
    setMessages((prev) => [...prev, { from: "user", text: trimmed, id: userMsgId }])

    const newAnswers = { ...answers, [step.id]: trimmed }
    setAnswers(newAnswers)
    setInputValue("")

    const nextStep = currentStep + 1
    setCurrentStep(nextStep)

    if (nextStep >= steps.length) {
      submitLead(newAnswers)
      return
    }

    setTimeout(() => {
      sendBotMessage(steps[nextStep].question, `bot-${nextStep}`)
    }, 500)
  }

  async function submitLead(finalAnswers: Record<string, string>) {
    setIsSubmitting(true)
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalAnswers),
      })
    } catch {
      // Falha silenciosa — não bloqueia o fluxo do usuário
    }
    setTimeout(() => {
      setIsSubmitting(false)
      if (isQualified(finalAnswers)) {
        setPhase("qualified")
      } else {
        setPhase("unqualified")
      }
    }, 1000)
  }

  const currentStepData = steps[currentStep]
  const progress = Math.min((currentStep / steps.length) * 100, 100)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-0 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-2xl flex flex-col overflow-hidden"
            style={{ maxHeight: "90vh", height: "90vh" }}
          >
            {/* Header */}
            <div className="shrink-0 px-6 pt-6 pb-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/logos/nexus_logo_symbol.png"
                    alt="Nexus"
                    width={20}
                    height={20}
                    className="w-6 h-6 object-contain"
                  />
                  <div>
                    <div className="text-sm font-semibold text-[#111827]">Nexus</div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#6DA08D]" />
                      <span className="text-xs text-gray-400">Online agora</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <X size={14} strokeWidth={2.5} className="text-gray-500" />
                </button>
              </div>

              {/* Progress bar */}
              {phase === "chat" && (
                <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#4A90E2] rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>

            {/* Chat area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3"
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl text-base leading-relaxed ${
                        msg.from === "bot"
                          ? "bg-gray-100 text-[#111827] rounded-tl-sm"
                          : "bg-[#4A90E2] text-white rounded-tr-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-gray-400"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submitting */}
              {isSubmitting && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-sm text-gray-500">
                    Analisando suas respostas...
                  </div>
                </motion.div>
              )}

              {/* Qualified screen */}
              {phase === "qualified" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-4 mt-2"
                >
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-base text-[#111827] leading-relaxed">
                    Perfeito, {answers.name}! Sua clínica é exatamente o perfil
                    que atendemos. Escolha um horário abaixo para uma demonstração
                    de 30 minutos do sistema em funcionamento.
                  </div>
                  <div className="w-full rounded-2xl overflow-hidden border border-gray-100 bg-gray-50 flex flex-col items-center justify-center py-12 gap-3">
                    {/* Cal.com embed placeholder */}
                    <div className="text-sm text-gray-400 text-center px-6">
                      <div className="w-8 h-8 rounded-full bg-[#4A90E2]/10 flex items-center justify-center mx-auto mb-3">
                        <span className="text-[#4A90E2] text-base font-bold">C</span>
                      </div>
                      <p className="font-medium text-gray-600 mb-1">
                        Calendário de demonstrações
                      </p>
                      <p className="text-xs text-gray-400">
                        Substitua este bloco pelo embed do Cal.com
                      </p>
                      <code className="block mt-2 text-xs bg-gray-100 rounded px-2 py-1 text-gray-500">
                        Cal.com embed — configure sua URL
                      </code>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Unqualified screen */}
              {phase === "unqualified" && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-3 mt-2"
                >
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-base text-[#111827] leading-relaxed">
                    Obrigado pelo seu interesse! Nosso produto foi desenvolvido
                    especificamente para donos e gestores de clínicas.
                  </div>
                  <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 text-base text-[#111827] leading-relaxed">
                    Se você conhece alguém que gerencia uma clínica e pode se
                    beneficiar da Nexus, ficamos felizes se compartilhar! Obrigado.
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input area — only shown during chat and when not typing */}
            <AnimatePresence>
              {phase === "chat" && !isTyping && !isSubmitting && currentStepData && (
                <motion.div
                  key={`input-${currentStep}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 px-4 pb-4 pt-2 border-t border-gray-100"
                >
                  {currentStepData.type === "choice" ? (
                    <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-2">
                      {currentStepData.options?.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => handleChoice(opt)}
                          className="w-full sm:w-auto px-4 py-3 sm:py-2.5 rounded-xl border border-gray-200 bg-white text-base font-medium text-[#111827] hover:border-[#4A90E2] hover:bg-[#4A90E2]/5 transition-all cursor-pointer active:scale-95 text-left sm:text-center"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        type={currentStepData.id === "whatsapp" ? "tel" : "text"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleTextSubmit()}
                        placeholder={currentStepData.placeholder}
                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-base text-[#111827] placeholder-gray-400 outline-none focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/10 transition-all"
                        autoFocus
                      />
                      <button
                        onClick={handleTextSubmit}
                        disabled={!inputValue.trim()}
                        className="w-11 h-11 rounded-xl bg-[#4A90E2] flex items-center justify-center disabled:opacity-40 hover:bg-[#3a80d2] transition-colors cursor-pointer shrink-0"
                      >
                        <ArrowRight size={18} className="text-white" strokeWidth={2.5} />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
