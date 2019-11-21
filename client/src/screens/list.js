import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Info from './info';
import { Card } from 'antd';
import { AutoComplete } from 'antd';
import { Menu, Dropdown, Icon } from 'antd';
import { Select } from 'antd';
import { Row, Col } from 'antd';
import { Input } from 'antd';
import { BackTop } from 'antd';
import { Pagination } from 'antd';
import { Spin } from 'antd';
import md5 from 'crypto-js/md5';

/* eslint-disable */
const movies = [{ "id": 1, "name": "joker", "year": 2019, "director": "Joachim Ronning", "cast": "Angelina Jolie" },
{ "id": 2, "name": "once upon a time in hollywood", "year": 2019, "director": "Quentin Tarantino", "cast": "Brad Pitt" },
{ "id": 3, "name": "avengers: endgame", "year": 2019, "director": "Chris Buck", "cast": "Idina Menzel" },
{ "id": 4, "name": "avengersd: endgame", "year": 20195, "director": "Chris Buckd", "cast": "Idina Menzeld" },
{ "id": 5, "name": "avengersd: endgame", "year": 20195, "director": "Chris Buckd", "cast": "Idina Menzeld" },
{ "id": 6, "name": "avengersd: endgame", "year": 20195, "director": "Chris Buckd", "cast": "Idina Menzeld" },
{ "id": 14, "name": "avengers1: endgame", "year": 20191, "director": "Chris Buck1", "cast": "Idina Menzel1" }
]

const { Option } = Select;

//function onSelect(value) {
//console.log('onSelect', value);
//}


/*
function handleChange(value) {
  console.log(`selected ${value}`);
  if(value=="rate"){
    sortById();
  }else if (value=="time"){
    console.log('2');
  }
}
function sortById(){
  console.log('ok')
}
*/
class List extends Component {
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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
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
    this.clear = this.clear.bind(this);
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
    //this.getapi("/list");
    let content = document.getElementById('search').value;
    //console.log(content)
    console.log(`hi`)
    this.match(content)
    /*this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
    */

    //this.getapi("/list");
    //this.forceUpdate()
  }

  clear() {
    this.getapi("/list")
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

    //let m=this.state.items[1]
    //console.log(this.state.items[1].title)
    //jokerthis.forceUpdate()
    //console.log(`a new ${m}`)

  }
  componentDidMount() {
    //let m=this.state.items;
    //console.log(`initialize ${m}`);
    this.getapi("/list");

    //let m=this.state.items;
  }

  onSearch = searchText => {
    let content = document.getElementById('search').value;
    //console.log(content)
    //this.setState({
    //items: !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)],

    //});
  };

  //let m=this.state.items;
  render() {
    const { error, isLoaded, items } = this.state;
    //let itemsmap = items.map((m) => <div class="display"><li key={m._id}> <Link to={`/info/${m.id}`}> {m.title} </Link></li></div>)
    const { Meta } = Card;

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#">
            Top10 RT
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="#">
            Top10 Db
          </a>
        </Menu.Item>
      </Menu>
    );

    //let m=this.state.items;
    //const listItems = movies.map((m) => <li key={m.id}> <Link to={`/info/${m.name}`}> {m.name} </Link></li>)
    let listItems = this.state.items.map((m) =>
      <div class="display">
        <div className="gutter-box">

          <Col xs={{ span: 3, offset: 1 }} lg={{ span: 4, offset: 2 }}>
            <Card
              hoverable
              style={{ width: 200 }}
              cover={<img alt={m.title} src={m.img_url} />}
            >
              <Meta title={m.title} description={m.release_date} />
              <li key={md5(m.title)}> <Link to={`/info/${md5(m.title)}`}> info </Link></li>
            </Card>
          </Col>

        </div>

      </div>
    );

    if (error) {
      return (<div className="container">
        <div className="search">
          <Select defaultValue="name" style={{ width: 90 }} onChange={this.handleChange}>
            <Option value="name">name</Option>
            <Option value="year">year</Option>
            <Option value="cast">cast</Option>
          </Select>
          <Input
            placeholder="Input Here"
            id="search"
            style={{ width: 200 }} />
          <button onClick={this.handleClick}>search</button>
          <Dropdown overlay={menu}>
            <a className="dropdown-link" href="#">
              Top Movies <Icon type="down" />
            </a>
          </Dropdown>
          <br />
          <Row type="flex" justify="end">
            <Col span={4}>
              <Select defaultValue="Sort by: Featured" id="choice" style={{ width: 170 }} onChange={this.handleChange}>
                <Option value="name">Alphabetical order</Option>
                <Option value="time">Runtime</Option>
              </Select>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            {listItems}
          </Row>
        </div>
        <div>
          <Pagination defaultCurrent={1} total={50} />
        </div>
        <div>
          <BackTop />
          Scroll down to see the bottom-right
           <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> gray </strong>
          button.
         </div>
        <div>Error: </div>

      </div>);
    } else if (!isLoaded) {
      return (<div className="container">
        <div className="loading">
          <Spin />
        </div>
        <div>Loading...</div></div>)
    } else {
      return (
        <div className="container">
          <div className="search">
            <Select defaultValue="name" style={{ width: 90 }} onChange={this.handleChange}>
              <Option value="name">name</Option>
              <Option value="year">year</Option>
              <Option value="cast">cast</Option>
            </Select>
            <Input
              placeholder="Input Here"
              id="search"
              style={{ width: 200 }} />
            <button onClick={this.handleClick}>search</button>
            <button onClick={this.clear}>clear</button>
            <Dropdown overlay={menu}>
              <a className="dropdown-link" href="#">
                Top Movies <Icon type="down" />
              </a>
            </Dropdown>
            <br />
            <Row type="flex" justify="end">
              <Col span={4}>
                <Select defaultValue="Sort by: Featured" style={{ width: 170 }} onChange={this.handleChange}>
                <Option value="name">Alphabetical order</Option>
                <Option value="time">Runtime</Option>
                </Select>
              </Col>
            </Row>
          </div>

          <div className="home">
            <Row>
              {listItems}
            </Row>
            <Route path="/info/:id" component={Info} />
          </div>
          <div>
            <BackTop />
            Scroll down to see the bottom-right
           <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> gray </strong>
            button.
         </div>
        </div>
      );
    }
  };
}

export default List
