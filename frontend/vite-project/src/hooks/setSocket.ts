import { useEffect, useState } from "react";

// this hook will basically create a socket connection for us, and return to us the socket
export default function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      setSocket(ws);
    };

    ws.onclose = () => {
      setSocket(null);
    };

    ws.onmessage = (evt) => {
      const saman = JSON.parse(evt.data);
      console.log(saman);
    };

    return () => {
      ws.close();
    };
  }, []);
  return socket;
}
