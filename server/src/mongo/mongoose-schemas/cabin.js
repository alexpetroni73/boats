const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const { buildTimestampSchema } = require('./../utils')

const schemaDefinition = {
  name: {
    type: String
  },

  slug: {
    type: String,
    index: true,
  },

  excerpt: {
    type: String
  },

  description: {
    type: String
  },

  capacity: {
    type: Number,
    default: 2
  }
}

module.exports = buildTimestampSchema(schemaDefinition)
