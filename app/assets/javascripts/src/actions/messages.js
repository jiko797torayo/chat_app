import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },
  sendMessage(userID, message) {
    Dispatcher.handleViewAction({
      type: ActionTypes.SEND_MESSAGE,
      userID: userID,
      message: message,
      timestamp: +new Date(),
    })
  },
  getMessages(openChatID) {
    if (openChatID == null) {
      openChatID = 1
    }
    console.log('非同期のPromiseオブジェクトが作成される')
    return new Promise((resolve, reject) => {
      request
        .get('/api/messages')
        .query({ openChatID })
        .end((error, res) => {
          console.log('.end以降が動き出す')
          if (!error && res.status === 200) {
            let json = JSON.parse(res.text)
            console.log('ディスパッチャーを呼び出す')
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_MESSAGES,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },
}
