import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
@withRouter
export default class UserDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        User Id{this.props.match.params.id}
        <p>User name {this.props.match.params.name}</p>
      </div>
    );
  }
}
