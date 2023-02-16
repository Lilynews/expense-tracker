// import express
const express = require('express')
const app = express()
const port = 3000
// import handlebars 
const exphbs = require('express-handlebars');
// router setting
const routes = require('./routes')
// import session & passport for login feature
const session = require('express-session')
const usePassport = require('./config/passport')

// import flash
const flash = require('connect-flash')

// for environment variable
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// executed mongoose
require('./config/mongoose')

// setting express-handlebars
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// for static files
app.use(express.static('public'))
// for body.parser
app.use(express.urlencoded({ extended: true }))

// session setting
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// passport setting, after session
usePassport(app)

// flash setting
app.use(flash())  

// middleware setting
app.use((req, res, next) => {
  // for auth
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  // for flash
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// import all request into routes
app.use(routes)

// setting listening
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})