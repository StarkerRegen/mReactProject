import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {
    state = {
        users:[],
        isFirst: true,  //是否为首次打开页面
        isLoadding: false, //是否处于加载中
        err: '', //错误信息
    }

    componentDidMount() {
        this.token = PubSub.subscribe('users', (_, stateObj)=>{
            this.setState(stateObj)
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }
    
    render() {
        //const {users, isFirst, isLoading, err} = this.props
        const {users, isFirst, isLoading, err} = this.state
        return (
            <div className="row">
                {
                    isFirst ? <h2>欢迎使用！请输入关键字，然后点击搜索</h2>:
                    isLoading ? <h2>加载中...</h2>:
                    err ? <h2 style={{color: 'red'}}>{err}</h2>:
                    users.map((userObj) => {
                        return(
                            <div key={userObj.id} className="card">
                                <a rel="noreferrer" href={userObj.html_url} target="_blank">
                                    <img alt="HeadPhoto" src={userObj.avatar_url} style={{width: '100px'}} />
                                </a>
                                <p className="card-text">{userObj.login}</p>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
