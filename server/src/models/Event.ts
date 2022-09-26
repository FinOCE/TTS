import { Socket } from "socket.io"
import Client from "./Client"

export default abstract class Event {
  public abstract run(
    client: Client,
    socket: Socket,
    ...args: any[]
  ): Promise<void>
}
