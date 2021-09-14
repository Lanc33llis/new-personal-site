const express = require("express")
const app = express()
const path = require("path")
const nodemailer = require("nodemailer")
const fetch = require('node-fetch')
const fs = require('fs');
var session = require('express-session')

require("dotenv").config()
const port = process.env.PORT
const host = process.env.HOST
const emailService = process.env.EMAIL_SERVICE
const emailUser = process.env.EMAIL_USER
const emailPass = process.env.EMAIL_PASS
const emailDomainUser = process.env.EMAIL_DOMAIN_USER

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: process.env.BLOG_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(express.static("public"))
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "pug")

app.get("/", (req, res, next) => {
  res.render("index", { title: "Lance Ellis - home", page: "index" })
})

app.get("/about", (req, res, next) => {
  res.render("about", { title: "Lance Ellis - about", page: "about" })
})

app.get("/contact", (req, res, next) => {
  res.render("contact", { title: "Lance Ellis - contact", page: "contact" })
})

app.get("/work", (req, res, next) => {
  res.render("work", { title: "Lance Ellis - work", page: "work" })
})

app.get("/admin", (req, res, next) => {
  res.render("admin", { title: "Lance Ellis - admin", page: "admin" })
})

app.post("/admin", (req, res ,next) => {
  if (req.body.blog_pass && req.body.blog_pass == process.env.BLOG_PASS) {
    req.session.admin = true
    res.redirect("/blogeditor")
  } else {
    res.status("401").send()
  }
})

app.get("/blogeditor", (req, res, next) => {
  if (req.session.admin === true) {
    res.render("blogeditor", {title: "Lance Ellis - blog editor", page: "blogeditor"})
  } else {
    res.status("401").send()
  }
})

var blogs = JSON.parse(fs.readFileSync("blogs.json"))
app.post("/blogs", (req, res, next) => {
  if (req.session.admin === true) {
    if (req.body.title && req.body.body && req.body.timeZone && req.body.location) {
      fs.readFile("blogs.json", (err, data) => {
        if (err) return console.error("Could not open blog.json")
        let json = JSON.parse(data)
        const fullDate = `${new Date().toLocaleString("en-US", {timeZone: req.body.timeZone, timeZoneName: "short"})}`
        let blog = {
          title: req.body.title,
          body: req.body.body,
          date: fullDate,
          location: req.body.location
        }
        json.blogs.push(blog)
        fs.writeFileSync("blogs.json", JSON.stringify(json))
        blogs = json
        res.redirect("/blog")
      })
    } else {
      let error = ""
      if (!req.body.title) error = "No title"
      else if (!req.body.body) error = "No body"
      else if (!req.body.timeZone) error = "No time zone"
      else if (!req.body.location) error = "No location"
      res.send(`Malformed data\n${error}`)
    }
  } else {
    res.status("401").send()
  }
})

app.get("/blog", (req, res, next) => {
  res.render("blog", {title: "Lance Ellis - blog", page: "blog", blogs: blogs.blogs})
})

app.get("/wip", (req, res, next) => {
  res.render("wip", { title: "Lance Ellis - wip", page: "wip" })
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
