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
  getUserList() {
    if (!this.get('userList')) this.setUserList([])
    return this.get('userList')
  }
  setUserList(array) {
    this.set('userList', array)
  }
}
const UsersStore = new ResultsStore()

UsersStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.GET_USERLIST:
      UsersStore.setUserList(action.json)
      UsersStore.emitChange()
      break
    case ActionTypes.BUILD_RELATIONSHIP:
      UsersStore.setUserList(action.json)
      UsersStore.emitChange()
      break
    case ActionTypes.DESTROY_RELATIONSHIP:
      UsersStore.setUserList(action.json)
      UsersStore.emitChange()
      break
  }
  return true
})

export default UsersStore
