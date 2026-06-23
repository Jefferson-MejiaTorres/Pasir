// ========== SMOOTH SCROLLING FOR NAVIGATION LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            closeMenu();
        }
    });
});

// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

function closeMenu() {
    if (navMenu) {
        navMenu.classList.remove('active');
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && menuToggle && !navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMenu();
    }
});

// ========== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe cards and sections for animation
document.querySelectorAll('.problem-card, .lineamiento-card, .legal-card, .result-item, .timeline-item').forEach(el => {
    observer.observe(el);
});

// ========== NAVBAR BACKGROUND ON SCROLL ==========
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
    }
});

// ========== FLOATING CARDS PARALLAX EFFECT ==========
function updateFloatingCardsPosition() {
    const cards = document.querySelectorAll('.floating-card');
    const scrollY = window.scrollY;
    
    cards.forEach((card, index) => {
        const offset = scrollY * (0.2 + index * 0.05);
        card.style.transform = `translateY(${offset}px)`;
    });
}

window.addEventListener('scroll', updateFloatingCardsPosition);

// ========== BUTTON HOVER EFFECTS ==========
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========== CARD HOVER EFFECTS ==========
const cardSelectors = [
    '.problem-card',
    '.lineamiento-card',
    '.legal-card',
    '.result-item',
    '.timeline-content'
];

cardSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// ========== SCROLL-TRIGGERED COUNTER ANIMATION ==========
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = Date.now();
        
        function updateCount() {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(target * progress);
            counter.textContent = current + '+';
            
            if (progress < 1) {
                requestAnimationFrame(updateCount);
            }
        }
        
        updateCount();
    });
}

// Trigger counter animation when results section is visible
const resultsSection = document.querySelector('#results');
if (resultsSection) {
    const resultsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                resultsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    resultsObserver.observe(resultsSection);
}

// ========== SMOOTH PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
    // ESC to close menu
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// ========== ACCESSIBILITY: FOCUS VISIBLE STYLES ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========== HERO SECTION PARALLAX ==========
const heroSection = document.querySelector('.hero');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        heroSection.style.backgroundPosition = `center ${scrollY * 0.5}px`;
    });
}

// ========== INTERACTIVE TIMELINE ANIMATION ==========
function setupTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = `translateY(${index % 2 === 0 ? '20px' : '-20px'})`;
        item.style.transition = 'all 0.6s ease-out';
        timelineObserver.observe(item);
    });
}

setupTimeline();

// ========== SOLUTION LAYER STAGGER ANIMATION ==========
function setupSolutionLayers() {
    const layers = document.querySelectorAll('.layer');
    
    const layerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const delay = parseInt(entry.target.style.animationDelay) || 0;
            }
        });
    }, { threshold: 0.3 });
    
    layers.forEach(layer => {
        layerObserver.observe(layer);
    });
}

setupSolutionLayers();

// ========== LAZY LOADING FOR IMAGES (if needed in future) ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== ACTIVE SECTION HIGHLIGHTING IN NAVBAR ==========
function updateActiveNavLink() {
    const sections = document.querySelectorAll('[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// ========== UTILITY: DETECT MOBILE DEVICE ==========
function isMobile() {
    return window.innerWidth < 768;
}

// ========== ADJUST ANIMATIONS FOR MOBILE ==========
if (isMobile()) {
    document.querySelectorAll('[style*="animation"]').forEach(el => {
        el.style.animationDuration = '0.5s';
    });
}

// ========== PERFORMANCE: DEBOUNCE SCROLL EVENTS ==========
function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

const debouncedUpdateActive = debounce(updateActiveNavLink, 100);
window.addEventListener('scroll', debouncedUpdateActive);

// ========== PAGE VISIBILITY: PAUSE ANIMATIONS WHEN TAB NOT VISIBLE ==========
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.body.style.animationPlayState = 'paused';
    } else {
        document.body.style.animationPlayState = 'running';
    }
});

// ========== INITIAL SETUP ==========
document.addEventListener('DOMContentLoaded', () => {
    // Initial update of active nav link
    updateActiveNavLink();
    
    // Setup scroll animations
    setupTimeline();
    setupSolutionLayers();
    
    // Log that script is loaded
    console.log('PASIR Landing Page - Script loaded successfully');
});
