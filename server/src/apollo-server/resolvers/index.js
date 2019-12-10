const merge = require('deepmerge')

const Common = require('./common')

const Boat = require('./boat')

const resolvers = merge.all([
  Common,
  Boat,
])

module.exports = resolvers
