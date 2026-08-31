/**
 * Projects Data and Dynamic Rendering
 *
 * Every entry below is a real, working project. `demo` links have been
 * checked and respond 200; `github` is null where no public repository
 * exists yet (the card simply omits the button).
 */

const projects = [
    {
        id: 1,
        title: "Human in the Loop",
        description: "A deep-research agent that asks permission before it spends your money, and proves its sources exist before it hands you a report.",
        longDescription: "Most research agents are a prompt box wired to a tool loop — you ask, it burns tokens unattended, and you get prose full of confident citations you have to check by hand. This one puts a person at the two moments that matter. The agent drafts a plan and stops, showing you the steps alongside what approving them will cost, recalculated as you edit. And it keeps a ledger of every URL search actually returned, so the finished report's links can be diffed against it: verified links were genuinely fetched, unverified ones came from the model's memory. That check is a mechanism in code, not a prompt instruction, which is why it can be trusted. Runs on Claude, or on any open-weight model behind an OpenAI-compatible endpoint.",
        tech: ["FastAPI", "Next.js 16", "React 19", "PostgreSQL", "Redis", "Claude API"],
        category: "ai",
        emoji: "🧠",
        image: null,
        demo: "https://human-in-the-loop-five.vercel.app",
        github: "https://github.com/Samuelj16/Human-in-the-Loop",
        features: [
            "Approval gate that prices a plan before any spend",
            "Citation ledger: every link diffed against real search results",
            "Streaming progress over SSE while the agent works",
            "Provider-agnostic — Claude or any OpenAI-compatible endpoint",
            "Deployed live on Railway (API) and Vercel (web)"
        ]
    },
    {
        id: 2,
        title: "Laetitia Nail Design",
        description: "Studio site and custom booking engine for a one-chair nail studio, with a deposit gate and an admin panel the owner runs herself.",
        longDescription: "A full-stack FastAPI application built so a single nail artist can run her entire business without touching code: a portfolio, a priced service menu, and a booking engine that takes a deposit up front and lets clients upload inspiration photos with their request. Automated reminders go out 24 hours and 2 hours before an appointment. Payments and SMS fall back to mock mode until real credentials are added, so the whole booking flow can be clicked through offline with no Square account, no Twilio account and no network.",
        tech: ["FastAPI", "SQLAlchemy", "Jinja2", "Docker", "Square API", "Twilio"],
        category: "fullstack",
        emoji: "💅",
        image: null,
        demo: null,
        github: null,
        features: [
            "Booking engine with deposit gate and photo upload",
            "Automated 24h and 2h appointment reminders",
            "Admin panel for services, pricing and availability",
            "Mock payment/SMS fallback — full flow works offline",
            "One-command setup script; Docker and Render configs included"
        ]
    },
    {
        id: 3,
        title: "StockSage",
        description: "Unified stock research for beginner investors, with an AI assistant that explains every unfamiliar term in plain language.",
        longDescription: "StockSage pulls together the parts of stock research that are normally scattered across half a dozen sites: search a ticker, read its price history and financial metrics, scan the latest news, and ask an AI assistant to explain anything you don't recognise. Deliberately a research and learning tool — no trading, no price predictions, no recommendations. Built to a documented MVC design, and it runs with zero configuration: without API keys it serves realistic generated market data and a rule-based explainer, so every feature works on first launch.",
        tech: ["React 18", "Vite", "Express", "Node.js", "JWT", "Claude API"],
        category: "fullstack",
        emoji: "📈",
        image: null,
        demo: null,
        github: null,
        features: [
            "Ticker search with price history and financial metrics",
            "AI assistant that explains financial terms on demand",
            "JWT auth with bcrypt password hashing",
            "Alpha Vantage integration with a built-in demo fallback",
            "MVC architecture; storage layer swappable for MongoDB Atlas"
        ]
    },
    {
        id: 4,
        title: "job-bot",
        description: "Job application assistant that scores public postings against your resume, then tailors and submits the ones you approve.",
        longDescription: "A Python pipeline that scrapes public Greenhouse, Lever and Indeed postings, scores each one against your resume with Claude, and presents the matches for review. Nothing is sent without approval — for every job you accept, it tailors a resume and cover letter to that posting, then drives the application form with Playwright. Roles, locations, required and preferred skills, and the company slugs to pull from are all configured in a single YAML file.",
        tech: ["Python", "Claude API", "Playwright", "BeautifulSoup", "YAML"],
        category: "ai",
        emoji: "🤖",
        image: null,
        demo: null,
        github: null,
        features: [
            "Scrapes Greenhouse, Lever and Indeed postings",
            "Claude-scored match ranking against your resume",
            "Human review step before anything is submitted",
            "Per-job tailored resume and cover letter generation",
            "Playwright-driven form auto-fill"
        ]
    },
    {
        id: 5,
        title: "Wedding Invitation",
        description: "A single self-contained HTML file — photo, music, fonts and artwork all embedded — that pastes into iMessage as a proper link card.",
        longDescription: "A digital wedding invitation with an RSVP flow, built as one file with no build step and nothing external to upload: the photograph, the background music, the typefaces and the artwork are all embedded inline. The fiddly part was the link preview. iMessage's scraper will not resolve a relative og:image, so the invitation pastes as bare text unless the Open Graph tags carry absolute URLs — six of them across the invitation and RSVP pages, kept in sync with the deployed Netlify address.",
        tech: ["HTML5", "CSS3", "JavaScript", "Open Graph", "Netlify"],
        category: "frontend",
        emoji: "💌",
        image: null,
        demo: "https://samuelandwildineinvatation.netlify.app/",
        github: null,
        features: [
            "Entirely self-contained — one file, zero dependencies",
            "Embedded photo, music, fonts and artwork",
            "RSVP form with reply tracking",
            "Open Graph tags tuned for iMessage link previews",
            "Deployed on Netlify"
        ]
    },
    {
        id: 6,
        title: "Wedding Website",
        description: "A nine-page wedding site driven entirely by one config file — change it once and every page, countdown and calendar link updates.",
        longDescription: "Plain HTML, CSS and JavaScript with no build step, no framework and no dependencies. Nine pages cover the schedule, venue, RSVP, travel, FAQ, registry, contacts and the couple's story. All of it reads from a single config file holding the names, date, venue, RSVP deadline and contacts — edit that one file and the headers, footers, countdown, calendar download and map links all follow. Dates keep their UTC offset so the countdown and the generated calendar file are correct for guests in other timezones.",
        tech: ["HTML5", "CSS3", "JavaScript", "Netlify"],
        category: "frontend",
        emoji: "💍",
        image: null,
        demo: "https://samuelandwildinewedding.netlify.app",
        github: null,
        features: [
            "Nine pages fed by a single config file",
            "Live countdown and downloadable calendar invite",
            "Timezone-correct dates via explicit UTC offsets",
            "RSVP with per-guest meal and dietary options",
            "No build step — deploys to any static host"
        ]
    },
    {
        id: 7,
        title: "2027 Budget Board",
        description: "An interactive one-board view of a full-year household budget where every dollar figure is editable and everything recalculates live.",
        longDescription: "A single self-contained page that turns a year of budget spreadsheets into one readable board: money flow from income into fixed, variable and savings buckets; every funded line ranked as one proportional bar; the merge from source file to template with the items that never mapped called out; twelve months side by side; and savings rate against one-time targets and outstanding debt. Every figure on the board is an editable field — totals, percentages, bar widths, net balance and goal runways all recompute as you type. No build step and no install.",
        tech: ["HTML5", "CSS3", "JavaScript", "Data Visualization"],
        category: "frontend",
        emoji: "📊",
        image: null,
        demo: null,
        github: null,
        features: [
            "Five linked figures on one pan-and-scan board",
            "Every dollar figure editable, with live recalculation",
            "Colour-coded fixed / variable / savings categories",
            "Unmapped source-file items surfaced rather than hidden",
            "Savings-rate runway against one-time goals and debt"
        ]
    },
    {
        id: 8,
        title: "Serverless Employees API",
        description: "A minimal AWS Lambda REST API backed by MongoDB, designed to sit behind an API Gateway HTTP API with proxy integration.",
        longDescription: "A small, deliberately focused serverless service: list and create employee records over HTTP, with the Lambda handler doing its own routing, validation and status-code mapping for proxy integration. Returns 201 on creation, 400 when a required field is missing, and 404 for unknown routes — the kind of boundary handling that is easy to skip in a Lambda and painful to debug later.",
        tech: ["AWS Lambda", "API Gateway", "MongoDB", "Python"],
        category: "cloud",
        emoji: "☁️",
        image: null,
        demo: null,
        github: "https://github.com/Samuelj16/lambda-mongodb",
        features: [
            "GET and POST /employees over API Gateway HTTP API v2",
            "Lambda proxy integration with explicit route handling",
            "Request validation with correct 400 / 404 responses",
            "MongoDB-backed persistence",
            "Minimal surface area, no framework overhead"
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
