// server.mjs
import { createServer } from 'node:http';

const server = createServer(async (req, res) => {
  try {

  const filePath ='index.html';
  const data = await readFile(filePath);

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(data);
} catch (err) {
  // If index.html is missing, return a 404 error
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found: index.html is missing');
}
});

// starts a simple http server locally on port 3000
server.listen(3003, '0.0.0.0', () => {
  console.log('Listening on 0.0.0.0:3003');
});

// run with `node server.mjs`