import React from 'react'
import SearchStore from '../../stores/search'
import SearchAction from '../../actions/search'

class SearchBox extends React.Component {
  constructor(props) {
    super(props)
    SearchAction.getSearch()
    this.state = this.initialState
  }
  get initialState() {
    return this.getStateFromStore()
  }
  getStateFromStore() {
    return {
      search: SearchStore.getSearch(),
      items: [],
    }
  }
  componentWillMount() {
    SearchStore.onChange(this.onStoreChange.bind(this))
  }
  componentWillUnmount() {
    SearchStore.offChange(this.onStoreChange.bind(this))
  }
  onStoreChange() {
    this.setState(this.getStateFromStore())
  }
  componentDidMount() {
    this.setState({items: this.state.search})
  }
  filterList(e) {
    const updateList = this.state.search.filter((item) => {
      return item.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
    })
    if(e.target.value === ''){
      this.setState({items: []})
    } else {
      this.setState({items: updateList})
    }
  }
  buildRelationship(toUserID) {
    SearchAction.buildRelationship(toUserID)
  }
  render() {
    return (
      <div className='search-box'>
        <input
          onChange={this.filterList.bind(this)}
          className='search-box__input'
          placeholder='チャットしたい人のユーザー名を入力してね'
        />
        <div className='search-box__lists'>
          {this.state.items.map((item, index) => {
            return (
              <div key={index} className='chat-user'>
                <p className='chat-user__name'>{item.name}</p>
                <a
                  onClick={this.buildRelationship.bind(this, item.id)}
                  className='chat-user__add'
                  data-user-id={item.id}
                  data-user-name={item.name}>
                  追加
                </a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default SearchBox
