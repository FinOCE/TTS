import fetch from "node-fetch"
import { Reddit } from "../types/reddit"
import { is } from "../utils/TypeGuard"

export default class Client {
  public constructor(private token: string) {}

  /**
   * Send a query to a Reddit API route
   */
  public async query<T>(
    route: Reddit.API.Routes | string,
    method: string = "GET",
    body?: any
  ): Promise<T | Reddit.API.Error> {
    return await fetch(route, {
      method,
      body: body ? new URLSearchParams(body) : undefined,
      headers: { Authorization: `Bearer ${this.token}` }
    })
      .then(res => res.json())
      .then(res => {
        if (is<Reddit.API.Error>(res, res => "error" in res)) return res
        return res as T
      })
  }

  /**
   * Login to the Reddit client
   */
  public static async login(
    id: string,
    secret: string
  ): Promise<Client | null> {
    return await fetch(Reddit.API.Routes.AccessToken, {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials"
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString(
          "base64"
        )}`
      }
    })
      .then(res => res.json())
      .then((token: Reddit.API.Token | Reddit.API.Error) => {
        if (is<Reddit.API.Error>(token, token => "error" in token)) return null
        return new Client(token.access_token)
      })
  }
}
