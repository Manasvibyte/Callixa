import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "node:http";

import initializeSocket from "./sockets/initializeSocket.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import meetingRoutes from "./routes/meeting.routes.js";

dotenv.config();

connectDB();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); //localhost:5000/api/auth/register
app.use("/api/users", userRoutes);
app.use("/api/meetings", meetingRoutes);

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Callixa API is running 🚀",
  });
});

// Initialize Socket.IO
initializeSocket(server);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
