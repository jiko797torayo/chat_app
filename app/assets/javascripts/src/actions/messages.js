import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  changeOpenChat(toUserID) {
    return new Promise((resolve, reject) => {
      request
        .get(APIEndpoints.MESSAGES)
        .query({
          to_user_id: toUserID,
        })
        .end((error, res) => {
          if (!error && res.status === 200) {
            let json = JSON.parse(res.text)
            let userID = toUserID
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_MESSAGES,
              json,
              userID,
            })
          } else {
            reject(res)
          }
        })
    })
  },
  sendMessage(userID, value) {
    return new Promise((resolve, reject) => {
      request
        .post(APIEndpoints.MESSAGES)
        .set('X-CSRF-Token', CSRFToken())
        .send({
          contents: value,
          to_user_id: userID,
        })
        .end((error, res) => {
          if (!error && res.status === 200) {
            let json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.SEND_MESSAGE,
              json,
            })
          } else {
            reject(res)
          }
        })
    })
  },
}
