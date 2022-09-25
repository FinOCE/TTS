import socket from "socket.io"
import EventManager from "../managers/EventManager"

export default class SocketServer extends socket.Server {
  public events: EventManager = new EventManager()

  public constructor() {
    super()

    // Setup event manager for sockets
    this.on("connection", socket => {
      this.events.configure(socket)
    })
  }
}
