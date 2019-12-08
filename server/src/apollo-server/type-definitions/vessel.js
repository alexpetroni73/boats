const typeDef = `

  extend type Query {
    vessel(id: ID!): Vessel
    vesselBy(field: String!, value: String!): Vessel
    vesselBySlug(slug: String!): Vessel

    vessels(idArr: [ID!]!): [Vessel!]!
    vesselsBy(field: String, valArr: [String!]!): [Vessel!]!
    vesselsBySlug(slugArr: [String!]!): [Vessel!]!
    searchVessels(args: JSON): [Vessel!]!
    paginatedVessels(args: JSON): PaginatedVessels!

    vesselGallery(id: ID!): [String!]!
    vesselGalleryBy(field: String!, value: String!): [String!]!

    cabin(id: ID!): Cabin
    cabinBy(vesselId: ID!, field: String!, value: String!): Cabin
    cabinBySlug(vesselId: ID!, slug: String!): Cabin

    cabins(vesselId: ID!): [Cabin!]!
    cabinsBy(value: String, valArr: [String!]!): [Cabin!]!
    cabinsBySlug(slugArr: [String!]!): [Cabin!]!
    searchCabins(args: JSON): [Cabin!]!
    paginatedCabins(args: JSON): PaginatedCabins!

    cabinGallery(id: ID!): [String!]!
    cabinGalleryBy(field: String!, value: String!): [String!]!

  }

  extend type Mutation {
    createVessel(input: VesselInput!): Vessel
    updateVessel(id: ID!, input: VesselInput!): Vessel
    deleteVessel(id: ID!): ID
    deleteVessels(idArr: [ID!]!): [ID!]!

    updateVesselGallery(id: ID!, inputArr: [String!]!): [String!]!


    createCabin(vesselId: ID!, input: CabinInput!): Cabin
    updateCabin(id: ID!, input: CabinInput!): Cabin
    deleteCabin(vesselId: ID!, id: ID!): ID!
    deleteCabins(vesselId: ID!, idArr: [ID!]!): [ID!]!

    updateCabinGallery(id: ID!, inputArr: [String!]!): [String!]!
  }

  type Vessel {
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
    boatSpecifications: String
    boatSpecificationsText: String
    navSafteyFeatures: [String!]
    navSafteyFeaturesText: String
    cabins: [Cabin!]
    cabinsText: String
  }

  input VesselInput {
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
    boatSpecifications: String
    boatSpecificationsText: String
    navSafteyFeatures: [String!]
    navSafteyFeaturesText: String
    cabins: [CabinInput!]
    cabinsText: String
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

  type PaginatedVessels {
    total: Int
    items: [Vessel!]!
  }
`
module.exports = typeDef
