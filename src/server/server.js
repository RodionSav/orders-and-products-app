const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = new Server(httpServer, {cors: {origin: 'http://localhost:3001/', methods: ['POST', 'GET']}});

  let activeSessions = 0;

  io.on('connection', (socket) => {
    activeSessions++;
    io.emit('sessionCount', activeSessions);

    socket.on('disconnect', () => {
      activeSessions--;
      io.emit('sessionCount', activeSessions);
    });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
  });
});
