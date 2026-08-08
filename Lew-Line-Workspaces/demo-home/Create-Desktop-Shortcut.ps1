<#
.SYNOPSIS
  Create Desktop shortcuts that open Demo Home in Chrome Canary (owner@fenceframes.com).
#>
$ErrorActionPreference = "Stop"

$hub = Join-Path $PSScriptRoot "index.html"
if (-not (Test-Path $hub)) { throw "index.html not found next to this script." }

$openFf = Join-Path $PSScriptRoot "open-ff-chrome.ps1"
if (-not (Test-Path $openFf)) { throw "open-ff-chrome.ps1 missing - needed to launch Chrome Canary." }

$canary = Join-Path $env:LOCALAPPDATA "Google\Chrome SxS\Application\chrome.exe"
if (-not (Test-Path $canary)) {
  throw "Chrome Canary not found at: $canary - install from https://www.google.com/chrome/canary/"
}

# Prefer C: demo-home when present (canonical)
$cHub = "C:\Users\TwoLe\Lew-Line-Workspaces\demo-home\index.html"
if (Test-Path $cHub) { $hub = $cHub }

$hubUri = ([Uri](Resolve-Path -LiteralPath $hub).Path).AbsoluteUri

$desktop = [Environment]::GetFolderPath("Desktop")
$w = New-Object -ComObject WScript.Shell

$lnkPath = Join-Path $desktop "Fence Frames Demos.lnk"
$sc = $w.CreateShortcut($lnkPath)
$sc.TargetPath = $canary
$sc.Arguments = "--profile-directory=Default `"$hubUri`""
$sc.WorkingDirectory = Split-Path -Parent $hub
$sc.Description = "FF Demo Home in Chrome Canary (owner@fenceframes) - Font size Medium"
$sc.IconLocation = "$canary,0"
$sc.Save()
Write-Host "Created: $lnkPath" -ForegroundColor Green
Write-Host "  Browser: Chrome Canary (Default = owner@fenceframes.com)"
Write-Host "  Hub: $hubUri"

$startLnk = Join-Path $desktop "Fence Frames Start Demo Servers.lnk"
$sc2 = $w.CreateShortcut($startLnk)
$sc2.TargetPath = "powershell.exe"
$sc2.Arguments = "-NoExit -ExecutionPolicy Bypass -File `"$(Join-Path $PSScriptRoot 'start-servers.ps1')`""
$sc2.WorkingDirectory = $PSScriptRoot
$sc2.Description = "Start demo ports then open Demo Home in Chrome Canary"
$sc2.IconLocation = "shell32.dll,25"
$sc2.Save()
Write-Host "Created: $startLnk" -ForegroundColor Green
Write-Host ""
Write-Host "In Canary: Settings > Appearance > Font size = Medium, zoom Ctrl+0." -ForegroundColor Cyan
Write-Host "Regular Chrome stays for personal / other accounts." -ForegroundColor Cyan
