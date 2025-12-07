# PowerShell script to copy image update SQL to clipboard and open Supabase

$sqlContent = Get-Content "supabase\update-images.sql" -Raw
Set-Clipboard -Value $sqlContent

Write-Host "`n✅ SQL copied to clipboard!" -ForegroundColor Green
Write-Host "`n📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Opening Supabase SQL Editor..." -ForegroundColor Yellow
Write-Host "2. Paste the SQL (Ctrl+V)" -ForegroundColor Yellow
Write-Host "3. Click 'Run' or press F5" -ForegroundColor Yellow
Write-Host ""

Start-Process "https://supabase.com/dashboard/project/qlneuwitxcaifupmarfm/sql/new"

Write-Host "Ready to update product images!" -ForegroundColor Green
Write-Host ""
