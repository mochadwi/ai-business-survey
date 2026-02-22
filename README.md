# AI Business Assessment Survey

A professional B2B survey application for Indonesian businesses to assess their AI readiness and potential.

## 🎯 Purpose

This survey helps businesses identify:
- Potential efficiency gains through AI automation
- Revenue growth opportunities using AI
- Current AI adoption maturity
- Suitable AI implementation roadmap

## 🏗️ Tech Stack

- **Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Deployment:** GitHub Pages

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

## 📋 Survey Structure

### Section 1: Profil Perusahaan
- Company size
- Position/role
- Industry sector

### Section 2: Kondisi Saat Ini
- AI adoption level
- Implementation challenges

### Section 3: Pain Point & Prioritas
- Priority (Efficiency vs Revenue)
- Time-consuming workflows
- Hours wasted on repetitive tasks

### Section 4: Anggaran & Decision Making
- Budget range
- Decision-making process

### Section 5: Kebutuhan Solusi
- Desired deliverables
- Preferred engagement model

### Section 6: Kontak & Benefit
- Email & WhatsApp
- Preferred next step

## 🎨 Customization

### Changing Questions
Edit `src/data/questions.ts` to modify survey questions.

### Changing Styling
Modify `tailwind.config.js` and `src/index.css` for theme changes.

### Adding Backend Integration
The survey currently logs to console. To add real backend:
1. Modify `handleNext()` in `App.tsx`
2. Add API call before `setCompleted(true)`

## 📦 Deployment

### GitHub Pages (Automatic)
Push to `main` branch triggers automatic deployment via GitHub Actions.

### Manual Deployment
```bash
npm run deploy
```

## 📄 License

MIT

## 🤝 Support

For questions or support, contact: hello@aibusiness.id