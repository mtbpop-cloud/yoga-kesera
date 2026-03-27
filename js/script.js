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

    // --- Load Schedule Data ---
    const scheduleTbody = document.getElementById('schedule-tbody');
    if (scheduleTbody) {
        // Show loading state
        scheduleTbody.innerHTML = '<tr><td colspan="2" style="padding: 15px 0; text-align: center; color: #888;">読み込み中...</td></tr>';
        
        fetch('data/schedule.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                scheduleTbody.innerHTML = ''; // Clear loading text
                data.forEach((item, index) => {
                    const tr = document.createElement('tr');
                    // Add bottom border to all except the last one
                    if (index < data.length - 1) {
                        tr.style.borderBottom = '1px solid rgba(0,0,0,0.05)';
                    }
                    tr.innerHTML = `
                        <td style="padding: 8px 0; white-space: nowrap;">${item.date}</td>
                        <td style="padding: 8px 0; word-break: keep-all;">${item.location}</td>
                    `;
                    scheduleTbody.appendChild(tr);
                });
            })
            .catch(error => {
                console.error('Error fetching schedule data:', error);
                scheduleTbody.innerHTML = '<tr><td colspan="2" style="padding: 15px 0; text-align: center; color: #ff6b6b;">スケジュールの取得に失敗しました。</td></tr>';
            });
    }

    // --- Accordion Logic ---
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            
            if (header.classList.contains('active')) {
                content.classList.add('active');
                // Forcing scroll animations to trigger if they were hidden
                content.querySelectorAll('.fade-up, .fade-in-left, .fade-in-right').forEach(el => {
                    el.classList.add('is-visible');
                });
            } else {
                content.classList.remove('active');
            }
        });
    });

    // --- Auto-open Accordion on Nav Link Click ---
    const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
    allAnchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const accordionHeader = targetElement.querySelector('.accordion-header');
                if (accordionHeader && !accordionHeader.classList.contains('active')) {
                    // Automatically open the target accordion section
                    accordionHeader.classList.add('active');
                    const content = accordionHeader.nextElementSibling;
                    if (content) {
                        content.classList.add('active');
                        content.querySelectorAll('.fade-up, .fade-in-left, .fade-in-right').forEach(el => {
                            el.classList.add('is-visible');
                        });
                    }
                }
            }
        });
    });
});
