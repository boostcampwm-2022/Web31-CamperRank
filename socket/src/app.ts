import express from 'express';
import * as http from 'http';
import { Server } from 'socket.io';

const app = express();
const socketServerPort = 3333;
const httpServer = http.createServer(app).listen(socketServerPort);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    credentials: true,
    methods: ['GET', 'POST'],
  },
  cookie: true,
});

function logging(msg: string, param?: string) {
  if (!param) {
    console.log(`[${new Date().toLocaleString()}]  ${msg}`);
    return;
  }
  console.log(`[${new Date().toLocaleString()}]  ${msg}: ${param}`);
}

io.on('connection', (socket) => {
  logging('user joined server');
  socket.on('join-room', (roomId, userId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (room && room.size >= 3) {
      logging('room is full, out userId: ', userId);
      socket.emit('full');
      return;
    }

    logging('join userId: ', userId);
    logging('roomId: ', roomId);

    socket.join(roomId);
    socket.to(roomId).emit('user-connected', userId);

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user-disconnected', userId);
    });
  });

  socket.on('change-language', (roomId, code) => {
    logging('roomId: ', roomId);
    logging('code: ', code);
    socket.to(roomId).emit('change-language', code);
  });
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
