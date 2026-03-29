import express from "express"
import connectDB from "./config/dbConfig.js"
import dotenv from "dotenv"
import userRoutes from "./routes/userroutes.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

connectDB()

app.use(express.json())
app.use(express.urlencoded())

app.use("/api/auth", userRoutes)

app.listen(PORT, () => {
    console.log("Server is Running at PORT", PORT)
})
