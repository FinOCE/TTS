import { Comment, Submission } from "snoowrap"

export default class Filter {
  public static submission(submission: Submission): Submission | null {
    // Remove deleted, pinned, and bot submissions
    const username = submission.author.name.toLowerCase()
    if (username === "[deleted]") return null
    if (username === "automoderator") return null
    if (username.includes("bot")) return null
    if (submission.pinned || submission.stickied) return null

    return submission
  }

  public static comment(comment: Comment): Comment | null {
    // Remove deleted, pinned, and bot comments
    const username = comment.author.name.toLowerCase()
    if (username === "[deleted]") return null
    if (username === "automoderator") return null
    if (username.includes("bot")) return null
    if (comment.stickied) return null

    // Remove poor comments
    if (comment.body.length > 1000) return null

    return comment
  }
}
