/**
 * Main JavaScript - Navigation, Animations & Core Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initTypingEffect();
    initModal();
    setFooterYear();
});

/**
 * Navigation functionality
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Scroll effect for navbar
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

/**
 * Scroll animations using Intersection Observer
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.about-content, .skill-category, .section-title, .contact-content'
    );

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animate project cards with stagger
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in', 'visible');
                }, index * 100);
                projectObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectCards.forEach(card => {
        card.classList.add('fade-in');
        projectObserver.observe(card);
    });
}

/**
 * Typing effect for hero section
 */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const titles = [
        'Full Stack Developer',
        'Cloud Enthusiast',
        'Problem Solver',
        'Student Developer',
        'Open Source Contributor'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500; // Pause before next word
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/**
 * Modal functionality
 */
function initModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');

    // Close modal on button click
    modalClose.addEventListener('click', () => {
        closeModal();
    });

    // Close modal on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Open modal with project details
 */
function openModal(project) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    const featuresHtml = project.features
        ? `<div class="modal-features">
               <h4>Key Features</h4>
               <ul>
                   ${project.features.map(f => `<li>${f}</li>`).join('')}
               </ul>
           </div>`
        : '';

    modalBody.innerHTML = `
        ${project.image
            ? `<img src="${project.image}" alt="${project.title}" class="modal-image" loading="lazy">`
            : `<div class="project-image-placeholder modal-image">${project.emoji || '🚀'}</div>`
        }
        <h3 class="modal-title">${project.title}</h3>
        <p class="modal-description">${project.longDescription || project.description}</p>
        ${featuresHtml}
        <div class="modal-tech">
            ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="modal-buttons">
            ${project.demo ? `<a href="${project.demo}" class="btn btn-primary" target="_blank" rel="noopener">Live Demo</a>` : ''}
            ${project.github ? `<a href="${project.github}" class="btn btn-secondary" target="_blank" rel="noopener">View Code</a>` : ''}
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close modal
 */
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

/**
 * Set footer year
 */
function setFooterYear() {
    const yearElement = document.querySelector('.footer-year');
    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()} All Rights Reserved`;
    }
}

/**
 * Lazy load images with Intersection Observer
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    images.forEach(img => imageObserver.observe(img));
}

// Make openModal available globally for project cards
window.openModal = openModal;
