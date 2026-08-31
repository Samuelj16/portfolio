# Samuel Joseph | Developer Portfolio

A responsive, cloud-based portfolio website showcasing programming projects, skills, and experience.

## Live Demo

Intended URL: [https://samuelj16.github.io/portfolio/](https://samuelj16.github.io/portfolio/)

> **Not live yet.** The Pages workflow in `.github/workflows/deploy.yml` has never
> been committed, so no deployment has run and the URL currently returns 404.
> Commit that file and enable Pages (Settings → Pages → Source: GitHub Actions)
> to publish.

## Features

- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Dynamic Project Showcase** - 8 real projects with filtering by category
- **GitHub Integration** - Live display of GitHub repos and profile stats
- **Smooth Animations** - Typing effect, scroll animations, and hover interactions
- **Performance Optimized** - Lazy loading, preconnect hints, optimized assets
- **AWS Ready** - Deployment script for S3 + CloudFront included

## Tech Stack

This site itself is deliberately dependency-free:

- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- GitHub API
- GitHub Pages, or AWS S3 / CloudFront (optional)

The projects it showcases are built with FastAPI, Next.js, React, Express,
PostgreSQL, Redis, Docker and the Claude API — see `js/projects.js`.

## Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # All styles
├── js/
│   ├── main.js         # Navigation, animations
│   ├── projects.js     # Project data & rendering
│   └── github.js       # GitHub API integration
├── assets/
│   └── images/         # Project screenshots
└── deploy/
    └── aws-deploy.sh   # AWS deployment script
```

## Featured Projects

| Project | What it is | Stack |
|---|---|---|
| [Human in the Loop](https://human-in-the-loop-five.vercel.app) | Research agent with a priced approval gate and verified citations | FastAPI, Next.js 16, PostgreSQL, Redis |
| Laetitia Nail Design | Studio site and booking engine with deposit gate and admin panel | FastAPI, SQLAlchemy, Docker |
| StockSage | Stock research tool with an AI assistant that explains terms | React 18, Vite, Express, JWT |
| job-bot | Scores job postings against your resume, tailors applications | Python, Claude API, Playwright |
| [Wedding Invitation](https://samuelandwildineinvatation.netlify.app/) | Self-contained invite tuned for iMessage link previews | HTML, CSS, JS, Open Graph |
| [Wedding Website](https://samuelandwildinewedding.netlify.app) | Nine pages driven by a single config file | HTML, CSS, JS |
| 2027 Budget Board | Interactive budget board, every figure editable and live | HTML, CSS, JS |
| [Serverless Employees API](https://github.com/Samuelj16/lambda-mongodb) | Minimal REST API on Lambda behind API Gateway | AWS Lambda, MongoDB, Python |

## Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Samuelj16/portfolio.git
   ```

2. Open in browser:
   ```bash
   cd portfolio
   open index.html
   ```

## Customization

### Update Personal Info
Edit `index.html` to change:
- Name and bio
- Contact information
- Skills section

### Add Your Projects
Edit `js/projects.js` to add your own projects:
```javascript
{
    title: "Project Name",
    description: "Short description",
    tech: ["React", "Node.js"],
    category: "fullstack", // ai, fullstack, frontend, cloud
    demo: "https://demo-url.com",
    github: "https://github.com/username/repo"
}
```

### Change GitHub Username
Edit `js/github.js`:
```javascript
const GITHUB_CONFIG = {
    username: 'your-username',
    reposToShow: 6
};
```

## Deployment

### GitHub Pages (Free)
1. Go to repo Settings → Pages
2. Source: Deploy from branch
3. Branch: main, folder: / (root)
4. Save

### AWS S3 + CloudFront
1. Install AWS CLI and configure credentials
2. Update bucket name in `deploy/aws-deploy.sh`
3. Run:
   ```bash
   cd deploy && ./aws-deploy.sh
   ```

## Performance

No build step, no framework and no third-party scripts, so the whole site is a
handful of static files. Lazy-loaded images and preconnect hints are in place.
(The numbers previously quoted here were never measured, so they have been
removed — run Lighthouse yourself once the site is deployed.)

## License

MIT License - feel free to use this template for your own portfolio.

## Contact

- Email: donsamuel6@gmail.com
- GitHub: [@Samuelj16](https://github.com/Samuelj16)
- LinkedIn: [samuel-joseph](https://www.linkedin.com/in/samuel-joseph-1248911a9/)
