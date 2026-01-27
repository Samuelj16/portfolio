/**
 * Projects Data and Dynamic Rendering
 */

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Full-stack e-commerce solution with user authentication, product management, and payment integration.",
        longDescription: "A comprehensive e-commerce platform built from scratch featuring user authentication with JWT, product catalog with search and filters, shopping cart functionality, Stripe payment integration, and an admin dashboard for inventory management.",
        tech: ["React", "Node.js", "MongoDB", "Stripe"],
        category: "fullstack",
        emoji: "🛒",
        image: null,
        demo: "https://demo.example.com",
        github: "https://github.com/Samuelj16/ecommerce",
        features: [
            "User authentication with JWT tokens",
            "Product search with advanced filters",
            "Shopping cart with persistent storage",
            "Secure Stripe payment processing",
            "Admin dashboard for inventory"
        ]
    },
    {
        id: 2,
        title: "Real-Time Chat Application",
        description: "WebSocket-powered chat app with private messaging, group chats, and file sharing capabilities.",
        longDescription: "A real-time messaging application using Socket.io for instant communication. Features include private messaging, group chat rooms, typing indicators, read receipts, and file sharing with drag-and-drop support.",
        tech: ["Vue.js", "Socket.io", "Express", "Redis"],
        category: "fullstack",
        emoji: "💬",
        image: null,
        demo: "https://chat.example.com",
        github: "https://github.com/Samuelj16/chat-app",
        features: [
            "Real-time messaging with Socket.io",
            "Private and group chat support",
            "Typing indicators and read receipts",
            "File sharing with drag-and-drop",
            "Message history with Redis caching"
        ]
    },
    {
        id: 3,
        title: "Weather Dashboard",
        description: "Interactive weather application with location-based forecasts and beautiful visualizations.",
        longDescription: "A weather dashboard that provides current conditions, hourly forecasts, and 7-day outlooks. Features geolocation, city search, interactive maps, and animated weather icons with smooth transitions.",
        tech: ["JavaScript", "OpenWeather API", "Chart.js", "CSS3"],
        category: "frontend",
        emoji: "🌤️",
        image: null,
        demo: "https://weather.example.com",
        github: "https://github.com/Samuelj16/weather-app",
        features: [
            "Geolocation-based weather detection",
            "7-day forecast with hourly breakdown",
            "Interactive charts for temperature trends",
            "Animated weather icons",
            "City search with autocomplete"
        ]
    },
    {
        id: 4,
        title: "Task Management API",
        description: "RESTful API for task management with authentication, rate limiting, and comprehensive documentation.",
        longDescription: "A production-ready REST API built with Node.js and Express. Implements CRUD operations for tasks and projects, user authentication, role-based access control, rate limiting, and auto-generated Swagger documentation.",
        tech: ["Node.js", "Express", "PostgreSQL", "Swagger"],
        category: "api",
        emoji: "📋",
        image: null,
        demo: "https://api.example.com/docs",
        github: "https://github.com/Samuelj16/task-api",
        features: [
            "RESTful API with CRUD operations",
            "JWT-based authentication",
            "Role-based access control",
            "Rate limiting and request validation",
            "Auto-generated Swagger docs"
        ]
    },
    {
        id: 5,
        title: "Serverless Image Processor",
        description: "AWS Lambda-based image processing service with automatic resizing and optimization.",
        longDescription: "A serverless image processing pipeline using AWS Lambda, S3, and CloudFront. Automatically resizes, compresses, and serves optimized images. Includes a web interface for uploads and processing configuration.",
        tech: ["AWS Lambda", "S3", "CloudFront", "Python"],
        category: "cloud",
        emoji: "🖼️",
        image: null,
        demo: null,
        github: "https://github.com/Samuelj16/image-processor",
        features: [
            "Automatic image resizing on upload",
            "Multiple format conversions",
            "CDN distribution via CloudFront",
            "Cost-effective serverless architecture",
            "Web upload interface"
        ]
    },
    {
        id: 6,
        title: "Portfolio Generator",
        description: "Dynamic portfolio builder that generates static sites from JSON configuration.",
        longDescription: "A tool that generates beautiful portfolio websites from simple JSON configurations. Supports multiple themes, custom sections, and automatic deployment to GitHub Pages or Netlify.",
        tech: ["JavaScript", "Handlebars", "SCSS", "Node.js"],
        category: "frontend",
        emoji: "✨",
        image: null,
        demo: "https://portfolio-gen.example.com",
        github: "https://github.com/Samuelj16/portfolio-generator",
        features: [
            "JSON-based configuration",
            "Multiple built-in themes",
            "Responsive design output",
            "Auto-deploy to GitHub Pages",
            "SEO optimization included"
        ]
    },
    {
        id: 7,
        title: "GraphQL Blog API",
        description: "Modern blog backend with GraphQL, real-time subscriptions, and content management.",
        longDescription: "A GraphQL API for a blog platform featuring queries, mutations, and subscriptions. Includes user authentication, post management, comments, likes, and real-time updates for new content.",
        tech: ["GraphQL", "Apollo Server", "MongoDB", "Node.js"],
        category: "api",
        emoji: "📝",
        image: null,
        demo: "https://graphql.example.com",
        github: "https://github.com/Samuelj16/graphql-blog",
        features: [
            "Full GraphQL implementation",
            "Real-time subscriptions",
            "User authentication flow",
            "Comment and like system",
            "Content moderation tools"
        ]
    },
    {
        id: 8,
        title: "CI/CD Pipeline Dashboard",
        description: "Visualization tool for monitoring CI/CD pipelines across multiple repositories.",
        longDescription: "A dashboard for monitoring build and deployment pipelines. Integrates with GitHub Actions, displays build status, deployment history, and sends notifications for failures.",
        tech: ["React", "GitHub API", "D3.js", "Firebase"],
        category: "cloud",
        emoji: "🔄",
        image: null,
        demo: "https://cicd.example.com",
        github: "https://github.com/Samuelj16/cicd-dashboard",
        features: [
            "Multi-repository monitoring",
            "Real-time build status updates",
            "Deployment history visualization",
            "Failure notifications",
            "Team collaboration features"
        ]
    },
    {
        id: 9,
        title: "Expense Tracker PWA",
        description: "Progressive web app for tracking expenses with offline support and data visualization.",
        longDescription: "A Progressive Web App for personal finance management. Features offline functionality, expense categorization, budget tracking, and beautiful charts. Syncs across devices when online.",
        tech: ["React", "IndexedDB", "Service Workers", "Chart.js"],
        category: "frontend",
        emoji: "💰",
        image: null,
        demo: "https://expense.example.com",
        github: "https://github.com/Samuelj16/expense-tracker",
        features: [
            "Offline-first architecture",
            "Expense categorization",
            "Budget tracking and alerts",
            "Data visualization with charts",
            "Cross-device sync"
        ]
    },
    {
        id: 10,
        title: "Microservices Template",
        description: "Docker-based microservices architecture template with service discovery and API gateway.",
        longDescription: "A production-ready microservices template using Docker and Kubernetes. Includes service discovery, API gateway, centralized logging, and monitoring with Prometheus and Grafana.",
        tech: ["Docker", "Kubernetes", "Node.js", "RabbitMQ"],
        category: "cloud",
        emoji: "🐳",
        image: null,
        demo: null,
        github: "https://github.com/Samuelj16/microservices-template",
        features: [
            "Docker Compose for local dev",
            "Kubernetes deployment configs",
            "API Gateway with Kong",
            "Service discovery setup",
            "Monitoring with Prometheus"
        ]
    },
    {
        id: 11,
        title: "Code Snippet Manager",
        description: "VS Code extension for managing and sharing code snippets with syntax highlighting.",
        longDescription: "A Visual Studio Code extension for saving, organizing, and sharing code snippets. Features include syntax highlighting, tagging, search, and GitHub Gist synchronization.",
        tech: ["TypeScript", "VS Code API", "GitHub Gist", "SQLite"],
        category: "fullstack",
        emoji: "📎",
        image: null,
        demo: null,
        github: "https://github.com/Samuelj16/snippet-manager",
        features: [
            "Syntax highlighting support",
            "Tag-based organization",
            "Quick search functionality",
            "GitHub Gist sync",
            "Team sharing capabilities"
        ]
    },
    {
        id: 12,
        title: "Authentication Service",
        description: "Standalone auth microservice with OAuth2, MFA, and session management.",
        longDescription: "A complete authentication microservice supporting multiple OAuth providers, multi-factor authentication, session management, and audit logging. Designed to be easily integrated into any application.",
        tech: ["Node.js", "Passport.js", "Redis", "PostgreSQL"],
        category: "api",
        emoji: "🔐",
        image: null,
        demo: null,
        github: "https://github.com/Samuelj16/auth-service",
        features: [
            "OAuth2 provider integration",
            "Multi-factor authentication",
            "Session management with Redis",
            "Comprehensive audit logging",
            "Easy REST API integration"
        ]
    }
];

/**
 * Initialize projects section
 */
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(projects);
    initFilters();
});

/**
 * Render project cards
 */
function renderProjects(projectsToRender) {
    const grid = document.getElementById('projectsGrid');

    if (!grid) return;

    grid.innerHTML = projectsToRender.map(project => `
        <div class="project-card" data-category="${project.category}" onclick="openModal(${JSON.stringify(project).replace(/"/g, '&quot;')})">
            <div class="project-image">
                ${project.image
                    ? `<img src="${project.image}" alt="${project.title}" loading="lazy">`
                    : `<div class="project-image-placeholder">${project.emoji}</div>`
                }
                <div class="project-overlay">
                    <div class="project-links">
                        ${project.demo ? `<a href="${project.demo}" class="project-link" target="_blank" rel="noopener" onclick="event.stopPropagation()">Live Demo</a>` : ''}
                        ${project.github ? `<a href="${project.github}" class="project-link github" target="_blank" rel="noopener" onclick="event.stopPropagation()">GitHub</a>` : ''}
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Re-initialize animations for new cards
    initProjectAnimations();
}

/**
 * Initialize filter buttons
 */
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter projects
            const filter = btn.dataset.filter;
            const filteredProjects = filter === 'all'
                ? projects
                : projects.filter(p => p.category === filter);

            renderProjects(filteredProjects);
        });
    });
}

/**
 * Initialize project card animations
 */
function initProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in', 'visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    projectCards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}
