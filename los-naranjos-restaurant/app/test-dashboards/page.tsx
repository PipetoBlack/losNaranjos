"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Users, User, ChefHat, Wine, UserCheck } from "lucide-react"

export default function TestDashboardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Acceso Rápido a Dashboards</h1>
          <p className="text-lg text-gray-600">
            Página de prueba para acceder directamente a los diferentes paneles de usuario
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dashboard Admin */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle>Dashboard Administrativo</CardTitle>
              <CardDescription>
                Panel completo para administradores con acceso a todas las funcionalidades
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Funcionalidades:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Gestión completa de menú</li>
                  <li>Reportes de ventas y Excel</li>
                  <li>Administrar reservas</li>
                  <li>Control de empleados</li>
                </ul>
              </div>
              <Link href="/admin/dashboard">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Acceder como Admin</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Dashboard Mozo */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle>Panel de Mozo</CardTitle>
              <CardDescription>Interfaz para mozos con gestión de mesas y entrega de pedidos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Funcionalidades:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Gestión de mesas asignadas</li>
                  <li>Tomar pedidos</li>
                  <li>Entregar pedidos listos</li>
                  <li>Control de turnos</li>
                </ul>
              </div>
              <Link href="/mozo/dashboard">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Acceder como Mozo</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Dashboard Cocina */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle>Panel de Cocina</CardTitle>
              <CardDescription>Interfaz para chef y cocina con gestión de pedidos de comida</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Funcionalidades:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Ver pedidos pendientes</li>
                  <li>Marcar en preparación</li>
                  <li>Completar pedidos</li>
                  <li>Gestión de tiempos</li>
                </ul>
              </div>
              <Link href="/cocina/dashboard">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white">Acceder como Cocina</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Dashboard Bar */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wine className="w-8 h-8 text-purple-600" />
              </div>
              <CardTitle>Panel de Bar</CardTitle>
              <CardDescription>Interfaz para bartender con gestión de bebidas y cócteles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Funcionalidades:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Pedidos de bebidas</li>
                  <li>Preparar cócteles</li>
                  <li>Gestión de tiempos</li>
                  <li>Marcar como listo</li>
                </ul>
              </div>
              <Link href="/bar/dashboard">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Acceder como Bar</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Dashboard Anfitrión */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle>Panel de Anfitrión</CardTitle>
              <CardDescription>Interfaz para anfitrión con gestión de reservas y recepción</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Funcionalidades:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Gestión de reservas</li>
                  <li>Asignación de mesas</li>
                  <li>Lista de espera</li>
                  <li>Recepción de clientes</li>
                </ul>
              </div>
              <Link href="/anfitrion/dashboard">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Acceder como Anfitrión</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Dashboard Cliente */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-gray-600" />
              </div>
              <CardTitle>Área de Cliente</CardTitle>
              <CardDescription>Panel personal para clientes con historial de reservas y acceso al menú</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-gray-600">
                <p>
                  <strong>Funcionalidades:</strong>
                </p>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Hacer reservas</li>
                  <li>Ver historial</li>
                  <li>Acceso al menú</li>
                  <li>Gestionar perfil</li>
                </ul>
              </div>
              <Link href="/cliente/dashboard">
                <Button className="w-full bg-gray-600 hover:bg-gray-700 text-white">Acceder como Cliente</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Instrucciones de Login */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Instrucciones para el Login Automático</CardTitle>
            <CardDescription>
              También puedes probar el sistema de login automático usando estos emails de prueba
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Para Administrador:</h4>
                <p className="text-red-700">
                  Email: <code>admin@admin.com</code>
                  <br />
                  Contraseña: cualquiera
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Para Mozo:</h4>
                <p className="text-blue-700">
                  Email: <code>juan@mozo.com</code>
                  <br />
                  Contraseña: cualquiera
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Para Cocina:</h4>
                <p className="text-red-700">
                  Email: <code>chef@cocina.com</code>
                  <br />
                  Contraseña: cualquiera
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-800 mb-2">Para Bar:</h4>
                <p className="text-purple-700">
                  Email: <code>bartender@bar.com</code>
                  <br />
                  Contraseña: cualquiera
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Para Anfitrión:</h4>
                <p className="text-green-700">
                  Email: <code>recepcion@anfitrion.com</code>
                  <br />
                  Contraseña: cualquiera
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Para Cliente:</h4>
                <p className="text-gray-700">
                  Email: <code>cliente@gmail.com</code>
                  <br />
                  Contraseña: cualquiera
                </p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Link href="/login">
                <Button variant="outline" className="border-orange-400 text-orange-600 hover:bg-orange-50">
                  Ir a Página de Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
