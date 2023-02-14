//////// import express
const express = require('express')
const app = express()

const port = 3000
const routes = require('./routes')

app.use(routes)

//////// setting listening
app.listen(port, () => {
  console.log('App is running on http://localhost:3000')
})