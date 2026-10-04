// server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

// Get the current directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer(async (req, res) => {
  try {
    // Build the path to index.html in the same folder
    const filePath = join(__dirname, 'index.html');
    
    // Read the HTML file
    const data = await readFile(filePath);

    // Send a 200 OK response with HTML content type
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  } catch (err) {
    // If index.html is missing, return a 404 error
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found: index.html is missing');
  }
});

// starts a simple http server locally on port 3003
server.listen(3003, '0.0.0.0', () => {
  console.log('Listening on http://0.0.0.0:3003');
});