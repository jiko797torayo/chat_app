import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

const search = {
  1: {
    user: {
      profilePicture: 'https://avatars0.githubusercontent.com/u/7922109?v=3&s=460',
      id: 1,
      name: 'Ryan Clark',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424469794050,
      currentUser: 1424469794080,
    },
    messages: [
      {
        contents: 'Hey!',
        from: 2,
        timestamp: 1424469793023,
      },
    ],
  },
}

class ResultsStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getAllResults() {
    return search
  }
  getSearch() {
    if (!this.get('search')) this.setSearch([])
    return this.get('search')
  }
  setSearch(array) {
    this.set('search', array)
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
  }

  return true
})

export default SearchStore
