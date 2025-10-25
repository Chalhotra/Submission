import { Player } from "./Player";
import { Chess } from "chess.js";

export class Game {
  public whitePlayer: Player;
  public blackPlayer: Player;
  public board: Chess;
  public startTime: Date;

  constructor(player1: Player, player2: Player) {
    this.whitePlayer = player1;
    this.blackPlayer = player2;
    this.board = new Chess();
    this.startTime = new Date();

    // Initialize players
    this.whitePlayer.ws.send(
      JSON.stringify({
        type: "init_game",
        data: "Game started! You are playing as white.",
      })
    );
    this.blackPlayer.ws.send(
      JSON.stringify({
        type: "init_game",
        data: "Game started! You are playing as black.",
      })
    );
  }

  makeMove(player: Player, move: { from: string; to: string }) {
    // Ensure correct turn
    if (this.board.turn() === "w" && player !== this.whitePlayer) {
      this.blackPlayer.ws.send(
        JSON.stringify({
          type: "invalid",
          data: "It's not your turn to move.",
        })
      );
      return;
    }

    if (this.board.turn() === "b" && player !== this.blackPlayer) {
      this.whitePlayer.ws.send(
        JSON.stringify({
          type: "invalid",
          data: "It's not your turn to move.",
        })
      );
      return;
    }

    try {
      this.board.move(move);

      const message = {
        type: "move",
        data: `${player === this.whitePlayer ? "White" : "Black"} played ${
          move.from
        }${move.to}`,
      };

      if (player === this.whitePlayer) {
        this.blackPlayer.ws.send(JSON.stringify(message));
      } else {
        this.whitePlayer.ws.send(JSON.stringify(message));
      }

      // Check for game over condition
      if (this.board.isGameOver()) {
        const winner = this.board.turn() === "b" ? "White" : "Black";
        this.whitePlayer.ws.send(
          JSON.stringify({
            type: "game_over",
            data: `The game has ended. ${winner} wins!`,
          })
        );
        this.blackPlayer.ws.send(
          JSON.stringify({
            type: "game_over",
            data: `The game has ended. ${winner} wins!`,
          })
        );
      }
    } catch (err) {
      console.error("Invalid move:", err);
      return;
    }
  }
}
