# GitHub Pages Deployment Guide

## Steps to Enable GitHub Pages:

1. **Go to your GitHub repository**: https://github.com/Declareola/olak-interactive-portfolio

2. **Navigate to Settings**:
   - Click on the "Settings" tab in your repository

3. **Go to Pages section**:
   - In the left sidebar, click on "Pages"
   - Under "Build and deployment", select "Deploy from a branch"
   - Choose "gh-pages" as the branch
   - Select the root folder (/) 
   - Click "Save"

4. **Wait for deployment**:
   - GitHub will automatically build and deploy your site
   - It may take a few minutes for the site to become available
   - You can check the deployment status in the "Actions" tab

5. **Access your site**:
   - Once deployed, your site will be available at:
   - https://Declareola.github.io/olak-interactive-portfolio/

## Environment Variables (Important):

Your app requires a GEMINI_API_KEY environment variable for the AI chatbot to work. Since GitHub Pages doesn't support server-side environment variables for static sites, you have a few options:

### Option 1: Use Vite Environment Variables (Recommended)
1. Create a `.env.production` file in your project root:
```
GEMINI_API_KEY=your_actual_api_key_here
```

2. Rebuild and redeploy:
```bash
npm run build
npm run deploy
```

### Option 2: Client-side Configuration
Modify your code to accept API keys through other means (URL parameters, localStorage, etc.)

## Troubleshooting:

- If you see a 404 error, wait a few minutes and refresh
- Check the GitHub Actions tab for any build/deployment errors
- Verify that the gh-pages branch contains the dist folder contents

## Future Updates:

To update your deployed site after making changes:
1. Make your code changes
2. Run: `npm run build`
3. Run: `npm run deploy`
4. Wait for GitHub Pages to update (usually within 1-2 minutes)

## Notes:

- The app uses CDN links for React and other dependencies, so no local bundling is needed
- All styling is included in the index.html file
- The base path is configured for GitHub Pages deployment
