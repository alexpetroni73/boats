const { Boat } = require('./../mongo/models')

const utils = require('./utils')
const aggExpr = require('./aggregation')

const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

// const boat = async function (id) {
//   let agg = [aggExpr.matchById(id), aggExpr.addId(), ...boatLogoAgg()]
//   return (await Boat.aggregate(agg))[0]
// }

const boat = async function (id) {
  let agg = [
    aggExpr.matchById(id),
    aggExpr.addId(),
    cabinsAddIdAggExpr(),
  ]
  return (await Boat.aggregate(agg))[0]
}

const boatBy = async function (field, value) {
  let agg = [
    aggExpr.matchByField(field, value),
    aggExpr.addId(),
    cabinsAddIdAggExpr(),
  ]
  return (await Boat.aggregate(agg))[0]
}

const boats = async function (idArr) {
  let agg = [aggExpr.matchByIdArr(idArr), aggExpr.addId(), ...boatLogoAgg()]
  return await Boat.aggregate(agg)
}

const boatsBySlug = async function (slugArr) {
  let agg = [{'$match': {'slug': {'$in': slugArr}}}, aggExpr.addId(), ...boatLogoAgg()]
  return await Boat.aggregate(agg)
}

const searchBoats = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId(), ...boatLogoAgg()]
  return await Boat.aggregate(agg)
}

const paginatedBoats = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Boat.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId(), ...boatLogoAgg()])
  const totalQ = Boat.aggregate([...agg, {"$count": "total"}])

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

  let result = await Boat.aggregate(agg)
  // console.log('cabin result %o', result)
  return result[0]
}

const cabinBySlug = async function (slug) {
  let agg = [{$match : {slug: slug}}, aggExpr.addId(), ...cabinLogoAgg()]
  return (await Boat.aggregate(agg))[0]
}

const cabins = async function (idArr) {
  let agg = [aggExpr.matchByIdArr(idArr), aggExpr.addId(), ...cabinLogoAgg()]
  return await Boat.aggregate(agg)
}

const cabinsBySlug = async function (slugArr) {
  let agg = [{$match: {slug: {$in: slugArr}}}, aggExpr.addId(), ...cabinLogoAgg()]
  return await Boat.aggregate(agg)
}

const searchCabins = async function (args = {}) {
  const {limit} = args
  let agg = [getMatchExpr(args), aggExpr.limit(limit), aggExpr.addId(), ...cabinLogoAgg()]
  return await Boat.aggregate(agg)
}

const paginatedCabins = async function (args = {}) {
  // defaults
  const {
    page, resultsPerPage,
    search, searchFields = ['name', 'slug'], searchOptions = 'i',
    orderBy, order,
  } = args

  let agg = [getMatchExpr(args)]

  const itemsQ = Boat.aggregate([...agg, aggExpr.sort(orderBy, order), ...aggExpr.pagination(page, resultsPerPage), aggExpr.addId(), ...cabinLogoAgg()])
  const totalQ = Boat.aggregate([...agg, {"$count": "total"}])

  const [items, total] = await Promise.all([itemsQ, totalQ])

  return {
    items,
    total: utils.parsePagTotalAggResult(total)
  }

}


const createBoat = async function (input) {
  // check required fields
  utils.checkNonEmptyProperties(['name'], input)
  // check unicity for provided fields
  await utils.checkUniqueFieldValue(Boat, 'name', input.name)
  // ensure unique slug
  let slugSeed = input.slug ? input.slug : input.name
  input.slug = await utils.generateUniqueSlug(Boat, 'slug', slugSeed)

  const result = await Boat.create(input)
  return await boat(result._id)
}

const updateBoat = async function (id, input) {
  // check for non-empty & unique field values if provided
  const uniqueFieldsProvided = utils.checkNonEmptyProperties(['name', 'slug'], input, false)

  input = utils.slugifyObjProperties(input, 'slug')
  if(uniqueFieldsProvided.length){
    await Promise.all(uniqueFieldsProvided.map(e => utils.checkUniqueFieldValue(Boat, e, input[e], id)))
  }

  await Boat.findByIdAndUpdate(id, input)
  return await boat(id)
}

const deleteBoat = async function (id) {
  let boat = await Boat.findById(id)
  await Boat.findByIdAndRemove(id)
  return id
}

const deleteBoats = async function (idArr) {
  let attArr = await Boat.find({ _id: {$in: idArr }})
  await Boat.deleteMany({ _id: {$in: idArr }})
  return idArr
}

const createCabin = async function (boatId, input) {
  // // check required fields
  // utils.checkNonEmptyProperties(['name'], input)
  // // check unicity for provided fields
  // await utils.checkUniqueFieldValue(Cabin, 'name', input.name)
  // // ensure unique slug
  // let slugSeed = input.slug ? input.slug : input.name
  // input.slug = await utils.generateUniqueSlug(Cabin, 'slug', slugSeed)
//console.log('createCabin input %o', input)
  const result = await Boat.findByIdAndUpdate(boatId, {$push: {cabins: input}}, {new: true})
  if(!result) return null
  let addedCabin = result.cabins.slice(-1)[0]
//console.log('addedCabin  %o', addedCabin)
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

  await Boat.findOneAndUpdate({'cabins._id': ObjectId(id)}, {$set: updateData})

  return await cabin(id)
}

const deleteCabin = async function (boatId, id) {
  await Boat.findByIdAndUpdate(boatId, {$pull: {cabins: {'_id': ObjectId(id)}}})
  return id
}

const deleteCabins = async function (boatId, idArr) {
  await Boat.findByIdAndUpdate(boatId, {$pull: {cabins: {'_id': {$in: utils.idArrToObjectIdArr(idArr)}}}})

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

function boatLogoAgg () {
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
  boat,
  boatBy,
  boats,
  boatsBySlug,
  searchBoats,
  paginatedBoats,

  cabin,
  cabinBySlug,
  cabins,
  cabinsBySlug,
  searchCabins,
  paginatedCabins,

  createBoat,
  updateBoat,
  deleteBoat,
  deleteBoats,

  createCabin,
  updateCabin,
  deleteCabin,
  deleteCabins,
}
