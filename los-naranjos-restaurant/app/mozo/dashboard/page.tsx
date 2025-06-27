"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Clock, Users, CheckCircle, AlertCircle, Timer, Plus } from "lucide-react"
import Link from "next/link"

export default function MozoDashboard() {
  const { toast } = useToast()

  const mesasAsignadas = [
    { numero: 3, personas: 2, estado: "Comiendo", pedido: "Completado", tiempo: "45 min" },
    { numero: 5, personas: 4, estado: "Esperando", pedido: "En preparación", tiempo: "15 min" },
    { numero: 8, personas: 3, estado: "Pidiendo", pedido: "Pendiente", tiempo: "5 min" },
    { numero: 12, personas: 6, estado: "Llegando", pedido: "Sin pedido", tiempo: "2 min" },
  ]

  const pedidosListos = [
    { id: 1, mesa: 5, items: ["Lomo Saltado", "Pisco Sour"], tiempo: "Listo" },
    { id: 2, mesa: 3, items: ["Ceviche", "Chicha Morada"], tiempo: "Listo" },
  ]

  const handleTomarPedido = (mesa: number) => {
    toast({
      title: "Tomar Pedido",
      description: `Iniciando toma de pedido para mesa ${mesa}`,
    })
  }

  const handleEntregarPedido = (pedidoId: number, mesa: number) => {
    toast({
      title: "Pedido Entregado",
      description: `Pedido de la mesa ${mesa} entregado exitosamente`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Panel de Mozo
              </h1>
              <p className="text-gray-600 mt-2">Gestión de mesas y pedidos</p>
            </div>
            <Link href="/">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Volver al Inicio</Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Mesas Asignadas</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">6</div>
              <p className="text-xs text-blue-700">4 ocupadas actualmente</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Pedidos Listos</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">2</div>
              <p className="text-xs text-green-700">Para entregar</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Mi Turno</CardTitle>
              <Clock className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">12:00 - 20:00</div>
              <p className="text-xs text-orange-700">6 horas restantes</p>
            </CardContent>
          </Card>
        </div>

        {/* Pedidos Listos para Entregar */}
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" />
              Pedidos Listos para Entregar
            </CardTitle>
            <CardDescription>Pedidos que están listos desde cocina/bar</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pedidosListos.map((pedido) => (
                <div
                  key={pedido.id}
                  className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="font-bold text-lg text-green-800">Mesa {pedido.mesa}</div>
                    <div>
                      <div className="font-medium">{pedido.items.join(", ")}</div>
                      <div className="text-sm text-green-600 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {pedido.tiempo}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleEntregarPedido(pedido.id, pedido.mesa)}
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Entregar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mesas Asignadas */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              Mis Mesas Asignadas
            </CardTitle>
            <CardDescription>Control de mesas bajo tu responsabilidad</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mesasAsignadas.map((mesa) => (
                <div key={mesa.numero} className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-xl text-blue-800">Mesa {mesa.numero}</h3>
                      <p className="text-sm text-gray-500">{mesa.personas} personas</p>
                      <p className="text-sm text-gray-500 flex items-center">
                        <Timer className="w-3 h-3 mr-1" />
                        {mesa.tiempo}
                      </p>
                    </div>
                    <Badge
                      variant={
                        mesa.estado === "Comiendo"
                          ? "default"
                          : mesa.estado === "Esperando"
                            ? "secondary"
                            : mesa.estado === "Pidiendo"
                              ? "outline"
                              : "destructive"
                      }
                    >
                      {mesa.estado}
                    </Badge>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm">
                      <strong>Pedido:</strong> {mesa.pedido}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    {mesa.pedido === "Sin pedido" && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => handleTomarPedido(mesa.numero)}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Tomar Pedido
                      </Button>
                    )}
                    <Button size="sm" variant="outline">
                      Ver Detalles
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
