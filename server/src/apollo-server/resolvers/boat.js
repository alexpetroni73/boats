const resolvers = {
  Query: {
    boat (_, { id }, context) {
      return context.models.Boat.boat(id)
    },

    boatBy (_, { field, value }, context) {
      return context.models.Boat.boatBy(field, value)
    },

    boatBySlug (_, { slug }, context) {
      return context.models.Boat.boatBy('slug', slug)
    },

    boats (_, { idArr }, context) {
      return context.models.Boat.boats(idArr)
    },

    boatsBy (_, { field, valArr }, context) {
      return context.models.Boat.boatsBy(field, valArr)
    },

    boatsBySlug (_, { slugArr }, context) {
      return context.models.Boat.boatsBy('slug', slugArr)
    },

    searchBoats (_, { args }, context) {
      return context.models.Boat.searchBoats(args)
    },

    paginatedBoats (_, { args }, context) {
      return context.models.Boat.paginatedBoats(args)
    },

    cabin (_, { id }, context) {
      return context.models.Boat.cabin(id)
    },

    cabinBySlug (_, { slug }, context) {
      return context.models.Boat.cabinBySlug(slug)
    },

    cabins (_, { idArr }, context) {
      return context.models.Boat.cabins(idArr)
    },

    cabinsBySlug (_, { slugArr }, context) {
      return context.models.Boat.cabinsBySlug(slugArr)
    },

    searchCabins (_, { args }, context) {
      return context.models.Boat.searchCabins(args)
    },

    paginatedCabins (_, { args }, context) {
      return context.models.Boat.paginatedCabins(args)
    },
  },

  Mutation: {
    createBoat(_, { input }, context){
      return context.models.Boat.createBoat(input)
    },

    updateBoat(_, { id, input }, context){
      return context.models.Boat.updateBoat(id, input)
    },

    deleteBoat(_, { id }, context){
      return context.models.Boat.deleteBoat(id)
    },

    deleteBoats(_, { idArr }, context){
      return context.models.Boat.deleteBoats(idArr)
    },

    createCabin(_, { boatId, input }, context){
      return context.models.Boat.createCabin(boatId, input)
    },

    updateCabin(_, { id, input }, context){
      return context.models.Boat.updateCabin(id, input)
    },

    deleteCabin(_, { boatId, id }, context){
      return context.models.Boat.deleteCabin(boatId, id)
    },

    deleteCabins(_, { boatId, idArr }, context){
      return context.models.Boat.deleteCabins(boatId, idArr)
    },
  }
}



module.exports = resolvers
