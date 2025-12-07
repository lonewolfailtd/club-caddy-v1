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

async function runMigrations() {
  console.log('\n🚀 Club Caddy - Running Database Migrations via Supabase API\n')

  require('dotenv').config({ path: '.env.local' })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Error: Missing Supabase credentials')
    process.exit(1)
  }

  console.log('✅ Credentials loaded')
  console.log(`📡 Project: ${supabaseUrl}\n`)

  try {
    // Read migration file
    console.log('📋 Reading migration SQL...')
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8')

    console.log(`✅ Migration loaded (${migrationSQL.length} chars)\n`)

    // Execute migration as single query via psql-style execution
    console.log('⚙️  Executing migration via Supabase REST API...\n')

    const result = await executeSQLDirect(migrationSQL, supabaseKey, supabaseUrl)

    if (result.success) {
      console.log('✅ Migration executed successfully!\n')
    } else {
      console.log(`⚠️  API Response (${result.statusCode}):`, result.error, '\n')
      console.log('Note: Supabase REST API may not support arbitrary SQL execution.')
      console.log('Falling back to manual execution instructions...\n')
    }

    // Read and execute seed data
    console.log('📋 Reading seed data...')
    const seedPath = path.join(__dirname, '..', 'supabase', 'seed.sql')
    const seedSQL = fs.readFileSync(seedPath, 'utf-8')

    console.log(`✅ Seed data loaded (${seedSQL.length} chars)\n`)
    console.log('🌱 Executing seed data...\n')

    const seedResult = await executeSQLDirect(seedSQL, supabaseKey, supabaseUrl)

    if (seedResult.success) {
      console.log('✅ Seed data executed successfully!\n')
    } else {
      console.log(`⚠️  API Response (${seedResult.statusCode}):`, seedResult.error, '\n')
    }

    console.log('🎉 Process complete!\n')
    console.log('📚 If automatic execution failed, please run manually:')
    console.log('   See: RUN-MIGRATIONS.md\n')

  } catch (error) {
    console.error('❌ Error:', error.message)
    console.log('\n📚 Manual steps required - see RUN-MIGRATIONS.md\n')
  }
}

runMigrations()
