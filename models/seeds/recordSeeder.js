if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// import bcrypt to hash password
const bcrypt = require('bcryptjs')

const db = require('../../config/mongoose')

// refer record & user model
const Record = require('../record')
const User = require('../user')
const Category = require('../category')
// refer record & user JSON seed file
const recordList = require('./records.json')
const userList = require('./users.json')

db.once('open', () => {
  Promise.all(
    Array.from(userList, seedUser => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(seedUser.password, salt))
        .then(hash => User.create({
          name: seedUser.name,
          email: seedUser.email,
          password: hash
        }))
        .then(user => {
          return Promise.all(Array.from(recordList, seedRecord => {
            return Category.findOne({ name: seedRecord.category })
              .lean()
              .then(category => {
                return Record.create({
                  name: seedRecord.name,
                  date: seedRecord.date,
                  amount: seedRecord.amount,
                  userId: user._id,
                  categoryId: category._id
                })
              })
          }))
        })
    }))
    .then(() => {
      console.log('seeder is finished!')
      process.exit()
    })
    .catch(err => console.log(err))

})