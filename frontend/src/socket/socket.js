import { io } from "socket.io-client";

const socket = io("https://callixa-api.onrender.com", {
  autoConnect: false, //connect only when the user enters a meeting
});

export default socket;
