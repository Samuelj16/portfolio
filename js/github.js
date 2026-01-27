/**
 * GitHub API Integration
 * Fetches and displays GitHub profile and repositories
 */

// Configuration - Update this with your GitHub username
const GITHUB_CONFIG = {
    username: 'Samuelj16', // Your GitHub username
    reposToShow: 6,
    excludeForked: true,
    sortBy: 'updated' // 'updated', 'stars', 'pushed'
};

// Language colors for repo cards
const languageColors = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    'C#': '#178600',
    Go: '#00ADD8',
    Rust: '#dea584',
    Ruby: '#701516',
    PHP: '#4F5D95',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    Vue: '#41b883',
    Shell: '#89e051',
    Dockerfile: '#384d54'
};

/**
 * Initialize GitHub section
 */
document.addEventListener('DOMContentLoaded', () => {
    fetchGitHubData();
});

/**
 * Fetch all GitHub data
 */
async function fetchGitHubData() {
    const profileContainer = document.getElementById('githubProfile');
    const reposContainer = document.getElementById('githubRepos');

    // Show loading state
    profileContainer.innerHTML = '<div class="github-loading">Loading GitHub profile...</div>';
    reposContainer.innerHTML = '';

    try {
        // Fetch profile and repos in parallel
        const [profile, repos] = await Promise.all([
            fetchGitHubProfile(),
            fetchGitHubRepos()
        ]);

        renderGitHubProfile(profile);
        renderGitHubRepos(repos);
    } catch (error) {
        console.error('GitHub API Error:', error);
        profileContainer.innerHTML = `
            <div class="github-error">
                <p>Unable to load GitHub data.</p>
                <p>Please update the username in github.js or check your connection.</p>
                <a href="https://github.com/${GITHUB_CONFIG.username}" class="btn btn-secondary" target="_blank" rel="noopener">
                    Visit GitHub Profile
                </a>
            </div>
        `;
    }
}

/**
 * Fetch GitHub user profile
 */
async function fetchGitHubProfile() {
    const response = await fetch(`https://api.github.com/users/${GITHUB_CONFIG.username}`);

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    return response.json();
}

/**
 * Fetch GitHub repositories
 */
async function fetchGitHubRepos() {
    const response = await fetch(
        `https://api.github.com/users/${GITHUB_CONFIG.username}/repos?per_page=100&sort=${GITHUB_CONFIG.sortBy}`
    );

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    let repos = await response.json();

    // Filter out forked repos if configured
    if (GITHUB_CONFIG.excludeForked) {
        repos = repos.filter(repo => !repo.fork);
    }

    // Sort by stars if that's the preference
    if (GITHUB_CONFIG.sortBy === 'stars') {
        repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }

    // Return only the number we want to show
    return repos.slice(0, GITHUB_CONFIG.reposToShow);
}

/**
 * Render GitHub profile section
 */
function renderGitHubProfile(profile) {
    const container = document.getElementById('githubProfile');

    container.innerHTML = `
        <img src="${profile.avatar_url}" alt="${profile.name || profile.login}" class="github-avatar" loading="lazy">
        <div class="github-info">
            <h3>${profile.name || profile.login}</h3>
            <p>${profile.bio || 'Software Developer'}</p>
            <div class="github-stats">
                <div class="stat">
                    <span class="stat-value">${profile.public_repos}</span>
                    <span class="stat-label">Repos</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${profile.followers}</span>
                    <span class="stat-label">Followers</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${profile.following}</span>
                    <span class="stat-label">Following</span>
                </div>
            </div>
        </div>
        <a href="${profile.html_url}" class="btn btn-primary" target="_blank" rel="noopener" style="margin-left: auto;">
            View Profile
        </a>
    `;
}

/**
 * Render GitHub repositories
 */
function renderGitHubRepos(repos) {
    const container = document.getElementById('githubRepos');

    if (repos.length === 0) {
        container.innerHTML = '<p class="github-error">No public repositories found.</p>';
        return;
    }

    container.innerHTML = repos.map(repo => `
        <div class="repo-card">
            <a href="${repo.html_url}" target="_blank" rel="noopener">
                <h4 class="repo-name">${repo.name}</h4>
                <p class="repo-description">${repo.description || 'No description available'}</p>
                <div class="repo-meta">
                    ${repo.language ? `
                        <span>
                            <span class="language-dot" style="background-color: ${languageColors[repo.language] || '#858585'}"></span>
                            ${repo.language}
                        </span>
                    ` : ''}
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                </div>
            </a>
        </div>
    `).join('');

    // Add animation to repo cards
    const repoCards = container.querySelectorAll('.repo-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('fade-in', 'visible');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    repoCards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

/**
 * Format numbers (e.g., 1000 -> 1k)
 */
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
}
