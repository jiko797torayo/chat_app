import keyMirror from 'keymirror'

export const ActionTypes = keyMirror({
  UPDATE_OPEN_CHAT_ID: null,
  SEND_MESSAGE: null,
  GET_MESSAGES: null,
  GET_SEARCH: null,
  BUILD_RELATIONSHIP: null,
  GET_USERLIST: null,
  DESTROY_RELATIONSHIP: null,
  REPLYBOX_HIDE: null,
})

export function CSRFToken() {
  return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
}

const Root = window.location.origin || `${window.location.protocol}//${window.location.hostname}`
const APIRoot = `${Root}/api`
export const APIEndpoints = {
  MESSAGES: APIRoot + '/messages',
  SEARCH: APIRoot + '/search',
  RELATIONSHIPS: APIRoot + '/relationships',
  USERS: APIRoot + '/users',
}
