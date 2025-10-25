import { WebSocket } from "ws";

export class Player {
  public ws: WebSocket;
  private id: number;
  constructor(ws: WebSocket, id: number) {
    this.ws = ws;
    this.id = id;
  }
}
