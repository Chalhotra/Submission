"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameController_1 = require("./GameController");
const Player_1 = require("./Player");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameController = new GameController_1.GameController();
let players = 0;
wss.on("connection", function connection(ws) {
    let player = new Player_1.Player(ws, ++players);
    console.log(player);
    gameController.addPlayer(player);
    ws.on("disconnect", () => {
        gameController.removePlayer(player);
    });
});
