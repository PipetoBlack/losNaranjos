document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad para el botón de reserva en la página principal
    const reserveButtons = document.querySelectorAll('.btn');
    
    reserveButtons.forEach(button => {
        if (button.textContent.includes('Reservar')) {
            button.addEventListener('click', function() {
                window.location.href = 'reservations.html';
            });
        }
    });

    // Funcionalidad para el menú móvil (si se implementa)
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}); 