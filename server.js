const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;
const ROOT = path.resolve('D:/Lew-Line-Workspaces/Fence-Frames-Public-Website');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);

  // Proxy API calls to site-builder-server on port 3031
  if (reqPath.startsWith('/api/')) {
    const proxyReq = http.request({
      hostname: '127.0.0.1',
      port: 3031,
      path: req.url,
      method: req.method,
      headers: req.headers
    }, (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Site builder server unreachable', details: err.message }));
    });

    req.pipe(proxyReq, { end: true });
    return;
  }

  if (reqPath === '/') reqPath = '/founder-preflight-studio.html';
  let filePath = path.join(ROOT, reqPath);

  if (!fs.existsSync(filePath)) {
    const publicPath = path.join(ROOT, 'public', reqPath);
    if (fs.existsSync(publicPath)) {
      filePath = publicPath;
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 Not Found: ' + reqPath);
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log('Fence Frames Node HTTP Server running at http://localhost:' + PORT);
});
