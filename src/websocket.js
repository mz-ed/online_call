import { WebSocketServer } from 'ws';
import { handleMessage } from './webrtc/signaling.js';

export default function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', data => {
      try {
        const message = JSON.parse(data);
        handleMessage(ws, message);
      } catch (err) {
        console.error('Invalid message', err);
      }
    });

    ws.on('close', () => {
      console.log('Client disconnected');
      handleMessage(ws, { type: 'leave' });
    });
  });

  return wss;
}