import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Calendar, UtensilsCrossed, Users, Star, ChefHat, Award, Clock, Heart } from "lucide-react"

export default function HomePage() {
  const platosDestacados = [
    {
      nombre: "Lomo Saltado Premium",
      descripcion: "Lomo de res premium salteado con vegetales frescos y papas doradas",
      precio: "$ 18.900",
      imagen: "/images/lomo-saltado.jpg",
      categoria: "Especialidad de la Casa",
    },
    {
      nombre: "Ceviche del Chef",
      descripcion: "Pescado del día marinado en limón con ají amarillo y cebolla morada",
      precio: "$ 12.900",
      imagen: "/images/ceviche-chef.jpg",
      categoria: "Entrada Signature",
    },
    {
      nombre: "Pisco Sour Artesanal",
      descripcion: "Cóctel tradicional preparado con pisco premium y técnica artesanal",
      precio: "$ 8.900",
      imagen: "/images/pisco-sour.webp",
      categoria: "Cóctel Signature",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section Gastronómico */}
      <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 overflow-hidden">
        {/* Patrón de fondo gastronómico */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 text-6xl">🍽️</div>
          <div className="absolute top-40 right-32 text-4xl">🥘</div>
          <div className="absolute bottom-40 left-32 text-5xl">🍷</div>
          <div className="absolute bottom-20 right-20 text-4xl">👨‍🍳</div>
          <div className="absolute top-60 left-1/2 text-3xl">🌶️</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            {/* Contenido Principal */}
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
                  ✨ Experiencia Gastronómica Única
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="text-gray-900">Sabores que</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600">
                  Despiertan
                </span>
                <br />
                <span className="text-gray-900">los Sentidos</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                En <strong>Los Naranjos</strong>, cada plato cuenta una historia. Descubre una fusión perfecta entre
                tradición culinaria y técnicas modernas, donde cada ingrediente es seleccionado con pasión.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/menu">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <UtensilsCrossed className="w-5 h-5 mr-2" />
                    Explorar Menú
                  </Button>
                </Link>
                <Link href="/reservas">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-orange-400 text-orange-600 hover:bg-orange-50 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Reservar Mesa
                  </Button>
                </Link>
              </div>

              {/* Estadísticas Gastronómicas */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-orange-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">15+</div>
                  <div className="text-sm text-gray-600">Años de Experiencia</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">50+</div>
                  <div className="text-sm text-gray-600">Platos Únicos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">4.9★</div>
                  <div className="text-sm text-gray-600">Calificación</div>
                </div>
              </div>
            </div>

            {/* Imagen Principal del Plato */}
            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/images/plato-gourmet-hero.jpg"
                  alt="Plato Gourmet Los Naranjos"
                  className="w-full h-auto rounded-3xl shadow-2xl"
                />
                {/* Badge de Chef */}
                <div className="absolute -top-4 -left-4 bg-white rounded-full p-4 shadow-lg">
                  <ChefHat className="w-8 h-8 text-orange-600" />
                </div>
                {/* Badge de Premio */}
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-60 blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full opacity-40 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Platos Destacados */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
              🍽️ Nuestras Especialidades
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Platos que Definen
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                {" "}
                Nuestra Pasión
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Cada plato es una obra maestra culinaria, preparada con ingredientes frescos y técnicas que han sido
              perfeccionadas durante años de dedicación gastronómica.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {platosDestacados.map((plato, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={plato.imagen || "/placeholder.svg"}
                    alt={plato.nombre}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-orange-800">
                      {plato.categoria}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {plato.nombre}
                    </h3>
                    <span className="text-2xl font-bold text-orange-600">{plato.precio}</span>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">{plato.descripcion}</p>
                  <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                    <Heart className="w-4 h-4 mr-2" />
                    Agregar a Favoritos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Experiencia Culinaria */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Patrón de fondo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-8xl">🔥</div>
          <div className="absolute bottom-10 right-10 text-6xl">⭐</div>
          <div className="absolute top-1/2 left-1/4 text-4xl">🍾</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-4">
              👨‍🍳 Nuestra Filosofía
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Más que un Restaurante,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
                {" "}
                una Experiencia
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ChefHat className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Chef Ejecutivo</h3>
                <p className="text-gray-300 leading-relaxed">
                  Nuestro chef ejecutivo combina técnicas tradicionales con innovación moderna, creando experiencias
                  culinarias únicas que despiertan todos los sentidos.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Ingredientes Premium</h3>
                <p className="text-gray-300 leading-relaxed">
                  Seleccionamos cuidadosamente cada ingrediente, trabajando con proveedores locales para garantizar la
                  máxima frescura y calidad en cada plato.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Ambiente Único</h3>
                <p className="text-gray-300 leading-relaxed">
                  Cada detalle de nuestro restaurante está diseñado para crear una atmósfera acogedora donde cada comida
                  se convierte en un momento memorable.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonios Gastronómicos */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-4">
              💬 Testimonios
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Lo que Dicen Nuestros
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                {" "}
                Comensales
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                rating: 5,
                comment:
                  "Una experiencia gastronómica excepcional. Cada plato es una obra de arte que deleita tanto la vista como el paladar. El ceviche del chef es simplemente espectacular.",
                plato: "Ceviche del Chef",
              },
              {
                name: "Carlos Rodríguez",
                rating: 5,
                comment:
                  "El lomo saltado premium superó todas mis expectativas. La calidad de los ingredientes y la presentación son de nivel mundial. Definitivamente volveremos.",
                plato: "Lomo Saltado Premium",
              },
              {
                name: "Ana Martínez",
                rating: 5,
                comment:
                  "Desde el momento que entras, sabes que estás en un lugar especial. La atención al detalle en cada plato y el servicio impecable hacen de Los Naranjos un lugar único.",
                plato: "Experiencia Completa",
              },
            ].map((testimonial, index) => (
              <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border-0">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.comment}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-orange-600">Recomendó: {testimonial.plato}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final Gastronómico */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-red-500 to-orange-600 relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-6xl">🍽️</div>
          <div className="absolute bottom-10 right-10 text-6xl">🥂</div>
          <div className="absolute top-1/2 left-1/3 text-4xl">✨</div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para una Experiencia
            <br />
            <span className="text-yellow-200">Gastronómica Inolvidable?</span>
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
            Reserva tu mesa ahora y déjate sorprender por sabores únicos, técnicas culinarias excepcionales y un
            servicio que convertirá tu visita en un recuerdo imborrable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/reservas">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Reservar Ahora
              </Button>
            </Link>
            <Link href="/menu">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-orange-600 shadow-lg hover:shadow-xl transition-all duration-300 bg-transparent"
              >
                <UtensilsCrossed className="w-5 h-5 mr-2" />
                Explorar Menú Completo
              </Button>
            </Link>
          </div>

          {/* Horarios destacados */}
          <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto">
            <div className="flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-yellow-200 mr-2" />
              <span className="text-yellow-200 font-semibold">Horarios de Atención</span>
            </div>
            <div className="text-white text-sm space-y-1">
              <div>Lun - Jue: 12:00 - 23:00</div>
              <div>Vie - Sáb: 12:00 - 24:00</div>
              <div>Dom: 12:00 - 22:00</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
