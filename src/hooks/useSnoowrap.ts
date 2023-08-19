import { useEffect, useState } from "preact/hooks"
import Snoowrap from "snoowrap"

export default function useSnoowrap() {
  const [r, setup] = useState<Snoowrap>()

  useEffect(() => {
    setup(
      new window.snoowrap({
        userAgent: process.env.userAgent,
        clientId: process.env.clientId,
        clientSecret: process.env.clientSecret,
        username: process.env.username,
        password: process.env.password
      })
    )
  }, [])

  return { r }
}
