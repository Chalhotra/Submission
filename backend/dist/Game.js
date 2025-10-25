"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
class Game {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.state = new chess_js_1.Chess();
        this.startTime = new Date();
        //randomise white and black
        this.player1.ws.send(JSON.stringify({
            type: `init_game`,
            data: `the game has started, you are: white`,
        }));
        this.player2.ws.send(JSON.stringify({
            type: `init_game`,
            data: `the game has started, you are: black`,
        }));
        // this.state.setTurn("w");s
    }
    makeMove(player, move) {
        //after making move, check if the move is valid
        // check for game over
        if (this.state.turn() == "w" && player !== this.player1) {
            this.player2.ws.send(JSON.stringify({
                type: "invalid",
                data: "this isn't ur chance to play",
            }));
            return;
        }
        if (this.state.turn() == "b" && player !== this.player2) {
            this.player1.ws.send(JSON.stringify({
                type: "invalid",
                data: "this isn't ur chance to play",
            }));
            return;
        }
        try {
            this.state.move(move);
            if (player === this.player1) {
                this.player2.ws.send(JSON.stringify({
                    type: `move`,
                    data: `p1 played the move ${move.from}${move.to}`,
                }));
            }
            else {
                this.player1.ws.send(JSON.stringify({
                    type: `move`,
                    data: `p2 played the move ${move.from}${move.to}`,
                }));
            }
            if (this.state.isGameOver()) {
                this.player1.ws.send(JSON.stringify({
                    type: "game_over",
                    data: `the game ended with ${this.state.turn() == "b" ? "white" : "black"} winning`,
                }));
            }
        }
        catch (e) {
            console.log(e);
            return;
        }
    }
}
exports.Game = Game;
