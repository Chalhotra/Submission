import { WebSocketServer } from "ws";
import { GameController } from "./GameController";
import { isPartiallyEmittedExpression } from "typescript";
import { Player } from "./Player";

const wss = new WebSocketServer({ port: 8080 });
const gameController = new GameController();
let players = 0;
wss.on("connection", function connection(ws) {
  let player = new Player(ws, ++players);
  console.log(player);
  gameController.addPlayer(player);
  ws.on("disconnect", () => {
    gameController.removePlayer(player);
  });
});
