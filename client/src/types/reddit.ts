/**
 * Types to handle communication with Reddit
 */
export namespace Reddit {
  /**
   * Types for the technical side of reddit responses
   */
  export namespace API {
    export enum Routes {
      Oauth = "https://oauth.reddit.com",
      AccessToken = "https://www.reddit.com/api/v1/access_token"
    }

    export enum TypePrefix {
      Comment = "t1",
      Account = "t2",
      Link = "t3",
      Message = "t4",
      Subreddit = "t5",
      Award = "t6"
    }

    export type Fullname = `${TypePrefix}_${string}`

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

    export type Entity<T1, T2> = {
      kind: T1
      data: T2
    }

    export type Listing<T> = Entity<
      "Listing",
      {
        before?: Fullname
        after?: Fullname
        dist: number
        geo_filter: null
        children: Entity<T, any>[]
      }
    >
  }

  /**
   * Types for subreddits
   */
  export namespace SubredditOptions {
    export type Sort = "Hot" | "Top" | "New" | "Rising"

    export type Duration =
      | "Hour"
      | "Day"
      | "Week"
      | "Month"
      | "Year"
      | "All Time"

    export type SearchOptions = {
      sort: Sort
      duration?: Duration
    }
  }

  /**
   * Non-exhaustive link type
   */
  export type Link = {
    kind: API.TypePrefix.Link
    data: {
      all_awardings: Award[]
      author: string
      created: number
      edited: boolean
      is_video: boolean
      media: {
        // For videos
        reddit_video: {
          dash_url: string
          /*
          Python code for finding video and audio URLs:

          dash_url = dash_url[:int(dash_url.find('DASH')) + 4]
          video_url = f'{dash_url}_{height}.mp4'
          audio_url = f'{dash_url}_audio.mp4'
        */
          duration: number
          height: number
          is_gif: boolean
          width: number
        }
      } | null
      media_metadata?: {
        // For images
        [K in string]: {
          s: {
            y: number // height
            x: number // width
            u: string // url
          }
        }
      }
      num_comments: number
      preview?: {
        // For GIFs
        images: {
          variants: {
            gif: {
              url: string
              width: number
              height: number
            }
            mp4: {
              url: string
              width: number
              height: number
            }
          }
        }[]
      }
      score: number
      selftext?: string
      title: string
      url: string
    }
  }

  /**
   * Non-exhaustive award type
   */
  export type Award = {
    count: number
    description: string
    icon_url: string
    name: string
  }
}
