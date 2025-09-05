// Gallery variables
let currentSlide = 0;
const totalSlides = 5;
let currentLanguage = 'en';

// Initialize gallery
function initGallery() {
    createDots();
    updateDots();
}

// Create dots for slide indicator
function createDots() {
    const dotsContainer = document.getElementById('galleryDots');
    dotsContainer.innerHTML = ''; // Clear existing dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }
}

// Update active dot
function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Change slide function
function changeSlide(direction) {
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    updateSlidePosition();
    updateDots();
}

// Go to specific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlidePosition();
    updateDots();
}

// Update slide position
function updateSlidePosition() {
    const slider = document.getElementById('gallerySlider');
    const translateX = currentLanguage === 'ar' ? currentSlide * 100 : -currentSlide * 100;
    slider.style.transform = `translateX(${translateX}%)`;
    
    // Reset animation for current slide content
    const currentSlideElement = slider.children[currentSlide];
    const content = currentSlideElement.querySelector('.gallery-content');
    if (content) {
        content.style.animation = 'none';
        setTimeout(() => {
            content.style.animation = 'fadeInUp 1.2s ease';
        }, 100);
    }
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

const galleryContainer = document.querySelector('.gallery-container');

galleryContainer.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

galleryContainer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next slide
            changeSlide(currentLanguage === 'ar' ? -1 : 1);
        } else {
            // Swipe right - previous slide
            changeSlide(currentLanguage === 'ar' ? 1 : -1);
        }
    }
}

// Language management
function toggleLanguage() {
    const body = document.body;
    const html = document.documentElement;
    
    if (currentLanguage === 'en') {
        currentLanguage = 'ar';
        body.setAttribute('lang', 'ar');
        body.setAttribute('dir', 'rtl');
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        document.title = 'برايم - خدمات الطعام والضيافة';
    } else {
        currentLanguage = 'en';
        body.setAttribute('lang', 'en');
        body.setAttribute('dir', 'ltr');
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        document.title = 'PRIME by Asma - Catering & Food Services';
    }
    
    // Update slide position for RTL
    updateSlidePosition();
    
    // Save language preference
    localStorage.setItem('preferred-language', currentLanguage);
}

// Load saved language preference on page load
function loadLanguagePreference() {
    const savedLanguage = localStorage.getItem('preferred-language');
    if (savedLanguage && savedLanguage !== currentLanguage) {
        toggleLanguage();
    }
}

// Scroll to Top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button based on scroll position
function toggleScrollToTopButton() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    mobileMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
}

// Event listeners
window.addEventListener('scroll', toggleScrollToTopButton);

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    initGallery();
    loadLanguagePreference();
    
    // Logo click functionality
    document.querySelector('.nav-logo').addEventListener('click', function(e) {
        e.preventDefault();
        scrollToTop();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for logo/home links
            if (href === '#' || href === '#home') {
                e.preventDefault();
                scrollToTop();
                return;
            }
            
            // Allow normal anchor navigation for other links
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 100; // Account for fixed navigation
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navContainer = document.querySelector('.nav-container');
    const languageToggle = document.querySelector('.language-toggle');
    
    if (!navContainer.contains(event.target) && 
        !languageToggle.contains(event.target) && 
        mobileMenu.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close mobile menu on window resize
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// Prevent initial auto-scroll
window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;
document.body.scrollTop = 0;

// Disable scroll restoration
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Block any auto-scrolling on page unload/reload
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});