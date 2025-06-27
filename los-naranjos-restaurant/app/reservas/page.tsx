"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { CalendarIcon, Clock, Users, MapPin, Mail } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function ReservasPage() {
  const [date, setDate] = useState<Date>()
  const [isLoading, setIsLoading] = useState(false)
  const [sendEmailCopy, setSendEmailCopy] = useState(true)
  const [sendSMSReminder, setSendSMSReminder] = useState(false)
  const { toast } = useToast()

  const timeSlots = [
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
    "22:00",
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const reservationData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      date: date,
      time: formData.get("time"),
      guests: formData.get("guests"),
      tableType: formData.get("tableType"),
      observations: formData.get("observations"),
    }

    // Simulación de envío de reserva
    setTimeout(() => {
      let confirmationMessage = `Tu reserva para ${reservationData.guests} personas el ${date ? format(date, "dd/MM/yyyy", { locale: es }) : ""} ha sido confirmada.`

      if (sendEmailCopy) {
        confirmationMessage += " Te hemos enviado una copia por correo electrónico."
      }

      if (sendSMSReminder) {
        confirmationMessage += " Recibirás un recordatorio por SMS 2 horas antes."
      }

      toast({
        title: "¡Reserva Confirmada!",
        description: confirmationMessage,
      })
      setIsLoading(false)
      // Aquí podrías limpiar el formulario o redirigir
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Reservar Mesa</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Asegura tu lugar en Los Naranjos. Completa el formulario y te confirmaremos tu reserva inmediatamente.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de Reserva */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Detalles de la Reserva</CardTitle>
                <CardDescription>Completa todos los campos para procesar tu reserva</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Información Personal */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo *</Label>
                      <Input id="name" name="name" placeholder="Tu nombre completo" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+56 9 9999 9999" required />
                  </div>

                  {/* Fecha y Hora */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Fecha *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "dd/MM/yyyy", { locale: es }) : "Seleccionar fecha"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Hora *</Label>
                      <Select name="time" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar hora" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Número de Personas y Tipo de Mesa */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="guests">Número de Personas *</Label>
                      <Select name="guests" required>
                        <SelectTrigger>
                          <SelectValue placeholder="¿Cuántas personas?" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "persona" : "personas"}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tableType">Tipo de Mesa *</Label>
                      <Select name="tableType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Preferencia de mesa" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="interior">Mesa Interior</SelectItem>
                          <SelectItem value="exterior">Mesa Exterior (Terraza)</SelectItem>
                          <SelectItem value="sin_preferencia">Sin Preferencia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Observaciones */}
                  <div className="space-y-2">
                    <Label htmlFor="observations">Observaciones</Label>
                    <Textarea
                      id="observations"
                      name="observations"
                      placeholder="Alguna solicitud especial, alergias alimentarias, celebración especial, etc."
                      rows={3}
                    />
                  </div>

                  {/* Opciones de Notificación */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Opciones de Confirmación</Label>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="emailCopy"
                        checked={sendEmailCopy}
                        onCheckedChange={(checked) => setSendEmailCopy(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="emailCopy"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          <Mail className="w-4 h-4 inline mr-1" />
                          Enviar copia de confirmación por correo electrónico
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Recibirás todos los detalles de tu reserva en tu email
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="smsReminder"
                        checked={sendSMSReminder}
                        onCheckedChange={(checked) => setSendSMSReminder(checked as boolean)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor="smsReminder"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Recordatorio por SMS (2 horas antes)
                        </label>
                        <p className="text-xs text-muted-foreground">
                          Te enviaremos un mensaje recordatorio antes de tu reserva
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full orange-gradient text-white" disabled={isLoading}>
                    {isLoading ? "Procesando Reserva..." : "Confirmar Reserva"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Información del Restaurante */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-orange-600" />
                  Horarios de Atención
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="grid grid-cols-2">
                  <span className="font-medium">Lunes - Jueves:</span>
                  <span>12:00 - 23:00</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Viernes - Sábado:</span>
                  <span>12:00 - 24:00</span>
                </div>
                <div className="grid grid-cols-2">
                  <span className="font-medium">Domingo:</span>
                  <span>12:00 - 22:00</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-orange-600" />
                  Ubicación
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Av. Los Naranjos 6344
                  <br />
                  La Florida
                  <br />
                  Teléfono: +56 2 2345 6789
                </p>
                <div className="w-full overflow-hidden rounded-md shadow">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.015087823317!2d-70.5745!3d-33.5298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662d0e3f3e4b1f7%3A0x123456789abcdef!2sLos%20Naranjos%206344%2C%20La%20Florida%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses-419!2scl!4v1680000000000"
                    width="100%"
                    height="250"
                    style={{ border: 0}}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-md shadow"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-orange-600" />
                  Políticas de Reserva
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <p>• Las reservas se confirman por correo electrónico</p>
                <p>• Tiempo de tolerancia: 15 minutos</p>
                <p>• Para grupos de 8+ personas, contactar directamente</p>
                <p>• Cancelaciones hasta 2 horas antes</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
