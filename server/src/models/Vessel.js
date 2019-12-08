const { Vessel } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// const vessel = async function (id) {
//   let agg = [aggExpr.matchById(id), aggExpr.addId(), ...vesselLogoAgg()]
//   return (await Vessel.aggregate(agg))[0]
// }

const vessel = async function (id) {
  let agg = [
    aggExpr.matchById(id),
    aggExpr.addId(),
    cabinsAddIdAggExpr(),
  ]
  return (await Vessel.aggregate(agg))[0]
}

const vesselBy = async function (field, value) {
  let agg = [
    aggExpr.matchByField(field, value),
    aggExpr.addId(),
    cabinsAddIdAggExpr(),
  ]
  return (await Vessel.aggregate(agg))[0]
}

const vessels = async function (idArr) {
  let agg = [aggExpr.matchByIdArr(idArr), aggExpr.addId(), ...vesselLogoAgg()]
  return await Vessel.aggregate(agg)
}

const vesselsBySlug = async function (slugArr) {
  let agg = [{'$match': {'slug': {'$in': slugArr}}}, aggExpr.addId(), ...vesselLogoAgg()]
  return await Vessel.aggregate(agg)
}

const searchVessels = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId(), ...vesselLogoAgg()]
  return await Vessel.aggregate(agg)
}

const paginatedVessels = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Vessel.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId(), ...vesselLogoAgg()])
  const totalQ = Vessel.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}


const cabin = async function (id) {
  let agg = [
    { $match: { "cabins._id": ObjectId(id)}},
    { $project: { cabins:
      { $filter : {
        input: "$cabins",
        as: "item",
        cond: { $eq: ["$$item._id", ObjectId(id)]}
      }}
    }},
    { $unwind: "$cabins"},
    { "$replaceRoot": { newRoot: "$cabins" }},
    aggExpr.addId(),
  ]

  let result = await Vessel.aggregate(agg)
  console.log('cabin result %o', result)
  return result[0]
}

const cabinBySlug = async function (slug) {
  let agg = [{$match : {slug: slug}}, aggExpr.addId(), ...cabinLogoAgg()]
  return (await Vessel.aggregate(agg))[0]
}

const cabins = async function (idArr) {
  let agg = [aggExpr.matchByIdArr(idArr), aggExpr.addId(), ...cabinLogoAgg()]
  return await Vessel.aggregate(agg)
}

const cabinsBySlug = async function (slugArr) {
  let agg = [{$match: {slug: {$in: slugArr}}}, aggExpr.addId(), ...cabinLogoAgg()]
  return await Vessel.aggregate(agg)
}

const searchCabins = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId(), ...cabinLogoAgg()]
  return await Vessel.aggregate(agg)
}

const paginatedCabins = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Vessel.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId(), ...cabinLogoAgg()])
  const totalQ = Vessel.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}


const createVessel = async function (input) {
  // check required fields
  utils.checkNonEmptyProperties(['name'], input)
  // check unicity for provided fields
  await utils.checkUniqueFieldValue(Vessel, 'name', input.name)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(Vessel, 'slug', slugSeed)

  const result = await Vessel.create(input)
  return await vessel(result._id)
}

const updateVessel = async function (id, input) {
  // check for non-empty & unique field values if provided
  const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvided.length){
    await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Vessel, e, input[e], id)))
  }

  await Vessel.findByIdAndUpdate(id, input)
  return await vessel(id)
}

const deleteVessel = async function (id) {
  let vessel = await Vessel.findById(id)
  await Vessel.findByIdAndRemove(id)
  return id
}

const deleteVessels = async function (idArr) {
  let attArr = await Vessel.find({ _id: {$in: idArr }})
  await Vessel.deleteMany({ _id: {$in: idArr }})
  return idArr
}

const createCabin = async function (vesselId, input) {
  // // check required fields
  // utils.checkNonEmptyProperties(['name'], input)
  // // check unicity for provided fields
  // await utils.checkUniqueFieldValue(Cabin, 'name', input.name)
  // // ensure unique slug
  // let slugSeed = input.slug ? input.slug : input.name
  // input.slug = await utils.generateUniqueSlug(Cabin, 'slug', slugSeed)
console.log('createCabin input %o', input)
  const result = await Vessel.findByIdAndUpdate(vesselId, {$push: {cabins: input}}, {new: true})
  if(!result) return null
  let addedCabin = result.cabins.slice(-1)[0]
console.log('addedCabin  %o', addedCabin)
  return await cabin(addedCabin._id)
}

const updateCabin = async function (id, input) {
  // check for non-empty & unique field values if provided
  // const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)
  //
  // input = utils.slugifyObjProperties(input, 'slug')
  // if(uniqueFieldsProvided.length){
  //   await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Cabin, e, input[e], id)))
  // }

  let updateData = Object.keys(input).reduce((acc, item) => {
    if(['_id', 'createdAt', 'updatedAt'].indexOf(item) != -1) return acc
    acc['cabins.$.' + item] = input[item]
    return acc
  }, {})

  await Vessel.findOneAndUpdate({'cabins._id': ObjectId(id)}, {$set: updateData})

  return await cabin(id)
}

const deleteCabin = async function (vesselId, id) {
  await Vessel.findByIdAndUpdate(vesselId, {$pull: {cabins: {'_id': ObjectId(id)}}})
  return id
}

const deleteCabins = async function (vesselId, idArr) {
  await Vessel.findByIdAndUpdate(vesselId, {$pull: {cabins: {'_id': {$in: utils.idArrToObjectIdArr(idArr)}}}})

  return idArr
}

// -----------------------------------------------------------
// ------------------ PRIVATE ---------------
// -----------------------------------------------------------

function getMatchExpr (args) {
  const matchingFields = ['id', 'name', 'slug',]
  let exprObject = aggExpr.parseMatchCompFiltersMultiOperators(matchingFields, args, ['', 'ne', 'in', 'not_in'])
  if(args.search){
    const {search, searchPaths = ['name', 'slug'], searchOptions} = args
    Object.assign(exprObject, aggExpr.parseMatchRegexFilters(search, searchPaths, searchOptions))
  }
  return {"$match": exprObject}
}

function vesselLogoAgg () {
  return [
    { "$lookup": {
              from: "attachments",
              let: { imageId: "$logo" },
              pipeline: [
                {"$match": { $expr: { $eq: ['$_id', "$$imageId"]} }},
                {"$addFields": { id: "$_id"}},
                { "$project": { _id: 0, createdAt: 0, updatedAt:0 }},
              ],
              as: "logo"
        }},

        { "$addFields": {
          "logo": {"$arrayElemAt": ["$logo", 0]}
        }}
  ]
}

function cabinsAddIdAggExpr () {
  return {
    "$addFields":{
      cabins: { $map: {
        input: "$cabins",
        as: "item",
        in: {$mergeObjects:["$$item", {id: "$$item._id"}]}
      }}
    }
  }
}

module.exports = {
  vessel,
  vesselBy,
  vessels,
  vesselsBySlug,
  searchVessels,
  paginatedVessels,

  cabin,
  cabinBySlug,
  cabins,
  cabinsBySlug,
  searchCabins,
  paginatedCabins,

  createVessel,
  updateVessel,
  deleteVessel,
  deleteVessels,

  createCabin,
  updateCabin,
  deleteCabin,
  deleteCabins,
}
