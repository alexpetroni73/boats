require('./../connection').connect()

const mongoose = require('mongoose')
const schemas = require('./../mongoose-schemas')

const Vessel = mongoose.model('Vessel', schemas.vessel)


module.exports = {
  Vessel,
}
