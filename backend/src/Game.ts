import { Player } from "./Player";
import { Chess } from "chess.js";
export class Game {
  public player1: Player;
  public player2: Player;
  public state: Chess;
  public startTime: Date;

  constructor(player1: Player, player2: Player) {
    this.player1 = player1;
    this.player2 = player2;
    this.state = new Chess();
    this.startTime = new Date();
    //randomise white and black
    this.player1.ws.send(
      JSON.stringify({
        type: `init_game`,
        data: `the game has started, you are: white`,
      })
    );
    this.player2.ws.send(
      JSON.stringify({
        type: `init_game`,
        data: `the game has started, you are: black`,
      })
    );
    // this.state.setTurn("w");s
  }

  makeMove(
    player: Player,
    move: {
      from: string;
      to: string;
    }
  ) {
    //after making move, check if the move is valid
    // check for game over
    if (this.state.turn() == "w" && player !== this.player1) {
      this.player2.ws.send(
        JSON.stringify({
          type: "invalid",
          data: "this isn't ur chance to play",
        })
      );
      return;
    }
    if (this.state.turn() == "b" && player !== this.player2) {
      this.player1.ws.send(
        JSON.stringify({
          type: "invalid",
          data: "this isn't ur chance to play",
        })
      );
      return;
    }
    try {
      this.state.move(move);
      if (player === this.player1) {
        this.player2.ws.send(
          JSON.stringify({
            type: `move`,
            data: `p1 played the move ${move.from}${move.to}`,
          })
        );
      } else {
        this.player1.ws.send(
          JSON.stringify({
            type: `move`,
            data: `p2 played the move ${move.from}${move.to}`,
          })
        );
      }
      if (this.state.isGameOver()) {
        this.player1.ws.send(
          JSON.stringify({
            type: "game_over",
            data: `the game ended with ${
              this.state.turn() == "b" ? "white" : "black"
            } winning`,
          })
        );
      }
    } catch (e) {
      console.log(e);
      return;
    }
  }
}
