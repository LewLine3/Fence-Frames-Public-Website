# Open a URL in Chrome Canary - Fence Frames work browser (owner@fenceframes.com).
# Regular Chrome stays for personal / other accounts.
# Usage: .\open-ff-chrome.ps1 [url]
#        .\open-ff-chrome.ps1   (opens Demo Home as file://)

param(
  [Parameter(Position = 0)]
  [string]$Url = ""
)

$ErrorActionPreference = "Stop"

$canary = Join-Path $env:LOCALAPPDATA "Google\Chrome SxS\Application\chrome.exe"
if (-not (Test-Path $canary)) {
  throw "Chrome Canary not found at: $canary - install from https://www.google.com/chrome/canary/"
}

# Default profile on this machine = owner@fenceframes.com ("Your Chrome")
$profileDir = "Default"

if (-not $Url) {
  $hub = "C:\Users\TwoLe\Lew-Line-Workspaces\demo-home\index.html"
  if (-not (Test-Path $hub)) {
    $hub = Join-Path $PSScriptRoot "index.html"
  }
  if (-not (Test-Path $hub)) {
    throw "Demo Home index.html not found."
  }
  $Url = ([Uri](Resolve-Path -LiteralPath $hub).Path).AbsoluteUri
}

Start-Process -FilePath $canary -ArgumentList @(
  "--profile-directory=$profileDir",
  $Url
)
Write-Host "Opened in Chrome Canary (owner@fenceframes): $Url"
