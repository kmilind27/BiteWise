# Fix GitHub Permission Error

## Error: Permission denied to kmilind27/BiteWise.git

You're logged in as `cse-kumar-milind` but trying to push to `kmilind27` repo.

## Solution 1: Use GitHub Personal Access Token (Recommended)

### Step 1: Create Personal Access Token
1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `BiteWise Deploy`
4. Select scopes:
   - ✅ `repo` (all)
   - ✅ `workflow`
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you won't see it again!)

### Step 2: Configure Git to Use Token
```bash
cd c:\Users\milin\OneDrive\Desktop\Mini_Projects\BiteWise\bitewise-react

# Set remote URL with token
git remote set-url origin https://YOUR_TOKEN@github.com/kmilind27/BiteWise.git

# Or if no git repo yet, initialize:
git init
git remote add origin https://YOUR_TOKEN@github.com/kmilind27/BiteWise.git
```

Replace `YOUR_TOKEN` with the token you copied.

### Step 3: Deploy Again
```bash
npm run deploy
```

## Solution 2: Use SSH Key (Alternative)

### Step 1: Generate SSH Key
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

### Step 2: Add SSH Key to GitHub
1. Copy the public key:
   ```bash
   type %USERPROFILE%\.ssh\id_ed25519.pub
   ```
2. Go to https://github.com/settings/keys
3. Click **"New SSH key"**
4. Paste the key and save

### Step 3: Change Remote to SSH
```bash
cd c:\Users\milin\OneDrive\Desktop\Mini_Projects\BiteWise\bitewise-react
git remote set-url origin git@github.com:kmilind27/BiteWise.git
```

### Step 4: Deploy
```bash
npm run deploy
```

## Solution 3: Manual Deployment

If the above doesn't work, you can manually deploy:

### Step 1: Build
```bash
npm run build
```

### Step 2: Go to GitHub
1. Go to https://github.com/kmilind27/BiteWise
2. Delete old files (index.html, style.css)
3. Upload everything from `dist/` folder
4. Go to Settings → Pages
5. Select branch: `main` and folder: `/ (root)`

## After Successful Deployment

Your app will be live at:
**https://kmilind27.github.io/BiteWise**

Wait 2-3 minutes for GitHub Pages to build and deploy.

## Verify Deployment

Visit: https://kmilind27.github.io/BiteWise

You should see your new React app with:
- Login/Signup pages
- Dark mode toggle
- Modern UI with purple/cyan colors
