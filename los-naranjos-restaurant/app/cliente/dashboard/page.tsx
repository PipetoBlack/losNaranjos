"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, UtensilsCrossed } from "lucide-react"
import Link from "next/link"

export default function ClienteDashboard() {
  const reservasRecientes = [
    { id: 1, fecha: "2024-01-15", hora: "19:30", personas: 4, estado: "Confirmada" },
    { id: 2, fecha: "2024-01-10", hora: "20:00", personas: 2, estado: "Completada" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Cuenta</h1>
          <p className="text-gray-600">Bienvenido a Los Naranjos</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                Nueva Reserva
              </CardTitle>
              <CardDescription>Reserva tu mesa para una experiencia única</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/reservas">
                <Button className="w-full orange-gradient text-white">Reservar Mesa</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UtensilsCrossed className="w-5 h-5 mr-2 text-orange-600" />
                Nuestro Menú
              </CardTitle>
              <CardDescription>Explora nuestros deliciosos platos</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/menu">
                <Button className="w-full" variant="outline">
                  Ver Menú
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Reservas Recientes */}
        <Card>
          <CardHeader>
            <CardTitle>Mis Reservas</CardTitle>
            <CardDescription>Historial de reservas recientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservasRecientes.map((reserva) => (
                <div key={reserva.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <div>
                      <div className="font-medium">
                        {reserva.fecha} a las {reserva.hora}
                      </div>
                      <div className="text-sm text-gray-500">{reserva.personas} personas</div>
                    </div>
                  </div>
                  <Badge variant={reserva.estado === "Confirmada" ? "default" : "secondary"}>{reserva.estado}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
