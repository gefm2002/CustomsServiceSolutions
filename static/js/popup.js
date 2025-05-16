document.addEventListener('DOMContentLoaded', function() {
    // Comprobar si el usuario ya ha visto el popup (usando localStorage)
    const hasSeenPopup = localStorage.getItem('rebrandingPopupSeen');
    
    // Si no lo ha visto antes, mostrar el popup después de un breve retraso
    if (!hasSeenPopup) {
        setTimeout(function() {
            showRebrandingPopup();
        }, 1500); // Mostrar después de 1.5 segundos
    }
    
    function showRebrandingPopup() {
        // Crear elementos del popup
        const popupOverlay = document.createElement('div');
        popupOverlay.className = 'rebranding-popup-overlay';
        
        const popupContent = document.createElement('div');
        popupContent.className = 'rebranding-popup';
        
        // Contenido del popup
        popupContent.innerHTML = `
            <div class="popup-header">
                <h3>¡Próximamente novedades!</h3>
                <button class="popup-close" aria-label="Cerrar">&times;</button>
            </div>
            <div class="popup-body">
                <div class="popup-icon">
                    <i class="fas fa-paint-brush"></i>
                </div>
                <p>Estamos trabajando en una renovación completa de nuestra marca e identidad visual.</p>
                <p>¡Muy pronto presentaremos un nuevo diseño con mejoras en experiencia y funcionalidades!</p>
            </div>
            <div class="popup-footer">
                <button class="popup-btn primary-btn">¡Mantenerme informado!</button>
                <label class="dont-show-again">
                    <input type="checkbox" id="dontShowAgain"> No mostrar de nuevo
                </label>
            </div>
        `;
        
        // Añadir al DOM
        popupOverlay.appendChild(popupContent);
        document.body.appendChild(popupOverlay);
        
        // Añadir estilos
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .rebranding-popup-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .rebranding-popup {
                background-color: white;
                border-radius: 10px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
                overflow: hidden;
                transform: scale(0.8);
                transition: transform 0.3s ease;
            }
            
            .popup-header {
                padding: 15px 20px;
                background-color: var(--primary-color);
                color: white;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .popup-header h3 {
                margin: 0;
                color: white;
                font-size: 1.3rem;
            }
            
            .popup-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.2s;
            }
            
            .popup-close:hover {
                opacity: 1;
            }
            
            .popup-body {
                padding: 20px;
                text-align: center;
            }
            
            .popup-icon {
                font-size: 3rem;
                color: var(--primary-color);
                margin-bottom: 15px;
            }
            
            .popup-body p {
                margin-bottom: 10px;
                line-height: 1.6;
            }
            
            .popup-footer {
                padding: 15px 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: #f5f5f5;
            }
            
            .popup-btn {
                margin-bottom: 10px;
            }
            
            .dont-show-again {
                font-size: 0.85rem;
                color: #666;
                display: flex;
                align-items: center;
                cursor: pointer;
            }
            
            .dont-show-again input {
                margin-right: 5px;
            }
            
            /* Animación de entrada */
            .rebranding-popup-overlay.show {
                opacity: 1;
            }
            
            .rebranding-popup-overlay.show .rebranding-popup {
                transform: scale(1);
            }
            
            /* Animación de salida */
            .rebranding-popup-overlay.hide {
                opacity: 0;
            }
            
            .rebranding-popup-overlay.hide .rebranding-popup {
                transform: scale(0.8);
            }
            
            @media (max-width: 576px) {
                .rebranding-popup {
                    width: 95%;
                }
                
                .popup-header h3 {
                    font-size: 1.2rem;
                }
            }
        `;
        
        document.head.appendChild(styleElement);
        
        // Mostrar con animación
        setTimeout(() => {
            popupOverlay.classList.add('show');
        }, 10);
        
        // Manejar eventos
        
        // Cerrar al hacer clic en X
        popupContent.querySelector('.popup-close').addEventListener('click', () => {
            closePopup();
        });
        
        // Cerrar al hacer clic fuera
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                closePopup();
            }
        });
        
        // Botón principal
        popupContent.querySelector('.popup-btn').addEventListener('click', () => {
            // Aquí podrías añadir código para suscripción o notificaciones
            closePopup();
        });
        
        function closePopup() {
            // Comprobar si marcó "no mostrar de nuevo"
            const dontShowAgain = document.getElementById('dontShowAgain').checked;
            
            if (dontShowAgain) {
                localStorage.setItem('rebrandingPopupSeen', 'true');
            }
            
            // Animación de salida
            popupOverlay.classList.add('hide');
            
            // Eliminar del DOM después de la animación
            setTimeout(() => {
                document.body.removeChild(popupOverlay);
            }, 300);
        }
    }
});