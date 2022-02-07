import React, { Component } from 'react'
//import axios from 'axios'
import PubSub from 'pubsub-js'

export default class Search extends Component {
    handleClick = async() => {
        //解构赋值连续+重命名
        const {keyWorldElement:{value:keyWord}} = this
        PubSub.publish('users', {isFirst: false, isLoading: true})
        //使用axios发送请求
        // axios.get(`/api1/search/users2?q=${keyWord}`).then(
        //     response => {PubSub.publish('users', {isLoading:false, users: response.data.items})},
        //     error => {PubSub.publish('users', {isLoading:false, err:error.message})}
        // )

        //使用fetch发送请求
        /*fetch(`/api1/search/users?q=${keyWord}`).then(
            response => {
                console.log('successful!')
                return response.json()
            },
            // error => {
            //     console.log('failed!', error)
            //     return new Promise(()=>{})
            // }
        ).then(
            response => {console.log('get data!', response)},
            //error => {console.log('get data failed!', error)}
        ).catch(
            (error) => {console.log(error);}
        )*/
        try {
            const response = await fetch(`/api1/search/users?q=${keyWord}`)
            const data = await response.json()
            PubSub.publish('users', {isLoading:false, users: data.items})
        } catch (error) {
            PubSub.publish('users',{isLoading:false,err:error.message})
        }
    }
    render() {
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input ref={c => this.keyWorldElement = c}type="text" placeholder="enter the name your search" />&nbsp;
                    <button onClick={ this.handleClick }>Search</button>
                </div>
            </section>
        )
    }
}
