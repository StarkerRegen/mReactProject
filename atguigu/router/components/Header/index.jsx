import React, { Component } from 'react'
import { withRouter } from 'react-router'

class Header extends Component {
    forward = () => {
        this.props.history.goForward()
    }
    back = () => {
        this.props.history.goBack()
    }
    render() {
        return (
            <div>
                <h1>Router demo</h1>
                <button onClick={this.forward}>εθΏ</button>
                &nbsp;<button onClick={this.back}>ει</button>
            </div>
        )
    }
}

export default withRouter(Header)