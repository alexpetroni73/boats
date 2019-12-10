/* EditStateMixin - keep the edit state for an item into editor  */

import { EditState, isAddNewState, isEditState, isLoadingState, isErrorState } from '@/utils'

const mix = {
  data: function () {
    return {
      editState: EditState.NEW,
      editStateError: ''
    }
  },

  methods: {
    setAddNewState () {
      this.clearError()
      this.editState = EditState.NEW
    },

    setEditState () {
      this.clearError()
      this.editState = EditState.EDIT
    },

    setLoadingState () {
      this.clearError()
      this.editState = EditState.LOADING
    },

    setErrorState (error = 'Error...') {
      this.editStateError = error
      this.editState = EditState.ERROR
    },

    clearError () {
      this.editStateError = ''
    }
  },

  computed: {
    isAddNewState () {
      return isAddNewState(this.editState)
    },

    isEditState () {
      return isEditState(this.editState)
    },

    isLoadingState () {
      return isLoadingState(this.editState)
    },

    isErrorState () {
      return isErrorState(this.editState)
    },

    isEditReadyState () {
      return this.isEditState || this.isAddNewState
    },
  }
}

export default mix
