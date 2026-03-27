import { joinRoom, leaveRoom, getOtherPeer } from '../rooms/roomManager.js';

export function handleMessage(ws, message) {
  const { type, payload, roomId } = message;

  switch(type) {
    case 'join':
      const success = joinRoom(roomId, ws);
      ws.send(JSON.stringify({ type: 'join', success }));
      break;

    case 'offer':
    case 'answer':
    case 'ice-candidate':
      const peer = getOtherPeer(ws, roomId);
      if (peer && peer.readyState === 1) {
        peer.send(JSON.stringify({ type, payload }));
      }
      break;

    case 'leave':
      leaveRoom(ws);
      break;
  }
}