import e from "cors";
import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
const App = () => {
  // const socket = io("http://localhost:5000/");
  const socket = useMemo(() => {
    io("http://localhost:5000/");
  }, []);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log(`user connected ${socket.id}`);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    //sending data
    socket.emit("message", message);
    console.log(`message :"${message}" send by ${socket.id}`);

    // socket.broadcast.emit();
    socket.on("for-all", (res) => console.log(res));
  };
  return (
    <>
      <div>
        <div>
          <h1 className="text-3xl font-bold text-blue-600">Chat App </h1>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="type message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>

          <button type="submit" className="btn">
            send
          </button>
        </form>
      </div>
    </>
  );
};

export default App;
