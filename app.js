const express = require("express");
const app = express();

let broadcaster;
const port = 4000;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);

io.sockets.on("error", (e) => console.log(e));
io.sockets.on("connection", (socket) => {
  socket.on("broadcaster-toddler", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster-toddler");
  });
  socket.on("watcher-toddler", () => {
    socket.to(broadcaster).emit("watcher-toddler", socket.id);
  });
  socket.on("offer-toddler", (id, message) => {
    socket.to(id).emit("offer-toddler", socket.id, message);
  });
  socket.on("answer-toddler", (id, message) => {
    socket.to(id).emit("answer-toddler", socket.id, message);
  });
  socket.on("candidate-toddler", (id, message) => {
    socket.to(id).emit("candidate-toddler", socket.id, message);
  });

  //camera2

  socket.on("broadcaster-infant", () => {
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster-infant");
  });
  socket.on("watcher-infant", () => {
    socket.to(broadcaster).emit("watcher-infant", socket.id);
  });
  socket.on("offer-infant", (id, message) => {
    socket.to(id).emit("offer-infant", socket.id, message);
  });
  socket.on("answer-infant", (id, message) => {
    socket.to(id).emit("answer-infant", socket.id, message);
  });
  socket.on("candidate-infant", (id, message) => {
    socket.to(id).emit("candidate-infant", socket.id, message);
  });
  socket.on("disconnect", () => {
    socket.to(broadcaster).emit("disconnectPeer", socket.id);
  });
});
server.listen(process.env.PORT || port, () =>
  console.log(`Server is running on port ${port}`)
);
