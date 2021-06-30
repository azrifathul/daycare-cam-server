const express = require("express");
const app = express();

const port = 4000;
let broadcaster;
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
    broadcaster = socket.id;
    socket.broadcast.emit("broadcaster");
  });
  socket.on("watcher", () => {
    socket.to(broadcaster).emit("watcher", socket.id);
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
});

server.listen(process.env.PORT || port, () =>
  console.log(`Server is running on port ${port}`)
);
