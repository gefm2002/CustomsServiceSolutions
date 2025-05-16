document.addEventListener('DOMContentLoaded', function() {
    // Initialize carousel - using querySelectorAll to handle multiple carousels
    const carouselTracks = document.querySelectorAll('.carousel-track');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const nextBtns = document.querySelectorAll('.next-btn');
    
    // Exit if no carousel is found
    if (!carouselTracks.length) return;
    
    // Get the first carousel elements (backward compatibility)
    const carouselTrack = carouselTracks[0];
    const prevBtn = prevBtns[0];
    const nextBtn = nextBtns[0];
    
    // Stock photos for carousel
    const images = [
        // Port logistics containers
        'https://pixabay.com/get/gc35d5313cff9fa30b15cff0eb9771dcf653f1a0850a0573d73130ef7b1266a2812ea1644d6cff4fb713ea36035124797a021651114b26ce7b55f6a024e837095_1280.jpg',
        'https://pixabay.com/get/g36a6d23f395724a7bab0fd54603fef893fa837bb69508c132110f72b90abc8f7b23a406a10573f6f437d7bb920129c7f183f40e3ec13a4cb4f5c54f454579aba_1280.jpg',
        'https://pixabay.com/get/g3b914eebc6bd2b241d5465e7d887caa5f81408cc3e382973a451a28ada21f54a4e79fdce15ac1ae7ff5e48b5eb0d41d45b88d9c9991ee42f57ba8f15a9621675_1280.jpg',
        'https://pixabay.com/get/gc415996e391d5ba035cb23b4d66219a2fc3eab4b43c997da2425e5ebe61fe1ebc0e13c6a8fab00ab02c5c31685e99685ad6e83a50eb6db91aa368710e7086190_1280.jpg',
        
        // Cargo ships
        'https://pixabay.com/get/g2172d4a2766533f81a0bca7b6fe1cf7ccd9161404ee11e1ca43689c669a7b4e76ed84ed9e162b895df4f68aec0264406e54f2b891e230e15bab2e74466be28b7_1280.jpg',
        'https://pixabay.com/get/g74c95247f3b1b46b03de65880911e9d4c797af97d6b3fb416b3b85cc393105780b62085d408f36db6bf08dfba2463056bfb414591750e01ce89138d136873ace_1280.jpg',
        
        // Customs office
        'https://pixabay.com/get/g614df35be4b59dfa2d52b981d53b4da48ab4d9a67f0c21e45214e199577918440d23edee3679ec509e5271ace16df173d1081b6dec136584ff527b5513ad91a9_1280.jpg',
        'https://pixabay.com/get/g08fb216d18733fea38e90afa06d00b07c140227f0a43c1630cc0fb61baa026b51c38df11c819b8800f2b439f3fffa779f34ddbc78e6534ff0a88784c4d4318d6_1280.jpg',
        
        // International trade
        'https://pixabay.com/get/g3a327b9b732df230ca4dd5504a234890eb08a90e576d6a68acc94e0dbdbba5b2e0d37b79fb559796589041af036ddc6b1cb0949896c88ed107b011d224b64504_1280.jpg'
    ];
    
    let currentIndex = 0;
    
    // Create slides dynamically
    function createSlides() {
        carouselTrack.innerHTML = '';
        
        images.forEach((imageUrl, index) => {
            const slide = document.createElement('div');
            slide.className = 'carousel-slide';
            slide.dataset.index = index;
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = `Imagen de comercio exterior ${index + 1}`;
            img.loading = 'lazy'; // Lazy load images
            
            slide.appendChild(img);
            carouselTrack.appendChild(slide);
        });
        
        updateCarousel();
    }
    
    // Update carousel position
    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    
    // Event listeners for next and previous buttons
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateCarousel();
    });
    
    // Auto slide change
    let slideInterval;
    
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
        }, 5000); // Change slide every 5 seconds
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Pause auto slide on hover
    const carouselContainer = document.querySelector('.carousel-container');
    
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        startSlideInterval();
    });
    
    // Reset interval after manual navigation
    prevBtn.addEventListener('click', resetSlideInterval);
    nextBtn.addEventListener('click', resetSlideInterval);
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    carouselContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance to register as swipe
        
        // Left swipe (next slide)
        if (touchStartX - touchEndX > swipeThreshold) {
            currentIndex = (currentIndex + 1) % images.length;
            updateCarousel();
            resetSlideInterval();
        }
        
        // Right swipe (previous slide)
        if (touchEndX - touchStartX > swipeThreshold) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateCarousel();
            resetSlideInterval();
        }
    }
    
    // Initialize carousel
    createSlides();
    startSlideInterval();
    
    // Preload images for smoother experience
    function preloadImages() {
        images.forEach(url => {
            const img = new Image();
            img.src = url;
        });
    }
    
    preloadImages();
});
