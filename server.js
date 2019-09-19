const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")

const participantRouter = require("./services/index")
const emailRouter = require("./services/email")

const server = express()

const psw = process.env.SENDGRID_API_KEY
const email = process.env.EMAIL

server.use(cors())
server.use(bodyParser.json())

server.use("/participants", participantRouter)
server.use("/emails", emailRouter)


server.listen(3000, () => {
  console.log("Server running on port 3000")
})
