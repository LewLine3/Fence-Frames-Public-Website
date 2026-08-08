<#
.SYNOPSIS
  Start all Fence Frames demo servers (5198 site - 5199 svg - 5200 configure - 5201 logos).

  Opens one Windows Terminal window with a tab per server (falls back to
  separate powershell windows if wt.exe is missing).

  5199 uses FenceBook preview-server.js (local C: workspace), not npx serve /
  Google Drive copies -- those caused stale Heritage pilot UI.
#>
$ErrorActionPreference = "Stop"

function Find-WorkspaceRoot {
  # Prefer the Cursor working tree on C: over Google Drive mirrors (often stale).
  $candidates = @(
    "C:\Users\TwoLe\Lew-Line-Workspaces",
    "$env:USERPROFILE\Lew-Line-Workspaces",
    "G:\My Drive\Lew-Line-Workspaces",
    (Split-Path -Parent $PSScriptRoot)
  )
  foreach ($c in $candidates) {
    if (-not $c) { continue }
    if ((Test-Path (Join-Path $c "FenceBook")) -and (Test-Path (Join-Path $c "Design"))) {
      return (Resolve-Path $c).Path
    }
  }
  throw "Could not find Lew-Line-Workspaces (need FenceBook + Design folders)."
}

function Test-PortListening {
  param([int]$Port)
  return [bool](Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue)
}

function Stop-PortListeners {
  param([int]$Port)
  $conns = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
  if (-not $conns) { return }
  $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
  foreach ($procId in $pids) {
    try {
      $p = Get-Process -Id $procId -ErrorAction Stop
      Write-Host "  stopping PID $procId ($($p.ProcessName)) on :$Port" -ForegroundColor Yellow
      Stop-Process -Id $procId -Force -ErrorAction Stop
    } catch {
      Write-Warning "  could not stop PID $procId on :$Port - $_"
    }
  }
  Start-Sleep -Milliseconds 800
}

function Test-FenceBookPreviewBridge {
  try {
    $r = Invoke-WebRequest -Uri 'http://127.0.0.1:5199/api/desktop/status' -UseBasicParsing -TimeoutSec 2
    return $r.StatusCode -eq 200
  } catch {
    return $false
  }
}

function Test-UsableWtExe {
  param([string]$Path)
  if (-not $Path -or -not (Test-Path -LiteralPath $Path)) { return $false }
  # App Execution Alias stubs are 0 bytes and exit without opening tabs.
  try {
    $len = (Get-Item -LiteralPath $Path -ErrorAction Stop).Length
  } catch {
    return $false
  }
  return $len -gt 0
}

function Get-WindowsTerminal {
  # Prefer the real package binary. WindowsApps\wt.exe is often a 0-byte alias stub
  # that Process.Start "succeeds" on but never opens server tabs.
  $candidates = [System.Collections.Generic.List[string]]::new()

  $pkg = Get-AppxPackage -Name 'Microsoft.WindowsTerminal' -ErrorAction SilentlyContinue |
    Sort-Object Version -Descending |
    Select-Object -First 1
  if ($pkg -and $pkg.InstallLocation) {
    $candidates.Add((Join-Path $pkg.InstallLocation 'wt.exe'))
    $candidates.Add((Join-Path $pkg.InstallLocation 'WindowsTerminal.exe'))
  }

  $cmd = Get-Command wt.exe -ErrorAction SilentlyContinue
  if ($cmd -and $cmd.Source) { $candidates.Add($cmd.Source) }

  $candidates.Add((Join-Path $env:LOCALAPPDATA 'Microsoft\WindowsApps\wt.exe'))

  foreach ($c in $candidates) {
    if (Test-UsableWtExe $c) { return $c }
  }
  return $null
}

function Get-EncodedPowerShellCommand {
  param([string]$Script)
  $bytes = [System.Text.Encoding]::Unicode.GetBytes($Script)
  return [Convert]::ToBase64String($bytes)
}

function Quote-WinArg {
  param([string]$Value)
  if ($null -eq $Value) { return '""' }
  # Always quote so spaces (title, My Drive paths) stay one token for wt.
  return '"' + ($Value -replace '\\', '\\' -replace '"', '\"') + '"'
}

function Start-ServerTabsViaPowerShell {
  param(
    [Parameter(Mandatory)]
    [object[]]$Tabs
  )
  Write-Host "Opening $($Tabs.Count) server window(s) via powershell.exe..." -ForegroundColor Cyan
  foreach ($tab in $Tabs) {
    Start-Process -FilePath "powershell.exe" -WorkingDirectory $tab.Directory -ArgumentList @(
      "-NoExit"
      "-ExecutionPolicy"
      "Bypass"
      "-Command"
      $tab.Command
    )
  }
}

function Start-ServerTabs {
  param(
    [Parameter(Mandatory)]
    [object[]]$Tabs,
    [switch]$PreferWindowsTerminal
  )
  if (-not $Tabs -or $Tabs.Count -eq 0) { return }

  # Default: separate PowerShell windows. On this PC the WindowsApps wt.exe alias is a
  # 0-byte stub; even the real package wt often opens a window without running tab commands.
  if (-not $PreferWindowsTerminal) {
    Start-ServerTabsViaPowerShell -Tabs $Tabs
    return
  }

  $wt = Get-WindowsTerminal
  if (-not $wt) {
    Write-Warning "Usable Windows Terminal not found - using separate powershell windows."
    Start-ServerTabsViaPowerShell -Tabs $Tabs
    return
  }

  Write-Host "Opening $($Tabs.Count) server tab(s) in one Windows Terminal window..." -ForegroundColor Cyan
  Write-Host "  wt: $wt" -ForegroundColor DarkGray

  $chunks = [System.Collections.Generic.List[string]]::new()
  $chunks.Add('-w 0')
  $first = $true
  foreach ($tab in $Tabs) {
    if (-not $first) { $chunks.Add(';') }
    $first = $false
    $encoded = Get-EncodedPowerShellCommand $tab.Command
    $title = Quote-WinArg $tab.Title
    $dir = Quote-WinArg $tab.Directory
    $chunks.Add("new-tab --title $title -d $dir -- powershell.exe -NoExit -ExecutionPolicy Bypass -EncodedCommand $encoded")
  }
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = $wt
  $psi.Arguments = ($chunks -join ' ')
  $psi.UseShellExecute = $true
  try {
    [System.Diagnostics.Process]::Start($psi) | Out-Null
  } catch {
    Write-Warning "Windows Terminal launch failed ($_ ) - falling back to separate powershell windows."
    Start-ServerTabsViaPowerShell -Tabs $Tabs
    return
  }

  Start-Sleep -Seconds 3
  $anyUp = $false
  foreach ($port in @(5198, 5199, 5200, 5201)) {
    if (Test-PortListening -Port $port) { $anyUp = $true; break }
  }
  if (-not $anyUp) {
    Write-Warning "Windows Terminal launched but no demo ports yet - also starting powershell windows as backup."
    Start-ServerTabsViaPowerShell -Tabs $Tabs
  }
}

$root = Find-WorkspaceRoot
Write-Host "Workspace: $root" -ForegroundColor Cyan
if ($root -match 'My Drive|Google Drive') {
  Write-Warning "Using a Drive path - prefer C:\Users\TwoLe\Lew-Line-Workspaces so configurator WIP is current."
}

$site = Join-Path $root "Design\FenceBook\wix-pages"
$logos = Join-Path $root "Design\FenceBook\brand\logos"
$fenceBook = Join-Path $root "FenceBook"
$cfg = Join-Path $root "FenceBook\public\configure"
$previewJs = Join-Path $fenceBook "scripts\preview-server.js"

$tabs = [System.Collections.Generic.List[object]]::new()

# SITE :5198
if (-not (Test-Path $site)) {
  Write-Warning "[SITE] folder missing - skip :5198  ($site)"
} elseif (Test-PortListening -Port 5198) {
  Write-Host "[SITE] already running on :5198" -ForegroundColor Yellow
} else {
  Write-Host "[SITE] queue tab  npx serve -l 5198  ->  $site" -ForegroundColor Green
  $tabs.Add([pscustomobject]@{
    Title     = 'SITE-5198'
    Directory = $site
    Command   = "Write-Host 'Serving SITE on http://localhost:5198' -ForegroundColor Cyan; npx --yes serve -l 5198"
  })
}

# SVG :5199 (FenceBook preview-server)
$needSvgWait = $false
if (-not (Test-Path $previewJs)) {
  Write-Warning "[SVG] missing $previewJs - skip :5199"
} elseif (Test-FenceBookPreviewBridge) {
  Write-Host "[SVG] FenceBook preview-server already healthy on :5199" -ForegroundColor Yellow
} else {
  if (Test-PortListening -Port 5199) {
    Write-Host "[SVG] :5199 occupied by wrong server (no /api/desktop/status) - replacing" -ForegroundColor Yellow
    Stop-PortListeners -Port 5199
  }
  Write-Host "[SVG] queue tab  node scripts/preview-server.js  ->  $fenceBook" -ForegroundColor Green
  $tabs.Add([pscustomobject]@{
    Title     = 'SVG-5199'
    Directory = $fenceBook
    Command   = "Write-Host 'FenceBook SVG preview on http://localhost:5199' -ForegroundColor Cyan; node scripts/preview-server.js"
  })
  $needSvgWait = $true
}

# CONFIG :5200
if (-not (Test-Path $cfg)) {
  Write-Warning "[CONFIG] folder missing - skip :5200  ($cfg)"
} elseif (Test-PortListening -Port 5200) {
  Write-Host "[CONFIG] already running on :5200" -ForegroundColor Yellow
} else {
  Write-Host "[CONFIG] queue tab  npx serve -l 5200  ->  $cfg" -ForegroundColor Green
  $tabs.Add([pscustomobject]@{
    Title     = 'CONFIG-5200'
    Directory = $cfg
    Command   = "Write-Host 'Serving CONFIG on http://localhost:5200' -ForegroundColor Cyan; npx --yes serve -l 5200"
  })
}

# LOGOS :5201
if (-not (Test-Path $logos)) {
  Write-Warning "[LOGOS] folder missing - skip :5201  ($logos)"
} elseif (Test-PortListening -Port 5201) {
  Write-Host "[LOGOS] already running on :5201" -ForegroundColor Yellow
} else {
  Write-Host "[LOGOS] queue tab  npx serve -l 5201  ->  $logos" -ForegroundColor Green
  $tabs.Add([pscustomobject]@{
    Title     = 'LOGOS-5201'
    Directory = $logos
    Command   = "Write-Host 'Serving LOGOS on http://localhost:5201' -ForegroundColor Cyan; npx --yes serve -l 5201"
  })
}

Start-ServerTabs -Tabs $tabs.ToArray()

# Wait for servers (npx serve can take 10-30s on cold start).
$expectedPorts = @(5198, 5199, 5200, 5201)
$deadline = (Get-Date).AddSeconds(45)
while ((Get-Date) -lt $deadline) {
  $up = @($expectedPorts | Where-Object { Test-PortListening -Port $_ })
  if ($needSvgWait -and -not (Test-FenceBookPreviewBridge)) {
    Start-Sleep -Milliseconds 800
    continue
  }
  if ($up.Count -ge 1) { break }
  Start-Sleep -Milliseconds 800
}

if ($needSvgWait) {
  if (Test-FenceBookPreviewBridge) {
    Write-Host "[SVG] bridge OK (/api/desktop/status)" -ForegroundColor Green
  } else {
    Write-Warning "[SVG] bridge not ready yet - open http://localhost:5199/ and hard-refresh if needed"
  }
}

$listening = @($expectedPorts | Where-Object { Test-PortListening -Port $_ })
if ($listening.Count -eq 0 -and $tabs.Count -gt 0) {
  Write-Warning "No demo ports listening yet after launch - servers may still be starting (watch the new windows for npx errors)."
} else {
  Write-Host ("Listening: " + (($listening | ForEach-Object { ":$_" }) -join ' ')) -ForegroundColor Green
}

$hub = Join-Path $PSScriptRoot "index.html"
# Prefer C: canonical when present
$cHub = "C:\Users\TwoLe\Lew-Line-Workspaces\demo-home\index.html"
if (Test-Path $cHub) { $hub = $cHub }

Start-Sleep -Seconds 1
Write-Host ""
Write-Host "Opening Demo Home in Chrome Canary (owner@fenceframes)..." -ForegroundColor Cyan
$openFf = Join-Path $PSScriptRoot "open-ff-chrome.ps1"
if (Test-Path $openFf) {
  & $openFf $hub
} else {
  Write-Warning "open-ff-chrome.ps1 missing - falling back to default browser"
  Start-Process $hub
}

Write-Host ""
Write-Host "When servers are up:" -ForegroundColor Green
Write-Host "  Site    http://localhost:5198/   (npx serve - Design wix-pages)"
Write-Host "  SVG     http://localhost:5199/   (FenceBook preview-server.js - live assets)"
Write-Host "  Config  http://localhost:5200/   (npx serve - public/configure embed)"
Write-Host "  Logos   http://localhost:5201/   (npx serve - brand/logos v2 previews)"
Write-Host "Stop with .\stop-servers.ps1 or close the Windows Terminal tabs/window."
