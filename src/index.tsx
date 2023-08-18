import { render } from "preact"
import { tw } from "twind"

export function App() {
  return (
    <main>
      <p className={tw("")}>Hello world</p>
    </main>
  )
}

render(<App />, document.getElementById("app"))
