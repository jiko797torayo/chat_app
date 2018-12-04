import React from 'react'
import SearchBox from './searchBox'

class Header extends React.Component {
  render() {
    return (
        <header className='header'>
          <SearchBox />
        </header>
      )
  }
}

export default Header
