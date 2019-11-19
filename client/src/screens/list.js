import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Info from './info';
import "./list.css";
/* eslint-disable */

const movies = [{"id": 1, "name": "joker", "year": 2019, "director": "Joachim Ronning", "cast": "Angelina Jolie"},
{"id": 2, "name": "once upon a time in hollywood", "year": 2019, "director": "Quentin Tarantino", "cast": "Brad Pitt"},
{"id": 3, "name": "avengers: endgame", "year": 2019, "director": "Chris Buck", "cast": "Idina Menzel"}]

class List extends Component{
  state = {
    data: null
  };
  
  render() {
    const listItems = movies.map((m) => <li key={m.id}> <Link to={`/info/${m.name}`}> {m.name} </Link></li>)
    return (
        <div className="list">

          {listItems}
            
          <Route path="/info/:id" component={Info} />
        </div>
      );
  };
}

export default List