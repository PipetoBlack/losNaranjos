"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Clock, UserCheck, Calendar, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function AnfitrionDashboard() {
  const { toast } = useToast()

  const reservasHoy = [
    {
      id: 1,
      cliente: "María González",
      hora: "19:30",
      personas: 4,
      estado: "Confirmada",
      telefono: "+56 9 8765 4321",
      mesa: "Asignada: Mesa 5",
    },
    {
      id: 2,
      cliente: "Carlos Rodríguez",
      hora: "20:00",
      personas: 2,
      estado: "Llegó",
      telefono: "+56 9 1234 5678",
      mesa: "Mesa 3",
    },
    {
      id: 3,
      cliente: "Ana Martínez",
      hora: "20:30",
      personas: 6,
      estado: "Pendiente",
      telefono: "+56 9 9876 5432",
      mesa: "Sin asignar",
    },
  ]

  const listaEspera = [
    { id: 1, cliente: "Pedro Silva", personas: 3, tiempo: "15 min esperando" },
    { id: 2, cliente: "Laura Torres", personas: 2, tiempo: "8 min esperando" },
  ]

  const mesasDisponibles = [
    { numero: 1, capacidad: 2, estado: "Disponible" },
    { numero: 7, capacidad: 4, estado: "Disponible" },
    { numero: 15, capacidad: 6, estado: "Disponible" },
    { numero: 18, capacidad: 8, estado: "Disponible" },
  ]

  const handleAsignarMesa = (reservaId: number, mesa: number) => {
    toast({
      title: "Mesa Asignada",
      description: `Mesa ${mesa} asignada exitosamente`,
    })
  }

  const handleMarcarLlegada = (reservaId: number) => {
    toast({
      title: "Cliente Llegó",
      description: "Cliente marcado como presente",
    })
  }

  const handleAgregarListaEspera = () => {
    toast({
      title: "Cliente Agregado",
      description: "Cliente agregado a la lista de espera",
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                Panel de Anfitrión
              </h1>
              <p className="text-gray-600 mt-2">Gestión de reservas y recepción de clientes</p>
            </div>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700 text-white">Volver al Inicio</Button>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Reservas Hoy</CardTitle>
              <Calendar className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-900">23</div>
              <p className="text-xs text-green-700">3 pendientes</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-800">Clientes Presentes</CardTitle>
              <UserCheck className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">18</div>
              <p className="text-xs text-blue-700">En el restaurante</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-orange-800">Lista de Espera</CardTitle>
              <Clock className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-900">2</div>
              <p className="text-xs text-orange-700">Esperando mesa</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-800">Mesas Disponibles</CardTitle>
              <MapPin className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-900">4</div>
              <p className="text-xs text-purple-700">De 20 totales</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Reservas de Hoy */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                Reservas de Hoy
              </CardTitle>
              <CardDescription>Gestión de reservas confirmadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reservasHoy.map((reserva) => (
                  <div key={reserva.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{reserva.cliente}</h3>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {reserva.hora} - {reserva.personas} personas
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Phone className="w-3 h-3 mr-1" />
                          {reserva.telefono}
                        </p>
                        <p className="text-sm text-blue-600">{reserva.mesa}</p>
                      </div>
                      <Badge
                        variant={
                          reserva.estado === "Confirmada"
                            ? "default"
                            : reserva.estado === "Llegó"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {reserva.estado}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      {reserva.estado === "Confirmada" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleMarcarLlegada(reserva.id)}
                          >
                            <UserCheck className="w-3 h-3 mr-1" />
                            Llegó
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleAsignarMesa(reserva.id, 5)}>
                            <MapPin className="w-3 h-3 mr-1" />
                            Asignar Mesa
                          </Button>
                        </>
                      )}
                      {reserva.estado === "Pendiente" && (
                        <Button size="sm" variant="outline" onClick={() => handleAsignarMesa(reserva.id, 7)}>
                          <MapPin className="w-3 h-3 mr-1" />
                          Asignar Mesa
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Lista de Espera y Mesas */}
          <div className="space-y-6">
            {/* Lista de Espera */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <Clock className="w-5 h-5 mr-2 text-orange-600" />
                      Lista de Espera
                    </CardTitle>
                    <CardDescription>Clientes esperando mesa disponible</CardDescription>
                  </div>
                  <Button
                    size="sm"
                    className="bg-orange-600 hover:bg-orange-700 text-white"
                    onClick={handleAgregarListaEspera}
                  >
                    Agregar Cliente
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {listaEspera.map((cliente) => (
                    <div key={cliente.id} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <div className="font-medium">{cliente.cliente}</div>
                        <div className="text-sm text-gray-500">
                          {cliente.personas} personas - {cliente.tiempo}
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        Asignar Mesa
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Mesas Disponibles */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-600" />
                  Mesas Disponibles
                </CardTitle>
                <CardDescription>Mesas libres para asignar</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {mesasDisponibles.map((mesa) => (
                    <div key={mesa.numero} className="p-3 border rounded-lg text-center">
                      <div className="font-bold text-lg">Mesa {mesa.numero}</div>
                      <div className="text-sm text-gray-500">{mesa.capacidad} personas</div>
                      <Badge className="mt-1 bg-green-100 text-green-800">{mesa.estado}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
