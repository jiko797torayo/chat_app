import React from 'react'
import SearchBox from './searchBox'
import PageTransition from './pageTransition'

class Header extends React.Component {
  render() {
    return (
        <header className='header'>
          <PageTransition />
          <SearchBox />
        </header>
      )
  }
}

export default Header
