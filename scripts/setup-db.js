#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up database connections...\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('📝 Please copy env.example to .env.local and configure your database URLs');
  process.exit(1);
}

console.log('✅ Environment file found');

// Generate Prisma client
console.log('🔧 Generating Prisma client...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
  console.log('✅ Prisma client generated successfully');
} catch (error) {
  console.log('❌ Failed to generate Prisma client:', error.message);
}

// Push database schema (if DATABASE_URL is configured)
console.log('📊 Pushing database schema...');
try {
  execSync('npx prisma db push', { stdio: 'inherit' });
  console.log('✅ Database schema pushed successfully');
} catch (error) {
  console.log('⚠️  Database schema push failed (this is OK if DATABASE_URL is not configured):', error.message);
}

console.log('\n🎉 Database setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Configure your database URLs in .env.local');
console.log('2. Run: npm run dev');
console.log('3. Visit: http://localhost:3000/api/test-db to test connections');
console.log('4. Visit: http://localhost:3000/api/health for health status');
console.log('5. Visit: http://localhost:3000/api/seed to seed the database');
