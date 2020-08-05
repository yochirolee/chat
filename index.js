var express = require("express");
const path = require("path");
const http = require("http");
var app = express();
var server = http.createServer(app);
var socketio = require("socket.io");
var io = socketio(server);
const formatMessage = require("./utils/formatMessage");
const { format } = require("path");

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
 
  //broadcast when a user connect
  socket.broadcast.emit("message", formatMessage("Chat", "A User has Joined"));

  socket.on("disconnect", () => {
    io.emit("message", "User has Left the Chat");
  });
  socket.on("chatMessage", (msg) => {
    io.emit("message",formatMessage('user',msg));
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
