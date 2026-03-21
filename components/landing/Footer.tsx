import Image from "next/image"
import { Shield, Lock } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo + tagline */}
          <div>
            <Image
              src="/logos/nexus_logo_equalized.png"
              alt="Nexus Clínicas"
              width={100}
              height={28}
              className="h-7 w-auto object-contain mb-3"
            />
            <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
              A inteligência artificial que atende seus pacientes.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-6">
            <a
              href="#como-funciona"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Como funciona
            </a>
            <a
              href="#planos"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Planos
            </a>
            <a
              href="#faq"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Política de privacidade
            </a>
          </nav>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Nexus Clínicas. Todos os direitos reservados.
            Powered by{" "}
            <span className="font-medium text-gray-500">lucaspit.ai</span>
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Shield size={13} strokeWidth={2} />
              <span>Supabase</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Lock size={13} strokeWidth={2} />
              <span>Dados protegidos</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
