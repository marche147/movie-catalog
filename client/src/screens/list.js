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
const { Option } = Select;

let capitalize = (title) => {
  let words = title.split(" ");
  let res = words.map((word) => { return word[0].toUpperCase() + word.substr(1); });
  return res.join(" ");
};

class List extends Component {
  getapi = (text) => {
    fetch(text)
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);

          for (let i = 0; i < result.length; i++) {
            if (result[i].img_url == null) {
              result[i].img_url="https://www.quantabiodesign.com/wp-content/uploads/No-Photo-Available.jpg"
            }

            if(result[i].runtime == null) {
              result[i].runtime = "0";
            }
            result[i].runtime = Number.parseInt(result[i].runtime);
          }

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
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    if ("name" == value) {
      var m = this.state.items.sort(function (o1, o2) {
        if(o1.title < o2.title) return -1;
        else if(o1.title > o2.title) return 1;
        return 0;
      });
      this.setState({ items: m });
    } else if ("time" == value) {
      var n = this.state.items.sort(function (o1, o2) {
        if(o1.runtime < o2.runtime) return -1;
        else if(o1.runtime > o2.runtime) return 1;
        return 0;
      });
      this.setState({ items: n });
    }
  }



  handleClick() {
    let content = document.getElementById('search').value;
    this.match(content)
  }

  clear() {
    this.getapi("/movies")
  }

  match(content) {
    for (let i = 0; i < this.state.items.length; i++) {
      if (content == this.state.items[i].title) {
        var m = [];
        m.push(this.state.items[i]);
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

  render() {
    const { error, isLoaded, items } = this.state;
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

    let listItems = this.state.items.map((m) =>
      <div class="display">
        <div className="gutter-box">

          <Col xs={{ span: 3, offset: 1 }} lg={{ span: 4, offset: 2 }}>
            <Card
              hoverable
              style={{ width: 200 }}
              cover={<img alt={m.title} src={m.img_url} />}
            >
              <Meta title={ capitalize(m.title) } description={m.release_date} />
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
            <Row type="flex" justify="space-between">
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
