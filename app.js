const express = require("express")
const app = express()
const path = require("path")

require("dotenv").config()
const port = process.env.PORT
const host = process.env.HOST

app.use(express.static("public", { index: false, extensions: ["html", "txt"] }))

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/status", (req, res, next) => {
  res.sendStatus(200)
})

app.post("/contactme!", (req, res, next) => {})

app.listen(port, host, () => {
  console.log("Server hosted at http://localhost:" + port)
})
