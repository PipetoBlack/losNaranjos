"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Clock, Wine, AlertTriangle, CheckCircle, Timer } from "lucide-react"
import Link from "next/link"

export default function BarDashboard() {
  const { toast } = useToast()

  const pedidosBar = [
    {
      id: 1,
      mesa: 5,
      items: ["Pisco Sour", "Vino Tinto"],
      estado: "En preparación",
      tiempo: "5 min",
      prioridad: "normal",
      tiempoEstimado: "2 min",
    },
    {
      id: 2,
      mesa: 3,
      items: ["Chicha Morada", "Limonada Frozen"],
      estado: "Pendiente",
      tiempo: "1 min",
      prioridad: "alta",
      tiempoEstimado: "3 min",
    },
    {
      id: 3,
      mesa: 12,
      items: ["Cappuccino", "Café Americano"],
      estado: "En preparación",
      tiempo: "8 min",
      prioridad: "normal",
      tiempoEstimado: "1 min",
    },
  ]

  const pedidosListos = [{ id: 4, mesa: 8, items: ["Pisco Sour", "Cerveza"], tiempo: "Listo hace 1 min" }]

  const handleIniciarPedido = (pedidoId: number) => {
    toast({
      title: "Pedido Iniciado",
      description: "El pedido ha sido marcado como 'En preparación'",
    })
  }

  const handleCompletarPedido = (pedidoId: number, mesa: number) => {
    toast({
      title: "Pedido Completado",
      description: `Bebidas de la mesa ${mesa} listas para entregar`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                Panel de Bar
              </h1>
              <p className="text-gray-600 mt-2">Gestión de bebidas y cócteles</p>
            </div>
            <Link href="/">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white">Volver al Inicio</Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Pedidos Pendientes</CardTitle>
              <Wine className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">3</div>
              <p className="text-xs text-purple-700">1 de alta prioridad</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">En Preparación</CardTitle>
              <Timer className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">2</div>
              <p className="text-xs text-orange-700">Tiempo promedio: 3 min</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Completados Hoy</CardTitle>
              <CheckCircle className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">63</div>
              <p className="text-xs text-green-700">+12 desde ayer</p>
            </CardContent>
          </Card>
        </div>

        {/* Pedidos Listos */}
        <Card className="mb-8 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" />
              Bebidas Listas
            </CardTitle>
            <CardDescription>Bebidas completadas esperando ser entregadas</CardDescription>
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
                      <div className="text-sm text-green-600">{pedido.tiempo}</div>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white">Listo</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pedidos Activos */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wine className="w-5 h-5 mr-2 text-purple-600" />
              Pedidos de Bar
            </CardTitle>
            <CardDescription>Bebidas pendientes y en preparación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pedidosBar.map((pedido) => (
                <div key={pedido.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="font-bold text-lg">Mesa {pedido.mesa}</div>
                    <div className="flex-1">
                      <div className="font-medium">{pedido.items.join(", ")}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        Recibido hace: {pedido.tiempo}
                        {pedido.prioridad === "alta" && <AlertTriangle className="w-3 h-3 ml-2 text-red-500" />}
                      </div>
                      <div className="text-sm text-blue-600">Tiempo estimado: {pedido.tiempoEstimado}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={pedido.estado === "En preparación" ? "default" : "secondary"}
                      className={pedido.prioridad === "alta" ? "bg-red-100 text-red-800" : ""}
                    >
                      {pedido.estado}
                    </Badge>
                    {pedido.estado === "Pendiente" ? (
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={() => handleIniciarPedido(pedido.id)}
                      >
                        Iniciar
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleCompletarPedido(pedido.id, pedido.mesa)}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Completar
                      </Button>
                    )}
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
