import socketIoClient from "socket.io-client";

const socketUrl = process.env.REACT_APP_SOCKET_URL;

if (!socketUrl) {
  throw new Error('socket url missing')
}

export const socket = socketIoClient(socketUrl);
