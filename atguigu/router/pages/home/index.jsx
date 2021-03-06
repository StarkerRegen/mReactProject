import React, { Component } from 'react'
import { NavLink, Route, Switch } from 'react-router-dom'
import News from './news'
import Message from './message'

export default class Home extends Component {
    render() {
        return (
            <div>
                <h2>Home组件内容</h2>
                <div>
                    <ul className="nav nav-tabs">
                        <li>
                            <NavLink className="list-group-item" to="/home/news">News</NavLink>
                        </li>
                        <li>
                            <NavLink className="list-group-item" to="/home/message">message</NavLink>
                        </li>
                    </ul>
                    <Switch>
                        <Route path="/home/news" component={News} />
                        <Route path="/home/message" component={Message} />
                    </Switch>
                </div>
            </div>
        )
    }
}
