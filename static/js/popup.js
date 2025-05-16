document.addEventListener('DOMContentLoaded', function() {
    // Esperar a que se cargue completamente la página y se cierre el loader
    setTimeout(function() {
        // Mostrar el popup
        const popup = document.getElementById('rebrandingPopup');
        if (popup) {
            popup.classList.add('show');
        }
    }, 2500); // Mostrar después de 2.5 segundos para que primero se cierre el loader
});

// Función para cerrar el popup
function closeRebrandingPopup() {
    const popup = document.getElementById('rebrandingPopup');
    if (popup) {
        // Comprobar si marcó "no mostrar de nuevo"
        const dontShowAgain = document.getElementById('dontShowAgain').checked;
        
        if (dontShowAgain) {
            localStorage.setItem('rebrandingPopupSeen', 'true');
        }
        
        // Ocultar el popup
        popup.classList.remove('show');
    }
}