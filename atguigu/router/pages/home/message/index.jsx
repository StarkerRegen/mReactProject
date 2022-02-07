import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Detail from './detail'

export default class Message extends Component {
    state = {
        messageArr: [
            {id:'001', title:'msg1'},
            {id:'002', title:'msg2'},
            {id:'003', title:'msg3'}
        ]
    }
    replaceShow = (id, title) => {
        this.props.history.replace(`/home/message/detail/${id}/${title}`)
    }
    pushShow = (id, title) => {
        this.props.history.push(`/home/message/detail/${id}/${title}`)
    }
    forward = () => {
        this.props.history.goForward()
    }
    back = () => {
        this.props.history.goBack()
    }

    render() {
        const {messageArr} = this.state
        return (
            <div>
                <ul>
                {
                    messageArr.map((msg) => {
                        return(
                            <li key={msg.id}>
                                {/* 向路由组件传递params参数 */}
                                {<Link to={`/home/message/detail/${msg.id}/${msg.title}`}>{msg.title}</Link>}
                                {/* 传递search参数 */}
                                {/* <Link to={`/home/message/detail/?id=${msg.id}&title=${msg.title}`}>{msg.title}</Link> */}
                                {/* 传递state参数 */}
                                {/* <Link replace={true} to={{pathname:'/home/message/detail', state:{id: msg.id, title: msg.title}}}>{msg.title}</Link> */}
                                &nbsp;<button onClick={() => this.replaceShow(msg.id, msg.title)}>replaceShow</button>
                                &nbsp;<button onClick={() => this.pushShow(msg.id, msg.title)}>pushShow</button>
                            </li>
                        )
                    })
                }
                </ul>
                <hr />
                <button onClick={this.forward}>前进</button>
                &nbsp;<button onClick={this.back}>回退</button>
                {/* 声明接收params参数 */}
                <Route path="/home/message/detail/:id/:title" component={Detail} />
                {/* <Route path="/home/message/detail" component={Detail} /> */}
            </div>
        )
    }
}
