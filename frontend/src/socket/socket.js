import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  autoConnect: false, //connect only when the user enters a meeting
});

export default socket;
