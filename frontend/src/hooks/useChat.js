import { useEffect, useRef, useState } from "react";
import socket from "../socket/socket";

const useChat = (meetingId) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    socket.emit("chat-message", {
      meetingId,
      message,
    });

    setMessage("");
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on("chat-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  // Automatically scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return {
    messages,
    message,
    setMessage,
    messagesEndRef,
    handleSendMessage,
  };
};

export default useChat;
