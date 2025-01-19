const express = require("express")
const cors = require("cors")
const cookieParser=require('cookie-parser')
const { createServer } = require("http")
const socketSetup = require("./socket"); // Import the socket setup
require("dotenv").config()


const connectDb=require("./db/connectDb.js")
const authRoutes=require("./routes/authRoutes")
const adminRoutes=require("./routes/adminRoutes");
const userRoutes=require("./routes/userRoutes")
const app = express()
const helmet = require("helmet");



const server = createServer(app)


app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: ["https://universityapp.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true
}))
app.use(helmet());



app.use("/api/auth",authRoutes)
app.use("/api/admin",adminRoutes)
app.use("/api/user",userRoutes)


const port = process.env.NODE_ENV === "production" ? process.env.PORT : 5000

server.listen(port, () => {
    connectDb()
    console.log(`Server run on port http://localhost:${port}`)
})

socketSetup(server)