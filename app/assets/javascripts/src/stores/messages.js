import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getMessages() {
    if (!this.get('messages')) this.setMessages([])
    return this.get('messages')
  }
  setMessages(array) {
    this.set('messages', array)
  }
  getUserID() {
    if (!this.get('userID')) this.setUserID([])
    return this.get('userID')
  }
  setUserID(array) {
    this.set('userID', array)
  }
}

const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.SEND_MESSAGE:
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break
    case ActionTypes.GET_MESSAGES:
      MessagesStore.setMessages(action.json)
      MessagesStore.setUserID(action.userID)
      MessagesStore.emitChange()
      break
    case ActionTypes.REPLYBOX_HIDE:
      MessagesStore.setMessages([])
      MessagesStore.setUserID([])
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
