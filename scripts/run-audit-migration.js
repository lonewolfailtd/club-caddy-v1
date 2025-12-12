const https = require('https')
const fs = require('fs')
const path = require('path')

async function executeSQLDirect(sql, serviceKey, projectUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL('/rest/v1/rpc/exec_sql', projectUrl)

    const postData = JSON.stringify({ query: sql })

    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Prefer': 'return=minimal'
      }
    }

    const req = https.request(options, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ success: true, data })
        } else {
          resolve({ success: false, error: data, statusCode: res.statusCode })
        }
      })
    })

    req.on('error', (error) => {
      reject(error)
    })

    req.write(postData)
    req.end()
  })
}

async function runAuditLogsMigration() {
  console.log('\n🔐 Running Audit Logs Migration\n')

  require('dotenv').config({ path: '.env.local' })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Missing Supabase credentials')
    console.log('   Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local\n')
    process.exit(1)
  }

  console.log('✅ Credentials loaded')
  console.log(`📡 Project: ${supabaseUrl}\n`)

  try {
    // Read migration file
    console.log('📋 Reading audit logs migration SQL...')
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '20251211_create_audit_logs.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8')

    console.log(`✅ Migration loaded (${migrationSQL.length} chars)\n`)

    console.log('⚙️  Executing migration...\n')

    const result = await executeSQLDirect(migrationSQL, supabaseKey, supabaseUrl)

    if (result.success) {
      console.log('✅ Migration executed successfully!\n')
      console.log('🎉 Audit logs table created with:')
      console.log('   - audit_logs table')
      console.log('   - Row Level Security policies')
      console.log('   - Automatic retention triggers')
      console.log('   - Helper functions (cleanup_expired_audit_logs, get_audit_stats)\n')
      return true
    } else {
      console.log(`⚠️  API Response (${result.statusCode}):`, result.error, '\n')
      console.log('Note: Supabase REST API may not support this type of migration.')
      console.log('\n📚 Manual migration required:')
      console.log('   1. Go to: https://app.supabase.com')
      console.log('   2. Select your project')
      console.log('   3. Go to SQL Editor')
      console.log('   4. Paste the contents of: supabase/migrations/20251211_create_audit_logs.sql')
      console.log('   5. Click "Run"\n')
      return false
    }

  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n📚 Manual migration required - see instructions above\n')
    return false
  }
}

runAuditLogsMigration()
  .then(success => {
    if (success) {
      process.exit(0)
    } else {
      process.exit(1)
    }
  })
  .catch(error => {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  })
