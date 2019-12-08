const Common = require('./common')

const Vessel = require('./vessel')

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

  Vessel,
]

module.exports = typeDefs
