import React, { Component } from 'react';

class Info extends Component{
  state = {
    data: null
  };
  render() {
    const { params } = this.props.match
    return (
        <div className="home">
          <h1> {params.id} </h1>
        </div>
      );
  };
}

export default Info