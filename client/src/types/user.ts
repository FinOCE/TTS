import { Reddit } from "./reddit"

export namespace User {
  export namespace Events {
    export namespace Fetch {
      export type Data = {
        subreddit: string
        options: Reddit.SubredditOptions.SearchOptions
      }

      export type Filter = {
        minPostComments?: number
        minCommentUpvotes?: number
      }
    }
  }
}
