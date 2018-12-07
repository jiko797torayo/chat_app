import request from 'superagent'
import Dispatcher from '../dispatcher'
import {ActionTypes, APIEndpoints, CSRFToken} from '../constants/app'

export default {
  getSearch() {
    return new Promise((resolve, reject) => {
      request
        .get(APIEndpoints.SEARCH)
        .end((error, res) => {
          if (!error && res.status === 200) {
            let json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.GET_SEARCH,
              json,
            })
            resolve(json)
          } else {
            reject(res)
          }
        })
    })
  },
  buildRelationship(toUserID) {
    console.log('buildRelationship')
    return new Promise((resolve, reject) => {
      request
        .post(APIEndpoints.RELATIONSHIPS)
        .set('X-CSRF-Token', CSRFToken())
        .send({
          to_user_id: toUserID,
        })
        .end((error, res) => {
          if (!error && res.status === 200) {
            let json = JSON.parse(res.text)
            Dispatcher.handleServerAction({
              type: ActionTypes.BUILD_RELATIONSHIP,
              json,
            })
          } else {
            reject(res)
          }
        })
    })
  },
}
