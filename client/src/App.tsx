import "./App.scss"
import io from "socket.io-client"
import { useState } from "react"
import { Reddit } from "./types/reddit"
import { is } from "./utils/TypeGuard"

export default function App() {
  // Search params
  const [subreddit, setSubreddit] = useState<string>("askreddit")

  // State management
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Reddit.API.Error>()
  const [res, setRes] = useState<
    Reddit.API.Listing<Reddit.Link> | Reddit.API.Error
  >()

  // Create and handle socket events
  const socket = io("ws://localhost:8000")

  function fetch() {
    setLoading(true)
    socket.emit("fetch", {
      subreddit,
      options: { sort: "hot" }
    })
  }

  socket.on("fetch", (data: Reddit.API.Listing<Reddit.Link>) => {
    setRes(undefined)
    setError(undefined)
    setLoading(false)

    if (is<Reddit.API.Error>(data, data => "error" in data)) setError(data)
    else setRes(data)
  })

  // Render page
  return (
    <div className="App">
      <div className="Inputs">
        <input
          type="text"
          value={subreddit}
          onChange={e => setSubreddit(e.target.value)}
        />
        <input type="submit" onClick={fetch} value="Send" />
      </div>
      <div className="Messages">
        {error ? `Error ${error.error}: ${error.message}` : ""}
        <br />
        {loading ? "Loading..." : ""}
      </div>
      <pre className="Display">
        <code>{JSON.stringify(res, null, 2)}</code>
      </pre>
    </div>
  )
}
