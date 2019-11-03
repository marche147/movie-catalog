import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Home from './screens/home';
import List from './screens/list';
class App extends Component {
  state = {
    data: null
  };

  componentDidMount(){
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if(response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  
  render() {
    return (
      <div>
      <div className="App">
        <h1> app </h1>
      </div>
      <div className="home">
        <h1> <Link to = "/home"> home </Link> </h1>
        <Route path="/home" component={Home} />
      </div>
      <div className="list">
        <h1> <Link to = "/list"> Movie List </Link> </h1>
        <Route path="/list" component={List} />
      </div>
      </div>
    );
  }
}

export default App;
