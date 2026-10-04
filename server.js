// server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer(async (req, res) => {
  let fileName = req.url === '/' ? 'index.html' : req.url;

  // If the browser asks for ANY css file, force it to serve style.css from the folder
  if (extname(fileName) === '.css') {
    fileName = 'style.css';
  }

  const filePath = join(__dirname, fileName);

  try {
    const data = await readFile(filePath);
    
    // Determine the content type
    const contentType = extname(filePath) === '.css' ? 'text/css' : 'text/html';

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(3003, '0.0.0.0', () => {
  console.log('Listening on http://0.0.0.0:3003');
});