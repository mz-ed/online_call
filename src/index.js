import express from 'express';
import { createServer } from 'http';
import setupWebSocket from './websocket.js';
import { config } from './config/config.js';

const app = express();
app.use(express.static('public')); // optional: serve frontend files

const server = createServer(app);

// WebSocket setup
setupWebSocket(server);

server.listen(config.PORT, () => {
  console.log(`Server running on http://localhost:${config.PORT}`);
});