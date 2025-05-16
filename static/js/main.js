// Wait for the DOM to be loaded
document.addEventListener('DOMContentLoaded', function() {
    // Loader
    const loader = document.getElementById('loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        loaderProgress.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                // Enable page scrolling
                document.body.style.overflow = 'visible';
            }, 500);
        }
    }, 100);
    
    // Disable page scrolling while loader is active
    document.body.style.overflow = 'hidden';
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Transform burger to X
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
        
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                
                // Reset burger menu icon
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans.forEach(span => span.classList.remove('active'));
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });
    
    // Header scroll effect
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll animations with Intersection Observer
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // Optionally stop observing the element after animating
                // animationObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.15
    });
    
    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
    
    // Contact Form Validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Basic form validation
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                isValid = false;
                highlightError(nameInput);
            } else {
                removeErrorHighlight(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                isValid = false;
                highlightError(emailInput);
            } else {
                removeErrorHighlight(emailInput);
            }
            
            if (!subjectInput.value.trim()) {
                isValid = false;
                highlightError(subjectInput);
            } else {
                removeErrorHighlight(subjectInput);
            }
            
            if (!messageInput.value.trim()) {
                isValid = false;
                highlightError(messageInput);
            } else {
                removeErrorHighlight(messageInput);
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // Helper functions for form validation
    function highlightError(input) {
        input.style.borderColor = 'var(--error-color)';
    }
    
    function removeErrorHighlight(input) {
        input.style.borderColor = 'var(--border-color)';
    }
    
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
