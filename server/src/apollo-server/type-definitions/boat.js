const typeDef = `

  extend type Query {
    boat(id: ID!): Boat
    boatBy(field: String!, value: String!): Boat
    boatBySlug(slug: String!): Boat

    boats(idArr: [ID!]!): [Boat!]!
    boatsBy(field: String, valArr: [String!]!): [Boat!]!
    boatsBySlug(slugArr: [String!]!): [Boat!]!
    searchBoats(args: JSON): [Boat!]!
    paginatedBoats(args: JSON): PaginatedBoats!

    boatGallery(id: ID!): [String!]!
    boatGalleryBy(field: String!, value: String!): [String!]!

    cabin(id: ID!): Cabin
    cabinBy(boatId: ID!, field: String!, value: String!): Cabin
    cabinBySlug(boatId: ID!, slug: String!): Cabin

    cabins(boatId: ID!): [Cabin!]!
    cabinsBy(value: String, valArr: [String!]!): [Cabin!]!
    cabinsBySlug(slugArr: [String!]!): [Cabin!]!
    searchCabins(args: JSON): [Cabin!]!
    paginatedCabins(args: JSON): PaginatedCabins!

    cabinGallery(id: ID!): [String!]!
    cabinGalleryBy(field: String!, value: String!): [String!]!

  }

  extend type Mutation {
    createBoat(input: BoatInput!): Boat
    updateBoat(id: ID!, input: BoatInput!): Boat
    deleteBoat(id: ID!): ID
    deleteBoats(idArr: [ID!]!): [ID!]!

    updateBoatGallery(id: ID!, inputArr: [String!]!): [String!]!


    createCabin(boatId: ID!, input: CabinInput!): Cabin
    updateCabin(id: ID!, input: CabinInput!): Cabin
    deleteCabin(boatId: ID!, id: ID!): ID!
    deleteCabins(boatId: ID!, idArr: [ID!]!): [ID!]!

    updateCabinGallery(id: ID!, inputArr: [String!]!): [String!]!
  }

  type Boat {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    slug: String
    excerpt: String
    description: String
    image: String
    boatFeatures: [String!]
    boatFeaturesText: String
    foodAndDrinksFeatures: [String!]
    foodAndDrinksFeaturesText: String
    divingFeatures: [String!]
    divingFeaturesText: String
    gearRental: String
    gearRentalText: String
    boatLayout: String
    boatLayoutText: String
    boatSpecifications: BoatSpecifications
    boatSpecificationsText: String
    navSafteyFeatures: [String!]
    navSafteyFeaturesText: String
    cabins: [Cabin!]
    cabinsText: String
  }

  input BoatInput {
    name: String
    slug: String
    excerpt: String
    description: String
    image: String
    boatFeatures: [String!]
    boatFeaturesText: String
    foodAndDrinksFeatures: [String!]
    foodAndDrinksFeaturesText: String
    divingFeatures: [String!]
    divingFeaturesText: String
    gearRental: String
    gearRentalText: String
    boatLayout: String
    boatLayoutText: String
    boatSpecifications: BoatSpecificationsInput
    boatSpecificationsText: String
    navSafteyFeatures: [String!]
    navSafteyFeaturesText: String
    cabins: [CabinInput!]
    cabinsText: String
  }

  type BoatSpecifications {
    length: Float
    beam: Float
    topSpeed: Float
    cruisingSpeed: Float
    engines: String
    maxGuests: Int
    cabins: Int
    bathrooms: Int
    tenders: String
    waterCapacity: Int
    fuelCapacity: Int
    freshwaterMaker: Boolean
  }

  input BoatSpecificationsInput {
    length: Float
    beam: Float
    topSpeed: Float
    cruisingSpeed: Float
    engines: String
    maxGuests: Int
    cabins: Int
    bathrooms: Int
    tenders: String
    waterCapacity: Int
    fuelCapacity: Int
    freshwaterMaker: Boolean
  }

  type Cabin {
    id: ID!
    createdAt: Date
    updatedAt: Date
    name: String
    slug: String
    excerpt: String
    description: String
    image: String
    cabinFeatures: [String!]
    cabinFeaturesText: String
    capacity: Int
    bedding: String
    airconditioning: String
  }

  input CabinInput {
    name: String
    slug: String
    excerpt: String
    description: String
    image: String
    cabinFeatures: [String!]
    cabinFeaturesText: String
    capacity: Int
    bedding: String
    airconditioning: String
  }

  type PaginatedCabins {
    total: Int
    items: [Cabin!]!
  }

  type PaginatedBoats {
    total: Int
    items: [Boat!]!
  }
`
module.exports = typeDef
