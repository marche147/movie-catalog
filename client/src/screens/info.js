/* eslint-disable */
import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { Descriptions, Badge, Row, Col, Tag, List, Skeleton, Avatar } from 'antd';

let { Item } = Descriptions;

let capitalize = (title) => {
  let words = title.split(" ");
  let res = words.map((word) => { return word[0].toUpperCase() + word.substr(1); });
  return res.join(" ");
};

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [], comments: [], loaded: false };
  }

  async componentDidMount() {
    let data = await this.fetch("/movies");
    let comms = await this.fetch("/review");
    let state = { data: data, comments: comms, loaded: true };
    this.setState(state);
  }

  fetch = async (url) => {
    const resp = await fetch(url);
    if(resp.status !== 200) {
      return [];
    }
    const body = resp.json();
    return body;
  }

  /* Data fixup */
  normalize(data) {
    if(data.plot == undefined) {
      data.plot = "TBA";
    }

    if(data.genre == undefined) {
      data.genre = [];
    }

    if(data.release_date == undefined) {
      data.release_date = "Unknown";
    }

    if(data.runtime == undefined) {
      data.runtime = "Unknown";
    } else {
      data.runtime = Number.parseInt(data.runtime).toString() + " Minutes";
    }

    data.title = capitalize(data.title);
    return data;
  }

  render() {
    if(this.state.loaded == false) {
      return (
        <h1>Loading...</h1>
      );
    }

    const { match: { params } } = this.props;
    let d = this.state.data.find((item) => { return md5(item.title) == params.id; });
    if(d === undefined) {
      return (
        <h1>Movie not found.</h1>
      );
    }

    let comms = this.state.comments.filter((item) => { return md5(item.title) == params.id; });
    let data = this.normalize(d);
    let title = (
      <Row>
        <Col span={ 9 } />
        <Col span={ 6 }><center><h3>{ data.title }</h3></center></Col>
        <Col span={ 9 } />
      </Row>
    );
    let genre = data.genre.map((g) => <Tag key={ g }>{ g }</Tag>);

    function scores(comms){
      var s = 0;
      for (var i=0; i<comms.length; i++)
        {s += Number(comms[i].score);}
      return (100*s/comms.length).toFixed(1);
      console.log(s);
    }
    let grade = scores(comms);

    let make_comm = (item) => {
      let avatar = (
        <Avatar src={ Number.parseInt(item.score) != 0 ? "/upvote.png" : "/downvote.png" } />
      );

      return (
        <List.Item>
          <Skeleton avatar title={false} active loading={ false }>
            <List.Item.Meta
              avatar={ avatar }
              title={ item.review_title }
              description={ item.review_content }
            />
          </Skeleton>
        </List.Item>
      );
    };

    let commsec = (
      <Row>
        <Col span={ 4 } />
        <Col span={ 16 }>
        <List
          loading={ false }
          itemLayout="horizontal"
          dataSource={ comms }
          renderItem={ make_comm }
        />
        </Col>
        <Col span={ 4 } />
      </Row>
    );

    return (
      <div>
        <Row>
          <Col span={ 9 } />
          <Col span={ 6 }><center><img src={ data.img_url } /></center></Col>
          <Col span={ 9 } />
        </Row>
        <Row>
          <Col span={ 9 } />
          <Col span={ 6 }><center>{grade}%</center></Col>
          <Col span={ 9 } />
        </Row>
        <Row>
          <Col span={ 4 } />
          <Col span={ 16 }>
            <Descriptions title={ title } bordered layout="horizontal">
              <Item label="Cast">{ data.cast }</Item>
              <Item label="Certificate">{ data.certificate }</Item>
              <Item label="Director">{ data.director }</Item>
              <Item label="Plot">{ data.plot }</Item>
              <Item label="Release Date">{ data.release_date }</Item>
              <Item label="Length">{ data.runtime }</Item>
              <Item label="Genre">{ genre }</Item>
            </Descriptions>
          </Col>
          <Col span={ 4 } />
        </Row>
        <Row>
          <Col span={ 9 } />
          <Col span={ 6 }><center><h4>Comments</h4></center></Col>
          <Col span={ 9 } />
        </Row>
        { commsec }
      </div>
    );
  }
}

export default Info;
