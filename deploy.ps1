# Build the Next.js app
Write-Host "Building Next.js app..."
npm --prefix app run build

# Prepare functions directory
Write-Host "Preparing functions directory..."
if (Test-Path functions/.next) {
    Remove-Item -Recurse -Force functions/.next
}
Copy-Item -Recurse app/.next functions/.next

# Prepare public directory for hosting
# We want to serve static files from app/public
# firebase.json points to "public" in root.
Write-Host "Preparing public directory..."
if (Test-Path public) {
    Remove-Item -Recurse -Force public
}
Copy-Item -Recurse app/public public

# Deploy
Write-Host "Deploying to Firebase..."
npx firebase deploy --only hosting,functions
