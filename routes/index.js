const express = require('express')
const router = express.Router()

const home = require('./modules/home')
// const expenses = require('./modules/expenses')
const users = require('./modules/users')
// middleware
const { authenticator } = require('../middleware/auth')  

// router.use('/expenses', expenses)
router.use('/users', users)
router.use('/', authenticator, home)

module.exports = router