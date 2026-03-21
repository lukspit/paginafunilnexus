import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

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
  return (
    (revenueRanks[answers.monthly_revenue] ?? 0) >= 1 ||
    (appointmentRanks[answers.monthly_appointments] ?? 0) >= 1
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const lead = {
      name: body.name ?? null,
      whatsapp: body.whatsapp ?? null,
      is_owner: body.is_owner ?? null,
      specialty: body.specialty ?? null,
      monthly_appointments: body.monthly_appointments ?? null,
      monthly_revenue: body.monthly_revenue ?? null,
      whatsapp_leads: body.whatsapp_leads ?? null,
      has_secretary: body.has_secretary ?? null,
      is_qualified: isQualified(body),
      source: "landing_page",
      created_at: new Date().toISOString(),
    }

    // Se não tiver Supabase configurado, loga e retorna OK
    if (!supabaseUrl || !supabaseKey) {
      console.warn("[leads] Supabase não configurado — lead não salvo:", lead)
      return NextResponse.json({ ok: true, warning: "supabase_not_configured" })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { error } = await supabase.from("landing_leads").insert(lead)

    if (error) {
      console.error("[leads] Erro ao inserir lead:", error)
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error("[leads] Erro inesperado:", err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
