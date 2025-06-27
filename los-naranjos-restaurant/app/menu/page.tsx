"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, Clock, Star, Leaf } from "lucide-react"

const menuItems = {
  entradas: [
    {
      id: 1,
      name: "Ceviche de Pescado",
      description: "Pescado fresco marinado en limón con cebolla morada, ají y cilantro",
      price: 12900,
      image: "/images/ceviche-pescado.png",
      time: "15 min",
      rating: 4.8,
      vegetarian: false,
    },
    {
      id: 2,
      name: "Causa Limeña",
      description: "Papa amarilla con pollo desmechado, palta y mayonesa",
      price: 8900,
      image: "/images/causa-limenia.jpg",
      time: "10 min",
      rating: 4.6,
      vegetarian: false,
    },
    {
      id: 3,
      name: "Ensalada de Quinoa",
      description: "Quinoa con vegetales frescos, palta y vinagreta de limón",
      price: 7900,
      image: "/images/ensalada-quinoa.jpg",
      time: "8 min",
      rating: 4.5,
      vegetarian: true,
    },
  ],
  principales: [
    {
      id: 4,
      name: "Lomo Saltado",
      description: "Lomo de res salteado con cebolla, tomate y papas fritas",
      price: 18900,
      image: "/images/lomo-saltado.jpg",
      time: "25 min",
      rating: 4.9,
      vegetarian: false,
    },
    {
      id: 5,
      name: "Arroz con Pollo",
      description: "Arroz con pollo tierno, verduras y culantro",
      price: 14900,
      image: "/images/arroz-pollo.jpg",
      time: "20 min",
      rating: 4.7,
      vegetarian: false,
    },
    {
      id: 6,
      name: "Pescado a la Plancha",
      description: "Filete de pescado con ensalada fresca y papas doradas",
      price: 16900,
      image: "/images/pescado-plancha.jpg",
      time: "18 min",
      rating: 4.8,
      vegetarian: false,
    },
  ],
  postres: [
    {
      id: 7,
      name: "Suspiro Limeño",
      description: "Dulce tradicional con manjar blanco y merengue",
      price: 4900,
      image: "/images/suspiro-limeno.jpg",
      time: "5 min",
      rating: 4.6,
      vegetarian: true,
    },
    {
      id: 8,
      name: "Tres Leches",
      description: "Bizcocho empapado en tres tipos de leche",
      price: 5400,
      image: "/images/tres-leche.jpg",
      time: "5 min",
      rating: 4.8,
      vegetarian: true,
    },
  ],
  bebidas_alcohol: [
    {
      id: 9,
      name: "Pisco Sour",
      description: "Cóctel tradicional peruano con pisco, limón y clara de huevo",
      price: 8900,
      image: "/images/pisco-sour.webp",
      time: "3 min",
      rating: 4.9,
      vegetarian: true,
    },
    {
      id: 10,
      name: "Vino Tinto Reserva",
      description: "Copa de vino tinto de la casa",
      price: 6900,
      image: "/images/vino-tinto.jpg",
      time: "2 min",
      rating: 4.5,
      vegetarian: true,
    },
  ],
  bebidas_sin_alcohol: [
    {
      id: 11,
      name: "Chicha Morada",
      description: "Bebida tradicional de maíz morado con especias",
      price: 3900,
      image: "/images/chicha-morada.jpg",
      time: "2 min",
      rating: 4.7,
      vegetarian: true,
    },
    {
      id: 12,
      name: "Limonada Frozen",
      description: "Limonada helada con hielo frappe",
      price: 2900,
      image: "/images/limonada-frozen.jpg",
      time: "3 min",
      rating: 4.4,
      vegetarian: true,
    },
  ],
  cafes: [
    {
      id: 13,
      name: "Café Americano",
      description: "Café negro preparado con granos selectos",
      price: 2400,
      image: "/images/cafe-americano.jpg",
      time: "3 min",
      rating: 4.3,
      vegetarian: true,
    },
    {
      id: 14,
      name: "Cappuccino",
      description: "Café espresso con leche vaporizada y espuma",
      price: 3400,
      image: "/images/cappuccino.jpg",
      time: "4 min",
      rating: 4.6,
      vegetarian: true,
    },
  ],
}

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("entradas")

  const categories = [
    { id: "entradas", label: "Entradas", items: menuItems.entradas },
    { id: "principales", label: "Platos de Fondo", items: menuItems.principales },
    { id: "postres", label: "Postres", items: menuItems.postres },
    { id: "bebidas_alcohol", label: "Bebidas con Alcohol", items: menuItems.bebidas_alcohol },
    { id: "bebidas_sin_alcohol", label: "Bebidas sin Alcohol", items: menuItems.bebidas_sin_alcohol },
    { id: "cafes", label: "Cafés", items: menuItems.cafes },
  ]

  const filteredItems =
    categories
      .find((cat) => cat.id === activeCategory)
      ?.items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      ) || []

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestro Menú</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Descubre nuestros deliciosos platos preparados con ingredientes frescos y de la mejor calidad
            </p>

            {/* Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar platos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-6 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="text-xs md:text-sm">
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <Card key={item.id} 
                  className="flex flex-col justify-between h-full overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="w-full h-[300px] overflow-hidden rounded-md">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      {item.vegetarian && (
                        <Badge className="absolute top-2 right-2 bg-green-500">
                          <Leaf className="w-3 h-3 mr-1" />
                          Vegetariano
                        </Badge>
                      )}
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{item.name}</CardTitle>
                        <span className="text-xl font-bold text-orange-600">
                          $ {item.price.toLocaleString("es-CL")}
                        </span>
                      </div>
                      <CardDescription className="text-sm">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.time}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                          {item.rating}
                        </div>
                      </div>
                      <Button className="w-full orange-gradient text-white">Agregar al Pedido</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No se encontraron platos que coincidan con tu búsqueda.</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
