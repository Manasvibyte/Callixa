import { Server } from "socket.io";

const initializeSocket = (server) => {
  //Initialize Socket.IO
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log(`🟢 ${socket.id} connected`);

    // User joins a meeting
    socket.on("join-meeting", (meetingId) => {
      socket.join(meetingId);

      console.log(`${socket.id} joined ${meetingId}`);

      // Number of users currently in the room
      const room = io.sockets.adapter.rooms.get(meetingId);

      // Convert Set -> Array
      const users = room ? [...room] : [];

      // Broadcast the updated participants list to everyone in the meeting
      io.to(meetingId).emit("room-users", users);

      // Notify existing participants about the newly joined user
      socket.to(meetingId).emit("user-joined", socket.id);
    });

    // Events: offer, answer, ice-candidate
    // Forward WebRTC offer
    socket.on("offer", ({ target, offer }) => {
      io.to(target).emit("offer", {
        sender: socket.id,
        offer,
      });
    });

    // Forward WebRTC answer
    socket.on("answer", ({ target, answer }) => {
      io.to(target).emit("answer", {
        sender: socket.id,
        answer,
      });
    });

    // Forward ICE candidate
    socket.on("ice-candidate", ({ target, candidate }) => {
      io.to(target).emit("ice-candidate", {
        sender: socket.id,
        candidate,
      });
    });

    // Listen for chat messages
    socket.on("chat-message", ({ meetingId, message }) => {
      io.to(meetingId).emit("chat-message", {
        sender: socket.id,
        message,
      });
    });

    // Before the socket leaves the room
    socket.on("disconnecting", () => {
      socket.rooms.forEach((room) => {
        // Wait until socket actually leaves the room
        if (room !== socket.id) {
          setTimeout(() => {
            const currentRoom = io.sockets.adapter.rooms.get(room);

            const users = currentRoom ? [...currentRoom] : [];

            io.to(room).emit("room-users", users);
          }, 0);
        }
      });

      console.log(`🔴 ${socket.id} disconnected`);
    });
  });

  return io;
};

export default initializeSocket;
