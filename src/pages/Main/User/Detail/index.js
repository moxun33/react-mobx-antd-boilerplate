import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
@withRouter 
export default class UserDetail extends Component {
    constructor(props) {
           super(props)
        this.matchParams = props.match.params;
    }

    onUserClick = user => {
        console.log(user)
    }
    
    render() {



        return (
            <div  >
                User Id{this.matchParams.id}
                <p>User name {this.matchParams.name}</p>
            </div>
        )
    }
}