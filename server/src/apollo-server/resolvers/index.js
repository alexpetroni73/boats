const merge = require('deepmerge')

const Common = require('./common')

const Vessel = require('./vessel')

const resolvers = merge.all([
  Common,
  Vessel,
])

module.exports = resolvers
