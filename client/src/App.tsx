import "./App.scss"
import io from "socket.io-client"
import { useState } from "react"

export default function App() {
  const [res, setRes] = useState<any>()

  const socket = io("ws://localhost:8000")
  socket.on("fetch", data => setRes(data))

  return (
    <div className="App">
      <button
        onClick={() =>
          socket.emit("fetch", {
            subreddit: "rlsideswipe",
            options: { sort: "hot" }
          })
        }
      >
        Send
      </button>
      <pre>
        <code>{JSON.stringify(res, null, 2)}</code>
      </pre>
    </div>
  )
}
