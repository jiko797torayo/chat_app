import React from 'react'

class PageTransition extends React.Component {
  render() {
    return (
      <div className='page-transition'>
        <a className='page-transition__title' href='/'>Chat App</a>
        <div className='page-transition__current-user-name'>{'〜 こんにちは ' + document.getElementById('currentUser').dataset.name + 'さん 〜'}</div>
        <a className='page-transition__my-page' href={'/users/' + document.getElementById('currentUser').dataset.id}>My Page</a>
      </div>
    )
  }
}

export default PageTransition
