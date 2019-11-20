import React, { Component } from 'react';
import { Table, Tabs } from 'antd';

let { TabPane } = Tabs;

/* Capitalize title */
let capitalize = (title) => {
  let words = title.split(" ");
  let res = words.map((word) => { return word[0].toUpperCase() + word.substr(1); });
  return res.join(" ");
};

class TopMovies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.retrieve().then((res) => this.setState({ data: this.normalize(res) })).catch((err) => console.log(err));
  }

  retrieve = async () => {
    const resp = await fetch("/top");
    if(resp.status !== 200) {
      return [];
    }
    
    const body = resp.json();
    return body;
  }

  normalize = (data) => {
    let result = data.map((datum) => {
      datum.title = capitalize(datum.title);
      return datum;
    });
    return result;
  }

  render() {
    const rt_columns = [
      {
        title: "Title", 
        width: '20%',
        dataIndex: 'title',
      },
      {
        title: "Rank",
        width: "20%",
        dataIndex: "rt_rank",
        sorter: (a, b) => Number.parseInt(a.rt_rank) - Number.parseInt(b.rt_rank),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Rating",
        width: "20%",
        dataIndex: "rt_rate",
        sorter: (a, b) => Number.parseInt(a.rt_rate) - Number.parseInt(b.rt_rate),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Count",
        width: "20%",
        dataIndex: "rt_count",
        sorter: (a, b) => Number.parseInt(a.rt_count) - Number.parseInt(b.rt_count),
        sortDirections: ['descend', 'ascend'],
      }
    ];

    const imdb_columns = [
      {
        title: "Title",
        width: "20%",
        dataIndex: 'title',
      },
      {
        title: "Rank",
        width: "20%",
        dataIndex: "imdb_rank",
        sorter: (a, b) => Number.parseInt(a.imdb_rank) - Number.parseInt(b.imdb_rank),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: "Rating",
        width: "20%",
        dataIndex: "imdb_rate",
        sorter: (a, b) => Number.parseInt(a.imdb_rate) - Number.parseInt(b.imdb_rate),
        sortDirections: ['descend', 'ascend'],
      }
    ];

    let rt_tab = (
      <Table columns={ rt_columns } dataSource={ this.state.data.filter((d) => { return d.rt_rank != undefined; }) } 
        pagination={{ pageSizeOptions: ['10', '50', '100'], showSizeChanger: true }}
      />
    );

    let imdb_tab = (
      <Table columns={ imdb_columns } dataSource={ this.state.data.filter((d) => { return d.imdb_rank != undefined; }) }
        pagination={{ pageSizeOptions: ['10', '50', '100'], showSizeChanger: true }}
      />
    );

    return (
      <div>
        <Tabs type="cord">
          <TabPane key="rt" tab="RottenTomatoes">
            { rt_tab }
          </TabPane>
          <TabPane key="imdb" tab="IMDB">
            { imdb_tab }
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default TopMovies;

