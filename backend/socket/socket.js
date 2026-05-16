import { Server } from "socket.io";

let io;

// ================= INIT SOCKET =================
export const initSocket = (
  server
) => {

  io = new Server(server, {
    cors: {
      origin:
        process.env.CLIENT_URL,

      credentials: true,
    },
  });

  io.on(
    "connection",
    (socket) => {

      console.log(
        "User connected:",
        socket.id
      );

      socket.on(
        "disconnect",
        () => {

          console.log(
            "User disconnected:",
            socket.id
          );

        }
      );

    }
  );

  return io;
};

// ================= GET IO INSTANCE =================
export const getIO = () => {

  if (!io) {

    throw new Error(
      "Socket.io not initialized"
    );

  }

  return io;
};