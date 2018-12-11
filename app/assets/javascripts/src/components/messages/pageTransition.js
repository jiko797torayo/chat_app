import React from 'react'

class PageTransition extends React.Component {
  render() {
    return (
      <div className='page-transition'>
        <a className='page-transition__title' href='/'>Chat App</a>
        <a className='page-transition__my-page' href={'/users/' + document.getElementById('currentUser').dataset.id}>My Page</a>
      </div>
    )
  }
}

export default PageTransition
