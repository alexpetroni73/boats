const Common = require('./common')

const Boat = require('./boat')

const Query = `
  type Query {
    _empty: String
  }
  `

const Mutation = `
  type Mutation {
    _empty: String
  }`

const typeDefs = [
  Query,
  Mutation,
  Common,

  Boat,
]

module.exports = typeDefs
