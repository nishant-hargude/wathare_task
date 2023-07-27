// server/server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socketIO = require("socket.io");
const http = require("http");
const dataRoutes = require("./routes/dataRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 3001;

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/my_realtime_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up WebSocket connection
io.on("connection", (socket) => {
  console.log("A client connected");

  // Emit a message to the client on connection
  socket.emit("message", "You are connected!");

  // Handle client disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

// Use dataRoutes for API endpoints
app.use("/api/data", dataRoutes);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
