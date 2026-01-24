# Deployment Guide

This guide covers deploying the Dental Clinic application to Vercel (frontend + API) and Neon (PostgreSQL database).

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Neon Account**: Sign up at [neon.tech](https://neon.tech)
3. **GitHub Repository**: Push your code to GitHub

## Step 1: Set up Neon PostgreSQL Database

1. **Create a Neon Project**:
   - Go to [console.neon.tech](https://console.neon.tech)
   - Click "Create Project"
   - Choose a project name and region
   - Copy the connection string (it will look like: `postgresql://user:password@host/dbname?sslmode=require`)

2. **Run Database Migrations**:
   ```bash
   # Set your DATABASE_URL environment variable
   export DATABASE_URL="your-neon-connection-string"
   
   # Push the schema to Neon
   npm run prisma:push
   
   # Or create a migration
   npm run prisma:migrate
   ```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

### Option B: Deploy via GitHub Integration

1. **Connect Repository**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will auto-detect the project settings

2. **Configure Environment Variables**:
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add the following:
     - `DATABASE_URL`: Your Neon PostgreSQL connection string
     - `GEMINI_API_KEY`: (Optional) Your Google Gemini API key for chat features

3. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy automatically

## Step 3: Post-Deployment Setup

1. **Run Database Migrations** (if not done locally):
   - After deployment, you may need to run migrations
   - Use Vercel CLI: `vercel env pull` to get environment variables
   - Run: `npm run prisma:push`

2. **Verify Deployment**:
   - Check health endpoint: `https://your-app.vercel.app/api/health`
   - Test booking endpoint: `https://your-app.vercel.app/api/booking`

## Environment Variables

Required environment variables in Vercel:

- `DATABASE_URL`: Neon PostgreSQL connection string
- `GEMINI_API_KEY`: (Optional) For chat assistant features

## Troubleshooting

### Prisma Client Not Found
- Ensure `npm run prisma:generate` runs during build
- Check that `postinstall` script is working

### Database Connection Issues
- Verify `DATABASE_URL` is set correctly in Vercel
- Check Neon dashboard for connection limits
- Ensure SSL mode is enabled (`?sslmode=require`)

### API Routes Not Working
- Verify `vercel.json` configuration
- Check function logs in Vercel dashboard
- Ensure API routes are in `/api` folder

## Local Development

1. **Set up environment variables**:
   ```bash
   # Create .env file in root
   DATABASE_URL="your-neon-connection-string"
   GEMINI_API_KEY="your-gemini-key"
   ```

2. **Install dependencies**:
   ```bash
   npm run install:all
   ```

3. **Generate Prisma Client**:
   ```bash
   npm run prisma:generate
   ```

4. **Run migrations**:
   ```bash
   npm run prisma:push
   ```

5. **Start development servers**:
   ```bash
   npm run dev
   ```

## Project Structure

```
├── api/              # Vercel serverless functions
│   └── index.ts     # Main API handler
├── client/          # React frontend
├── server/          # Express backend (for local dev)
│   ├── src/
│   └── prisma/      # Prisma schema
└── vercel.json      # Vercel configuration
```

## Notes

- The `/api` folder contains serverless functions for Vercel
- The `/server` folder is for local development
- Prisma schema is located at `server/prisma/schema.prisma`
- Database migrations should be run before first deployment
