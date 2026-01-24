#!/bin/bash

# Production Deployment Script
# This script handles the complete production deployment process

set -e  # Exit on any error

echo "🚀 Starting Production Deployment..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}❌ ERROR: DATABASE_URL environment variable is not set${NC}"
    echo "Please set it with: export DATABASE_URL='your-neon-connection-string'"
    exit 1
fi

echo -e "${GREEN}✅ DATABASE_URL is set${NC}"

# Check if NODE_ENV is set to production
if [ "$NODE_ENV" != "production" ]; then
    echo -e "${YELLOW}⚠️  NODE_ENV is not set to 'production', setting it now...${NC}"
    export NODE_ENV=production
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm run install:all

# Generate Prisma client
echo ""
echo "🔧 Generating Prisma client..."
npm run prisma:generate

# Push database schema
echo ""
echo "🗄️  Pushing database schema to Neon..."
npm run prisma:push

echo ""
echo -e "${GREEN}✅ Database setup complete!${NC}"

# Build client
echo ""
echo "🏗️  Building client application..."
npm run build --workspace=client

echo ""
echo -e "${GREEN}✅ Build complete!${NC}"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo ""
    echo -e "${YELLOW}⚠️  Vercel CLI not found. Installing...${NC}"
    npm install -g vercel
fi

# Deploy to Vercel
echo ""
echo "🚀 Deploying to Vercel Production..."
vercel --prod

echo ""
echo -e "${GREEN}✅ Deployment complete!${NC}"
echo ""
echo "📝 Next steps:"
echo "   1. Verify health endpoint: https://your-app.vercel.app/api/health"
echo "   2. Test booking functionality"
echo "   3. Check Vercel dashboard for any errors"
echo "   4. Monitor Neon dashboard for database connections"
echo ""
echo -e "${YELLOW}⚠️  Remember: Set DATABASE_URL in Vercel environment variables!${NC}"
