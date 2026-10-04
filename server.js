// server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to map file extensions to correct Content-Types
const getContentType = (ext) => {
  switch (ext) {
    case '.html': return 'text/html';
    case '.css': return 'text/css';
    case '.js': return 'application/javascript';
    case '.png': return 'image/png';
    case '.jpg': return 'image/jpeg';
    default: return 'text/plain';
  }
};

const server = createServer(async (req, res) => {
  // If the user visits root '/', default to 'index.html'
  let safePath = req.url === '/' ? '/index.html' : req.url;
  
  // Prevent path traversal tricks
  const filePath = join(__dirname, safePath);
  const ext = extname(filePath);

  try {
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': getContentype(ext) });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3003, '0.0.0.0', () => {
  console.log('Listening on http://0.0.0.0:3003');
});