"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

const integrations = [
  {
    name: "WhatsApp",
    description: "Atendimento receptivo via Z-API",
    logo: "/logos/whatsapp.png",
  },
  {
    name: "Google Calendar",
    description: "Agendamentos direto na agenda",
    logo: "/logos/google_calendar_logo.png",
  },
  {
    name: "OpenAI",
    description: "IA generativa de última geração",
    logo: null,
    text: "OpenAI",
  },
]

export default function IntegrationsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} className="bg-white py-20 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase">
            Integra com o que você já usa
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0">
          {integrations.map((item, i) => (
            <div key={item.name} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex flex-col items-center gap-3 px-10 py-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center">
                  {item.logo ? (
                    <Image
                      src={item.logo}
                      alt={item.name}
                      width={32}
                      height={32}
                      className="object-contain w-8 h-8"
                    />
                  ) : (
                    <span className="text-xs font-bold text-[#111827]">
                      {item.text}
                    </span>
                  )}
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-[#111827]">
                    {item.name}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {item.description}
                  </div>
                </div>
              </motion.div>

              {i < integrations.length - 1 && (
                <div className="hidden sm:flex items-center justify-center w-8">
                  <div className="flex gap-0.5">
                    {[0, 1, 2].map((dot) => (
                      <div
                        key={dot}
                        className="w-1 h-1 rounded-full bg-gray-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
