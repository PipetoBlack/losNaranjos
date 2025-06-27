import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo y descripción (col-span-2 para ocupar mitad del ancho) */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">LN</span>
              </div>
              <span className="text-xl font-bold">Los Naranjos</span>
            </div>
            <p className="text-gray-300 mb-4">
              Experiencia gastronómica única con los mejores sabores y un ambiente acogedor. Ven y disfruta de nuestros
              platos preparados con ingredientes frescos y de calidad.
            </p>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-300">Av. Los Naranjos 6344, La Florida</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-300">+56 9 12345678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-sm text-gray-300">info@losnaranjos.com</span>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Horarios</h3>
            <div className="grid grid-cols-[auto,1fr] gap-x-4 text-sm text-zinc-300">
              <div className="font-medium">Lunes a Jueves:</div>
              <div>12:00 a 23:00</div>
              <div className="font-medium">Viernes a Sábado:</div>
              <div>12:00 a 24:00</div>
              <div className="font-medium">Domingo:</div>
              <div>12:00 a 22:00</div>
            </div>
          </div>

        </div>

        {/* Derechos y links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">© 2025 Los Naranjos. Todos los derechos reservados.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacidad" className="text-sm text-gray-400 hover:text-white">
                Política de Privacidad
              </Link>
              <Link href="/terminos" className="text-sm text-gray-400 hover:text-white">
                Términos de Servicio
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}


