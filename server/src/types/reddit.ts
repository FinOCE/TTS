/**
 * Types to handle communication with Reddit
 */
export namespace Reddit {
  /**
   * Types for the technical side of reddit responses
   */
  export namespace API {
    export enum Routes {
      AccessToken = "https://www.reddit.com/api/v1/access_token"
    }

    export type Error = {
      error: number
      message: string
    }

    export type Token = {
      access_token: string
      token_type: "bearer"
      expires_in: number
      scope: "*"
    }
  }

  /**
   * Types for subreddits
   */
  export namespace Subreddit {
    export type Sort = "Hot" | "Top" | "New" | "Rising"
    export type Duration =
      | "Hour"
      | "Day"
      | "Week"
      | "Month"
      | "Year"
      | "All Time"

    export type SearchOptions = {
      sort: Reddit.Subreddit.Sort
      duration?: Reddit.Subreddit.Duration
    }
  }
}
