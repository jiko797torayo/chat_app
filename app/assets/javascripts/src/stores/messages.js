import Dispatcher from '../dispatcher'
import BaseStore from '../base/store'
import {ActionTypes} from '../constants/app'

const messages = {
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
      {
        contents: 'Hey, what\'s up?',
        from: 2,
        timestamp: 1424469794000,
      },
    ],
  },
  2: {
    user: {
      read: true,
      profilePicture: 'https://avatars3.githubusercontent.com/u/2955483?v=3&s=460',
      name: 'Jilles Soeters',
      id: 2,
      status: 'online',
    },
    lastAccess: {
      recipient: 1424352522000,
      currentUser: 1424352522080,
    },
    messages: [
      {
        contents: 'Want a game of ping pong?',
        from: 1,
        timestamp: 1424352522000,
      },
    ],
  },
  4: {
    user: {
      name: 'Todd Motto',
      id: 4,
      profilePicture: 'https://avatars1.githubusercontent.com/u/1655968?v=3&s=460',
      status: 'online',
    },
    lastAccess: {
      recipient: 1424423579000,
      currentUser: 1424423574000,
    },
    messages: [
      {
        contents: 'Please follow me on twitter I\'ll pay you',
        timestamp: 1424423579000,
        from: 4,
      },
    ],
  },
}

var openChatID = parseInt(Object.keys(messages)[0], 10)

class ChatStore extends BaseStore {
  addChangeListener(callback) {
    this.on('change', callback)
  }
  removeChangeListener(callback) {
    this.off('change', callback)
  }
  getOpenChatUserID() {
    return openChatID
  }
  getChatByUserID(id) {
    return messages[id]
  }
  getAllChats() {
    return messages
  }
  getMessages() {
    console.log('setMessagesを引数に渡す')
    if (!this.get('messages')) this.setMessages([])
    console.log('this.getを返す')
    return this.get('messages')
  }
  setMessages(array) {
    console.log('stateを更新')
    this.set('messages', array)
  }
}
const MessagesStore = new ChatStore()

MessagesStore.dispatchToken = Dispatcher.register(payload => {
  const action = payload.action

  switch (action.type) {
    case ActionTypes.UPDATE_OPEN_CHAT_ID:
      openChatID = action.userID
      messages[openChatID].lastAccess.currentUser = +new Date()
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break
    case ActionTypes.SEND_MESSAGE:
      const userID = action.userID
      MessagesStore._storage.messages.push({
        contents: action.message.contents,
        from: action.message.from,
        timestamp: action.message.timestamp,
      })
      messages[userID].lastAccess.currentUser = +new Date()
      MessagesStore.emitChange()
      break
    case ActionTypes.GET_MESSAGES:
      console.log('setMessagesが動き出す')
      MessagesStore.setMessages(action.json)
      MessagesStore.emitChange()
      break
  }

  return true
})

export default MessagesStore
