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
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_MESSAGES,
              json,
            })
          } else {
            reject(res)
          }
        })
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
          user_id: 1,
          relationship_id: 2,
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
  // getMessages(openChatID) {
  //   if (openChatID == null) {
  //     openChatID = 1
  //   }
  //   return new Promise((resolve, reject) => {
  //     request
  //       .get(APIEndpoints.MESSAGES)
  //       .query({openChatID})
  //       .end((error, res) => {
  //         if (!error && res.status === 200) {
  //           let json = JSON.parse(res.text)
  //           Dispatcher.handleServerAction({
  //             type: ActionTypes.GET_MESSAGES,
  //             json,
  //           })
  //           resolve(json)
  //         } else {
  //           reject(res)
  //         }
  //       })
  //   })
  // },
}
