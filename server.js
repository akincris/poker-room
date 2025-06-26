import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { v4 as uuidv4 } from 'uuid';

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const maxPlayersPerRoom = 5;

const rooms = {};

const findRoom = (rooms) => {
  for (const key of Object.keys(rooms)) {
    if (rooms[key]?.length < maxPlayersPerRoom) {
      return key;
    }
  }
};

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket) => {
    console.info("Server Connected");

    socket.on("playerRegister", (player) => {
      let roomId = findRoom(rooms);

      if (!roomId) {
        let newRoomId = uuidv4();

        rooms[newRoomId] = [];
        roomId = newRoomId;
      }

      rooms[roomId] = [...rooms[roomId], player];
      socket.join(roomId);

      io.to(roomId).emit("roomData", {
        id: roomId,
        players: rooms[roomId],
      });
    });

    socket.on("playerDisconnect", ({ player, roomId }) => {
      rooms[roomId] = rooms[roomId]?.filter((p) => p.name != player.name);
      socket.join(roomId);

      io.to(roomId).emit("roomData", {
        id: roomId,
        players: rooms[roomId],
      });
    });

    socket.on("playerVote", ({ player, roomId }) => {
      rooms[roomId] = rooms[roomId].map((p) => {
        if (p.name == player.name) {
          return player;
        }
        return p;
      });
      socket.join(roomId);

      io.to(roomId).emit("roomData", {
        id: roomId,
        players: rooms[roomId],
      });
    });
  });

  io.listen(4000);

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port);
});
