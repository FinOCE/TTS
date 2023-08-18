import { useState } from "preact/compat"

export default function useQueue<T>() {
  const [queue, setQueue] = useState<T[]>([])

  function enqueue(item: T): void {
    setQueue(prev => [...prev, item])
  }

  function dequeue(): T | undefined {
    const item = queue[0]

    setQueue(prev => [...prev.slice(1)])

    return item
  }

  return { enqueue, dequeue, count: queue.length }
}
