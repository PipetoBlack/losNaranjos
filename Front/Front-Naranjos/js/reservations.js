document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const datePopover = document.getElementById('date-popover');
    const dateButton = document.getElementById('date-button');
    const selectedDateSpan = document.getElementById('selected-date');
    const calendarContainer = document.getElementById('calendar-container');
    const calendarBody = document.getElementById('calendar-body');
    const currentMonthSpan = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    const timeSelect = document.getElementById('time-select');
    const timeTrigger = document.getElementById('time-trigger');
    const selectedTimeSpan = document.getElementById('selected-time');
    const timeOptions = document.getElementById('time-options');
    
    const guestsSelect = document.getElementById('guests-select');
    const guestsTrigger = document.getElementById('guests-trigger');
    const selectedGuestsSpan = document.getElementById('selected-guests');
    const guestsOptions = document.getElementById('guests-options');
    
    const bookingForm = document.getElementById('booking-form');
    const reservationForm = document.getElementById('reservation-form');
    const confirmation = document.getElementById('confirmation');
    const newReservationBtn = document.getElementById('new-reservation');
    
    // Variables para el calendario
    let currentDate = new Date();
    let selectedDate = null;
    
    // Inicializar el calendario
    function initCalendar() {
        updateCalendarHeader();
        renderCalendar();
    }
    
    // Actualizar el encabezado del calendario
    function updateCalendarHeader() {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        currentMonthSpan.textContent = `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    }
    
    // Renderizar el calendario
    function renderCalendar() {
        calendarBody.innerHTML = '';
        
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        
        const startingDayOfWeek = firstDay.getDay();
        const daysInMonth = lastDay.getDate();
        
        let date = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');
            
            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                
                if (i === 0 && j < startingDayOfWeek) {
                    // Celdas vacías antes del primer día del mes
                    cell.textContent = '';
                } else if (date > daysInMonth) {
                    // Celdas vacías después del último día del mes
                    cell.textContent = '';
                } else {
                    // Días del mes
                    cell.textContent = date;
                    
                    const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), date);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (cellDate < today) {
                        // Deshabilitar fechas pasadas
                        cell.classList.add('disabled');
                    } else {
                        cell.addEventListener('click', function() {
                            selectDate(cellDate);
                        });
                        
                        if (selectedDate && cellDate.getTime() === selectedDate.getTime()) {
                            cell.classList.add('selected');
                        }
                    }
                    
                    date++;
                }
                
                row.appendChild(cell);
            }
            
            calendarBody.appendChild(row);
            
            if (date > daysInMonth) {
                break;
            }
        }
    }
    
    // Seleccionar una fecha
    function selectDate(date) {
        selectedDate = date;
        const formattedDate = formatDate(date);
        selectedDateSpan.textContent = formattedDate;
        document.getElementById('date').value = formattedDate;
        renderCalendar();
        datePopover.classList.remove('open');
    }
    
    // Formatear fecha
    function formatDate(date) {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }
    
    // Inicializar opciones de hora
    function initTimeOptions() {
        const availableTimes = [
            "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", 
            "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", 
            "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"
        ];
        
        timeOptions.innerHTML = '';
        
        availableTimes.forEach(time => {
            const option = document.createElement('div');
            option.classList.add('select-item');
            option.textContent = time;
            option.addEventListener('click', function() {
                selectedTimeSpan.textContent = time;
                document.getElementById('time').value = time;
                timeSelect.classList.remove('open');
            });
            
            timeOptions.appendChild(option);
        });
    }
    
    // Inicializar opciones de número de personas
    function initGuestsOptions() {
        guestsOptions.innerHTML = '';
        
        for (let i = 1; i <= 10; i++) {
            const option = document.createElement('div');
            option.classList.add('select-item');
            option.textContent = `${i} ${i === 1 ? 'persona' : 'personas'}`;
            option.addEventListener('click', function() {
                selectedGuestsSpan.textContent = `${i} ${i === 1 ? 'persona' : 'personas'}`;
                document.getElementById('guests').value = i;
                guestsSelect.classList.remove('open');
            });
            
            guestsOptions.appendChild(option);
        }
        
        const moreOption = document.createElement('div');
        moreOption.classList.add('select-item');
        moreOption.textContent = 'Más de 10 personas';
        moreOption.addEventListener('click', function() {
            selectedGuestsSpan.textContent = 'Más de 10 personas';
            document.getElementById('guests').value = 'more';
            guestsSelect.classList.remove('open');
        });
        
        guestsOptions.appendChild(moreOption);
    }
    
    // Generar ID de reserva aleatorio
    function generateReservationId() {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
    
    // Inicializar eventos
    function initEvents() {
        // Evento para abrir/cerrar el calendario
        dateButton.addEventListener('click', function() {
            datePopover.classList.toggle('open');
        });
        
        // Eventos para navegar entre meses
        prevMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            updateCalendarHeader();
            renderCalendar();
        });
        
        nextMonthBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            updateCalendarHeader();
            renderCalendar();
        });
        
        // Evento para abrir/cerrar el selector de hora
        timeTrigger.addEventListener('click', function() {
            timeSelect.classList.toggle('open');
        });
        
        // Evento para abrir/cerrar el selector de número de personas
        guestsTrigger.addEventListener('click', function() {
            guestsSelect.classList.toggle('open');
        });
        
        // Evento para enviar el formulario
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar que todos los campos estén completos
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            
            if (!date || !time || !guests || !name || !phone || !email) {
                alert('Por favor, completa todos los campos.');
                return;
            }
            
            // Generar ID de reserva
            const reservationId = generateReservationId();
            
            // Mostrar confirmación
            document.getElementById('reservation-id').textContent = reservationId;
            document.getElementById('confirmation-name').textContent = name;
            document.getElementById('confirmation-date').textContent = date;
            document.getElementById('confirmation-time').textContent = time;
            document.getElementById('confirmation-guests').textContent = guests === 'more' ? 'Más de 10 personas' : `${guests} ${guests === '1' ? 'persona' : 'personas'}`;
            document.getElementById('confirmation-email').textContent = email;
            
            reservationForm.classList.add('hidden');
            confirmation.classList.remove('hidden');
        });
        
        // Evento para hacer una nueva reserva
        newReservationBtn.addEventListener('click', function() {
            // Limpiar formulario
            bookingForm.reset();
            selectedDateSpan.textContent = 'Selecciona una fecha';
            selectedTimeSpan.textContent = 'Selecciona una hora';
            selectedGuestsSpan.textContent = 'Selecciona el número de personas';
            selectedDate = null;
            
            // Mostrar formulario
            confirmation.classList.add('hidden');
            reservationForm.classList.remove('hidden');
        });
        
        // Cerrar popovers al hacer clic fuera de ellos
        document.addEventListener('click', function(e) {
            if (!datePopover.contains(e.target)) {
                datePopover.classList.remove('open');
            }
            
            if (!timeSelect.contains(e.target)) {
                timeSelect.classList.remove('open');
            }
            
            if (!guestsSelect.contains(e.target)) {
                guestsSelect.classList.remove('open');
            }
        });
    }
    
    // Inicializar
    initCalendar();
    initTimeOptions();
    initGuestsOptions();
    initEvents();
});