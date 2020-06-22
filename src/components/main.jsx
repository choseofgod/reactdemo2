import React, {Component} from "react";
import PropType from 'prop-types'
import axios from 'axios'

import './main.css'

export default class Main extends Component {

  static propTypes = {
    searchName: PropType.string.isRequired
  }

  state = {
    initView: true,
    loading: true,
    users: null,
    errorMsg: null,
    ProSearchName: ''
  }

  // componentWillReceiveProps(nextProps, nextContext) {
  //   const {searchName} = nextProps
  //   //更新状态(请求在)
  //   this.setState({
  //     initView: false,
  //     loading:true
  //   })
  //
  //   //发ajax请求
  //   const url = `https://api.github.com/search/users?q=${searchName}`
  //   axios.get(url)
  //     .then(res => {
  //       //得到数据
  //       const result = res.data
  //       const users = result.items.map(item => ({name:item.login,url: item.html_url,avatarUrl: item.avatar_url}))
  //       //更新 成功
  //       this.setState({
  //         loading:false,users
  //       })
  //     })
  //     .catch(err => {
  //       //更新状态 失败
  //       this.setState({
  //         loading:false,errorMsg: err.message
  //       })
  //     })
  // }
  //推荐写法 getDervedStateFromProps + componentDidUpdate
  static getDerivedStateFromProps(props , state) {
    if(props.searchName !== state.ProSearchName){
      const searchName = props.searchName
      return {
        initView: false,
        loading:true,
        ProSearchName: searchName
      }
    }

    return null
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    const {searchName} = prevProps
    console.log(prevProps)
    if(searchName !== this.state.ProSearchName){
      let url = `https://api.github.com/search/users?q=${this.state.ProSearchName}`
      axios.get(url)
        .then(res => {
          //得到数据
          const result = res.data
          const users = result.items.map(item => ({name:item.login,url: item.html_url,avatarUrl: item.avatar_url}))
          //更新 成功
          console.log('得到数据拉')
          this.setState({
            loading:false,
            users
          })
        })
        .catch(err => {
          //更新状态 失败
          this.setState({
            loading:false,errorMsg: err.message
          })
        })
    }
  }

  render() {
    const {initView,loading,users,errorMsg} = this.state
    const {searchName} = this.props

    if(initView) {
      return <h2>请输入关键词进行搜索{searchName}</h2>
    }else if (loading) {
      return <h2>正在请求在....{searchName}</h2>
    }else if (errorMsg) {
      return <h2>{errorMsg}</h2>
    } else {
      return (
        <div>
          {
            users.map((user,index) => (
              <div key={index} className="main">
                <a href={user.url}>
                  <img src={user.avatarUrl} alt=""/>
                </a>
                <p>{user.name}</p>
              </div>
            ))
          }
        </div>
      )
    }


  }
}