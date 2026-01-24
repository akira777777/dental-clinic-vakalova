#!/bin/bash

# Complete Vercel Deployment Script
# This script handles the full deployment process

set -e  # Exit on error

echo "🚀 Starting Vercel Deployment Process..."
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ ERROR: DATABASE_URL not set${NC}"
    echo "Please set it: export DATABASE_URL='your-neon-connection-string'"
    exit 1
fi

echo -e "${GREEN}✅ DATABASE_URL is set${NC}"

# Step 1: Install dependencies
echo ""
echo "📦 Step 1: Installing dependencies..."
npm run install:all

# Step 2: Generate Prisma client
echo ""
echo "🔧 Step 2: Generating Prisma client..."
npm run prisma:generate

# Step 3: Push database schema
echo ""
echo "🗄️  Step 3: Pushing database schema to Neon..."
npm run prisma:push

# Step 4: Build client
echo ""
echo "🏗️  Step 4: Building client application..."
npm run build --workspace=client

# Step 5: Check Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo ""
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Step 6: Deploy
echo ""
echo "🚀 Step 5: Deploying to Vercel..."
echo ""
echo -e "${YELLOW}When prompted:${NC}"
echo "  - Set up and deploy? → Yes"
echo "  - Link to existing project? → Your choice"
echo "  - Project name? → dental-clinic-vakalova (or your choice)"
echo "  - Directory? → ./"
echo ""

vercel --prod

echo ""
echo -e "${GREEN}✅ Deployment initiated!${NC}"
echo ""
echo "📝 Next steps:"
echo "  1. Set DATABASE_URL in Vercel dashboard (if not already set)"
echo "  2. Verify deployment at: https://your-app.vercel.app"
echo "  3. Test health endpoint: https://your-app.vercel.app/api/health"
echo ""
