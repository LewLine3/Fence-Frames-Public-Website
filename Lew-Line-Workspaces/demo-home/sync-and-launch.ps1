<#
.SYNOPSIS
  Fence Frames Multi-PC Sync & Launcher Script
  
  Run this script on ANY PC after pulling your git repositories!
  It will:
  1. Pull latest commits across all workspace repositories.
  2. Ensure npm dependencies are installed for the Fence Frames Vite App.
  3. Start the live Vite app dev server on port :5173.
  4. Open the Development Dashboard in your default browser.
#>

$ErrorActionPreference = "Continue"

Write-Host "==========================================================" -ForegroundColor Green
Write-Host "  Fence Frames — Multi-PC Sync & Workspace Launcher" -ForegroundColor Gold
Write-Host "==========================================================" -ForegroundColor Green

# 1. Detect Workspace Root
$workspaceRoot = $PSScriptRoot
if ((Split-Path $workspaceRoot -Leaf) -eq "demo-home") {
    $workspaceRoot = Split-Path $workspaceRoot -Parent
}

Write-Host "`n[1/4] Syncing Git Repositories in: $workspaceRoot" -ForegroundColor Yellow
$repos = Get-ChildItem -Path $workspaceRoot -Directory | Where-Object { Test-Path "$($_.FullName)\.git" }

foreach ($repo in $repos) {
    Write-Host "  → Pulling latest in $($repo.Name)..." -ForegroundColor Cyan
    Set-Location $repo.FullName
    try {
        git pull --no-rebase -X ours origin main 2>$null
    } catch {
        Write-Warning "    Could not auto-pull $($repo.Name) - check branch or git status."
    }
}

# 2. Check Vite App Dependencies
$viteAppDir = Join-Path $workspaceRoot "FenceBook\apps\fence-frames-vite-app"
if (Test-Path $viteAppDir) {
    Write-Host "`n[2/4] Verifying Vite App dependencies in $viteAppDir..." -ForegroundColor Yellow
    Set-Location $viteAppDir
    if (-not (Test-Path (Join-Path $viteAppDir "node_modules"))) {
        Write-Host "  → Installing npm dependencies..." -ForegroundColor Cyan
        npm install
    } else {
        Write-Host "  ✓ node_modules present." -ForegroundColor Green
    }

    # 3. Start Vite Dev Server on Port 5173
    Write-Host "`n[3/4] Launching Vite Dev Server on port :5173..." -ForegroundColor Yellow
    Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm run dev" -WorkingDirectory $viteAppDir -WindowStyle Hidden
    Start-Sleep -Seconds 2
} else {
    Write-Warning "Vite App directory not found at: $viteAppDir"
}

# 4. Open Development Dashboard
$dashboardPath = Join-Path $workspaceRoot "demo-home\index.html"
if (Test-Path $dashboardPath) {
    Write-Host "`n[4/4] Opening Development Dashboard in browser..." -ForegroundColor Yellow
    Start-Process $dashboardPath
} else {
    Write-Warning "Dashboard not found at: $dashboardPath"
}

Write-Host "`n==========================================================" -ForegroundColor Green
Write-Host "  🚀 Workspace Ready! App running at: http://localhost:5173/" -ForegroundColor Gold
Write-Host "==========================================================" -ForegroundColor Green
