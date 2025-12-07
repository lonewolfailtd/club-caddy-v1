# PowerShell script to execute SQL on Supabase
param(
    [Parameter(Mandatory=$true)]
    [string]$SqlFile
)

Write-Host "`n🚀 Executing SQL on Supabase...`n" -ForegroundColor Cyan

# Load environment variables
$envFile = Join-Path $PSScriptRoot ".." ".env.local"
if (Test-Path $envFile) {
    Get-Content $envFile | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]*?)\s*=\s*(.*)$') {
            $name = $matches[1]
            $value = $matches[2]
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
        }
    }
}

$supabaseUrl = $env:NEXT_PUBLIC_SUPABASE_URL
$supabaseKey = $env:SUPABASE_SERVICE_ROLE_KEY

if (-not $supabaseUrl -or -not $supabaseKey) {
    Write-Host "❌ Error: Missing Supabase credentials in .env.local" -ForegroundColor Red
    exit 1
}

# Read SQL file
$sqlPath = Join-Path $PSScriptRoot ".." $SqlFile
if (-not (Test-Path $sqlPath)) {
    Write-Host "❌ Error: SQL file not found: $sqlPath" -ForegroundColor Red
    exit 1
}

$sqlContent = Get-Content $sqlPath -Raw
Write-Host "✅ SQL file loaded: $SqlFile" -ForegroundColor Green
Write-Host "📊 Size: $($sqlContent.Length) characters`n" -ForegroundColor Gray

# Extract project reference from URL
if ($supabaseUrl -match 'https://([^.]+)\.supabase\.co') {
    $projectRef = $matches[1]
    Write-Host "📡 Project: $projectRef" -ForegroundColor Cyan
    Write-Host "🌐 URL: $supabaseUrl`n" -ForegroundColor Gray

    # Instructions for manual execution
    Write-Host "📚 Manual Execution Steps:" -ForegroundColor Yellow
    Write-Host "   1. Open: https://supabase.com/dashboard/project/$projectRef/sql" -ForegroundColor White
    Write-Host "   2. Click 'New query'" -ForegroundColor White
    Write-Host "   3. Copy the SQL from: $SqlFile" -ForegroundColor White
    Write-Host "   4. Paste into SQL Editor" -ForegroundColor White
    Write-Host "   5. Click 'Run' or press Ctrl+Enter`n" -ForegroundColor White

    Write-Host "💡 Tip: The SQL file is ready to copy!" -ForegroundColor Cyan
    Write-Host "   Full path: $sqlPath`n" -ForegroundColor Gray

} else {
    Write-Host "⚠️  Could not parse project reference from URL" -ForegroundColor Yellow
}

Write-Host "✅ Ready for manual execution!" -ForegroundColor Green
Write-Host "`nPress any key to open Supabase SQL Editor in browser..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Open browser to SQL editor
Start-Process "https://supabase.com/dashboard/project/$projectRef/sql"

Write-Host "`n✅ Browser opened. Happy migrating! 🎉`n" -ForegroundColor Green
