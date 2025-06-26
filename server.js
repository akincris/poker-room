import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const maxPlayersPerRoom = parseInt(
  process.env.NEXT_PUBLIC_MAX_PLAYERS_PER_ROOM || "5"
);

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
      let id = findRoom(rooms);

      if (!id) {
        let newRoomId = uuidv4();

        rooms[newRoomId] = [];
        id = newRoomId;
      }

      rooms[id] = [...rooms[id], player];
      socket.join(id);

      io.to(id).emit("registered", {
        id: id,
        players: rooms[id],
      });
    });

    socket.on("playerDisconnect", ({ player, roomId: id }) => {
      rooms[id] = rooms[id]?.filter((p) => p.name != player.name);
      socket.join(id);

      io.to(id).emit("roomData", {
        id: id,
        players: rooms[id],
      });
    });

    socket.on("resetVotes", ({ roomId: id }) => {
      rooms[id] = rooms[id]?.map(({ name }) => ({ name }));
      socket.join(id);

      io.to(id).emit("roomData", {
        id: id,
        players: rooms[id],
      });
    });
    socket.on("playerVote", ({ player, roomId: id }) => {
      rooms[id] = rooms[id].map((p) => {
        if (p.name == player.name) {
          return player;
        }
        return p;
      });
      socket.join(id);

      io.to(id).emit("roomData", {
        id: id,
        players: rooms[id],
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
