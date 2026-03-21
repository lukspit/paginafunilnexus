# Nexus Clínicas — Contexto do Produto

Este arquivo contém todo o briefing do produto para uso no desenvolvimento da landing page.

---

## O que é o Nexus

**Nexus** é um SaaS para gestão de clínicas que usa inteligência artificial para automatizar o atendimento receptivo via WhatsApp. A IA responde pacientes, agenda consultas diretamente no Google Calendar, faz follow-up de leads e recupera quem estava prestes a desistir — tudo de forma automática, 24h por dia.

**Meta Description oficial:** "A inteligência artificial que atende seus pacientes"

**Headline principal:** "Pare de perder consultas. Sua clínica no piloto automático, 24h por dia."

**Subheadline:** "Veja como a Nexus responde seus pacientes no WhatsApp, agenda consultas e recupera quem quase desistiu, enquanto você trabalha ou descansa."

---

## ICP (Ideal Customer Profile)

- Donos de clínicas de saúde (médicos, dentistas, psicólogos, fisioterapeutas, etc.)
- Consultórios particulares ou pequenas clínicas (1 a 3 profissionais)
- Clínicas que recebem leads pelo WhatsApp mas perdem por demora no atendimento
- Clínicas que dependem de secretária para agendar consultas
- Faturamento estimado: R$ 15k–R$ 80k/mês

**Dores principais:**
- Perder pacientes por não responder rápido no WhatsApp
- Secretária sobrecarregada ou ausente fora do horário comercial
- Leads que somem sem marcar consulta
- Agenda com buracos por falta de follow-up

---

## Diferenciais

| Ícone | Diferencial | Descrição |
|-------|------------|-----------|
| ⚡ | Resposta em segundos | A IA atende seus pacientes no WhatsApp a qualquer hora, inclusive de madrugada. |
| 📅 | Zero vagas perdidas | Agendamentos confirmados automaticamente, sem precisar de intervenção humana. |
| 🔄 | Pacientes recuperados | Follow-up automático para quem não respondeu ou estava prestes a desistir. |

---

## Planos e Preços

### Plano Base — R$ 497/mês
Para profissionais em consultório particular que precisam automatizar o atendimento receptivo.

**Inclui:**
- Atendimento IA agendador
- Integração WhatsApp
- Gestão de 1 agenda (Google Calendar)
- Até 300 atendimentos/mês
- Suporte via e-mail

**Não inclui:** IA Ativa (follow-up), múltiplas agendas, dashboard analítico, suporte prioritário

---

### Plano Pro — R$ 697/mês ⭐ Mais Assinado
Para clínicas que precisam de uma IA inteligente para recuperar leads e gerir múltiplos médicos.

**Inclui tudo do Base, mais:**
- Até 1.500 atendimentos/mês
- Gestão de até 3 agendas
- IA Ativa: Follow-up de recuperação de pacientes perdidos
- Disparo automático de lembretes
- Dashboard analítico avançado
- Suporte prioritário via WhatsApp

---

### Plano Enterprise — Valor customizado
Para redes de clínicas ou alto volume de consultas.

**Inclui tudo do Pro, mais:**
- 5.000+ atendimentos/mês
- Agendas ilimitadas
- Treinamento de IA com dados internos
- SLA de tempo de resposta garantido
- Customer Success dedicado

**Todos os planos incluem 7 dias de teste grátis. Cancele quando quiser.**

---

## Integrações

- **WhatsApp** via Z-API
- **Google Calendar** — agendamento direto na agenda do profissional
- **IA** via OpenAI

---

## Identidade Visual

### Cores
- **Primária:** Azul Healthcare `#4A90E2` / `oklch(0.6 0.15 245)`
- **Secundária:** Verde Sage `#6DA08D` / `oklch(0.7 0.1 160)`
- **Background (light):** Branco puro `#FFFFFF`
- **Background (dark):** `#111827`
- **Texto:** Charcoal `oklch(0.2 0 0)`
- **Hero escuro (pricing):** `#0A0F1E`

### Logos disponíveis em `/public/logos/`
- `nexus_logo_equalized.png` — logo completa (símbolo + texto) — uso principal
- `nexus_logo_symbol.png` — só o símbolo "N" — uso em espaços pequenos
- `nexus_logo_text.png` — só o texto "Nexus"
- `nexus_clinicas_logo.png` — versão com "Clínicas" no nome
- `nexus_logo.png` — versão padrão

### Tipografia
- **Fonte:** Geist (Google Fonts)
- **Variáveis:** `--font-geist-sans`, `--font-geist-mono`
- **Antialiasing:** habilitado globalmente

### Componentes / Style
- **UI:** shadcn/ui estilo "new-york"
- **Ícones:** Lucide React
- **Border radius base:** `0.625rem` (10px)

---

## Funil da Landing Page

### Estrutura do funil:
1. **Anúncio pago** (Meta Ads / Google Ads) → Landing page
2. **Landing page** com copy focada no ICP e CTA
3. **Formulário conversacional** (estilo chatbot) para qualificação do lead
4. **Qualificação automática** com base nas respostas:
   - É dono da clínica?
   - Qual especialidade?
   - Quantos atendimentos por mês?
   - Quanto fatura a clínica?
   - Quantos leads recebe via WhatsApp?
   - Usa secretária hoje?
5. **Lead qualificado** → exibe calendário para agendamento de demonstração
6. **Lead não qualificado** → mensagem de agradecimento / nurturing

### Objetivo da página:
Capturar leads qualificados (donos de clínica com dor real e capacidade de pagar) e agendar demonstrações do produto.

---

## Copy Base

**CTAs disponíveis:**
- "Quero automatizar minha clínica"
- "Ver demonstração"
- "Começar teste grátis"
- "Agendar demonstração"

**Social proof / rodapé:**
- "Todos os planos incluem 7 dias de teste grátis. Cancele quando quiser."
- "Powered by lucaspit.ai"
- "Segurança garantida por tecnologia Supabase & Stripe"

---

## Stack Técnica da Landing

- **Framework:** Next.js 16 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS 4
- **Formulário conversacional:** Componente React multi-step customizado
- **Calendário de demos:** Calendly ou Cal.com (embed)
- **Captura de leads:** Supabase (mesmo banco do SaaS principal)
- **Deploy:** Vercel
