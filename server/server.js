import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { Socket } from "net";

const PORT = 5000;
const app = express();
const server = createServer(app);

//io -> created an instance of circuit
const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected with socketID : ${socket.id}`);
  // socket.emit("greetings", `welcome ${socket.id} to the server`);
  // socket.broadcast.emit("greetings", `user ${socket.id} has joined`);

  socket.on("disconnect", () => {
    console.log(`disconnected ${socket.id}`);
  });

  //acquiring data from frontend
  socket.on("message", (data) => {
    console.log(data.message);
    //send received message to all sockets in circuit
    io.emit("for-all", data.message);
    //send received message to all sockets in circuit except you
    socket.broadcast.emit("except-me", data.message);
    //send received message to specific user
    socket.to(data.room).emit("only4u", data.message);
  });
});

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello ");
});

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
