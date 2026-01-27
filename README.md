# Samuel Joseph | Developer Portfolio

A responsive, cloud-based portfolio website showcasing programming projects, skills, and experience.

## Live Demo

Visit: [https://samuelj16.github.io/portfolio/](https://samuelj16.github.io/portfolio/)

## Features

- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Dynamic Project Showcase** - 12+ projects with filtering by category
- **GitHub Integration** - Live display of GitHub repos and profile stats
- **Smooth Animations** - Typing effect, scroll animations, and hover interactions
- **Performance Optimized** - Lazy loading, preconnect hints, optimized assets
- **AWS Ready** - Deployment script for S3 + CloudFront included

## Tech Stack

- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- GitHub API
- AWS S3 / CloudFront (optional)

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
    category: "fullstack", // frontend, fullstack, api, cloud
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

- Lighthouse Score: 95+
- First Contentful Paint: < 1.5s
- Fully loaded: < 3s

## License

MIT License - feel free to use this template for your own portfolio.

## Contact

- Email: donsamuel6@gmail.com
- GitHub: [@Samuelj16](https://github.com/Samuelj16)
- LinkedIn: [samuel-joseph](https://www.linkedin.com/in/samuel-joseph-1248911a9/)
