"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, Smartphone, Download, Share } from "lucide-react"
import Link from "next/link"

export default function QRMenuPage() {
  const handleDownloadQR = () => {
    // Aquí implementarías la descarga del código QR
    console.log("Descargando código QR...")
  }

  const handleShareQR = () => {
    // Aquí implementarías el compartir del código QR
    if (navigator.share) {
      navigator.share({
        title: "Menú Los Naranjos",
        text: "Revisa nuestro menú digital",
        url: window.location.origin + "/menu",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Menú QR</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Accede rápidamente a nuestro menú digital escaneando el código QR desde tu mesa
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Código QR */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md">
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center">
                  <QrCode className="w-6 h-6 mr-2 text-orange-600" />
                  Código QR del Menú
                </CardTitle>
                <CardDescription>Escanea con tu cámara para acceder al menú</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                {/* Aquí iría el código QR real */}
                <div className="w-64 h-64 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <QrCode className="w-32 h-32 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Código QR del Menú</p>
                  </div>
                </div>

                <div className="flex space-x-2 w-full">
                  <Button onClick={handleDownloadQR} variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Descargar
                  </Button>
                  <Button onClick={handleShareQR} variant="outline" className="flex-1">
                    <Share className="w-4 h-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Instrucciones */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Smartphone className="w-5 h-5 mr-2 text-orange-600" />
                  Cómo usar el Menú QR
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Abre la cámara de tu teléfono</h4>
                    <p className="text-sm text-gray-600">
                      La mayoría de teléfonos modernos pueden escanear códigos QR directamente desde la cámara
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">Apunta al código QR</h4>
                    <p className="text-sm text-gray-600">
                      Enfoca el código QR que está en tu mesa y espera a que aparezca la notificación
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Toca la notificación</h4>
                    <p className="text-sm text-gray-600">
                      Se abrirá automáticamente nuestro menú digital en tu navegador
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-medium">¡Explora nuestro menú!</h4>
                    <p className="text-sm text-gray-600">
                      Navega por todas nuestras categorías y descubre nuestros deliciosos platos
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ventajas del Menú Digital</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Siempre actualizado con los últimos platos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Información detallada de ingredientes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Fotos de alta calidad de todos los platos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Precios actualizados en tiempo real</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-sm">Disponible en múltiples idiomas</span>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Link href="/menu">
                <Button className="orange-gradient text-white">Ver Menú Completo</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
