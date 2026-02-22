# 🚀 Quick Railway Deployment (CLI Method)

Since Railway CLI requires interactive login, here are the fastest deployment options:

## Option 1: One-Liner Deploy (Recommended)

```bash
cd ~/workspaces/github.com/mochadwi/ai-business-survey && npx @railway/cli login && npx @railway/cli up
```

This will:
1. Open browser for login
2. Deploy immediately after login

---

## Option 2: Using the Deploy Script

```bash
# Make executable and run
cd ~/workspaces/github.com/mochadwi/ai-business-survey
chmod +x deploy-railway.sh
./deploy-railway.sh
```

---

## Option 3: Step-by-Step Manual

```bash
# Step 1: Install Railway CLI (if not already)
npm install -g @railway/cli

# Step 2: Login (opens browser)
railway login

# Step 3: Link project (creates .railway/config.json)
cd ~/workspaces/github.com/mochadwi/ai-business-survey
railway link

# Step 4: Deploy
railway up

# Step 5: Set environment variables
railway variables set VITE_AIRTABLE_API_KEY="your_token"
railway variables set VITE_AIRTABLE_BASE_ID="your_base_id"
railway variables set VITE_AIRTABLE_TABLE_NAME="Survey Responses"
railway variables set VITE_RESEND_API_KEY="your_resend_key"
railway variables set VITE_FROM_EMAIL="noreply@yourdomain.com"

# Step 6: Redeploy with new variables
railway up

# Step 7: Open in browser
railway open
```

---

## Option 4: Non-Interactive Dashboard Deploy

If CLI doesn't work, use the dashboard (no install needed):

```bash
# Just push code first
git push origin main

# Then open:
open https://railway.app/new
```

1. Click "Deploy from GitHub repo"
2. Select `mochadwi/ai-business-survey`
3. Click Deploy

---

## After Deploy: Quick Commands

```bash
# View status
railway status

# View logs
railway logs

# Open browser
railway open

# List variables
railway variables

# Add variable
railway variables set KEY="value"

# Redeploy
railway up
```

---

## Expected Output After Deploy

```
🚂 AI Business Survey
====================
✅ Build successful
✅ Deployed to: https://ai-business-survey.up.railway.app
✅ Health check passed

Environment: production
Region: us-west1
Deployment ID: xxx
```

---

## Troubleshooting

### "Already exists" Error
```bash
# If project exists, just link and up
railway link
railway up
```

### Build Fails
```bash
# Test build locally first
npm run build

# Then deploy
railway up
```

### Variables Not Working
```bash
# Check variables
railway variables

# Redeploy after setting
railway up
```

---

## 🎯 Complete Deploy in One Go

Copy and paste this entire block:

```bash
cd ~/workspaces/github.com/mochadwi/ai-business-survey

# Login (one-time)
npx @railway/cli login

# Create and link project
npx @railway/cli init

# Deploy
npx @railway/cli up

# Set variables (replace with your actual values)
npx @railway/cli variables set VITE_AIRTABLE_API_KEY=""
npx @railway/cli variables set VITE_AIRTABLE_BASE_ID=""
npx @railway/cli variables set VITE_AIRTABLE_TABLE_NAME="Survey Responses"
npx @railway/cli variables set VITE_RESEND_API_KEY=""
npx @railway/cli variables set VITE_FROM_EMAIL="noreply@yourdomain.com"

# Redeploy with variables
npx @railway/cli up

# Open site
npx @railway/cli open
```

---

**Ready to deploy!** Just copy the one-liner from Option 1 or the complete block above.