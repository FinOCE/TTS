import { useState } from "preact/hooks"

export default function useRotation<T>(items: T[]) {
  const [index, setIndex] = useState(0)

  function next(): T {
    const item = items[index]

    setIndex(prev => (items.length - 1 === prev ? 0 : prev + 1))

    return item
  }

  return { next }
}
