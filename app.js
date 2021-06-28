const express = require("express");
const app = express();

let broadcaster;
const port = 4000;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);

io.sockets.on("error", (e) => console.log(e));
io.sockets.on("connection", (socket) => {
  socket.on("broadcaster-camera1", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster-camera1");
  });
  socket.on("watcher-camera1", () => {
    socket.to(broadcaster).emit("watcher-camera1", socket.id);
  });
  socket.on("offer-camera1", (id, message) => {
    socket.to(id).emit("offer-camera1", socket.id, message);
  });
  socket.on("answer-camera1", (id, message) => {
    socket.to(id).emit("answer-camera1", socket.id, message);
  });
  socket.on("candidate-camera1", (id, message) => {
    socket.to(id).emit("candidate-camera1", socket.id, message);
  });

  //camera2

  socket.on("broadcaster-camera2", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster-camera2");
  });
  socket.on("watcher-camera2", () => {
    socket.to(broadcaster).emit("watcher-camera2", socket.id);
  });
  socket.on("offer-camera2", (id, message) => {
    socket.to(id).emit("offer-camera2", socket.id, message);
  });
  socket.on("answer-camera2", (id, message) => {
    socket.to(id).emit("answer-camera2", socket.id, message);
  });
  socket.on("candidate-camera2", (id, message) => {
    socket.to(id).emit("candidate-camera2", socket.id, message);
  });
  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });
});
server.listen(process.env.PORT || port, () =>
  console.log(`Server is running on port ${port}`)
);
