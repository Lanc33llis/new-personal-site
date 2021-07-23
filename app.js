const express = require("express")
const app = express()
const path = require("path")
const nodemailer = require("nodemailer")

require("dotenv").config()
const port = process.env.PORT
const host = process.env.HOST
const emailService = process.env.EMAIL_SERVICE
const emailUser = process.env.EMAIL_USER
const emailPass = process.env.EMAIL_PASS
const emailDomainUser = process.env.EMAIL_DOMAIN_USER

app.use(express.urlencoded())
app.use(express.json())
app.use(express.static("public", { index: false, extensions: ["html", "txt"] }))

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

app.get("/status", (req, res, next) => {
  res.sendStatus(200)
})

app.post("/contactme!", (req, res, next) => {
  messageName = req.body.name
  messageEmail = req.body.responseEmail
  messageContent = req.body.content

  let transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailUser, // generated ethereal user
      pass: emailPass, // generated ethereal password
    },
  })

  let mailOptions = {
    from: emailDomainUser,
    replyTo: messageEmail,
    to: emailDomainUser,
    subject: messageName + "'s Inquiry",
    text: messageContent,
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log("Email sent: " + info.response)
    }
  })

  res.redirect("/contact")
})

app.listen(port, host, () => {
  console.log("Server hosted at http://localhost:" + port)
})
