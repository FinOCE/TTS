import socket from "socket.io"
import EventManager from "../managers/EventManager"
import Client from "./Client"

export default class SocketServer extends socket.Server {
  public events: EventManager = new EventManager()

  public constructor(id: string | undefined, secret: string | undefined) {
    super()

    // Setup reddit client and socket event manager
    Client.login(id ?? "", secret ?? "").then(client => {
      if (client === null) return console.log("Invalid credentials provided")
      console.log("Server is now online")

      this.on("connection", socket => {
        this.events.configure(client, socket)
      })
    })
  }
}
