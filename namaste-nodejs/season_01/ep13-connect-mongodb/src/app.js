import './database.js';
import http from 'http';

const PORT = 3800;
const server = http.createServer((req, res) => {
  if (req.url === '/greeting') {
    return res.end('Hello World');
  }
  res.end('OK');
});

server
  .listen(PORT)
  .on('connection', () => console.log('Client connected to the HTTP Server'));
