document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');
    const selectTriggers = document.querySelectorAll('.select-trigger');
    
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
        
        // Eventos para los selectores
        selectTriggers.forEach(trigger => {
            trigger.addEventListener('click', function() {
                const select = this.closest('.select');
                select.classList.toggle('open');
                
                // Cerrar otros selectores abiertos
                document.querySelectorAll('.select.open').forEach(s => {
                    if (s !== select) {
                        s.classList.remove('open');
                    }
                });
            });
        });
        
        // Eventos para los elementos de los selectores
        document.querySelectorAll('.select-item').forEach(item => {
            item.addEventListener('click', function() {
                const select = this.closest('.select');
                const trigger = select.querySelector('.select-trigger span');
                const value = this.getAttribute('data-value');
                
                trigger.textContent = this.textContent;
                select.classList.remove('open');
                
                // Aquí se podría implementar la lógica para filtrar según el valor seleccionado
                console.log(`Filtro seleccionado: ${value}`);
            });
        });
        
        // Cerrar selectores al hacer clic fuera de ellos
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.select')) {
                document.querySelectorAll('.select.open').forEach(select => {
                    select.classList.remove('open');
                });
            }
        });
        
        // Eventos para los botones de acción
        document.querySelectorAll('.btn, .btn-sm').forEach(btn => {
            btn.addEventListener('click', function() {
                const action = this.textContent.trim();
                
                if (action === 'Nueva Reserva') {
                    alert('Funcionalidad para crear una nueva reserva');
                } else if (action === 'Nuevo Pedido') {
                    alert('Funcionalidad para crear un nuevo pedido');
                } else if (action === 'Editar') {
                    alert('Funcionalidad para editar el elemento seleccionado');
                } else if (action === 'Ver') {
                    alert('Funcionalidad para ver los detalles del elemento seleccionado');
                }
            });
        });
    }
    
    // Inicializar
    initEvents();
});