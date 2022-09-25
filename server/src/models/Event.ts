import { Socket } from "socket.io"

export default abstract class Event {
  public abstract run(socket: Socket, ...args: any[]): Promise<void>
}
