$sqlContent = Get-Content "supabase\update-images.sql" -Raw
Set-Clipboard -Value $sqlContent
Write-Host "SQL copied to clipboard - paste into Supabase SQL Editor"
Start-Process "https://supabase.com/dashboard/project/qlneuwitxcaifupmarfm/sql/new"
