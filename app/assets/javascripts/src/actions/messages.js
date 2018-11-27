import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(newUserID) {
    Dispatcher.handleViewAction({
      type: ActionTypes.UPDATE_OPEN_CHAT_ID,
      userID: newUserID,
    })
  },
  sendMessage(openUserID, value) {
    const fromUserID = 1
    return new Promise((resolve, reject) => {
      request
        .post(APIEndpoints.MESSAGES)
        .set('X-CSRF-Token', CSRFToken())
        .send({
          contents: value,
          from: fromUserID,
          to: openUserID,
          timestamp: new Date().getTime(),
        })
        .end((error, res) => {
          if (!error && res.status === 200) {
            let json = JSON.parse(res.text)
            let userID = openUserID
            Dispatcher.handleServerAction({
              type: ActionTypes.SEND_MESSAGE,
              userID,
              json,
            })
          } else {
            reject(res)
          }
        })
    })
  },
  getMessages(openChatID) {
    if (openChatID == null) {
      openChatID = 1
    }
    console.log('非同期のPromiseオブジェクトが作成される')
    return new Promise((resolve, reject) => {
      request
        .get(APIEndpoints.MESSAGES)
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
