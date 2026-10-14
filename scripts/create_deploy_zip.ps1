# Create fresh deploy bundle for BigRock cPanel
$bundleDir = "deploy-bundle"
if (Test-Path $bundleDir) {
    Remove-Item -Recurse -Force $bundleDir -ErrorAction SilentlyContinue
}
New-Item -ItemType Directory -Path $bundleDir | Out-Null

$items = @(
    'src',
    'public',
    'prisma',
    'package.json',
    'package-lock.json',
    'server.js',
    'next.config.ts',
    'tsconfig.json',
    'postcss.config.mjs',
    'prisma.config.ts',
    '.env'
)

foreach ($i in $items) {
    if (Test-Path $i) {
        Copy-Item -Path $i -Destination $bundleDir -Recurse -Force
    }
}

# Copy .next build outputs
$nextDir = Join-Path $bundleDir ".next"
New-Item -ItemType Directory -Path $nextDir | Out-Null

Copy-Item -Path ".next\server" -Destination $nextDir -Recurse -Force
Copy-Item -Path ".next\static" -Destination $nextDir -Recurse -Force
Copy-Item -Path ".next\*.json" -Destination $nextDir -Force
if (Test-Path ".next\BUILD_ID") {
    Copy-Item -Path ".next\BUILD_ID" -Destination $nextDir -Force
}

$zipName = "deploy.zip"
if (Test-Path $zipName) {
    Remove-Item -Force $zipName -ErrorAction SilentlyContinue
}

Write-Host "Creating $zipName archive..."
Compress-Archive -Path "$bundleDir\*" -DestinationPath $zipName -Force
Remove-Item -Recurse -Force $bundleDir -ErrorAction SilentlyContinue

$info = Get-Item $zipName
Write-Host "SUCCESS: Created $zipName ($([math]::Round($info.Length / 1MB, 2)) MB) at $($info.LastWriteTime)"

