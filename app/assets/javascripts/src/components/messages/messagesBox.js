import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    // MessagesAction.getMessages()
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {messages: MessagesStore.getMessages()}
  }
  componentWillMount() {
    MessagesStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    MessagesStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  render() {
    let currentUserID = document.getElementById('currentUser').dataset.id
    let messages = this.state.messages.map((message, index) => {
      let messageClasses = classNames({
        'message-box__item': true,
        'message-box__item--from-current': message.user_id == currentUserID,
        'clear': true,
      })
      if (message.picture.url === null) {
        return (
          <li key={message.id} className={ messageClasses }>
            <div className='message-box__item__contents'>
              { message.contents }
            </div>
          </li>
        )
      } else {
        return (
          <li key={message.id} className={ messageClasses }>
            <div className='message-box__item__contents'>
              <img className='message-box__item__contents__picture' src={message.picture.url} />
            </div>
          </li>
        )
      }
    })
    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          { messages }
        </ul>
        <ReplyBox />,
      </div>
    )
  }
}

export default MessagesBox
