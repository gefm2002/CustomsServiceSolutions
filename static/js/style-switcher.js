document.addEventListener('DOMContentLoaded', function() {
    // Create style switcher container
    const styleSwitcher = document.createElement('div');
    styleSwitcher.className = 'style-switcher';
    styleSwitcher.innerHTML = `
        <div class="style-switcher-toggle">
            <i class="fas fa-cog"></i>
        </div>
        <div class="style-switcher-content">
            <h4>Estilos de Diseño</h4>
            <div class="style-options">
                <button data-style="styles" class="style-option active">
                    <span>Original</span>
                </button>
                <button data-style="styles-flat" class="style-option">
                    <span>Diseño Flat</span>
                </button>
                <button data-style="styles-glass" class="style-option">
                    <span>Glassmorphism</span>
                </button>
                <button data-style="styles-neuro" class="style-option">
                    <span>Neumorfismo</span>
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(styleSwitcher);

    // Add CSS for the style switcher
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .style-switcher {
            position: fixed;
            right: -200px;
            top: 150px;
            width: 200px;
            background: #fff;
            z-index: 9999;
            box-shadow: -3px 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px 0 0 5px;
            transition: right 0.3s ease;
        }
        
        .style-switcher.active {
            right: 0;
        }
        
        .style-switcher-toggle {
            position: absolute;
            top: 0;
            left: -40px;
            width: 40px;
            height: 40px;
            background: #fff;
            color: #0056b3;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            border-radius: 5px 0 0 5px;
            cursor: pointer;
            box-shadow: -3px 0 10px rgba(0, 0, 0, 0.1);
        }
        
        .style-switcher-toggle i {
            animation: spin 4s infinite linear;
        }
        
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        
        .style-switcher-content {
            padding: 15px;
        }
        
        .style-switcher-content h4 {
            margin-top: 0;
            margin-bottom: 15px;
            text-align: center;
            color: #333;
            font-size: 16px;
        }
        
        .style-options {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .style-option {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 8px;
            border-radius: 5px;
            cursor: pointer;
            background: #f5f5f5;
            border: none;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
        }
        
        .style-option:hover {
            background: #e0e0e0;
        }
        
        .style-option.active {
            background: #0056b3;
            color: white;
        }
    `;
    document.head.appendChild(styleElement);

    // Toggle style switcher
    const toggleBtn = document.querySelector('.style-switcher-toggle');
    toggleBtn.addEventListener('click', function() {
        styleSwitcher.classList.toggle('active');
    });

    // Style switching functionality
    const styleOptions = document.querySelectorAll('.style-option');
    const currentStyleLink = document.querySelector('link[href*="css/styles"]');
    
    // Store original href
    const originalHref = currentStyleLink.getAttribute('href');
    
    styleOptions.forEach(option => {
        option.addEventListener('click', function() {
            const style = this.getAttribute('data-style');
            
            // Update active class
            styleOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            // Change stylesheet
            const newHref = originalHref.replace(/css\/styles[^\.]*\.css/, `css/${style}.css`);
            currentStyleLink.setAttribute('href', newHref);
            
            // Save preference in localStorage
            localStorage.setItem('preferredStyle', style);
        });
    });
    
    // Check for saved preference
    const savedStyle = localStorage.getItem('preferredStyle');
    if (savedStyle) {
        // Find and click the appropriate style option
        const savedOption = document.querySelector(`.style-option[data-style="${savedStyle}"]`);
        if (savedOption) {
            savedOption.click();
        }
    }
});