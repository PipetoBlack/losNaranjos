"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Users,
  UtensilsCrossed,
  Calendar,
  DollarSign,
  Settings,
  Plus,
  Edit,
  Clock,
  TrendingUp,
  BarChart3,
  FileSpreadsheet,
  Trash2,
  Eye,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [isAddingPlato, setIsAddingPlato] = useState(false)
  const [isEditingPrice, setIsEditingPrice] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("semana")
  const { toast } = useToast()

  // Estados para formularios
  const [newPlato, setNewPlato] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    vegetariano: false,
  })

  const [menuItems, setMenuItems] = useState([
    { id: 1, nombre: "Lomo Saltado", precio: 18900, categoria: "principales", ventas: 45 },
    { id: 2, nombre: "Ceviche de Pescado", precio: 12900, categoria: "entradas", ventas: 32 },
    { id: 3, nombre: "Pisco Sour", precio: 8900, categoria: "bebidas_alcohol", ventas: 28 },
    { id: 4, nombre: "Arroz con Pollo", precio: 14900, categoria: "principales", ventas: 25 },
  ])

  const ventasData = {
    semana: { total: 12847000, pedidos: 156, promedio: 82352 },
    mes: { total: 52340000, pedidos: 678, promedio: 77196 },
    año: { total: 628080000, pedidos: 8134, promedio: 77234 },
  }

  const reservasHoy = [
    { id: 1, cliente: "María González", hora: "19:30", personas: 4, estado: "Confirmada" },
    { id: 2, cliente: "Carlos Rodríguez", hora: "20:00", personas: 2, estado: "Pendiente" },
    { id: 3, cliente: "Ana Martínez", hora: "20:30", personas: 6, estado: "Confirmada" },
  ]

  const empleados = [
    { id: 1, nombre: "Juan Pérez", rol: "Mozo", email: "juan@mozo.com", turno: "12:00-20:00", estado: "Activo" },
    { id: 2, nombre: "María Silva", rol: "Chef", email: "maria@cocina.com", turno: "11:00-19:00", estado: "Activo" },
    { id: 3, nombre: "Pedro López", rol: "Bartender", email: "pedro@bar.com", turno: "18:00-02:00", estado: "Activo" },
    {
      id: 4,
      nombre: "Ana García",
      rol: "Anfitrión",
      email: "ana@anfitrion.com",
      turno: "12:00-20:00",
      estado: "Activo",
    },
  ]

  const handleAddPlato = () => {
    if (!newPlato.nombre || !newPlato.precio || !newPlato.categoria) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      })
      return
    }

    const plato = {
      id: menuItems.length + 1,
      nombre: newPlato.nombre,
      precio: Number.parseInt(newPlato.precio),
      categoria: newPlato.categoria,
      ventas: 0,
    }

    setMenuItems([...menuItems, plato])
    setNewPlato({ nombre: "", descripcion: "", precio: "", categoria: "", vegetariano: false })
    setIsAddingPlato(false)

    toast({
      title: "Plato Agregado",
      description: `${newPlato.nombre} ha sido agregado al menú exitosamente`,
    })
  }

  const handleDeletePlato = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
    toast({
      title: "Plato Eliminado",
      description: "El plato ha sido eliminado del menú",
    })
  }

  const handleUpdatePrice = (id: number, newPrice: number) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, precio: newPrice } : item)))
    toast({
      title: "Precio Actualizado",
      description: "El precio del plato ha sido actualizado",
    })
  }

  const handleDownloadReport = () => {
    const data = ventasData[selectedPeriod as keyof typeof ventasData]

    // Simulación de descarga de Excel
    const csvContent =
      `Reporte de Ventas - ${selectedPeriod.toUpperCase()}\n` +
      `Total Ventas,$${data.total.toLocaleString()}\n` +
      `Total Pedidos,${data.pedidos}\n` +
      `Promedio por Pedido,$${data.promedio.toLocaleString()}\n\n` +
      `Platos Más Vendidos\n` +
      `Plato,Ventas,Precio\n` +
      menuItems.map((item) => `${item.nombre},${item.ventas},$${item.precio.toLocaleString()}`).join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ventas_${selectedPeriod}_${new Date().toISOString().split("T")[0]}.csv`
    a.click()

    toast({
      title: "Reporte Descargado",
      description: `Reporte de ventas de la ${selectedPeriod} descargado exitosamente`,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Mejorado */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                Dashboard Administrativo
              </h1>
              <p className="text-gray-600 mt-2">Panel de control completo - Los Naranjos</p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-orange-200 hover:bg-orange-50">
                <Settings className="w-4 h-4 mr-2" />
                Configuración
              </Button>
              <Link href="/">
                <Button className="orange-gradient text-white">Volver al Inicio</Button>
              </Link>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-white rounded-lg shadow-sm">
            <TabsTrigger value="overview" className="data-[state=active]:bg-orange-100">
              📊 Resumen
            </TabsTrigger>
            <TabsTrigger value="menu" className="data-[state=active]:bg-orange-100">
              🍽️ Menú
            </TabsTrigger>
            <TabsTrigger value="reservations" className="data-[state=active]:bg-orange-100">
              📅 Reservas
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-orange-100">
              👥 Empleados
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-orange-100">
              📈 Reportes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Stats Cards Mejoradas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-800">Ventas Hoy</CardTitle>
                  <DollarSign className="h-5 w-5 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-900">$ 1.847.000</div>
                  <p className="text-xs text-green-700 flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12% desde ayer
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-800">Reservas Hoy</CardTitle>
                  <Calendar className="h-5 w-5 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900">23</div>
                  <p className="text-xs text-blue-700">+3 desde ayer</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-800">Pedidos Activos</CardTitle>
                  <UtensilsCrossed className="h-5 w-5 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-900">8</div>
                  <p className="text-xs text-purple-700">En cocina y bar</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-800">Empleados Activos</CardTitle>
                  <Users className="h-5 w-5 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-900">12</div>
                  <p className="text-xs text-orange-700">De 15 total</p>
                </CardContent>
              </Card>
            </div>

            {/* Reservas de Hoy */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                  Reservas de Hoy
                </CardTitle>
                <CardDescription>Próximas reservas confirmadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reservasHoy.map((reserva) => (
                    <div key={reserva.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{reserva.cliente}</div>
                          <div className="text-sm text-gray-500">
                            {reserva.hora} - {reserva.personas} personas
                          </div>
                        </div>
                      </div>
                      <Badge variant={reserva.estado === "Confirmada" ? "default" : "secondary"}>
                        {reserva.estado}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6 mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <UtensilsCrossed className="w-5 h-5 mr-2 text-orange-600" />
                      Gestión de Menú
                    </CardTitle>
                    <CardDescription>Administrar platos, precios y categorías</CardDescription>
                  </div>
                  <Dialog open={isAddingPlato} onOpenChange={setIsAddingPlato}>
                    <DialogTrigger asChild>
                      <Button className="orange-gradient text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Agregar Plato
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Agregar Nuevo Plato</DialogTitle>
                        <DialogDescription>Completa la información del nuevo plato</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="nombre">Nombre del Plato *</Label>
                          <Input
                            id="nombre"
                            value={newPlato.nombre}
                            onChange={(e) => setNewPlato({ ...newPlato, nombre: e.target.value })}
                            placeholder="Ej: Lomo Saltado"
                          />
                        </div>
                        <div>
                          <Label htmlFor="descripcion">Descripción</Label>
                          <Textarea
                            id="descripcion"
                            value={newPlato.descripcion}
                            onChange={(e) => setNewPlato({ ...newPlato, descripcion: e.target.value })}
                            placeholder="Descripción del plato..."
                          />
                        </div>
                        <div>
                          <Label htmlFor="precio">Precio (CLP) *</Label>
                          <Input
                            id="precio"
                            type="number"
                            value={newPlato.precio}
                            onChange={(e) => setNewPlato({ ...newPlato, precio: e.target.value })}
                            placeholder="18900"
                          />
                        </div>
                        <div>
                          <Label htmlFor="categoria">Categoría *</Label>
                          <Select
                            value={newPlato.categoria}
                            onValueChange={(value) => setNewPlato({ ...newPlato, categoria: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccionar categoría" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="entradas">Entradas</SelectItem>
                              <SelectItem value="principales">Platos Principales</SelectItem>
                              <SelectItem value="postres">Postres</SelectItem>
                              <SelectItem value="bebidas_alcohol">Bebidas con Alcohol</SelectItem>
                              <SelectItem value="bebidas_sin_alcohol">Bebidas sin Alcohol</SelectItem>
                              <SelectItem value="cafes">Cafés</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex space-x-2">
                          <Button onClick={handleAddPlato} className="orange-gradient text-white">
                            Agregar Plato
                          </Button>
                          <Button variant="outline" onClick={() => setIsAddingPlato(false)}>
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {menuItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{item.nombre}</div>
                        <div className="text-sm text-gray-500">
                          Categoría: {item.categoria} | Ventas hoy: {item.ventas}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-lg font-bold text-orange-600">$ {item.precio.toLocaleString()}</div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleDeletePlato(item.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6 mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                  Reportes de Ventas
                </CardTitle>
                <CardDescription>Genera y descarga reportes detallados de ventas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Label htmlFor="period">Período:</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semana">Esta Semana</SelectItem>
                      <SelectItem value="mes">Este Mes</SelectItem>
                      <SelectItem value="año">Este Año</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleDownloadReport} className="orange-gradient text-white">
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Descargar Excel
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-green-50 to-green-100">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-800">
                          $ {ventasData[selectedPeriod as keyof typeof ventasData].total.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-600 mt-1">Total Ventas</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-800">
                          {ventasData[selectedPeriod as keyof typeof ventasData].pedidos}
                        </div>
                        <div className="text-sm text-blue-600 mt-1">Total Pedidos</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
                    <CardContent className="p-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-800">
                          $ {ventasData[selectedPeriod as keyof typeof ventasData].promedio.toLocaleString()}
                        </div>
                        <div className="text-sm text-purple-600 mt-1">Promedio por Pedido</div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Platos Más Vendidos - {selectedPeriod}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {menuItems
                        .sort((a, b) => b.ventas - a.ventas)
                        .map((item, index) => (
                          <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                            <div className="flex items-center space-x-3">
                              <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">
                                {index + 1}
                              </div>
                              <span className="font-medium">{item.nombre}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{item.ventas} pedidos</div>
                              <div className="text-sm text-gray-500">$ {item.precio.toLocaleString()}</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees" className="space-y-6 mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-orange-600" />
                  Gestión de Empleados
                </CardTitle>
                <CardDescription>Administrar personal y turnos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {empleados.map((empleado) => (
                    <div key={empleado.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <div className="font-medium">{empleado.nombre}</div>
                          <div className="text-sm text-gray-500">
                            {empleado.rol} - {empleado.email}
                          </div>
                          <div className="text-sm text-gray-500">Turno: {empleado.turno}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="default">{empleado.estado}</Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reservations" className="space-y-6 mt-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-orange-600" />
                  Gestión de Reservas
                </CardTitle>
                <CardDescription>Ver y administrar todas las reservas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">23</div>
                    <div className="text-sm text-blue-800">Hoy</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">156</div>
                    <div className="text-sm text-green-800">Esta Semana</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">89%</div>
                    <div className="text-sm text-orange-800">Ocupación</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">4.8</div>
                    <div className="text-sm text-purple-800">Satisfacción</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {reservasHoy.map((reserva) => (
                    <div key={reserva.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Clock className="w-5 h-5 text-gray-400" />
                        <div>
                          <div className="font-medium">{reserva.cliente}</div>
                          <div className="text-sm text-gray-500">
                            {reserva.hora} - {reserva.personas} personas
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={reserva.estado === "Confirmada" ? "default" : "secondary"}>
                          {reserva.estado}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
