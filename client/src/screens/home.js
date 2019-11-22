import logo from '../logo.svg';
import { Input } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import React, { Component } from 'react';
import {  Dropdown, Icon } from 'antd';
import { Button } from 'antd';
import { Carousel } from 'antd';
import { Card, Col, Row } from 'antd';
import "./styles.css";
import { List, Typography } from 'antd';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

class Home extends Component{
    getapi = (text) => {
    fetch(text)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          this.setState({
            isLoaded: true,
            items: result

          });

        },
        (error) => {
          console.log(error)
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    this.getapi = this.getapi.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange=this.handleChange.bind(this);
  }

  handleChange(value) {
    console.log(value);
    if("name"==value){
      var m = this.state.items.title.sorter((a, b) => a.title > b.title);
      this.setState({items:m});
    }else if("time"==value){
      var n = this.state.items.runtime.sorter((a, b) => a.runtime > b.runtime);
      this.setState({items:n});
    }
  }

  handleClick() {
    let content = document.getElementById('search').value;
    console.log(`hi`)
    this.match(content)
  }

    match(content) {
    console.log(content)
    console.log(this.state.items.length)
    for (let i = 0; i < this.state.items.length; i++) {
      if (content == this.state.items[i].title) {
        console.log(`its ${this.state.items[i]}`)
        console.log(this.state.items[i])

        var m = [];
        m.push(this.state.items[i]);
        console.log(m);
        this.setState({ items: m });
      }
    }
  }

  componentDidMount() {
    this.getapi("/movies");
  }

  onSearch = searchText => {
    let content = document.getElementById('search').value;
  };

  onChange = value => {
    this.setState({ value });
  };

  render() {
    
    const { error, isLoaded, items } = this.state;
    return (
      <Layout className="layout">
      <Header>
              <div className="logo" />
              <Menu
                theme="dark"
               mode="horizontal"
               defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">
                RT
              </Menu.Item>
              <Menu.Item key="2">IMDB</Menu.Item>
              <Menu.Item key="3">Favorite</Menu.Item>       
            </Menu>
          </Header>

    <Content style={{ padding: '0 50px' }}>

      <center><div style={{ background: '#fff', width: 960, padding: 24, minHeight: 280 }}>
      <Carousel autoplay>
        <div>
          <img src ="/pic/1.jpeg" />
        </div>
        <div>
          <img  src="/pic/2.jpeg" />
        </div>
        <div>
          <img  src="/pic/3.jpeg" />
        </div>
        <div>
          <img  src="/pic/4.jpeg" />
        </div>
        </Carousel>
        </div></center>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
          <div style={{ background: '#ECECEC', padding: '30px' }}>
          <Row gutter={16}>
            <Col span={6}>
              <Card title="Rotten Tomatoes top10 Ranking" bordered={false}>
                Avengers:Endgame
                <br/>
                <br/>
                Us
                <br/>
                <br/>
                Toy Story 4
                <br/>
                <br/>
                The Farewell
                <br/>
                <br/>
                Booksmart
                <br/>
                <br/>
                Parasite
                <br/>
                <br/>
                If Beale Street Could Talk
                <br/>
                <br/>
                Spider-man: Far From Home
                <br/>
                <br/>
                Once Upon A Time In Hollywood
                <br/>
                <br/>
                Shazam!
                <br/>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="IMDB top10 Ranking" bordered={false}>
                Joker
                <br/>
                <br/>
                Parasite
                <br/>
                <br/>
                Avengers:Endgame
                <br/>
                <br/>
                Spider-man: Into The Spider-verse
                <br/>
                <br/>
                Capernaum
                <br/>
                <br/>
                Green Book
                <br/>
                <br/>
                Bacurau
                <br/>
                <br/>
                The Biggest Little Farm
                <br/>
                <br/>
                Once Upon A Time In Hollywood
                <br/>
                <br/>
                Toy Story 4
                <br/>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="Rotten Tomatoes top10 Rating" bordered={false}>
                They Shall Not Grow Old
                <br/>
                <br/>
                Knock Down The House
                <br/>
                <br/>
                Chained For Life
                <br/>
                <br/>
                For Sama
                <br/>
                <br/>
                The Chambermaid
                <br/>
                <br/>
                Amazing Grace
                <br/>
                <br/>
                Bacurau
                <br/>
                <br/>
                Apollo 11
                <br/>
                <br/>
                Ash Is Purest White
                <br/>
                <br/>
                The Farewell
                <br/>
              </Card>
            </Col>
            <Col span={6}>
              <Card title="IMDB top10 Rating" bordered={false}>
                Avengers: Endgame
                <br/>
                <br/>
                Joker
                <br/>
                <br/>
                Shoplifters
                <br/>
                <br/>
                The Farewell
                <br/>
                <br/>
                The Biggest Little Farm
                <br/>
                <br/>
                Once Upon A Time In Hollywood
                <br/>
                <br/>
                Toy Story 4
                <br/>
                <br/>
                Bacurau
                <br/>
                <br/>
                Green Book
                <br/>
                <br/>
                Capernaum
                <br/>
              </Card>
            </Col>
          </Row>
        </div>
    </div> 
    </Content>
        <Footer style={{ textAlign: 'center' }}>Group 1 design @ 2019</Footer>
          </Layout>
      );
  };
}
export default Home
  
    
