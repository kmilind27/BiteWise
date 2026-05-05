# Deploy React App to GitHub Pages

## Step 1: Install gh-pages package

```bash
cd c:\Users\milin\OneDrive\Desktop\Mini_Projects\BiteWise\bitewise-react
npm install --save-dev gh-pages
```

## Step 2: Update package.json

Add these lines to `package.json`:

```json
{
  "name": "bitewise-react",
  "homepage": "https://kmilind27.github.io/BiteWise",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

## Step 3: Update vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/BiteWise/'
})
```

## Step 4: Delete Old Files from GitHub Repo

### Option A: Via GitHub Website
1. Go to https://github.com/kmilind27/BiteWise
2. Delete these files:
   - `index.html` (old one)
   - `style.css` (old one)
   - Any other old files
3. Keep only:
   - `server.js`
   - `package.json`
   - `vercel.json`
   - `.env`
   - `.gitignore`

### Option B: Via Git Commands
```bash
cd c:\Users\milin\OneDrive\Desktop\Mini_Projects\BiteWise

# Remove old files
git rm index.html style.css
git commit -m "Remove old vanilla JS files"
git push origin main
```

## Step 5: Deploy React App

```bash
cd bitewise-react
npm run deploy
```

This will:
1. Build the React app
2. Create a `gh-pages` branch
3. Push the build to GitHub Pages
4. Your app will be live at: https://kmilind27.github.io/BiteWise

## Step 6: Configure GitHub Pages

1. Go to https://github.com/kmilind27/BiteWise/settings/pages
2. Under "Source", select: **Deploy from a branch**
3. Under "Branch", select: **gh-pages** and **/ (root)**
4. Click Save

## Step 7: Wait & Test

- Wait 2-3 minutes for deployment
- Visit: https://kmilind27.github.io/BiteWise
- Should see your new React app!

## Troubleshooting

### If you see a blank page:
- Check browser console for errors
- Make sure `base: '/BiteWise/'` is in vite.config.js
- Make sure `homepage` is in package.json

### If routing doesn't work:
- GitHub Pages doesn't support client-side routing by default
- Add a `404.html` that redirects to `index.html`

## Future Updates

To update the deployed app:
```bash
cd bitewise-react
npm run deploy
```

That's it! The new React app will replace the old one.
