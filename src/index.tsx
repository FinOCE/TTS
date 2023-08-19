import { render } from "preact"
import { useEffect, useState } from "preact/hooks"
import { tw } from "twind"
import useSnoowrap from "./hooks/useSnoowrap"
import useQueue from "./hooks/useQueue"
import useRotation from "./hooks/useRotation"
import subreddits from "./assets/subreddits"
import { Comment, Submission } from "snoowrap"
import Status from "./assets/status"
import useSpeechSynthesis from "./hooks/useSpeechSynthesis"
import Filter from "./utils/Filter"

export function App() {
  const voice = "Microsoft Ryan Online (Natural) - English (United Kingdom)"

  const { r } = useSnoowrap()
  const {
    enqueue: enqueueSubmissionId,
    dequeue: dequeueSubmissionId,
    count: countSubmissionIds
  } = useQueue<string>()
  const {
    enqueue: enqueueComment,
    dequeue: dequeueComment,
    count: countComments
  } = useQueue<Comment>()
  const { next: nextSubreddit } = useRotation<string>(subreddits)
  const { say, speaking } = useSpeechSynthesis(voice)

  const [status, setStatus] = useState<Status>(Status.NOT_STARTED)
  const [fetching, setFetching] = useState(false)
  const [submissionId, setSubmissionId] = useState<string>()
  const [submission, setSubmission] = useState<Submission>()
  const [comment, setComment] = useState<Comment>()

  // Only operate when snoowrap is ready
  if (!r) return <></>

  // Keep queue filled
  useEffect(() => {
    if (countSubmissionIds <= 4 && !fetching) {
      setStatus(Status.FETCHING_POSTS)
      setFetching(true)

      r.getSubreddit(nextSubreddit())
        .getHot()
        .then(submissions => {
          setFetching(false)
          enqueueSubmissionId(
            ...submissions
              .reduce((pre, cur) => {
                const submission = Filter.submission(cur)
                if (submission) pre.push(submission)
                return pre
              }, [] as Submission[])
              .sort((a, b) => b.ups - a.ups)
              .map(submission => submission.id)
          )
        })
    }
  }, [countSubmissionIds, fetching])

  // Update submission when ID changes
  useEffect(() => {
    if (!submissionId && countSubmissionIds > 0)
      setSubmissionId(dequeueSubmissionId())
  }, [submissionId, countSubmissionIds])

  useEffect(() => {
    if (submissionId) {
      setStatus(Status.FETCHING_SUBMISSION)

      r.getSubmission(submissionId)
        .fetch()
        .then(submission => {
          setSubmission(submission)
          setComment(null)

          submission.comments
            .reduce((pre, cur) => {
              const comment = Filter.comment(cur)
              if (comment) pre.push(comment)
              return pre
            }, [] as Comment[])
            .sort((a, b) => b.ups - a.ups)
            .forEach(comment => enqueueComment(comment))
        })
    }
  }, [submissionId])

  // Present the new submission
  useEffect(() => {
    if (submission) {
      setStatus(Status.READING_POST_TITLE)

      say(submission.title)
    }
  }, [submission])

  // Fill comments from queue, or move to next submission
  useEffect(() => {
    if (!speaking) {
      if (countComments > 0) setComment(dequeueComment())
      else if (countSubmissionIds > 0) setSubmissionId(dequeueSubmissionId())
      else if (submissionId) setStatus(Status.FINISHED)
    }
  }, [speaking])

  // Read the new comment
  useEffect(() => {
    if (comment) {
      setStatus(Status.READING_COMMENTS)

      say(comment.body)
    }
  }, [comment])

  // Render page
  return (
    <main>
      <div className={tw("p-10")}>
        <p>
          Submissions in queue: <b>{countSubmissionIds}</b>
        </p>
        <p>
          Comments in queue: <b>{countComments}</b>
        </p>
        <p>
          Status: <b>{status.toString()}</b>
        </p>
        <p>
          Speaking: <b>{speaking ? "Yes" : "No"}</b>
        </p>
      </div>
      {submission && (
        <div className={tw("p-10 flex flex-col gap-10")}>
          <div>
            <h1 className={tw("text-2xl font-bold mb-2")}>
              {submission.title}
            </h1>
            <p className={tw("text-sm font-bold mb-4")}>
              {submission.author.name}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: submission.selftext_html }}
            />
          </div>
        </div>
      )}
      {comment && (
        <div className={tw("p-10")}>
          <p className={tw("text-sm font-bold mb-1")}>
            {comment.author.name} ({comment.ups.toLocaleString()})
          </p>
          <div dangerouslySetInnerHTML={{ __html: comment.body_html }} />
        </div>
      )}
    </main>
  )
}

render(<App />, document.getElementById("app"))
