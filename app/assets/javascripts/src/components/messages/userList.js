import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import Utils from '../../utils'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'
import UsersStore from '../../stores/users'
import SearchAction from "../../actions/search";

class UserList extends React.Component {

  constructor(props) {
    super(props)
    UsersAction.getUserList()
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      // openChatID: MessagesStore.getOpenChatUserID(),
      userList: UsersStore.getUserList(),
    }
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
    UsersStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
    UsersStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  changeOpenChat(id) {
    MessagesAction.changeOpenChat(id)
  }
  destroyRelationship(toUserID) {
    UsersAction.destroyRelationship(toUserID)
    SearchAction.getSearch()
  }
  render() {
    const users = this.state.userList.map((user, index) => {
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': this.state.openChatID === user.id,
      })
      return (
        <li
          onClick={this.changeOpenChat.bind(this, user.id)}
          className={itemClasses}
          key={user.id}
        >
          <div className='user-list__item--details'>
            <h4 className='user-list__item--details__name'>
              {user.name}
            </h4>
          </div>
          <div
            className='fa fa-times-circle'
            onClick={this.destroyRelationship.bind(this, user.id)}
          >
          </div>
        </li>
      )
    }, this)
    return (
      <div className='user-list'>
        <ul className='user-list__list'>
          {users}
        </ul>
      </div>
    )
  }
}

export default UserList
