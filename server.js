import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { nanoid } from "nanoid";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const maxPlayersPerRoom = 5;

const rooms = {};

const findRoom = (rooms) => {
  for (const key of Object.keys(rooms)) {
    if (rooms[key].length < maxPlayersPerRoom) {
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

    socket.on("register", (player) => {
      let roomId = findRoom(rooms);

      if (!roomId) {
        let newRoomId = nanoid(10);
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

    socket.on("playerDisconnected", ({ player, roomId }) => {
      rooms[roomId] = rooms[roomId].filter((p) => p.name != player.name);
      socket.join(roomId);

      io.to(roomId).emit("roomData", {
        id: roomId,
        players: rooms[roomId],
      });
    });

    socket.on("getRoomData", (roomId) => {
      socket.join(roomId);

      if (rooms[roomId]) {
        io.to(roomId).emit("roomData", {
          id: roomId,
          players: rooms[roomId],
        });
      } else {
        io.to(roomId).emit("roomData", null);
      }
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
