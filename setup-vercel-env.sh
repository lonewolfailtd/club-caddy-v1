#!/bin/bash

echo "Adding environment variables to Vercel..."

# Production environment variables
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwOTQ4NjQsImV4cCI6MjA4MDY3MDg2NH0.DSpJOu6lJjoV0ZN7CXF8CmWg2wWIqOVr5tGCRvOoMYg" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
echo "https://qlneuwitxcaifupmarfm.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL production
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5NDg2NCwiZXhwIjoyMDgwNjcwODY0fQ.y9hQs7VaWyiWRornmIPbkCjb_KeCqSGaP2MfesNaEIM" | vercel env add SUPABASE_SERVICE_ROLE_KEY production
echo "re_XhzVLGoS_83PGvUyQEfKEKfNqcRwDppCa" | vercel env add RESEND_API_KEY production
echo "admin@clubcaddycarts.com" | vercel env add RESEND_FROM_EMAIL production
echo "https://club-caddy-v1.vercel.app" | vercel env add NEXT_PUBLIC_SITE_URL production
echo "Club Caddy Carts" | vercel env add NEXT_PUBLIC_APP_NAME production

# Preview environment variables
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUwOTQ4NjQsImV4cCI6MjA4MDY3MDg2NH0.DSpJOu6lJjoV0ZN7CXF8CmWg2wWIqOVr5tGCRvOoMYg" | vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY preview
echo "https://qlneuwitxcaifupmarfm.supabase.co" | vercel env add NEXT_PUBLIC_SUPABASE_URL preview
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFsbmV1d2l0eGNhaWZ1cG1hcmZtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTA5NDg2NCwiZXhwIjoyMDgwNjcwODY0fQ.y9hQs7VaWyiWRornmIPbkCjb_KeCqSGaP2MfesNaEIM" | vercel env add SUPABASE_SERVICE_ROLE_KEY preview
echo "re_XhzVLGoS_83PGvUyQEfKEKfNqcRwDppCa" | vercel env add RESEND_API_KEY preview
echo "admin@clubcaddycarts.com" | vercel env add RESEND_FROM_EMAIL preview
echo "https://club-caddy-v1.vercel.app" | vercel env add NEXT_PUBLIC_SITE_URL preview
echo "Club Caddy Carts" | vercel env add NEXT_PUBLIC_APP_NAME preview

echo "Environment variables added successfully!"
