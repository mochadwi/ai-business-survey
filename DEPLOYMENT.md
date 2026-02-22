# 🚀 Deployment Guide - AI Business Survey

## Quick Start

### 1. Deploy to Vercel (Recommended - Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd ai-business-survey
vercel

# Follow prompts:
# - Set up and deploy? [Y/n] → Y
# - Which scope? → Select your account
# - Link to existing project? → N (create new)
# - What's your project name? → ai-business-survey
```

**Or use Vercel Dashboard:**
1. Go to https://vercel.com/new
2. Import your GitHub repo: `mochadwi/ai-business-survey`
3. Framework Preset: Vite
4. Click Deploy

---

## 2. Set Up Airtable (Free Tier: 1,200 records/base)

### Create Base
1. Go to https://airtable.com
2. Create new base → "AI Survey Responses"
3. Rename table to "Survey Responses"

### Add Fields (Column Headers):
```
Email                  (Email)
WhatsApp               (Single line text)
CompanySize            (Single select)
Position               (Single select)
Industry               (Single select)
AIAdoption             (Single select)
Challenges             (Long text)
Priority               (Single select)
Workflows              (Long text)
TimeWasted             (Single select)
Budget                 (Single select)
DecisionMaker          (Single select)
Deliverables           (Long text)
EngagementModel        (Single select)
Benefit                (Single select)
LeadScore              (Number)
LeadCategory           (Single select)
SubmittedAt            (Date)
Source                 (Single line text)
```

### Get API Credentials:
1. Go to https://airtable.com/create/tokens
2. Create token with `data.records:write` scope
3. Copy your **Base ID** from the URL or API docs

---

## 3. Set Up Resend.com (Free: 100 emails/day)

1. Sign up: https://resend.com
2. Verify your domain (or use `onboarding@resend.dev` for testing)
3. Get API key from: https://resend.com/api-keys
4. Add domain to verified senders

---

## 4. Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add these variables:

```
VITE_AIRTABLE_API_KEY   = your_airtable_token
VITE_AIRTABLE_BASE_ID   = your_base_id
VITE_AIRTABLE_TABLE_NAME= Survey Responses
VITE_RESEND_API_KEY     = your_resend_api_key
VITE_FROM_EMAIL         = noreply@yourdomain.com
```

**Or via CLI:**
```bash
vercel env add VITE_AIRTABLE_API_KEY
vercel env add VITE_AIRTABLE_BASE_ID
vercel env add VITE_AIRTABLE_TABLE_NAME
vercel env add VITE_RESEND_API_KEY
vercel env add VITE_FROM_EMAIL
```

Then redeploy:
```bash
vercel --prod
```

---

## 5. Lead Scoring System

### Scoring Formula (Max: 140 points)

| Factor | Criteria | Points |
|--------|----------|--------|
| **Company Size** | Startup (<10) | 5 |
| | SMB (10-50) | 10 |
| | Mid (50-200) | 15 |
| | Enterprise (>200) | 20 |
| **AI Adoption** | Exploration | 5 |
| | Sporadic | 10 |
| | Partial | 15 |
| | Operational | 20 |
| | Strategic | 25 |
| **Priority** | Efficiency | 10 |
| | Revenue | 15 |
| | Both | 25 |
| | Unclear | 5 |
| **Budget** | None | 0 |
| | Pilot (<10jt) | 5 |
| | Small (10-30jt) | 10 |
| | Serious (30-100jt) | 20 |
| | Transformation (>100jt) | 30 |
| **Decision Authority** | Self (CEO/Founder) | 20 |
| | Recommend | 15 |
| | Committee | 10 |
| | Finance | 10 |
| | Education | 5 |
| **Time Savings** | Low (<10 hrs/week) | 5 |
| | Medium (10-30) | 10 |
| | High (30-60) | 15 |
| | Critical (>60) | 20 |

### Lead Categories

| Score Range | Category | Action |
|-------------|----------|--------|
| 90-100 | 🔥 Hot Lead | Immediate follow-up (24h) |
| 70-89 | ⭐ Warm Lead | Priority nurture (48h) |
| 50-69 | ✅ Qualified | Standard nurture |
| <50 | 🌱 Nurture | Long-term education |

---

## 6. Email Sequences

### Hot Leads (90-100)
- Immediate booking link
- Case studies
- Direct consultation offer

### Warm Leads (70-89)
- Educational content
- Soft pitch
- ROI calculator

### Qualified (50-69)
- AI Playbook
- Webinar invitation
- Industry-specific content

### Nurture (<50)
- AI 101 guide
- Free workshop
- Newsletter signup

---

## 7. Testing

### Test Airtable Connection
Add this to browser console after deployment:
```javascript
import { testAirtableConnection } from './src/lib/airtable';
testAirtableConnection().then(console.log);
```

### Test Email
```javascript
import { testEmailConfiguration } from './src/lib/email';
testEmailConfiguration('your@email.com').then(console.log);
```

---

## 8. Local Development

```bash
# Clone repo
git clone https://github.com/mochadwi/ai-business-survey.git
cd ai-business-survey

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# Edit .env with your credentials

# Run dev server
npm run dev

# Build for production
npm run build
```

---

## Troubleshooting

### Build Fails
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Airtable 401 Error
- Check API token has `data.records:write` scope
- Verify Base ID is correct
- Ensure table name matches exactly

### Email Not Sending
- Verify Resend API key
- Check sender email is verified
- Check spam folders

### Environment Variables Not Working
- Must prefix with `VITE_` for Vite
- Redeploy after adding variables
- Check Vercel dashboard for correct values

---

## Cost Estimate

| Service | Free Tier | Paid (if needed) |
|---------|-----------|------------------|
| Vercel | Unlimited bandwidth | Pro: $20/mo |
| Airtable | 1,200 records/base | Plus: $12/mo |
| Resend | 100 emails/day | $1/1,000 emails |

**Total: FREE for up to ~1,000 responses/month**

---

## Next Steps After Deployment

1. ✅ Set up custom domain (optional)
2. ✅ Add Google Analytics (optional)
3. ✅ Connect Zapier for additional automations
4. ✅ Set up Slack notifications for Hot Leads
5. ✅ Create CRM integration (HubSpot/Salesforce)

---

**Need help?** Open an issue on GitHub or contact support.