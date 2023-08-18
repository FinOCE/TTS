import { render } from "preact"
import { useEffect, useState } from "preact/hooks"
import { tw } from "twind"
import useSnoowrap from "./hooks/useSnoowrap"

export function App() {
  const { r } = useSnoowrap()

  const [titles, setTitles] = useState<string[]>([])

  useEffect(() => {
    if (r) {
      r.getSubreddit("askreddit")
        .getHot()
        .then(listing => setTitles(listing.map(submission => submission.title)))
    }
  }, [r])

  return (
    <main>
      <p className={tw("m-10")}>{JSON.stringify(titles)}</p>
    </main>
  )
}

render(<App />, document.getElementById("app"))
