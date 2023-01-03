import React, { Component } from 'react'
//import qs from 'querystring'

const details = [
    {id:'001', content:'lsz'},
    {id:'002', content:'good'},
    {id:'003', content:'yeah'}
]

export default class Detail extends Component {
    render() {
        //接收params参数
        const {id, title} = this.props.match.params

        //接收search参数
        // const {search} = this.props.location
        // const {id, title} = qs.parse(search.slice(1))
        //接收state参数
        // const {id, title} = this.props.location.state || {}
        const findContent = details.find((detailObj)=>{
            return detailObj.id === id
        }) || {}
        return (
            <div>
                <ul>
                    <li>id:{id}</li>
                    <li>title:{title}</li>
                    <li>content:{findContent.content}</li>
                </ul>
            </div>
        )
    }
}
