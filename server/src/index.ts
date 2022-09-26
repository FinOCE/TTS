import Server from "./models/Server"
import { config } from "dotenv"

// Setup env variables
config()
const { REDDIT_ID, REDDIT_SECRET } = process.env

// Start server
new Server(REDDIT_ID, REDDIT_SECRET).listen(8000)
