import express from "express"
import cors from "cors"
import connectDB from "./config/dbConfig.js"
import dotenv from "dotenv"
import userRoutes from "./routes/userroutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

const allowedOrigins = [
    "https://prep-me-ai-tau.vercel.app",
    "http://localhost:5173"
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth", userRoutes)

app.listen(PORT, () => {
    console.log("Server is Running at PORT", PORT)
})
