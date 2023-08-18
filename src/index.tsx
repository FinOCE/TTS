import { render } from "preact"
import { useEffect } from "preact/hooks"
import { tw } from "twind"
import useSnoowrap from "./hooks/useSnoowrap"
import useQueue from "./hooks/useQueue"
import useRotation from "./hooks/useRotation"
import subreddits from "./assets/subreddits"

export function App() {
  const { r } = useSnoowrap()
  const { enqueue, dequeue, count } = useQueue<string>()
  const { next: nextSubreddit } = useRotation<string>(subreddits)

  // Only operate when snoowrap is ready
  if (!r) return <></>

  // Keep queue filled
  useEffect(() => {
    if (count <= 5) {
      r.getSubreddit(nextSubreddit())
        .getHot()
        .then(submissions =>
          submissions.forEach(submission => enqueue(submission.id))
        )
    }
  }, [count])

  // Render page
  return (
    <main>
      <div className={tw("p-10")}>
        <p>IDs in queue: {count}</p>
        <button
          onClick={() => dequeue()}
          className={tw("bg-black text-white p-3")}
        >
          Dequeue
        </button>
      </div>
    </main>
  )
}

render(<App />, document.getElementById("app"))
