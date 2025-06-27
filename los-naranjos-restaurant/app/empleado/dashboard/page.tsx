"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Clock, UtensilsCrossed, Users, CheckCircle, AlertCircle, Timer } from "lucide-react"
import Link from "next/link"

export default function EmpleadoDashboard() {
  const [activeTab, setActiveTab] = useState("orders")
  const { toast } = useToast()

  const pedidosActivos = [
    {
      id: 1,
      mesa: 5,
      items: ["Lomo Saltado", "Pisco Sour"],
      estado: "En preparación",
      tiempo: "12 min",
      prioridad: "normal",
    },
    { id: 2, mesa: 3, items: ["Ceviche", "Chicha Morada"], estado: "Listo", tiempo: "5 min", prioridad: "alta" },
    { id: 3, mesa: 8, items: ["Arroz con Pollo"], estado: "En cocina", tiempo: "18 min", prioridad: "normal" },
    {
      id: 4,
      mesa: 12,
      items: ["Pescado a la Plancha", "Vino Tinto"],
      estado: "Pendiente",
      tiempo: "2 min",
      prioridad: "alta",
    },
  ]

  const mesasOcupadas = [
    { numero: 3, personas: 2, estado: "Comiendo", pedido: "Completado" },
    { numero: 5, personas: 4, estado: "Esperando", pedido: "En preparación" },
    { numero: 8, personas: 3, estado: "Pidiendo", pedido: "Pendiente" },
    { numero: 12, personas: 6, estado: "Llegando", pedido: "Sin pedido" },
  ]

  const handlePedidoAction = (pedidoId: number, action: string) => {
    toast({
      title: `Pedido ${action}`,
      description: `El pedido de la mesa ha sido marcado como ${action.toLowerCase()}`,
    })
  }

  const handleMesaAction = (mesa: number, action: string) => {
    toast({
      title: `Mesa ${mesa}`,
      description: `Acción "${action}" realizada en la mesa ${mesa}`,
    })
  }

  const handleTomarPedido = (mesa: number) => {
    toast({
      title: "Tomar Pedido",
      description: `Iniciando toma de pedido para mesa ${mesa}`,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Panel de Trabajo</h1>
            <p className="text-gray-600">Gestión de pedidos y mesas - Los Naranjos</p>
          </div>
          <Link href="/">
            <Button variant="outline">Volver al Inicio</Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Pedidos</TabsTrigger>
            <TabsTrigger value="tables">Mesas</TabsTrigger>
            <TabsTrigger value="schedule">Mi Turno</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pedidos Activos</CardTitle>
                  <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">4 listos para entregar</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mesas Asignadas</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">6</div>
                  <p className="text-xs text-muted-foreground">De 20 totales</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Mi Turno</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12:00 - 20:00</div>
                  <p className="text-xs text-muted-foreground">6 horas restantes</p>
                </CardContent>
              </Card>
            </div>

            {/* Pedidos Activos */}
            <Card>
              <CardHeader>
                <CardTitle>Pedidos Activos</CardTitle>
                <CardDescription>Gestiona los pedidos en tiempo real</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pedidosActivos.map((pedido) => (
                    <div key={pedido.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="font-bold text-lg">Mesa {pedido.mesa}</div>
                        <div>
                          <div className="font-medium">{pedido.items.join(", ")}</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Timer className="w-3 h-3 mr-1" />
                            Tiempo: {pedido.tiempo}
                            {pedido.prioridad === "alta" && <AlertCircle className="w-3 h-3 ml-2 text-red-500" />}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge
                          variant={
                            pedido.estado === "Listo"
                              ? "default"
                              : pedido.estado === "En preparación"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {pedido.estado}
                        </Badge>
                        {pedido.estado === "Listo" && (
                          <Button
                            size="sm"
                            className="orange-gradient text-white"
                            onClick={() => handlePedidoAction(pedido.id, "Entregado")}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Entregar
                          </Button>
                        )}
                        {pedido.estado === "Pendiente" && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handlePedidoAction(pedido.id, "Enviado a cocina")}
                          >
                            Enviar a Cocina
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tables" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Mesas</CardTitle>
                <CardDescription>Control de mesas asignadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mesasOcupadas.map((mesa) => (
                    <div key={mesa.numero} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-lg">Mesa {mesa.numero}</h3>
                          <p className="text-sm text-gray-500">{mesa.personas} personas</p>
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
                            className="orange-gradient text-white"
                            onClick={() => handleTomarPedido(mesa.numero)}
                          >
                            Tomar Pedido
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleMesaAction(mesa.numero, "Limpiar")}>
                          Limpiar Mesa
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mi Horario</CardTitle>
                <CardDescription>Información de tu turno actual</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold text-blue-800">Turno Actual</h3>
                      <p className="text-blue-700">12:00 - 20:00</p>
                      <p className="text-sm text-blue-600">6 horas restantes</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h3 className="font-semibold text-green-800">Descanso</h3>
                      <p className="text-green-700">16:00 - 16:30</p>
                      <p className="text-sm text-green-600">En 2 horas</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-800">Próximo Turno</h3>
                      <p className="text-gray-700">Mañana 12:00 - 20:00</p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg">
                      <h3 className="font-semibold text-orange-800">Horas Esta Semana</h3>
                      <p className="text-orange-700">32 de 40 horas</p>
                      <p className="text-sm text-orange-600">8 horas restantes</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
