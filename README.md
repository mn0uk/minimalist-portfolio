# Minimalist Personal Projects Website

A clean, anonymous personal website that automatically showcases your GitHub projects with live demos and detailed project stories.

## Features

- **Automatic GitHub Integration** - Pulls project data directly from your GitHub repositories
- **Minimalist Design** - Clean typography, ample white space, and subtle interactions
- **Project Stories** - Converts README files to rich project detail pages
- **Live Demo Links** - Supports both GitHub Pages and custom live URLs
- **Static Site Generation** - Fast loading with ISR (Incremental Static Regeneration)
- **Mobile Responsive** - Mobile-first design that works on all devices
- **Anonymous** - No user data collection or tracking
- **SEO Optimized** - Proper meta tags and structured data

## Quick Start

1. **Clone and Install**
   ```bash
   git clone <your-repo>
   cd portfolio
   npm install
   ```

2. **Configure GitHub Username**
   ```bash
   cp .env.example .env.local
   # Edit .env.local and add your GitHub username
   GITHUB_USERNAME=your-github-username
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## Configuration

### Environment Variables

Create a `.env.local` file with:

```env
# Required: Your GitHub username
GITHUB_USERNAME=your-github-username

# Optional: GitHub Personal Access Token (increases API rate limits)
GITHUB_TOKEN=ghp_your_token_here
```

### Project Configuration

The website automatically scans your GitHub repositories and:

- Filters out forks and private repositories
- Sorts by stars and recent activity
- Displays up to 10 projects on the main page
- Uses repository topics as tags
- Converts README files to project detail pages

### README Frontmatter

Enhance your project pages by adding frontmatter to your repository README files:

```markdown
---
title: "Custom Project Title"
description: "A brief description that overrides the GitHub description"
live_url: "https://your-live-demo.com"
---

# Your Project

Regular markdown content follows...
```

## Project Structure

```
portfolio/
├── pages/
│   ├── index.js          # Main landing page with project grid
│   ├── posts/[slug].js   # Dynamic project detail pages
│   └── _app.js           # Next.js app component
├── lib/
│   └── github.js         # GitHub API integration functions
├── styles/
│   └── globals.css       # Minimalist styling
├── next.config.js        # Next.js configuration
└── README.md            # This file
```

## Customization

### Styling

Edit `styles/globals.css` to customize:
- Colors and typography
- Layout and spacing
- Hover effects and transitions
- Mobile responsiveness

### GitHub Integration

Modify `lib/github.js` to:
- Change repository filtering logic
- Adjust project sorting criteria
- Add custom data processing
- Integrate additional GitHub API endpoints

### Page Layout

Update `pages/index.js` and `pages/posts/[slug].js` to:
- Modify page structure
- Add new sections or components
- Change SEO meta tags
- Customize project display format

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Other Platforms

The site works on any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Performance

- **Static Generation**: Pages are pre-built at build time
- **ISR**: Content updates automatically every hour
- **Optimized Images**: Next.js automatic image optimization
- **Minimal Bundle**: Only essential dependencies included

## API Rate Limits

- **Without Token**: 60 requests/hour per IP
- **With Token**: 5,000 requests/hour
- **Caching**: Built-in ISR reduces API calls

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this for your own portfolio!

## Troubleshooting

### No Projects Showing

1. Check your `GITHUB_USERNAME` environment variable
2. Ensure you have public repositories
3. Verify repositories aren't all forks
4. Check browser console for API errors

### API Rate Limit Exceeded

1. Add a `GITHUB_TOKEN` environment variable
2. Wait for rate limit reset (1 hour)
3. Reduce revalidation frequency in pages

### Build Errors

1. Run `npm run build` locally to debug
2. Check all environment variables are set
3. Verify GitHub username exists and has public repos
4. Review Next.js build logs for specific errors

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: CSS Modules + Custom CSS
- **Markdown**: Marked + Gray-matter
- **Deployment**: Vercel-optimized
- **APIs**: GitHub REST API v3

Built with ❤️ for developers who want to showcase their work simply and beautifully.
