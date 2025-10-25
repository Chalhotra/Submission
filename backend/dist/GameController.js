"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameController = void 0;
const Game_1 = require("./Game");
class GameController {
    constructor() {
        this.games = [];
        this.users = [];
        this.pendingUser = null;
    }
    addPlayer(player) {
        this.users.push(player);
        this.addMessageHandler(player);
    }
    removePlayer(player) {
        this.users.filter((user) => user !== player);
    }
    addMessageHandler(player) {
        player.ws.on("message", (data) => {
            const msg = JSON.parse(data.toString());
            console.log(msg);
            if (msg.type == "init_game") {
                if (this.pendingUser != null) {
                    const game = new Game_1.Game(this.pendingUser, player);
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else {
                    this.pendingUser = player;
                    player.ws.send(JSON.stringify({ data: "Looking for players 🔎" }));
                    console.log(this.pendingUser);
                }
            }
            else if (msg.type == "move") {
                const game = this.games.find((game) => game.player1 === player || game.player2 === player);
                game.makeMove(player, msg.move);
            }
            else if (msg.type == "leave") {
                return;
            }
        });
    }
}
exports.GameController = GameController;
