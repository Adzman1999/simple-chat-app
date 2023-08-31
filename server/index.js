const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");

app.use(cors());

app.use(express.json());

// Navigate On Env
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "./config/.env",
  });
}

// Imported Routes
const User = require("./routes/UserRoute");
app.use("/api/user", User);

const Chat = require("./routes/ChatRoute");
app.use("/api/chat", Chat);

const Message = require("./routes/MessageRoute");
app.use("/api/message", Message);

// Deployment
app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

// For API Error Handling
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware");
app.use(notFound);
app.use(errorHandler);

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server for Handling uncaught Exception`);
});

// Connect to Database
const connectDB = require("./config/Database");
connectDB();

// Connect to Localhost Server
const server = app.listen(
  process.env.PORT,
  console.log(`Server runs on port ${process.env.PORT}`)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");

  socket.on("setup", (userInfo) => {
    socket.join(userInfo._id);
    socket.emit("connected");
    console.log("Id: " + userInfo._id + " Name: " + userInfo.name);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

// For Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server for ${err.message}`);
  console.log(`Shutting down the server due to Unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
