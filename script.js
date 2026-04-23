// ===========================
// NAVIGATION & MENU TOGGLE
// ===========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===========================
// SMOOTH SCROLLING
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// NAVBAR BACKGROUND ON SCROLL
// ===========================

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 46, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 217, 255, 0.15)';
    } else {
        navbar.style.background = 'rgba(26, 26, 46, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// ===========================
// CONTACT FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const formData = new FormData(this);
    const data = {
        name: this.querySelector('input[type="text"]').value,
        email: this.querySelector('input[type="email"]').value,
        subject: this.querySelectorAll('input[type="text"]')[1].value,
        message: this.querySelector('textarea').value
    };

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }

    // Show success message
    showNotification('Thank you! Your message has been sent successfully. I\'ll get back to you soon!', 'success');

    // Reset form
    this.reset();

    // Log the data (in production, send to backend)
    console.log('Form submitted:', data);
});

// ===========================
// NOTIFICATION SYSTEM
// ===========================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles dynamically
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#00ff88' : type === 'error' ? '#ff006e' : '#00d9ff'};
        color: ${type === 'success' ? '#000' : '#fff'};
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 217, 255, 0.3);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.5s ease;
    `;

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 4000);
}

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation on scroll
document.querySelectorAll('.project-card, .skill-category, .stat, .experience-item').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

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
});

// ===========================
// TYPING ANIMATION
// ===========================

function setupTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    const words = text.split(' ');
    heroTitle.textContent = '';
    heroTitle.style.minHeight = '200px';

    let wordIndex = 0;

    function typeWord() {
        if (wordIndex < words.length) {
            const word = words[wordIndex];
            const span = document.createElement('span');
            
            if (word === 'Intelligence') {
                span.className = 'gradient-text';
            }
            
            span.textContent = word + ' ';
            span.style.animation = 'fadeInUp 0.5s ease forwards';
            heroTitle.appendChild(span);
            
            wordIndex++;
            setTimeout(typeWord, 300);
        }
    }

    // Delay typing animation slightly
    setTimeout(typeWord, 800);
}

// Initialize typing animation when page loads
// document.addEventListener('DOMContentLoaded', setupTypingAnimation);

// ===========================
// PARALLAX EFFECT
// ===========================

window.addEventListener('scroll', () => {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const scrollPosition = window.scrollY;
        const shapes = document.querySelectorAll('.animated-shape');
        
        shapes.forEach((shape, index) => {
            shape.style.transform = `translateY(${scrollPosition * (0.5 + index * 0.1)}px)`;
        });
    }
});

// ===========================
// CURSOR EFFECT (optional)
// ===========================

const createCursorGlow = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100px);
                opacity: 0;
            }
        }

        .nav-link.active {
            color: var(--primary-color);
        }

        .nav-link.active::after {
            width: 100%;
        }
    `;
    document.head.appendChild(style);
};

createCursorGlow();

// ===========================
// FORM FIELD FOCUS EFFECTS
// ===========================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ===========================
// LAZY LOAD IMAGES
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===========================
// UTILITY: Debounce function
// ===========================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===========================
// ENHANCE INTERACTIVITY
// ===========================

// Add click effects to skill tags
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('click', function () {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Animate project cards on hover
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===========================
// CONSOLE EASTER EGG
// ===========================

console.log('%cWelcome to Osama Bin Habib\'s Portfolio! 🚀', 'font-size: 20px; color: #00d9ff; font-weight: bold;');
console.log('%cIf you\'re viewing this, you probably appreciate good code. Let\'s connect! 💡', 'font-size: 14px; color: #0066ff;');
console.log('%cEmail: habib_osama@yahoo.com | Phone: +1 571 547-7279', 'font-size: 12px; color: #00ff88;');
