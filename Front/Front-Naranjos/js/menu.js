document.addEventListener('DOMContentLoaded', function() {
    // Datos del menú
    const menuItems = [
        {
            id: "1",
            name: "Lomo a lo Pobre",
            description: "Filete de res con huevos fritos, papas fritas y cebolla caramelizada",
            price: 12900,
            category: "platos-principales",
            tags: ["popular"],
            image: "img/lomo a lo pobre.webp" 
        },
        {
            id: "2",
            name: "Pastel de Choclo",
            description: "Tradicional pastel de maíz con carne, pollo, aceitunas y huevo duro",
            price: 9900,
            category: "platos-principales",
            tags: ["tradicional"],
            image: "img/pastel de choclo.jpg"
        },
        {
            id: "3",
            name: "Chorrillana",
            description: "Papas fritas cubiertas con carne, cebolla salteada y huevos fritos",
            price: 15900,
            category: "platos-principales",
            tags: ["para compartir"],
            image: "img/chorrillana.jpg"
        },
        {
            id: "4",
            name: "Ceviche de Reineta",
            description: "Pescado fresco marinado en limón con cebolla morada, cilantro y ají",
            price: 8900,
            category: "entradas",
            tags: ["fresco"],
            image: "img/ceviche de reineta.jpg"
        },
        {
            id: "5",
            name: "Empanadas de Pino",
            description: "Empanadas tradicionales rellenas de carne, cebolla, huevo y aceitunas",
            price: 2500,
            category: "entradas",
            tags: ["tradicional"],
            image: "img/empanada de pino.webp"
        },





        {
            id: "6",
            name: "Pisco Sour",
            description: "Cóctel tradicional chileno con pisco, limón y clara de huevo",
            price: 5500,
            category: "bebestibles",
            tags: ["popular"],
        },
        {
            id: "7",
            name: "Vino Carmenere",
            description: "Copa de vino tinto Carmenere de la región central",
            price: 4500,
            category: "bebestibles",
        },
        {
            id: "8",
            name: "Leche con Plátano",
            description: "Batido refrescante de leche con plátano y canela",
            price: 3500,
            category: "bebestibles",
        },
        {
            id: "9",
            name: "Torta Tres Leches",
            description: "Bizcocho empapado en tres tipos de leche con cobertura de merengue",
            price: 4900,
            category: "postres",
            tags: ["popular"],
        },
        {
            id: "10",
            name: "Leche Asada",
            description: "Postre tradicional chileno similar al flan con caramelo",
            price: 3900,
            category: "postres",
            tags: ["tradicional"],
        },
        {
            id: "11",
            name: "Café Espresso",
            description: "Café intenso de grano seleccionado",
            price: 2500,
            category: "cafeteria",
        },
        {
            id: "12",
            name: "Té de Hierbas",
            description: "Infusión de hierbas frescas de la región",
            price: 2000,
            category: "cafeteria",
        },
    ];

    // Elementos del DOM
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const menuContent = document.getElementById('menu-content');

    // Función para mostrar los elementos del menú según la categoría
    function showMenuItems(category) {
        menuContent.innerHTML = '';
        
        const filteredItems = menuItems.filter(item => item.category === category);
        
        if (filteredItems.length === 0) {
            menuContent.innerHTML = '<p class="text-center py-8">No hay elementos en esta categoría.</p>';
            return;
        }
        
        filteredItems.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card bg-white shadow-lg rounded-lg overflow-hidden md:flex mb-6';
            
            const cardContent = `
                <div class="w-full md:w-48 flex-shrink-0">
                            ${item.image ? `
                                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                            ` : `
                                <div class="bg-amber-100 w-full h-full flex items-center justify-center">
                                    <span class="text-amber-600 font-medium text-sm">Imagen no disponible<\/span>
                                <\/div>
                            `}
                        <\/div>
                <div class="flex-1 p-4 md:p-6">
                            <div class="flex justify-between items-start mb-2">
                                <div>
                                    <h3 class="font-semibold text-lg">${item.name}</h3>
                                    ${item.tags ? `
                                        <div class="flex gap-2 mt-1">
                                            ${item.tags.map(tag => `
                                                <span class="badge bg-amber-50 border border-amber-200">${tag}</span>
                                            `).join('')}
                                        </div>
                                    ` : ''}
                                </div>
                                <span class="font-bold text-amber-900">$${item.price.toLocaleString()}</span>
                            </div>
                            <p class="text-muted-foreground text-sm mb-4">${item.description}</p>
                            <div class="mt-auto flex justify-end">
                                <button class="btn bg-amber-600 hover:bg-amber-700 text-white btn-sm order-btn" data-id="${item.id}">
                                    Ordenar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            card.innerHTML = cardContent;
            menuContent.appendChild(card);
        });
        
        // Agregar eventos a los botones de ordenar
        document.querySelectorAll('.order-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                const item = menuItems.find(item => item.id === itemId);
                
                if (item) {
                    alert(`Has ordenado: ${item.name}\nPrecio: $${item.price.toLocaleString()}`);
                    // Aquí se podría implementar la lógica para agregar al carrito o enviar a cocina
                }
            });
        });
    }

    // Inicializar eventos
    function initEvents() {
        // Eventos para las pestañas
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                // Remover clase active de todas las pestañas
                tabTriggers.forEach(t => t.classList.remove('active'));
                
                // Agregar clase active a la pestaña actual
                this.classList.add('active');
                
                // Mostrar elementos del menú según la categoría
                const category = this.getAttribute('data-tab');
                showMenuItems(category);
            });
        });
    }

    // Mostrar elementos del menú por defecto (platos principales)
    showMenuItems('platos-principales');
    
    // Inicializar eventos
    initEvents();
});