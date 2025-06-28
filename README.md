# 🍊 Los Naranjos - Sistema Web para Restaurante

Aplicación web desarrollada como proyecto académico para el curso de Ingeniería de Software en **Duoc UC**, orientada a optimizar la experiencia de atención en el restaurante *Los Naranjos*. El sistema permite gestionar reservas, pedidos, carta digital, mesas, empleados y más, todo desde una interfaz moderna, rápida y responsiva.

---

## 📦 MVP - Funcionalidades Clave

### 1. 📅 **Reserva de Mesas**
- Reservas online o presenciales.
- Confirmación automática.
- Validación de disponibilidad.
- Registro en base de datos.

### 2. 📲 **Carta Digital (QR)**
- Menú accesible por código QR.
- Responsive y actualizado en tiempo real.

### 3. 🍽️ **Toma de Pedidos**
- Pedidos desde tablet por parte del mozo.
- Comandas enviadas a cocina/bar.
- Estados: “En preparación”, “Listo”.

### 4. ⏳ **Lista de Espera Inteligente**
- Registro automático si no hay mesas.
- Aviso al cliente cuando se libera una mesa.

### 5. 💳 **Pago Digital**
- Desglose de total con propina e IVA.
- Métodos: tarjeta, QR, transferencia.
- Generación de comprobante.

### 6. 👥 **Gestión de Empleados**
- Roles: mozo, chef, administrador.
- Planificación de turnos por perfil.

---

## 💻 Tecnologías Utilizadas

- **Lenguaje principal:** TypeScript  
- **Framework y entorno de ejecución:** Node.js  
- **Gestor de paquetes:** npm  
- **Entorno de desarrollo:** Visual Studio Code  
- **Sistema operativo:** Windows 11  
- **Control de versiones:** Git + GitHub  
- **Estilos e interfaz:** HTML5, CSS3  
- **Scripts del lado del cliente:** JavaScript  
- **Base de datos:** MySQL  

---

## 🔧 Requisitos y Dependencias

Asegúrate de tener lo siguiente instalado:

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [npm](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/) (`npm install -g typescript`)
- Visual Studio Code (o editor compatible)
- MySQL

---

## 🛠️ Instalación y Ejecución

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/PipetoBlack/losNaranjos.git
   cd losNaranjos
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura la base de datos:**
   - Crea una base de datos MySQL.
   - Ejecuta el script de migración si está disponible (`/db`).
   - Configura las credenciales en `.env` o archivo de configuración según estructura.

4. **Compila y ejecuta el servidor:**

   ```bash
   tsc && node dist/index.js
   ```

   > O si se usa `ts-node` directamente:

   ```bash
   npx ts-node src/index.ts
   ```

---

## 🎨 Capturas y Demostración

![Inicio](https://github.com/PipetoBlack/losNaranjos/blob/c5eefaa742e7910208a87e39f87093695292b3f8/Los-Naranjos-IMG-WEB/Inicio.png)

También puedes ver una versión resumida en Canva:  
📎 [Presentación Visual del Proyecto](https://www.canva.com/design/DAGrgcDXVew/nnC86kj7hhX_SkQdBuOYNw/edit)

---

## 🙋‍♂️ Contribuciones

¿Te interesa colaborar?  
Haz un fork del repositorio, crea una rama para tus cambios y envía un Pull Request. Se agradece seguir buenas prácticas y dejar comentarios claros.

---

## 📄 Licencia

Proyecto creado con fines educativos para **Duoc UC**.  
Puedes reutilizar o adaptar este código con fines no comerciales, mencionando al equipo original.

---

## 👥 Equipo de Desarrollo

- Vania Vargas  
- Alexis Ramírez  
- Alan Astudillo  
- **Felipe Navarro**  
- Docente guía: Álvaro Alejandro Herrera Jaque
