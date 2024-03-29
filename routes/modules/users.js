const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { loginMessage } = require('../../middleware/login')  


// login page
router.get('/login', (req, res) => {
  res.render('login')
})
router.post('/login', loginMessage, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// register page
router.get('/register', (req, res) => {
  res.render('register')
})
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []

  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'password do not match' })
  }
  if (errors.length) {
    return res.render('register', {
      errors, name, email, password, confirmPassword
    })
  }

  User.findOne({ email }).then(user => {
    if (user) {
      console.log('User already exits.')
      errors.push({ message: 'This Email is already registered.' })
      return res.render('register', {
        errors, name, email, password, confirmPassword
      })
    } else {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  }).catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'Logout succeed!')
  res.redirect('/users/login')
})

module.exports = router