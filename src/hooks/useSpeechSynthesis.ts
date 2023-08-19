import { useEffect, useState } from "preact/hooks"

export default function useSpeechSynthesis(narrator: string) {
  const [voice, setVoice] = useState<SpeechSynthesisVoice>()
  const [speaking, setSpeaking] = useState(false)

  useEffect(() => {
    const voices = window.speechSynthesis.getVoices()
    setVoice(voices.find(v => v.name === narrator))
  }, [])

  function say(text: string): Promise<void> {
    return new Promise(resolve => {
      const utterance = new SpeechSynthesisUtterance(text)

      utterance.voice = voice
      utterance.onstart = () => setSpeaking(true)
      utterance.onend = () => {
        setSpeaking(false)
        resolve()
      }

      window.speechSynthesis.speak(utterance)
    })
  }

  return { say, speaking }
}
