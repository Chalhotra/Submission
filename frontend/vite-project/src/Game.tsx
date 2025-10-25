import { useEffect, useState } from "react";
import { Chessboard } from "./components/Chessboard";
import useSocket from "./hooks/setSocket";
import { Chess } from "chess.js";

export default function Game() {
  const socket = useSocket();

  const [chess, setChess] = useState(new Chess());
  const [board, setBoard] = useState(chess.board);

  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      if (data.type == "init_game") {
        const game = new Chess();
        setChess(game);
        setBoard(game.board);
        console.log(game.board);
      }
    };
  }, [socket]);
  return (
    <div className="bg-slate-800 h-screen flex flex-row">
      <Chessboard board={board} />
    </div>
  );
}
