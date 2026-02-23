#!/bin/bash
# Railway CLI Deployment Script
# Run this script to deploy to Railway

echo "🚂 AI Business Survey - Railway Deployment"
echo "=========================================="
echo ""

# Check if railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Check login status
if ! railway whoami &> /dev/null; then
    echo "🔐 Please login to Railway first:"
    echo "   railway login"
    echo ""
    echo "Then run this script again."
    exit 1
fi

echo "✅ Logged in as: $(railway whoami)"
echo ""

# Link or create project
if [ ! -f .railway/config.json ]; then
    echo "🔗 Linking to Railway project..."
    railway link
else
    echo "✅ Project already linked"
fi

echo ""
echo "🚀 Deploying to Railway (Singapore region)..."
railway up --region asia-southeast1

echo ""
echo "📊 Deployment Status:"
railway status

echo ""
echo "🌐 Open in browser:"
railway open

echo ""
echo "✨ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Add environment variables: railway variables"
echo "2. Check logs: railway logs"
echo "3. View dashboard: railway open"