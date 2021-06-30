const express = require("express");
const app = express();

let broadcaster1;
let broadcaster2;

const port = 4000;

const http = require("http");
const server = http.createServer(app);

const io = require("socket.io")(server);

// var twilio = require("twilio");

// const accountSid = "ACd6fd42f9dd81c44681cf16a8db05a0de";
// const authToken = "a101e96e3316f0b6f27fd4045c1c60c3";
// const client = require("twilio")(accountSid, authToken);

// client.tokens.create({ ttl: 160000 }).then((token) => console.log(token));

io.sockets.on("error", (e) => console.log(e));
io.sockets.on("connection", (socket) => {
  socket.on("broadcaster", () => {
    broadcaster1 = socket.id;
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () => {
    socket.to(broadcaster1).emit("watcher", socket.id);
  });
  socket.on("offer", (id, message) => {
    socket.to(id).emit("offer", socket.id, message);
  });
  socket.on("answer", (id, message) => {
    socket.to(id).emit("answer", socket.id, message);
  });
  socket.on("candidate", (id, message) => {
    socket.to(id).emit("candidate", socket.id, message);
  });

  //camera2

  // socket.on("broadcaster-infant", () => {
  //   broadcaster2 = socket.id;
  //   socket.broadcast.emit("broadcaster-infant");
  //   console.log("cek broadcast infant");
  // });
  // socket.on("watcher-infant", () => {
  //   socket.to(broadcaster2).emit("watcher-infant", socket.id);
  // });
  // socket.on("offer-infant", (id, message) => {
  //   socket.to(id).emit("offer-infant", socket.id, message);
  // });
  // socket.on("answer-infant", (id, message) => {
  //   socket.to(id).emit("answer-infant", socket.id, message);
  // });
  // socket.on("candidate-infant", (id, message) => {
  //   socket.to(id).emit("candidate-infant", socket.id, message);
  // });
  // socket.on("disconnect", () => {
  //   socket.to(broadcaster2).emit("disconnectPeer", socket.id);
  // });
  // console.log(broadcaster1);
});

server.listen(process.env.PORT || port, () =>
  console.log(`Server is running on port ${port}`)
);
