document.addEventListener('DOMContentLoaded', () => {
    
    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (mobileMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            header.classList.add('menu-open');
        } else {
            document.body.style.overflow = '';
            header.classList.remove('menu-open');
        }
    };
    
    hamburger.addEventListener('click', toggleMenu);
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // --- Update Copyright Year ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated to keep it visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-up, .fade-in-left, .fade-in-right');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Trigger initial hero animation immediately
    const heroContent = document.querySelector('.hero-content.fade-up');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('is-visible');
        }, 100);
    }
});
