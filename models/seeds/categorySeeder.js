if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const db = require('../../config/mongoose')
const Category = require('../category')
const categoryList = require('./categories.json')

db.once('open', () => {
  Category
    .find()
    .then(categories => {
      // prevent DB has double categories
      if (categories.length) {
        console.log('Already build the category')
        process.exit()
      }
      return Promise.all( 
        Array.from(categoryList, seedCategory => {
          return Category.create({
            name: seedCategory.name,
            icon: seedCategory.icon
          })
        }))
        .then(() => {
          console.log('category init succeed!')
          process.exit()
        })
        .catch(err => console.log(err))
    })
})