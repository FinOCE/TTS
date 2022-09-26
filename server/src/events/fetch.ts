import { Socket } from "socket.io"
import Client from "../models/Client"
import Event from "../models/Event"
import { User } from "../types/user"

export default class extends Event {
  public async run(
    client: Client,
    socket: Socket,
    data: User.Events.Fetch.Data,
    filter?: User.Events.Fetch.Filter
  ): Promise<void> {}
}
