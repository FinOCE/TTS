import { defineConfig } from "vite"
import preact from "@preact/preset-vite"
import env from "./secrets.json"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  define: {
    global: { navigator: { userAgent: env.userAgent } },
    process: { env }
  }
})
