# PowerShell script to host Component Review Slideshow across local network
$Port = 8085
$IPs = Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.IPAddress -notlike "127.*" -and $_.IPAddress -notlike "169.254.*" } | Select-Object -ExpandProperty IPAddress

Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host "   FENCE FRAMES — COMPONENT REVIEW SLIDESHOW SERVER      " -ForegroundColor Green
Write-Host "=========================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Local Machine Access:" -ForegroundColor Yellow
Write-Host "  -> http://localhost:$Port" -ForegroundColor White
Write-Host "  -> http://127.0.0.1:$Port" -ForegroundColor White
Write-Host ""
Write-Host "Other Devices on your Wi-Fi / Local Network:" -ForegroundColor Yellow
foreach ($ip in $IPs) {
  Write-Host "  -> http://${ip}:$Port" -ForegroundColor White
}
Write-Host ""
Write-Host "Press Ctrl+C to stop the server." -ForegroundColor Gray
Write-Host "=========================================================" -ForegroundColor Cyan

python -m http.server $Port --bind 0.0.0.0
