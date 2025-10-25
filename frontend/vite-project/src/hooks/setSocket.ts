import { useEffect, useState } from "react";

export default function useSocket() {
  const [connection, setConnection] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");

    socket.onopen = () => {
      console.log("WebSocket connected");
      setConnection(socket);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      setConnection(null);
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("Incoming message:", data);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  return connection;
}
