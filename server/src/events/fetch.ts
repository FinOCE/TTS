import { Socket } from "socket.io"
import Client from "../models/Client"
import Event from "../models/Event"
import { Reddit } from "../types/reddit"
import { User } from "../types/user"

export default class extends Event {
  public async run(
    client: Client,
    socket: Socket,
    data: User.Events.Fetch.Data,
    filter?: User.Events.Fetch.Filter
  ): Promise<void> {
    const res = await client.query<Reddit.API.Listing<Reddit.Link>>(
      `${Reddit.API.Routes.Oauth}/r/${data.subreddit}/${
        data.options.sort
      }?raw_json=1${
        data.options.duration ? `&t=${data.options.duration}` : ""
      }`,
      "GET"
    )

    socket.emit("fetch", res)
  }
}
