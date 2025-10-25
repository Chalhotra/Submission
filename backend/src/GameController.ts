import { Game } from "./Game";
import { Player } from "./Player";

export class GameController {
  private games: Game[];
  private users: Player[];
  private pendingUser: Player | null;

  constructor() {
    this.games = [];
    this.users = [];
    this.pendingUser = null;
  }

  addPlayer(player: Player) {
    this.users.push(player);
    this.addMessageHandler(player);
  }
  removePlayer(player: Player) {
    this.users.filter((user) => user !== player);
  }

  addMessageHandler(player: Player) {
    player.ws.on("message", (data) => {
      const msg = JSON.parse(data.toString());
      console.log(msg);
      if (msg.type == "init_game") {
        if (this.pendingUser != null) {
          const game = new Game(this.pendingUser, player);
          this.games.push(game);
          this.pendingUser = null;
        } else {
          this.pendingUser = player;
          player.ws.send(JSON.stringify({ data: "Looking for players 🔎" }));
          console.log(this.pendingUser);
        }
      } else if (msg.type == "move") {
        const game = this.games.find(
          (game) => game.player1 === player || game.player2 === player
        );
        game!.makeMove(player, msg.move);
      } else if (msg.type == "leave") {
        return;
      }
    });
  }
}
