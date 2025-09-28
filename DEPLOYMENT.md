# Vercel Deployment Guide for EcoSangam Blockchain Platform

## Prerequisites
- Vercel account (https://vercel.com)
- GitHub repository pushed with latest changes
- Google Maps API key

## Step-by-Step Deployment

### 1. Connect GitHub Repository
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository: `ocean-vestige-chain`
4. Select the repository and click "Import"

### 2. Configure Environment Variables
In Vercel project settings, add these environment variables:

```bash
VITE_GOOGLE_MAPS_API_KEY=AIzaSyD1tiPgF16r3Kl7g2zjxadiJvq2vs0PRD4
```

**⚠️ Important**: 
- Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- Add `VITE_GOOGLE_MAPS_API_KEY` with your API key value
- Make sure to add it for all environments (Production, Preview, Development)

### 3. Build Settings (Usually Auto-detected)
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Deploy
1. Click "Deploy" in Vercel
2. Wait for build to complete
3. Your blockchain platform will be available at: `https://your-project-name.vercel.app`

## Common Deployment Issues & Solutions

### Issue 1: "Page Not Found" on Direct Routes
✅ **Fixed**: Added `vercel.json` with SPA rewrites

### Issue 2: Environment Variables Not Working
✅ **Solution**: Add environment variables in Vercel Dashboard, not just in `.env.local`

### Issue 3: Build Timeout
✅ **Fixed**: Optimized bundle size with code splitting in `vite.config.ts`

### Issue 4: Google Maps Not Loading
- Check if API key is set in Vercel environment variables
- Verify API key has Maps JavaScript API enabled
- Check domain restrictions in Google Cloud Console

## Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] Google Maps API key working
- [ ] All routes accessible (no 404s)
- [ ] Blockchain functionality working
- [ ] Mobile responsiveness verified
- [ ] Performance optimized

## Alternative Deployment Options

### Netlify
```bash
# Build settings
Build command: npm run build
Publish directory: dist

# Environment variables
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

### GitHub Pages
```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"deploy": "gh-pages -d dist"

# Deploy
npm run build && npm run deploy
```

## Custom Domain Setup

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown by Vercel
4. Update Google Maps API key restrictions if needed

---

🚀 **Your blockchain-powered blue carbon MRV platform is now live!**