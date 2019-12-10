const EditState = {
  NEW: 'new',
  EDIT: 'edit',
  LOADING: 'loading',
  ERROR: 'error'
}

const isEditState = (val) => {
  return val == EditState.EDIT
}

const isAddNewState = (val) => {
  return val == EditState.NEW
}

const isLoadingState = (val) => {
  return val == EditState.LOADING
}

const isErrorState = (val) => {
  return val == EditState.ERROR
}


const jsonCopy = (val) => {
    return JSON.parse(JSON.stringify(val))
}

// filter an object properties based on predicate function
function filterObject (obj, predicate) {
  if(!obj.__proto__ || obj.__proto__.constructor.name !== 'Object'){
    throw new Error("The obj provided should be an Object")
  }

  let newObj = {}
  for(let prop in obj){
    if(obj.hasOwnProperty(prop) && predicate(obj[prop], prop, obj)){
      newObj[prop] = obj[prop]
    }
  }

  return newObj
}

module.exports = {
  EditState,
  isEditState,
  isAddNewState,
  isLoadingState,
  isErrorState,
  jsonCopy,
  filterObject,
}
