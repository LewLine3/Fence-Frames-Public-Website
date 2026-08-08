<#
.SYNOPSIS
  Stop demo servers on ports 5198, 5199, 5200, 5201.
#>
$ports = 5198, 5199, 5200, 5201
foreach ($port in $ports) {
  $conns = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue
  if (-not $conns) {
    Write-Host ":$port - nothing listening" -ForegroundColor DarkGray
    continue
  }
  $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
  foreach ($procId in $pids) {
    try {
      $p = Get-Process -Id $procId -ErrorAction Stop
      Write-Host ":$port - stopping PID $procId ($($p.ProcessName))" -ForegroundColor Yellow
      Stop-Process -Id $procId -Force -ErrorAction Stop
    } catch {
      Write-Warning ":$port - could not stop PID $procId - $_"
    }
  }
}
Write-Host "Done." -ForegroundColor Green
