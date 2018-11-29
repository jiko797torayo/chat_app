import React from 'react'
import classNames from 'classNames'
import MessagesStore from '../../stores/messages'
import ReplyBox from '../../components/messages/replyBox'
import MessagesAction from '../../actions/messages'

class MessagesBox extends React.Component {

  constructor(props) {
    super(props)
    MessagesAction.getMessages()
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
    const messageClasses = classNames({
      'message-box__item': true,
      'clear': true,
    })
    return (
      <div className='message-box'>
        <ul className='message-box__list'>
          <li key={ this.state.messages.timestamp + '-' + this.state.messages.from } className={ messageClasses }>
            <div className='message-box__item__contents'>
              { this.state.messages.contents }
            </div>
          </li>
        </ul>
        <ReplyBox />,
      </div>
    )
  }
}

export default MessagesBox
