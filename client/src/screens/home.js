import React, { Component } from 'react';
import { Layout, Menu, Carousel, Card, Col, Row, List } from 'antd';
const { Header, Content, Footer } = Layout;
const { Meta } = Card
import "./styles.css";
import { sortBy, take, reverse } from 'lodash'
import md5 from 'crypto-js/md5';

/* Capitalize title */
let capitalize = (title) => {
  let words = title.split(" ");
  let res = words.map((word) => { return (word[0] && word[0].toUpperCase()) + word.substr(1); });
  return res.join(" ");
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      movies: [],
    };
  }

  componentDidMount() {
    this.retrieve().then(res => { this.setState({ data: res }) }).catch(err => { console.log(err) });
    this.fetchMovies().then(res => { this.setState({ movies: res }) }).catch(err => { console.log(err) });
  }

  retrieve = async () => {
    const resp = await fetch("/top");
    if(resp.status !== 200) {
      return [];
    }
    const body = resp.json();
    return body;
  }

  fetchMovies = async () => {
    const resp = await fetch("/movies");
    if(resp.status !== 200) {
      return [];
    }
    const body = resp.json();
    return body;
  }


  render() {
    // console.log(this.state.movies,999)
    const arr = this.state.movies.filter(o => o.img_url), result = [];    
    for (let i = 0; i < 6; i++) {    
      const pos = Math.floor(Math.random() * (arr.length - i));      
      result.push(arr[pos]);      
      arr[pos] = arr[arr.length - i - 1];    
    };

    const sortMovies = key => sortBy(this.state.data, item => {
      if (item[key] && item[key].indexOf('%') > -1) {
        return +(item[key].replace(/[^0-9.]/ig, ''))
      }
      return +item[key] || 0
    }).filter(item => item[key]) //filter the empty values

    const getMoviesInAscOrder = key => take((sortMovies(key)), 10)
    const getMoviesInDescOrder = key => take(reverse(sortMovies(key)), 10)

    const rankList = [
      { title: 'Rotten Tomatoes top Ranking', list: getMoviesInAscOrder('rt_rank') },
      { title: 'IMDB top Ranking', list: getMoviesInAscOrder('imdb_rank') },
      { title: 'Rotten Tomatoes top Rating', list: getMoviesInDescOrder('rt_rate') },
      { title: 'IMDB top Rating', list: getMoviesInDescOrder('imdb_rate') },
    ]

    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
 
        </Header>

        <Content style={{ padding: '0 50px' }}>
          <center>
            <div style={{ background: '#fff', width: 960, padding: 24, minHeight: 280 }}>
              <Carousel autoplay>
                <div> <img src="/pic/1.jpeg" /> </div>
                <div> <img src="/pic/2.jpeg" /> </div>
                <div> <img src="/pic/3.jpeg" /> </div>
                <div> <img src="/pic/4.jpeg" /> </div>
              </Carousel>
            </div>
          </center>

          <div style={{ background: '#ECECEC', padding: '30px 0' }}>
              <Row gutter={16}>{
                result.map((movie, movieIndex) => {
                  const url = movie ? movie.img_url : ''
                  const title = movie ? movie.title : ' '
                  return (
                    <Col span={4}>
                      <Card title={null} bordered={false} cover={<img src={url}/>}>
                      <Meta title={ <a href={`/info/${md5(title)}`}>{capitalize(title)}</a>} />
                      </Card>
                    </Col>
                  )
                })
              }
              </Row>
            </div>

          <div style={{ background: '#ECECEC', padding: '30px 0' }}>
              <Row gutter={16}>{
                rankList.map((rank, rankIndex) => {
                  return (
                    <Col span={6} key={rankIndex}>
                      <Card title={rank.title} bordered={false}>
                        <List
                          size="large"
                          dataSource={rank.list}
                          renderItem={(item, index) =>
                            <List.Item>
                              <a href={`/info/${md5(item.title)}`}>{index + 1}. {capitalize(item.title)}</a>
                            </List.Item>}
                        />
                      </Card>
                    </Col>
                  )
                })
              }
              </Row>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Group 1 design @ 2019</Footer>
      </Layout>
    );
  };
}
export default Home
