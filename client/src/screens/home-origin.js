import React, { Component } from 'react';
import logo from '../logo.svg';

class Home extends Component{
  state = {
    data: null
  };
  render() {
    return (
        <div className="home">
          <h1> Hello </h1>
        </div>
      );
  };
}

export default Home