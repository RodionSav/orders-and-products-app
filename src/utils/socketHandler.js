import { Server } from "socket.io";

let io;

const initializeSocket = (server) => {
  if (!io) {
    io = new Server(server, {
      path: "/api/socket",
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      },
    });

    let activeSessions = 0;

    io.on("connection", (socket) => {
      activeSessions++;
      io.emit("activeSessions", activeSessions);

      socket.on("disconnect", () => {
        activeSessions--;
        io.emit("activeSessions", activeSessions);
      });
    });
  }
  return io;
};

export default initializeSocket;
