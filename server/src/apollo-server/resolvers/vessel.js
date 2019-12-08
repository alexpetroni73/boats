const resolvers = {
  Query: {
    vessel (_, { id }, context) {
      return context.models.Vessel.vessel(id)
    },

    vesselBy (_, { field, value }, context) {
      return context.models.Vessel.vesselBy(field, value)
    },

    vesselBySlug (_, { slug }, context) {
      return context.models.Vessel.vesselBy('slug', slug)
    },

    vessels (_, { idArr }, context) {
      return context.models.Vessel.vessels(idArr)
    },

    vesselsBy (_, { field, valArr }, context) {
      return context.models.Vessel.vesselsBy(field, valArr)
    },

    vesselsBySlug (_, { slugArr }, context) {
      return context.models.Vessel.vesselsBy('slug', slugArr)
    },

    searchVessels (_, { args }, context) {
      return context.models.Vessel.searchVessels(args)
    },

    paginatedVessels (_, { args }, context) {
      return context.models.Vessel.paginatedVessels(args)
    },

    cabin (_, { id }, context) {
      return context.models.Vessel.cabin(id)
    },

    cabinBySlug (_, { slug }, context) {
      return context.models.Vessel.cabinBySlug(slug)
    },

    cabins (_, { idArr }, context) {
      return context.models.Vessel.cabins(idArr)
    },

    cabinsBySlug (_, { slugArr }, context) {
      return context.models.Vessel.cabinsBySlug(slugArr)
    },

    searchCabins (_, { args }, context) {
      return context.models.Vessel.searchCabins(args)
    },

    paginatedCabins (_, { args }, context) {
      return context.models.Vessel.paginatedCabins(args)
    },
  },

  Mutation: {
    createVessel(_, { input }, context){
      return context.models.Vessel.createVessel(input)
    },

    updateVessel(_, { id, input }, context){
      return context.models.Vessel.updateVessel(id, input)
    },

    deleteVessel(_, { id }, context){
      return context.models.Vessel.deleteVessel(id)
    },

    deleteVessels(_, { idArr }, context){
      return context.models.Vessel.deleteVessels(idArr)
    },

    createCabin(_, { vesselId, input }, context){
      return context.models.Vessel.createCabin(vesselId, input)
    },

    updateCabin(_, { id, input }, context){
      return context.models.Vessel.updateCabin(id, input)
    },

    deleteCabin(_, { vesselId, id }, context){
      return context.models.Vessel.deleteCabin(vesselId, id)
    },

    deleteCabins(_, { vesselId, idArr }, context){
      return context.models.Vessel.deleteCabins(vesselId, idArr)
    },
  }
}



module.exports = resolvers
