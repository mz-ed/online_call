const rooms = {}; // { roomId: [ws1, ws2] }

export function joinRoom(roomId, ws) {
  if (!rooms[roomId]) {
    rooms[roomId] = [];
  }

  // Don't allow more than 2 peers per room
  if (rooms[roomId].length >= 2) {
    return false; // room full
  }

  rooms[roomId].push(ws);
  return true;
}

export function leaveRoom(ws) {
  for (const roomId in rooms) {
    rooms[roomId] = rooms[roomId].filter(client => client !== ws);

    if (rooms[roomId].length === 0) {
      delete rooms[roomId];
    }
  }
}

export function getOtherPeer(ws, roomId) {
  const peers = rooms[roomId] || [];
  return peers.find(client => client !== ws);
}