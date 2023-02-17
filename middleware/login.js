module.exports = {
  loginMessage: (req, res, next) => {
    const { email, password } = req.body
    
    if (!email || !password) {
      req.flash('warning_msg', 'All fields are required!')
      return res.redirect('/users/login')
    }

    next()
  }
}