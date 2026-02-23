# 🚂 Railway Deployment Guide

## Quick Deploy (3 Methods)

### Method 1: Railway Dashboard (Easiest) ⭐

1. Go to https://railway.app/new
2. Click **"Deploy from GitHub repo"**
3. Select: `mochadwi/ai-business-survey`
4. Click **Deploy**
5. Railway auto-detects Vite + React and builds automatically

### Method 2: Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
cd ai-business-survey
railway link

# Deploy (Singapore region)
railway up --region asia-southeast1

# Open in browser
railway open
```

### Method 3: GitHub Integration (Auto-deploy)

1. Go to https://railway.app/dashboard
2. Click **New Project** → **Deploy from GitHub repo**
3. Select your repo
4. Railway auto-deploys on every push to `main`

---

## ⚙️ Environment Variables Setup

After deployment, add these in Railway Dashboard:

1. Go to your project → **Variables** tab
2. Click **New Variable** for each:

```
VITE_AIRTABLE_API_KEY     = your_airtable_token
VITE_AIRTABLE_BASE_ID     = your_base_id
VITE_AIRTABLE_TABLE_NAME  = Survey Responses
VITE_RESEND_API_KEY       = your_resend_api_key
VITE_FROM_EMAIL           = noreply@yourdomain.com
```

Railway automatically redeploys when variables change.

---

## 🔄 Railway Configuration Explained

### `railway.json`
```json
{
  "build": {
    "builder": "NIXPACKS",      // Auto-detects Node.js
    "buildCommand": "npm run build"  // Creates dist/
  },
  "deploy": {
    "region": "asia-southeast1",  // Singapore region
    "startCommand": "npx serve -s dist -l $PORT",
    "healthcheckPath": "/"       // Health check endpoint
  }
}
```

### `nixpacks.toml`
```toml
[phases.build]
cmds = ["npm run build"]

[start]
cmd = "npx serve -s dist -l ${PORT:-3000}"
```

**Why `serve`?**
- Static file server for built React app
- Railway provides `$PORT` env var dynamically
- Lightweight, production-ready

---

## 📊 Railway vs Vercel Comparison

| Feature | Railway | Vercel |
|---------|---------|--------|
| **Free Tier** | $5 credit/month (~500 hours) | Unlimited bandwidth |
| **Deploy** | GitHub auto-deploy | GitHub auto-deploy |
| **Custom Domain** | ✅ Free | ✅ Free |
| **Environment Vars** | ✅ Easy | ✅ Easy |
| **Logs** | ✅ Real-time | ✅ Real-time |
| **Team** | ✅ Up to 3 members | ✅ Free tier |
| **Database** | ✅ Built-in Postgres/MySQL | ❌ Separate service |
| **Best For** | Full-stack apps | Static sites/Next.js |

**For this project**: Both work great! Railway gives you more flexibility for future backend additions.

---

## 🚀 Deploy Now (Step-by-Step)

### Step 1: Push Code (Already Done ✅)
```bash
git push origin main
```

### Step 2: Create Railway Project

**Via Dashboard:**
1. https://railway.app/new
2. Select **"Deploy from GitHub repo"**
3. Authorize GitHub if needed
4. Select `mochadwi/ai-business-survey`
5. Click **Deploy**

**Wait ~2 minutes for build to complete.**

### Step 3: Add Environment Variables

1. Click on your deployed service
2. Go to **Variables** tab
3. Add each variable (see above)
4. Railway redeploys automatically

### Step 4: Get Domain

1. Go to **Settings** tab
2. Click **Generate Domain**
3. Or add custom domain
4. **Done!** 🎉

---

## 🛠️ Troubleshooting

### Build Fails
```bash
# Check logs in Railway Dashboard → Deployments → Logs
# Common issues:

# 1. Node version
# Railway uses Node 20 by default (good!)

# 2. Missing dependencies
rm -rf node_modules package-lock.json
npm install

# 3. TypeScript errors
npm run build  # Test locally first
```

### 404 Errors After Deploy
- Check `railway.json` startCommand uses correct path
- Ensure `dist` folder exists in build
- Verify `vite.config.ts` base path is `/` (not `/repo-name/`)

### Environment Variables Not Working
- Must prefix with `VITE_` for Vite
- Redeploy after adding variables
- Check spelling carefully

### App Shows Blank Page
```bash
# Check browser console for errors
# Usually: Environment variables not set
# Or: API calls failing (check network tab)
```

---

## 📈 Monitoring & Logs

### View Logs
```bash
# CLI
railway logs

# Dashboard
# Deployments → Click deployment → Logs tab
```

### Health Checks
Railway pings `/` every few seconds. If it fails 3 times, container restarts.

### Metrics
Dashboard shows:
- CPU usage
- Memory usage
- Network requests
- Build times

---

## 🔒 Security Best Practices

1. **Never commit `.env`** (already in `.gitignore` ✅)
2. **Use Railway variables**, not hardcoded values
3. **Rotate API keys** periodically
4. **Enable 2FA** on Railway account

---

## 💰 Railway Pricing

| Plan | Cost | Includes |
|------|------|----------|
| **Hobby** | $5/month | 500 hours, 1GB RAM, 1 CPU |
| **Pro** | $10/month | Unlimited, 2GB RAM, 2 CPUs |
| **Business** | Custom | Enterprise features |

**Free equivalent**: $5 credit/month on signup (no credit card required!)

---

## 🎯 Next Steps After Deploy

1. ✅ **Test the survey** - Fill out and submit
2. ✅ **Check Airtable** - Verify data appears
3. ✅ **Check email** - Verify follow-up email sends
4. ✅ **Add custom domain** (optional)
5. ✅ **Set up monitoring** (Railway alerts)

---

## 🔗 Useful Links

- Railway Dashboard: https://railway.app/dashboard
- Project Settings: https://railway.app/project/[ID]/settings
- Variables: https://railway.app/project/[ID]/variables
- Logs: https://railway.app/project/[ID]/logs
- Docs: https://docs.railway.app

---

## 🆘 Need Help?

**Railway Community:**
- Discord: https://discord.gg/railway
- GitHub: https://github.com/railwayapp
- Twitter: @Railway

**Common Commands:**
```bash
railway status      # Check deployment status
railway logs        # View real-time logs
railway variables   # List environment variables
railway open        # Open deployed URL
railway down        # Stop deployment
```

---

## 🎉 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Build successful (green checkmark)
- [ ] Environment variables added
- [ ] Domain generated/custom domain added
- [ ] Survey submission tested
- [ ] Airtable receiving data
- [ ] Email sending working
- [ ] Success page showing lead score

**Your AI Business Survey will be live at:**
```
https://ai-business-survey.up.railway.app
```

Or your custom domain!