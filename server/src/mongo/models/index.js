require('./../connection').connect()

const mongoose = require('mongoose')
const schemas = require('./../mongoose-schemas')

const Boat = mongoose.model('Boat', schemas.boat)


module.exports = {
  Boat,
}
