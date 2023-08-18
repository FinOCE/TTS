import { useState } from "preact/compat"

export default function useRotation<T>(items: T[]) {
  const [index, setIndex] = useState(0)

  function next(): T {
    const item = items[index]

    if (items.length - 1 === index) setIndex(0)
    else setIndex(index + 1)

    return item
  }

  return { next }
}
