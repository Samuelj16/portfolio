/**
 * =====================================================
 * MAIN.JS - Core Functionality
 * =====================================================
 *
 * This file handles:
 * - Navigation (scroll effects, mobile menu, active states)
 * - Scroll animations using Intersection Observer
 * - Typing effect in hero section
 * - Modal functionality for project details
 * - Footer year update
 *
 * Author: Samuel Joseph
 * =====================================================
 */

/**
 * Initialize all functionality when DOM is ready
 * Using DOMContentLoaded ensures all HTML is parsed before running scripts
 */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();      // Setup navigation behavior
    initScrollAnimations(); // Setup scroll-triggered animations
    initTypingEffect();     // Start hero typing animation
    initModal();           // Setup modal event listeners
    setFooterYear();       // Set current year in footer
});

/**
 * =====================================================
 * NAVIGATION FUNCTIONALITY
 * =====================================================
 * Handles:
 * - Navbar background change on scroll
 * - Mobile hamburger menu toggle
 * - Active link highlighting based on scroll position
 * - Smooth scrolling for anchor links
 */
function initNavigation() {
    // Get DOM elements
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Track last scroll position (useful for hide-on-scroll if needed later)
    let lastScroll = 0;

    /**
     * Navbar Scroll Effect
     * Adds 'scrolled' class when user scrolls past 50px
     * This triggers CSS to add background color to navbar
     */
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    /**
     * Mobile Menu Toggle
     * Toggles hamburger animation and menu visibility
     */
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');  // Animate hamburger to X
        navMenu.classList.toggle('active');    // Show/hide menu
    });

    /**
     * Close Mobile Menu on Link Click
     * Ensures menu closes when user selects a section
     */
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /**
     * Active Link Highlighting on Scroll
     * Updates which nav link appears active based on current scroll position
     */
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 100; // Offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // Check if current scroll position is within this section
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

    /**
     * Smooth Scrolling for Anchor Links
     * Overrides default jump behavior with smooth animation
     */
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
 * =====================================================
 * SCROLL ANIMATIONS
 * =====================================================
 * Uses Intersection Observer API for performant scroll-triggered animations
 * Elements fade in when they enter the viewport
 */
function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.about-content, .skill-category, .section-title, .contact-content'
    );

    // Observer configuration
    const observerOptions = {
        root: null,           // Use viewport as root
        rootMargin: '0px',    // No margin
        threshold: 0.1        // Trigger when 10% visible
    };

    /**
     * Create observer for fade-in animations
     * Adds 'visible' class to trigger CSS animation
     */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    // Start observing each element
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    /**
     * Staggered Animation for Project Cards
     * Cards animate in sequence with 100ms delay between each
     */
    const projectCards = document.querySelectorAll('.project-card');
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Delay each card's animation based on index
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
 * =====================================================
 * TYPING EFFECT
 * =====================================================
 * Creates typewriter animation in hero section
 * Cycles through different job titles
 */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');

    // Array of titles to cycle through
    // NOTE: Edit this array to customize your titles
    const titles = [
        'Full Stack Developer',
        'Cloud Enthusiast',
        'Problem Solver',
        'Student Developer',
        'Open Source Contributor'
    ];

    let titleIndex = 0;      // Current title in array
    let charIndex = 0;       // Current character position
    let isDeleting = false;  // Are we deleting or typing?
    let typingSpeed = 100;   // Milliseconds between keystrokes

    /**
     * Main typing function - recursively calls itself
     */
    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            // Remove one character
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Delete faster than typing
        } else {
            // Add one character
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // Check if word is complete
        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause 2 seconds before deleting
        } else if (isDeleting && charIndex === 0) {
            // Move to next title
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length; // Loop back to start
            typingSpeed = 500; // Brief pause before typing next word
        }

        // Schedule next keystroke
        setTimeout(type, typingSpeed);
    }

    // Start the typing animation
    type();
}

/**
 * =====================================================
 * MODAL FUNCTIONALITY
 * =====================================================
 * Handles opening/closing project detail modals
 */
function initModal() {
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');

    // Close modal when X button is clicked
    modalClose.addEventListener('click', () => {
        closeModal();
    });

    // Close modal when clicking outside content (on backdrop)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/**
 * Open Modal with Project Details
 * @param {Object} project - Project data object from projects.js
 *
 * Called when user clicks a project card
 * Dynamically generates modal content from project data
 */
function openModal(project) {
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');

    // Build features list HTML if project has features
    const featuresHtml = project.features
        ? `<div class="modal-features">
               <h4>Key Features</h4>
               <ul>
                   ${project.features.map(f => `<li>${f}</li>`).join('')}
               </ul>
           </div>`
        : '';

    // Populate modal with project content
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

    // Show modal and prevent body scroll
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close Modal
 * Hides modal and restores body scroll
 */
function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

/**
 * =====================================================
 * FOOTER YEAR
 * =====================================================
 * Dynamically sets the current year in footer
 * No need to manually update each year!
 */
function setFooterYear() {
    const yearElement = document.querySelector('.footer-year');
    if (yearElement) {
        yearElement.textContent = `© ${new Date().getFullYear()} All Rights Reserved`;
    }
}

/**
 * =====================================================
 * LAZY LOADING (Optional - for future use)
 * =====================================================
 * Lazy loads images with data-src attribute
 * Improves initial page load performance
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;      // Load actual image
                img.removeAttribute('data-src'); // Clean up attribute
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px' // Start loading 50px before visible
    });

    images.forEach(img => imageObserver.observe(img));
}

/**
 * =====================================================
 * GLOBAL EXPORTS
 * =====================================================
 * Make openModal available globally so project cards can call it
 */
window.openModal = openModal;
