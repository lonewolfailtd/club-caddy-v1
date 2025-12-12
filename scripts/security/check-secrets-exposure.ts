#!/usr/bin/env tsx
/**
 * Security: Check for Exposed Secrets
 *
 * This script checks for:
 * 1. .env files committed to git history
 * 2. Sensitive patterns in current files
 * 3. Proper .gitignore configuration
 *
 * Run: npm run security:check-secrets
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const SENSITIVE_PATTERNS = [
  {
    name: 'Supabase Service Role Key',
    pattern: /SUPABASE_SERVICE_ROLE_KEY\s*=\s*['"]?eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/gi,
    severity: 'CRITICAL'
  },
  {
    name: 'Resend API Key',
    pattern: /RESEND_API_KEY\s*=\s*['"]?re_[a-zA-Z0-9_-]{20,}/gi,
    severity: 'CRITICAL'
  },
  {
    name: 'Stripe Secret Key',
    pattern: /STRIPE_SECRET_KEY\s*=\s*['"]?sk_(test|live)_[a-zA-Z0-9]{20,}/gi,
    severity: 'CRITICAL'
  },
  {
    name: 'Stripe Webhook Secret',
    pattern: /STRIPE_WEBHOOK_SECRET\s*=\s*['"]?whsec_[a-zA-Z0-9]{20,}/gi,
    severity: 'CRITICAL'
  },
  {
    name: 'Generic Password',
    pattern: /password\s*=\s*['"][^'"]{8,}['"]/gi,
    severity: 'HIGH'
  },
  {
    name: 'OpenAI API Key',
    pattern: /OPENAI_API_KEY\s*=\s*['"]?sk-[a-zA-Z0-9]{20,}/gi,
    severity: 'HIGH'
  }
];

async function checkGitHistory(): Promise<boolean> {
  console.log('🔍 Checking git history for exposed secrets...\n');

  try {
    // Check if .env.local was ever committed
    const result = execSync(
      'git log --all --full-history --format="%H" -- .env.local',
      { encoding: 'utf-8' }
    );

    if (result.trim()) {
      const commits = result.trim().split('\n');
      console.error('❌ CRITICAL: .env.local was committed to git history!');
      console.error(`   Found in ${commits.length} commit(s):`);

      commits.forEach((commit, index) => {
        console.error(`   ${index + 1}. ${commit}`);
      });

      console.error('\n   ⚠️  ALL SECRETS IN THESE COMMITS MUST BE ROTATED IMMEDIATELY');
      console.error('   These secrets are permanently exposed in git history.');
      console.error('\n   To view the exposed secrets:');
      console.error(`   git show ${commits[0]}:.env.local\n`);

      return false;
    } else {
      console.log('✅ .env.local never committed to git\n');
    }
  } catch (error) {
    // Git command failed (no commits found) - this is good
    console.log('✅ .env.local never committed to git\n');
  }

  // Check for other sensitive files
  const sensitiveFiles = [
    '.env',
    '.env.production',
    '.env.development',
    'credentials.json',
    'service-account.json',
  ];

  let foundIssues = false;

  for (const file of sensitiveFiles) {
    try {
      const result = execSync(
        `git log --all --full-history --format="%H" -- ${file}`,
        { encoding: 'utf-8' }
      );

      if (result.trim()) {
        console.error(`❌ WARNING: ${file} was committed to git history!`);
        foundIssues = true;
      }
    } catch {
      // No commits found - good
    }
  }

  if (!foundIssues) {
    console.log('✅ No other sensitive files found in git history\n');
  }

  return !foundIssues;
}

async function checkCurrentFiles(): Promise<boolean> {
  console.log('🔍 Checking current files for exposed secrets...\n');

  const filesToCheck = [
    '.env.local',
    '.env.production',
    'README.md',
    'SETUP.md',
    'package.json',
  ];

  let issuesFound = false;

  for (const file of filesToCheck) {
    const filePath = path.join(process.cwd(), file);

    if (!fs.existsSync(filePath)) continue;

    const content = fs.readFileSync(filePath, 'utf-8');

    for (const { name, pattern, severity } of SENSITIVE_PATTERNS) {
      const matches = content.match(pattern);
      if (matches && matches.length > 0) {
        console.error(`❌ [${severity}] ${name} found in ${file}:`);
        console.error(`   Matches: ${matches.length}`);

        // Show first match (truncated for security)
        const firstMatch = matches[0];
        const truncated = firstMatch.length > 50
          ? firstMatch.substring(0, 50) + '...'
          : firstMatch;
        console.error(`   Example: ${truncated}\n`);

        issuesFound = true;
      }
    }
  }

  if (!issuesFound) {
    console.log('✅ No obvious secrets found in checked files\n');
  } else {
    console.error('\n⚠️  RECOMMENDATION: Review and rotate any exposed secrets\n');
  }

  return !issuesFound;
}

async function checkGitignore(): Promise<boolean> {
  console.log('🔍 Checking .gitignore configuration...\n');

  const gitignorePath = path.join(process.cwd(), '.gitignore');

  if (!fs.existsSync(gitignorePath)) {
    console.error('❌ .gitignore file not found!\n');
    return false;
  }

  const content = fs.readFileSync(gitignorePath, 'utf-8');
  const requiredPatterns = [
    '.env*.local',
    '.env.production',
  ];

  let allPatternsFound = true;

  for (const pattern of requiredPatterns) {
    if (!content.includes(pattern)) {
      console.error(`❌ Missing pattern in .gitignore: ${pattern}`);
      allPatternsFound = false;
    }
  }

  if (allPatternsFound) {
    console.log('✅ .gitignore properly configured\n');
  } else {
    console.error('\n⚠️  Add missing patterns to .gitignore\n');
  }

  return allPatternsFound;
}

async function main() {
  console.log('🔐 Starting secrets exposure check...\n');
  console.log('='.repeat(60) + '\n');

  const results = await Promise.all([
    checkGitHistory(),
    checkCurrentFiles(),
    checkGitignore(),
  ]);

  console.log('='.repeat(60));
  console.log('\n📊 Check Summary:\n');

  const [historyClean, filesClean, gitignoreOk] = results;

  if (results.every(r => r)) {
    console.log('✅ All checks passed! No obvious secret exposure detected.\n');
    console.log('💡 Recommendation: Still rotate secrets if you\'re unsure of their exposure.\n');
    process.exit(0);
  } else {
    console.log('❌ Security issues found! Please address the issues above.\n');

    if (!historyClean) {
      console.log('🚨 CRITICAL ACTION REQUIRED:');
      console.log('   1. Rotate ALL secrets found in git history immediately');
      console.log('   2. Update Vercel/hosting environment variables');
      console.log('   3. Consider rewriting git history (advanced) or accepting permanent exposure\n');
    }

    if (!filesClean) {
      console.log('⚠️  ACTION REQUIRED:');
      console.log('   1. Review exposed secrets in current files');
      console.log('   2. Remove or move to environment variables');
      console.log('   3. Rotate any secrets that may have been exposed\n');
    }

    if (!gitignoreOk) {
      console.log('⚠️  ACTION REQUIRED:');
      console.log('   1. Update .gitignore with required patterns');
      console.log('   2. Ensure sensitive files are properly ignored\n');
    }

    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Error running security check:', error);
  process.exit(1);
});
