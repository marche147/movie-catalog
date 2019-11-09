import React, { Component } from 'react';
import { Table } from 'antd';

class TopMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.retrieve().then((res) => this.setState({ data: res })).catch((err) => console.log(err));
  }

  retrieve = async () => {
    const resp = await fetch("/top_movie");
    const body = resp.json();

    if(resp.status != 200) {
      return [];
    }
    return body;
  }

  render() {
    // TODO
    const columns = [
      {
        title: "Title", 
        width: '20%',
        dataIndex: 'title',
      },
      {
        title: "Rank",
        width: "20%",
        dataIndex: "rt_rank",
      },
    ];
    return (
      <div>
        <Table columns={ columns } dataSource={ this.state.data } />
      </div>
    );
  }
}

export default TopMovies;

