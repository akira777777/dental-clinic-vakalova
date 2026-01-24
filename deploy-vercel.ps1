# PowerShell Deployment Script for Vercel
# Run this script: .\deploy-vercel.ps1

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Vercel Deployment Process..." -ForegroundColor Cyan
Write-Host ""

# Check if DATABASE_URL is set
if (-not $env:DATABASE_URL) {
    Write-Host "❌ ERROR: DATABASE_URL environment variable is not set" -ForegroundColor Red
    Write-Host "Please set it with: `$env:DATABASE_URL = 'your-neon-connection-string'" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ DATABASE_URL is set" -ForegroundColor Green

# Step 1: Install dependencies
Write-Host ""
Write-Host "📦 Step 1: Installing dependencies..." -ForegroundColor Cyan
npm run install:all

# Step 2: Generate Prisma client
Write-Host ""
Write-Host "🔧 Step 2: Generating Prisma client..." -ForegroundColor Cyan
npm run prisma:generate

# Step 3: Push database schema
Write-Host ""
Write-Host "🗄️  Step 3: Pushing database schema to Neon..." -ForegroundColor Cyan
npm run prisma:push

# Step 4: Build client
Write-Host ""
Write-Host "🏗️  Step 4: Building client application..." -ForegroundColor Cyan
npm run build --workspace=client

# Step 5: Check Vercel CLI
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host ""
    Write-Host "⚠️  Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Step 6: Deploy
Write-Host ""
Write-Host "🚀 Step 5: Deploying to Vercel..." -ForegroundColor Cyan
Write-Host ""
Write-Host "When prompted:" -ForegroundColor Yellow
Write-Host "  - Set up and deploy? → Yes"
Write-Host "  - Link to existing project? → Your choice"
Write-Host "  - Project name? → dental-clinic-vakalova (or your choice)"
Write-Host "  - Directory? → ./"
Write-Host ""

vercel --prod

Write-Host ""
Write-Host "✅ Deployment initiated!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Cyan
Write-Host "  1. Set DATABASE_URL in Vercel dashboard (if not already set)"
Write-Host "  2. Verify deployment at: https://your-app.vercel.app"
Write-Host "  3. Test health endpoint: https://your-app.vercel.app/api/health"
Write-Host ""
