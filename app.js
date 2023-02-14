//////// import express
const express = require('express')
const app = express()

const port = 3000

//////// router setting
const routes = require('./routes')

//////// handlebars setting
const exphbs = require('express-handlebars');



app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

//////// after import, use in this project
app.use(express.static('public'))
app.use(routes)

//////// setting listening
app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})