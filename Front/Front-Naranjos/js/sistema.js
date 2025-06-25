document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo
    const tables = [
        { id: "t1", number: 1, status: "available" },
        {
            id: "t2",
            number: 2,
            status: "occupied",
            orderItems: [
                {
                    id: "oi1",
                    menuItemId: "m1",
                    name: "Lomo a lo Pobre",
                    price: 12900,
                    quantity: 2,
                    status: "preparing",
                    time: "20:15",
                },
                {
                    id: "oi2",
                    menuItemId: "m6",
                    name: "Pisco Sour",
                    price: 5500,
                    quantity: 2,
                    status: "delivered",
                    time: "20:10",
                },
            ],
            total: 36800,
        },
        {
            id: "t3",
            number: 3,
            status: "occupied",
            orderItems: [
                {
                    id: "oi3",
                    menuItemId: "m2",
                    name: "Pastel de Choclo",
                    price: 9900,
                    quantity: 1,
                    status: "pending",
                    time: "20:20",
                },
            ],
            total: 9900,
        },
        { id: "t4", number: 4, status: "reserved" },
        { id: "t5", number: 5, status: "available" },
    ];

    const menuItems = [
        { id: "m1", name: "Lomo a lo Pobre", price: 12900, category: "platos-principales" },
        { id: "m2", name: "Pastel de Choclo", price: 9900, category: "platos-principales" },
        { id: "m3", name: "Chorrillana", price: 15900, category: "platos-principales" },
        { id: "m4", name: "Ceviche de Reineta", price: 8900, category: "entradas" },
        { id: "m5", name: "Empanadas de Pino", price: 2500, category: "entradas" },
        { id: "m6", name: "Pisco Sour", price: 5500, category: "bebestibles" },
        { id: "m7", name: "Vino Carmenere", price: 4500, category: "bebestibles" },
        { id: "m8", name: "Torta Tres Leches", price: 4900, category: "postres" },
    ];

    const kitchenOrders = [
        {
            id: "oi1",
            menuItemId: "m1",
            name: "Lomo a lo Pobre",
            price: 12900,
            quantity: 2,
            notes: "Término medio",
            status: "preparing",
            time: "20:15",
        },
        {
            id: "oi3",
            menuItemId: "m2",
            name: "Pastel de Choclo",
            price: 9900,
            quantity: 1,
            status: "pending",
            time: "20:20",
        },
        {
            id: "oi4",
            menuItemId: "m3",
            name: "Chorrillana",
            price: 15900,
            quantity: 1,
            notes: "Extra cebolla",
            status: "ready",
            time: "20:05",
        },
        {
            id: "oi5",
            menuItemId: "m4",
            name: "Ceviche de Reineta",
            price: 8900,
            quantity: 1,
            status: "delivered",
            time: "19:45",
        },
    ];

    // Variables de estado
    let selectedTable = null;
    let orderView = "menu";
    let selectedCategory = "all";
    let selectedMenuItem = null;
    let itemNotes = "";
    let currentOrder = [];

    // Elementos del DOM
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');
    const waiterTables = document.getElementById('waiter-tables');
    const waiterTableDetail = document.getElementById('waiter-table-detail');
    const pendingOrders = document.getElementById('pending-orders');
    const preparingOrders = document.getElementById('preparing-orders');
    const readyOrders = document.getElementById('ready-orders');
    const deliveredOrders = document.getElementById('delivered-orders');

    // Funciones auxiliares
    function getStatusColor(status) {
        switch (status) {
            case "pending":
                return "bg-red-100 text-red-800";
            case "preparing":
                return "bg-blue-100 text-blue-800";
            case "ready":
                return "bg-green-100 text-green-800";
            case "delivered":
                return "bg-gray-100 text-gray-800";
            case "available":
                return "bg-green-100 text-green-800";
            case "occupied":
                return "bg-red-100 text-red-800";
            case "reserved":
                return "bg-amber-100 text-amber-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }

    function getStatusText(status) {
        switch (status) {
            case "pending":
                return "Pendiente";
            case "preparing":
                return "En Preparación";
            case "ready":
                return "Listo";
            case "delivered":
                return "Entregado";
            case "available":
                return "Disponible";
            case "occupied":
                return "Ocupada";
            case "reserved":
                return "Reservada";
            default:
                return status;
        }
    }

    function calculateTotal(items) {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    // Renderizar mesas para el mozo
    function renderWaiterTables() {
        waiterTables.innerHTML = '';
        
        tables.forEach(table => {
            const tableCard = document.createElement('div');
            tableCard.className = `card cursor-pointer transition-all hover:shadow-md ${
                selectedTable?.id === table.id ? "ring-2 ring-amber-500" : ""
            } ${
                table.status === "available"
                    ? "border-green-200"
                    : table.status === "occupied"
                        ? "border-red-200 bg-red-50"
                        : "border-amber-200 bg-amber-50"
            }`;
            tableCard.setAttribute('data-table-id', table.id);
            
            tableCard.innerHTML = `
                <div class="p-4 text-center">
                    <h3 class="font-semibold">Mesa ${table.number}</h3>
                    <span class="badge ${getStatusColor(table.status)}">
                        ${getStatusText(table.status)}
                    </span>
                    ${table.total ? `<p class="mt-2 text-sm font-medium">$${table.total.toLocaleString()}</p>` : ''}
                </div>
            `;
            
            tableCard.addEventListener('click', function() {
                handleTableSelect(table);
            });
            
            waiterTables.appendChild(tableCard);
        });
    }

    // Manejar selección de mesa
    function handleTableSelect(table) {
        selectedTable = table;
        
        if (table.orderItems) {
            currentOrder = [...table.orderItems];
            orderView = "current";
        } else {
            currentOrder = [];
            orderView = "menu";
        }
        
        renderTableDetail();
    }

    // Renderizar detalle de mesa
    function renderTableDetail() {
        if (!selectedTable) {
            waiterTableDetail.innerHTML = `
                <div class="flex items-center justify-center h-full">
                    <div class="text-center p-8">
                        <svg class="h-12 w-12 mx-auto text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                        <h3 class="mt-4 text-lg font-medium">Seleccione una mesa</h3>
                        <p class="text-muted-foreground">Elija una mesa para ver o crear pedidos</p>
                    </div>
                </div>
            `;
            return;
        }
        
        waiterTableDetail.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <div class="flex justify-between items-center">
                        <h2 class="card-title">Mesa ${selectedTable.number}</h2>
                        <span class="badge ${getStatusColor(selectedTable.status)}">
                            ${getStatusText(selectedTable.status)}
                        </span>
                    </div>
                </div>
                <div class="card-content">
                    ${selectedTable.status === "available" ? `
                        <div class="text-center py-4">
                            <svg class="h-12 w-12 mx-auto text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                            <h3 class="mt-4 text-lg font-medium">Mesa Disponible</h3>
                            <p class="text-muted-foreground">Asigne clientes para comenzar a tomar pedidos</p>
                        </div>
                    ` : `
                        <div>
                            <div class="flex gap-4 mb-6">
                                <button type="button" class="btn ${orderView === "menu" ? "bg-amber-600 hover:bg-amber-700 text-white" : "btn-outline"}" data-view="menu">
                                    Menú
                                </button>
                                <button type="button" class="btn ${orderView === "current" ? "bg-amber-600 hover:bg-amber-700 text-white" : "btn-outline"}" data-view="current">
                                    Pedido Actual
                                </button>
                                <button type="button" class="btn ${orderView === "payment" ? "bg-amber-600 hover:bg-amber-700 text-white" : "btn-outline"}" data-view="payment">
                                    Pago
                                </button>
                            </div>
                            
                            <div id="order-view-content"></div>
                        </div>
                    `}
                </div>
            </div>
        `;
        
        // Agregar eventos a los botones de vista
        if (selectedTable.status !== "available") {
            document.querySelectorAll('[data-view]').forEach(btn => {
                btn.addEventListener('click', function() {
                    orderView = this.getAttribute('data-view');
                    renderTableDetail();
                });
            });
            
            renderOrderViewContent();
        }
    }

    // Renderizar contenido según la vista seleccionada
    function renderOrderViewContent() {
        const orderViewContent = document.getElementById('order-view-content');
        
        if (orderView === "menu") {
            renderMenuView(orderViewContent);
        } else if (orderView === "current") {
            renderCurrentOrderView(orderViewContent);
        } else if (orderView === "payment") {
            renderPaymentView(orderViewContent);
        }
    }

    // Renderizar vista de menú
    function renderMenuView(container) {
        container.innerHTML = `
            <div>
                <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <button type="button" class="btn-sm ${selectedCategory === "all" ? "bg-amber-600 hover:bg-amber-700 text-white" : "btn-outline"}" data-category="all">
                        Todos
                    </button>
                    <button type="button" class="btn-sm ${selectedCategory === "platos-principales" ? "bg-amber-600 hover:bg-amber-700 text-white" : "btn-outline"}" data-category="platos-principales">
                        Platos Principales
                    </button>
                    <button type="button" class="btn-sm ${selectedCategory === "entradas" ? "bg-amber-600 hover:bg-amber-700 text-white" : "btn-outline"}" data-category="entradas">
                        Entradas
                    </button>
                    <button type="button" class="btn-sm ${selectedCategory === "bebestibles" ? "bg-amber-600 hover:bg-amber-700 text-white" : "btn-outline"}" data-category="bebestibles">
                        Bebidas
                    </button>
                    <button type="button" class="btn-sm ${selectedCategory === "postres" ? "bg-amber-600 hover:bg-amber-700 text-white" : "btn-outline"}" data-category="postres">
                        Postres
                    </button>
                </div>

                <div class="grid gap-4 max-h-400 overflow-y-auto pr-2" id="menu-items-container">
                    &lt;!-- Menu items will be rendered here -->
                </div>

                <div id="selected-item-container" class="mt-6 border-t pt-6 hidden">
                    &lt;!-- Selected item form will be rendered here -->
                </div>
            </div>
        `;
        
        // Agregar eventos a los botones de categoría
        document.querySelectorAll('[data-category]').forEach(btn => {
            btn.addEventListener('click', function() {
                selectedCategory = this.getAttribute('data-category');
                renderMenuItems();
            });
        });
        
        renderMenuItems();
    }

    // Renderizar elementos del menú
    function renderMenuItems() {
        const menuItemsContainer = document.getElementById('menu-items-container');
        menuItemsContainer.innerHTML = '';
        
        const filteredItems = selectedCategory === "all" 
            ? menuItems 
            : menuItems.filter(item => item.category === selectedCategory);
        
        filteredItems.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = `card cursor-pointer ${selectedMenuItem?.id === item.id ? "ring-2 ring-amber-500" : ""}`;
            itemCard.setAttribute('data-item-id', item.id);
            
            itemCard.innerHTML = `
                <div class="p-4">
                    <div class="flex justify-between items-center">
                        <h3 class="font-medium">${item.name}</h3>
                        <span class="font-semibold">$${item.price.toLocaleString()}</span>
                    </div>
                </div>
            `;
            
            itemCard.addEventListener('click', function() {
                selectedMenuItem = item;
                renderSelectedItemForm();
            });
            
            menuItemsContainer.appendChild(itemCard);
        });
    }

    // Renderizar formulario para el ítem seleccionado
    function renderSelectedItemForm() {
        const selectedItemContainer = document.getElementById('selected-item-container');
        selectedItemContainer.classList.remove('hidden');
        
        selectedItemContainer.innerHTML = `
            <h3 class="font-semibold mb-4">Agregar ${selectedMenuItem.name}</h3>
            <div class="grid gap-4">
                <div class="grid gap-2">
                    <label for="notes" class="label">Notas o especificaciones:</label>
                    <textarea id="notes" placeholder="Ej: Sin cebolla, término medio, etc." class="textarea">${itemNotes}</textarea>
                </div>
                <button type="button" class="btn bg-amber-600 hover:bg-amber-700 text-white" id="add-to-order-btn">
                    Agregar al Pedido
                </button>
            </div>
        `;
        
        // Agregar evento al botón de agregar al pedido
        document.getElementById('add-to-order-btn').addEventListener('click', function() {
            itemNotes = document.getElementById('notes').value;
            handleAddToOrder();
        });
        
        // Actualizar valor de notas cuando cambie
        document.getElementById('notes').addEventListener('input', function() {
            itemNotes = this.value;
        });
    }

    // Manejar agregar ítem al pedido
    function handleAddToOrder() {
        if (selectedMenuItem) {
            const existingItem = currentOrder.find(item => item.menuItemId === selectedMenuItem.id);
            
            if (existingItem) {
                currentOrder = currentOrder.map(item =>
                    item.menuItemId === selectedMenuItem.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                const newItem = {
                    id: `oi${Date.now()}`,
                    menuItemId: selectedMenuItem.id,
                    name: selectedMenuItem.name,
                    price: selectedMenuItem.price,
                    quantity: 1,
                    notes: itemNotes || undefined,
                    status: "pending",
                    time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                };
                currentOrder = [...currentOrder, newItem];
            }
            
            itemNotes = "";
            selectedMenuItem = null;
            orderView = "current";
            renderTableDetail();
        }
    }

    // Renderizar vista de pedido actual
    function renderCurrentOrderView(container) {
        container.innerHTML = `
            <div>
                <h3 class="font-semibold mb-4">Pedido Actual</h3>
                ${currentOrder.length > 0 ? `
                    <div class="space-y-4">
                        <div class="max-h-400 overflow-y-auto pr-2 space-y-4" id="current-order-items">
                            &lt;!-- Current order items will be rendered here -->
                        </div>
                        <div class="flex justify-between items-center pt-4 border-t">
                            <span class="font-semibold">Total:</span>
                            <span class="font-bold text-lg">$${calculateTotal(currentOrder).toLocaleString()}</span>
                        </div>
                        <div class="flex gap-4 mt-6">
                            <button type="button" class="btn flex-1 bg-amber-600 hover:bg-amber-700 text-white" id="send-to-kitchen-btn">
                                Enviar a Cocina
                            </button>
                            <button type="button" class="btn-outline flex-1" id="save-order-btn">
                                Guardar Pedido
                            </button>
                        </div>
                    </div>
                ` : `
                    <div class="text-center py-8">
                        <svg class="h-12 w-12 mx-auto text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                        <h3 class="mt-4 text-lg font-medium">No hay items en el pedido</h3>
                        <p class="text-muted-foreground">Agregue items desde el menú</p>
                    </div>
                `}
            </div>
        `;
        
        if (currentOrder.length > 0) {
            renderCurrentOrderItems();
            
            // Agregar eventos a los botones
            document.getElementById('send-to-kitchen-btn').addEventListener('click', function() {
                alert('Pedido enviado a cocina correctamente');
                
                // Actualizar estado de los ítems
                currentOrder = currentOrder.map(item => ({
                    ...item,
                    status: item.status === "pending" ? "pending" : item.status
                }));
                
                // Actualizar pedidos en cocina
                kitchenOrders.push(...currentOrder.filter(item => item.status === "pending"));
                
                // Actualizar mesa
                selectedTable.orderItems = currentOrder;
                selectedTable.total = calculateTotal(currentOrder);
                
                renderKitchenOrders();
            });
            
            document.getElementById('save-order-btn').addEventListener('click', function() {
                alert('Pedido guardado correctamente');
                
                // Actualizar mesa
                selectedTable.orderItems = currentOrder;
                selectedTable.total = calculateTotal(currentOrder);
                selectedTable.status = "occupied";
                
                renderWaiterTables();
            });
        }
    }

    // Renderizar ítems del pedido actual
    function renderCurrentOrderItems() {
        const currentOrderItems = document.getElementById('current-order-items');
        currentOrderItems.innerHTML = '';
        
        currentOrder.forEach(item => {
            const itemCard = document.createElement('div');
            itemCard.className = 'card';
            
            itemCard.innerHTML = `
                <div class="p-4">
                    <div class="flex justify-between items-center">
                        <div>
                            <h4 class="font-medium">${item.name}</h4>
                            ${item.notes ? `<p class="text-sm text-muted-foreground">${item.notes}</p>` : ''}
                            ${item.status ? `<span class="badge ${getStatusColor(item.status)}">${getStatusText(item.status)}</span>` : ''}
                        </div>
                        <div class="flex items-center gap-4">
                            <div class="flex items-center gap-2">
                                <button type="button" class="btn-outline btn-icon h-8 w-8" data-action="decrease" data-item-id="${item.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                </button>
                                <span class="w-6 text-center">${item.quantity}</span>
                                <button type="button" class="btn-outline btn-icon h-8 w-8" data-action="increase" data-item-id="${item.id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                </button>
                            </div>
                            <span class="font-semibold">$${(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            `;
            
            currentOrderItems.appendChild(itemCard);
        });
        
        // Agregar eventos a los botones de cantidad
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const itemId = this.getAttribute('data-item-id');
                
                handleQuantityChange(itemId, action === "increase" ? 1 : -1);
            });
        });
    }

    // Manejar cambio de cantidad
    function handleQuantityChange(itemId, change) {
        currentOrder = currentOrder
            .map(item => {
                if (item.id === itemId) {
                    const newQuantity = Math.max(0, item.quantity + change);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
            .filter(item => item.quantity > 0);
        
        renderCurrentOrderItems();
        
        // Actualizar total
        document.querySelector('.font-bold.text-lg').textContent = `$${calculateTotal(currentOrder).toLocaleString()}`;
    }

    // Renderizar vista de pago
    function renderPaymentView(container) {
        container.innerHTML = `
            <div>
                <h3 class="font-semibold mb-4">Pago de Cuenta</h3>
                ${currentOrder.length > 0 ? `
                    <div class="space-y-6">
                        <div class="card">
                            <div class="card-header">
                                <h2 class="card-title text-lg">Resumen de Cuenta</h2>
                            </div>
                            <div class="card-content space-y-4">
                                <div class="max-h-300 overflow-y-auto pr-2 space-y-2">
                                    ${currentOrder.map(item => `
                                        <div class="flex justify-between">
                                            <span>${item.quantity}x ${item.name}</span>
                                            <span>$${(item.price * item.quantity).toLocaleString()}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                <div class="pt-4 border-t flex justify-between font-bold">
                                    <span>Total:</span>
                                    <span>$${calculateTotal(currentOrder).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div class="grid gap-4">
                            <label class="label">Método de Pago</label>
                            <div class="select">
                                <button type="button" class="select-trigger" id="payment-method-trigger">
                                    <span>Seleccionar método de pago</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><polyline points="6 9 12 15 18 9"/></svg>
                                </button>
                                <div class="select-content" id="payment-method-options">
                                    <div class="select-item" data-value="card">Tarjeta de Crédito/Débito</div>
                                    <div class="select-item" data-value="cash">Efectivo</div>
                                    <div class="select-item" data-value="transfer">Transferencia</div>
                                </div>
                            </div>

                            <div class="flex gap-4 mt-4">
                                <button type="button" class="btn flex-1 bg-green-600 hover:bg-green-700 text-white" id="process-payment-btn">
                                    <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                                    Procesar Pago
                                </button>
                                <button type="button" class="btn-outline flex-1" id="print-receipt-btn">
                                    <svg class="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                                    Imprimir Boleta
                                </button>
                            </div>
                        </div>
                    </div>
                ` : `
                    <div class="text-center py-8">
                        <svg class="h-12 w-12 mx-auto text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                        <h3 class="mt-4 text-lg font-medium">No hay items para cobrar</h3>
                        <p class="text-muted-foreground">Agregue items al pedido primero</p>
                    </div>
                `}
            </div>
        `;
        
        if (currentOrder.length > 0) {
            // Agregar eventos al selector de método de pago
            const paymentMethodTrigger = document.getElementById('payment-method-trigger');
            const paymentMethodOptions = document.getElementById('payment-method-options');
            
            paymentMethodTrigger.addEventListener('click', function() {
                paymentMethodOptions.parentElement.classList.toggle('open');
            });
            
            document.querySelectorAll('.select-item').forEach(item => {
                item.addEventListener('click', function() {
                    const value = this.getAttribute('data-value');
                    paymentMethodTrigger.querySelector('span').textContent = this.textContent;
                    paymentMethodOptions.parentElement.classList.remove('open');
                });
            });
            
            // Agregar eventos a los botones
            document.getElementById('process-payment-btn').addEventListener('click', function() {
                alert('Pago procesado correctamente');
                
                // Actualizar mesa
                selectedTable.status = "available";
                selectedTable.orderItems = [];
                selectedTable.total = 0;
                
                // Limpiar pedido actual
                currentOrder = [];
                
                renderWaiterTables();
                renderTableDetail();
            });
            
            document.getElementById('print-receipt-btn').addEventListener('click', function() {
                alert('Boleta impresa correctamente');
            });
        }
    }

    // Renderizar pedidos en cocina
    function renderKitchenOrders() {
        // Pedidos pendientes
        pendingOrders.innerHTML = '';
        const pendingItems = kitchenOrders.filter(order => order.status === "pending");
        
        if (pendingItems.length === 0) {
            pendingOrders.innerHTML = `
                <div class="text-center py-8">
                    <svg class="h-12 w-12 mx-auto text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    <h3 class="mt-4 text-lg font-medium">No hay pedidos pendientes</h3>
                    <p class="text-muted-foreground">Todos los pedidos están en preparación o listos</p>
                </div>
            `;
        } else {
            pendingItems.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'card border-l-4 border-l-red-500';
                
                orderCard.innerHTML = `
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h3 class="font-semibold">${order.name}</h3>
                                <p class="text-sm text-muted-foreground">Cantidad: ${order.quantity}</p>
                                <p class="text-sm text-muted-foreground">Hora: ${order.time}</p>
                                ${order.notes ? `
                                    <div class="mt-2 p-2 bg-amber-50 rounded text-sm">
                                        <span class="font-medium">Notas:</span> ${order.notes}
                                    </div>
                                ` : ''}
                            </div>
                            <span class="badge bg-red-100 text-red-800">Pendiente</span>
                        </div>
                        <button type="button" class="btn w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white" data-action="start-preparing" data-order-id="${order.id}">
                            <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12"/><path d="M6 12h12"/><path d="M6 16h12"/><path d="M16 2v20"/></svg>
                            Iniciar Preparación
                        </button>
                    </div>
                `;
                
                pendingOrders.appendChild(orderCard);
            });
        }
        
        // Pedidos en preparación
        preparingOrders.innerHTML = '';
        const preparingItems = kitchenOrders.filter(order => order.status === "preparing");
        
        if (preparingItems.length === 0) {
            preparingOrders.innerHTML = `
                <div class="text-center py-8">
                    <svg class="h-12 w-12 mx-auto text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12"/><path d="M6 12h12"/><path d="M6 16h12"/><path d="M16 2v20"/></svg>
                    <h3 class="mt-4 text-lg font-medium">No hay pedidos en preparación</h3>
                    <p class="text-muted-foreground">Todos los pedidos están pendientes o listos</p>
                </div>
            `;
        } else {
            preparingItems.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'card border-l-4 border-l-blue-500';
                
                orderCard.innerHTML = `
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h3 class="font-semibold">${order.name}</h3>
                                <p class="text-sm text-muted-foreground">Cantidad: ${order.quantity}</p>
                                <p class="text-sm text-muted-foreground">Hora: ${order.time}</p>
                                ${order.notes ? `
                                    <div class="mt-2 p-2 bg-amber-50 rounded text-sm">
                                        <span class="font-medium">Notas:</span> ${order.notes}
                                    </div>
                                ` : ''}
                            </div>
                            <span class="badge bg-blue-100 text-blue-800">En Preparación</span>
                        </div>
                        <button type="button" class="btn w-full mt-4 bg-green-500 hover:bg-green-600 text-white" data-action="mark-ready" data-order-id="${order.id}">
                            <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Marcar como Listo
                        </button>
                    </div>
                `;
                
                preparingOrders.appendChild(orderCard);
            });
        }
        
        // Pedidos listos
        readyOrders.innerHTML = '';
        const readyItems = kitchenOrders.filter(order => order.status === "ready");
        
        if (readyItems.length === 0) {
            readyOrders.innerHTML = `
                <div class="text-center py-8">
                    <svg class="h-12 w-12 mx-auto text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <h3 class="mt-4 text-lg font-medium">No hay pedidos listos</h3>
                    <p class="text-muted-foreground">Todos los pedidos están pendientes o en preparación</p>
                </div>
            `;
        } else {
            readyItems.forEach(order => {
                const orderCard = document.createElement('div');
                orderCard.className = 'card border-l-4 border-l-green-500';
                
                orderCard.innerHTML = `
                    <div class="p-4">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <h3 class="font-semibold">${order.name}</h3>
                                <p class="text-sm text-muted-foreground">Cantidad: ${order.quantity}</p>
                                <p class="text-sm text-muted-foreground">Hora: ${order.time}</p>
                                ${order.notes ? `
                                    <div class="mt-2 p-2 bg-amber-50 rounded text-sm">
                                        <span class="font-medium">Notas:</span> ${order.notes}
                                    </div>
                                ` : ''}
                            </div>
                            <span class="badge bg-green-100 text-green-800">Listo</span>
                        </div>
                        <button type="button" class="btn w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white" data-action="mark-delivered" data-order-id="${order.id}">
                            <svg class="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                            Marcar como Entregado
                        </button>
                    </div>
                `;
                
                readyOrders.appendChild(orderCard);
            });
        }
        
        // Pedidos entregados
        deliveredOrders.innerHTML = '';
        const deliveredItems = kitchenOrders.filter(order => order.status === "delivered");
        
        if (deliveredItems.length === 0) {
            deliveredOrders.innerHTML = `
                <div class="text-center py-8">
                    <svg class="h-12 w-12 mx-auto text-muted-foreground opacity-50" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                    <h3 class="mt-4 text-lg font-medium">No hay pedidos entregados</h3>
                    <p class="text-muted-foreground">Los pedidos entregados aparecerán aquí</p>
                </div>
            `;
        } else {
            deliveredItems.forEach(order => {
                const orderItem = document.createElement('div');
                orderItem.className = 'flex justify-between items-center p-3 border-b last:border-0';
                
                orderItem.innerHTML = `
                    <div class="flex items-center gap-4">
                        <span class="badge bg-gray-100 text-gray-800">Entregado</span>
                        <div>
                            <h3 class="font-medium">${order.name}</h3>
                            <p class="text-sm text-muted-foreground">Cantidad: ${order.quantity}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="text-sm font-medium">${order.time}</p>
                    </div>
                `;
                
                deliveredOrders.appendChild(orderItem);
            });
        }
        
        // Agregar eventos a los botones de acción
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.getAttribute('data-action');
                const orderId = this.getAttribute('data-order-id');
                
                updateOrderStatus(orderId, action);
            });
        });
    }

    // Actualizar estado de un pedido
    function updateOrderStatus(orderId, action) {
        let newStatus = '';
        
        switch (action) {
            case 'start-preparing':
                newStatus = 'preparing';
                break;
            case 'mark-ready':
                newStatus = 'ready';
                break;
            case 'mark-delivered':
                newStatus = 'delivered';
                break;
        }
        
        if (newStatus) {
            // Actualizar estado en kitchenOrders
            kitchenOrders = kitchenOrders.map(order => 
                order.id === orderId ? { ...order, status: newStatus } : order
            );
            
            // Actualizar estado en currentOrder si existe
            if (selectedTable && selectedTable.orderItems) {
                selectedTable.orderItems = selectedTable.orderItems.map(item => 
                    item.id === orderId ? { ...item, status: newStatus } : item
                );
                
                if (selectedTable.id === selectedTable?.id) {
                    currentOrder = [...selectedTable.orderItems];
                }
            }
            
            renderKitchenOrders();
        }
    }

    // Inicializar eventos
    function initEvents() {
        // Eventos para las pestañas
        tabTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const tab = this.getAttribute('data-tab');
                
                // Actualizar clases de las pestañas
                tabTriggers.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Mostrar contenido de la pestaña seleccionada
                tabContents.forEach(content => {
                    if (content.getAttribute('data-tab') === tab) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            });
        });
    }

    // Inicializar
    renderWaiterTables();
    renderKitchenOrders();
    initEvents();
});