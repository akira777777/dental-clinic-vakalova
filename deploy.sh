#!/bin/bash

# Deployment script for Vercel + Neon
# This script helps set up and deploy the dental clinic application

echo "🚀 Starting deployment process..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERROR: DATABASE_URL environment variable is not set"
    echo "Please set it with: export DATABASE_URL='your-neon-connection-string'"
    exit 1
fi

echo "✅ DATABASE_URL is set"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npm run prisma:generate

# Push database schema
echo "🗄️  Pushing database schema to Neon..."
npm run prisma:push

echo "✅ Database setup complete!"

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to Vercel
echo "🚀 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo "📝 Don't forget to set DATABASE_URL in Vercel environment variables!"
