import React from 'react'
import classNames from 'classnames'
import MessagesStore from '../../stores/messages'
import MessagesAction from '../../actions/messages'
import UsersAction from '../../actions/users'
import UsersStore from '../../stores/users'
import SearchAction from '../../actions/search'

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
      userList: UsersStore.getUserList(),
      userID: MessagesStore.getUserID(),
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
  changeOpenChat(toUserID) {
    MessagesAction.changeOpenChat(toUserID)
  }
  destroyRelationship(toUserID) {
    UsersAction.destroyRelationship(toUserID)
    UsersAction.replyBoxHide()
    SearchAction.getSearch()
  }
  render() {
    const users = this.state.userList.map((user, index) => {
      const itemClasses = classNames({
        'user-list__item': true,
        'clear': true,
        'user-list__item--active': this.state.userID === user.id,
      })
      return (
        <li
          className={itemClasses}
          key={user.id}
        >
          <div
            className='user-list__item--details'
            onClick={this.changeOpenChat.bind(this, user.id)}
          >
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
