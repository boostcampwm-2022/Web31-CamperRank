import express from 'express';
import * as http from 'http';
import { Server, Socket } from 'socket.io';

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

io.on('connection', (socket: Socket) => {
  socket.on('hello', (data) => {
    console.log(data);
  });
});

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
