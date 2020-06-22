import React, {Component} from "react";
import PropType from 'prop-types'



export default class Search extends Component {

  static propTypes = {
    setSearchName : PropType.func.isRequired
  }


  search = () => {
    const searchName = this.input.value.trim()

    if(searchName) {
      this.props.setSearchName(searchName)
    }

  }

  render() {
    return (
      <div>
        <input type="text" placeholder="搜索关键词" ref={input => this.input =input}/>
        <button onClick={this.search}>Search</button>
      </div>
    )
  }
}