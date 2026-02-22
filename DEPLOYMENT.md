# AI Business Survey - Deployment Guide

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Edit .env.local with your API keys

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 1. Airtable Setup

### Create Your Airtable Base

1. Go to [Airtable](https://airtable.com) and create a new base
2. Create a table named `Survey Responses` (or your preferred name)
3. Add the following fields (column names must match exactly):

| Field Name | Type | Description |
|------------|------|-------------|
| Email | Single line text | Contact email |
| WhatsApp | Single line text | WhatsApp number |
| CompanySize | Single line text | Q1: Company size |
| Position | Single line text | Q2: Job position |
| Industry | Single line text | Q3: Industry sector |
| AIAdoption | Single line text | Q4: AI adoption level |
| Challenges | Long text | Q5: Main challenges (comma-separated) |
| Priority | Single line text | Q6: Business priority |
| Workflows | Long text | Q7: Time-consuming workflows |
| TimeWasted | Single line text | Q8: Hours wasted per week |
| Budget | Single line text | Q9: Budget range |
| DecisionMaker | Single line text | Q10: Decision process |
| Deliverables | Long text | Q11: Desired deliverables |
| EngagementModel | Single line text | Q12: Preferred engagement |
| Benefit | Single line text | Q14: Requested benefit |
| LeadScore | Number | Calculated lead score (0-140) |
| LeadCategory | Single line text | hot/warm/qualified/nurture |
| SubmittedAt | Date | ISO timestamp |
| Source | Single line text | Form source identifier |

### Get Airtable API Credentials

1. Go to [Airtable Developer Hub](https://airtable.com/create/tokens)
2. Create a new personal access token with these scopes:
   - `data.records:read`
   - `data.records:write`
   - `schema.bases:read`
3. Copy your API key
4. Find your Base ID in your Airtable URL:
   - Format: `https://airtable.com/appXXXXXXXXXXXXXX/...`
   - The `appXXXXXXXXXXXXXX` part is your Base ID

---

## 2. Resend.com Email Setup

### Configure Resend

1. Sign up at [Resend.com](https://resend.com)
2. Verify your domain (e.g., `aibusiness.id`)
3. Go to API Keys → Create API Key
4. Copy your API key

### Email Templates

The application includes 4 email sequences based on lead category:

| Category | Score | Email Focus |
|----------|-------|-------------|
| Hot Lead | 90-100 | Immediate booking link, case studies |
| Warm Lead | 70-89 | Educational content + soft pitch |
| Qualified | 50-69 | Standard nurture sequence |
| Nurture | <50 | Value-first content, no sales pitch |

---

## 3. Environment Variables

Create a `.env.local` file (or set in Vercel dashboard):

```env
# Airtable
VITE_AIRTABLE_API_KEY=patXXXXXXXX.XXXXXXXX
VITE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
VITE_AIRTABLE_TABLE_NAME=Survey Responses

# Resend Email
VITE_RESEND_API_KEY=re_xxxxxxxx
VITE_FROM_EMAIL=hello@aibusiness.id
VITE_FROM_NAME=AI Business Team
```

---

## 4. Vercel Deployment

### Option A: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option B: Vercel Dashboard

1. Push code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Set environment variables in Project Settings
4. Deploy

### Environment Variables in Vercel

In Vercel Dashboard → Project Settings → Environment Variables:

```
VITE_AIRTABLE_API_KEY = patXXXXXXXX.XXXXXXXX
VITE_AIRTABLE_BASE_ID = appXXXXXXXXXXXXXX
VITE_AIRTABLE_TABLE_NAME = Survey Responses
VITE_RESEND_API_KEY = re_xxxxxxxx
VITE_FROM_EMAIL = hello@aibusiness.id
VITE_FROM_NAME = AI Business Team
```

---

## 5. Lead Scoring Formula

### Scoring Breakdown (Max: 140 points)

| Question | Field | Values | Max Points |
|----------|-------|--------|------------|
| Q1 | Company Size | startup=5, smb=10, mid=15, enterprise=20 | 20 |
| Q4 | AI Adoption | exploration=5, sporadic=10, partial=15, operational=20, strategic=25 | 25 |
| Q6 | Priority | efficiency=10, revenue=15, both=25, unclear=5 | 25 |
| Q8 | Time Wasted | low=5, medium=10, high=15, critical=20 | 20 |
| Q9 | Budget | none=0, pilot=5, small=10, serious=20, transformation=30 | 30 |
| Q10 | Decision Authority | self=20, recommend=15, committee=10, finance=10, education=5 | 20 |

### Lead Categories

| Category | Score Range | Action |
|----------|-------------|--------|
| Hot Lead | 90-100 | Immediate follow-up (within 24h) |
| Warm Lead | 70-89 | Priority nurture (within 48h) |
| Qualified | 50-69 | Standard nurture sequence |
| Nurture | <50 | Long-term education, no pitch |

---

## 6. Testing

### Test Airtable Connection

Check browser console on the success page - submission results are logged.

### Test Email

Use the test function in browser console:

```javascript
import { testEmailConfiguration } from './lib/email';
testEmailConfiguration('your@email.com');
```

---

## 7. File Structure

```
src/
├── components/
│   ├── LandingPage.tsx      # Landing page
│   ├── ProgressBar.tsx      # Progress indicator
│   ├── QuestionCard.tsx     # Question display
│   └── SuccessPage.tsx      # Results with lead score
├── data/
│   └── questions.ts         # Survey questions
├── hooks/
│   └── useSurveySubmit.ts   # Submission logic hook
├── lib/
│   ├── airtable.ts          # Airtable API client
│   ├── email.ts             # Resend email service
│   └── leadScoring.ts       # Lead scoring calculation
├── types/
│   └── survey.ts            # TypeScript types
├── App.tsx                  # Main app component
└── main.tsx                 # Entry point
```

---

## Troubleshooting

### Airtable submission fails

1. Check API key permissions
2. Verify Base ID and Table Name
3. Ensure all field names match exactly
4. Check browser console for error details

### Email not sending

1. Verify Resend API key
2. Check domain verification status in Resend
3. Check spam folders
4. Review Resend dashboard for delivery status

### Build fails

```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## Support

For questions or issues:
- Email: hello@aibusiness.id
- WhatsApp: +62 8xx-xxxx-xxxx
