/* eslint-disable */
import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item } = Menu;

import Home from './screens/home';
import Info from './screens/info';
import List from './screens/list';
import TopMovies from './screens/TopMovies';
import NotFound from './screens/notfound';

import './App.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      selection: "1",
    };
    this.doOnClick = this.doOnClick.bind(this);
  }

  doOnClick = (e) => {
    this.setState({
      selection: e.key
    });
  }

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
        <Layout style={{ minHeight: '100vh' }}>
          <Sider>
            <div id="logo">
              <img src="/logo.svg" />
            </div>
            <Menu theme="dark" mode="inline" onClick={ this.doOnClick } defaultSelectedKeys={ this.state.selection }>
              <Item key="1"><Link to="/home">Home</Link></Item>
              <Item key="2"><Link to="/list">List</Link></Item>
              <Item key="3"><Link to="/top">Top Movies</Link></Item>
            </Menu>
          </Sider>
          <Content>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/home" component={Home} />
              <Route path="/list" component={List} />
              <Route path="/top" component={TopMovies} />
              <Route path="/info/:id" component={Info} />
              <Route component={NotFound} />
            </Switch>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
