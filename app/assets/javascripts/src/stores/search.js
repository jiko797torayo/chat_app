import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class ResultsStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getSearch() {
    if (!this.get('search')) this.setSearch([])
    return this.get('search')
  }
  setSearch(array) {
    this.set('search', array)
  }
  getRelationships() {
    if (!this.get('relationships')) this.setRelationships([])
    return this.get('relationships')
  }
  setRelationships(array) {
    this.set('relationships', array)
  }
}
const SearchStore = new ResultsStore()

SearchStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_SEARCH:
      SearchStore.setSearch(action.json)
      SearchStore.emitChange()
      break
    case ActionTypes.BUILD_RELATIONSHIP:
      SearchStore.setRelationships(action.json)
      SearchStore.emitChange()
      break
  }
  return true
})

export default SearchStore
