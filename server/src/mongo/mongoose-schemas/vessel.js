const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const Cabin = require('./cabin')

const { buildTimestampSchema } = require('./../utils')


const schemaDefinition = {
  name: {
    type: String
  },

  slug: {
    type: String,
    index: true,
    unique: true,
  },

  excerpt: {
    type: String
  },

  description: {
    type: String
  },

  boatFeatures: {
    type: [String],
  },

  boatFeaturesText: {
      type: String,
  },

  foodAndDrinksFeatures: {
    type: [String],
  },

  foodAndDrinksFeaturesText: {
      type: String,
  },

  divingFeatures: {
    type: [String],
  },

  divingFeaturesText: {
    type: String,
  },

  gearRental: {
    type: String,
  },

  gearRentalText: {
    type: String,
  },

  boatLayout: {
    type: String,
  },

  boatLayoutText: {
    type: String,
  },

  boatSpecifications: {
    type: String,
  },

  boatSpecificationsText: {
    type: String,
  },

  navSafteyFeatures: {
    type: [String],
  },

  navSafteyFeaturesText: {
    type: String,
  },

  cabins: {
    type: [Cabin]
  },

  cabinsText: {
    type: String,
  },


}

module.exports = buildTimestampSchema(schemaDefinition)
