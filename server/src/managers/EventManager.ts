import { Socket } from "socket.io"
import Event from "../models/Event"
import fs from "fs/promises"
import { parse } from "path"
import Client from "../models/Client"

export default class EventManager {
  public events: Record<string, Event> = {}

  public constructor() {
    fs.readdir("./src/events").then(files => {
      files.forEach(file => {
        const { name } = parse(file)
        const constructor = require(`../events/${file}`)
        const event: Event = new constructor.default()
        this.events[name] = event
      })
    })
  }

  /**
   * Assign events to the given socket
   */
  public configure(client: Client, socket: Socket) {
    Object.entries(this.events).forEach(([name, event]) => {
      socket.on(name, (...args) => event.run(client, socket, ...args))
    })
  }
}
