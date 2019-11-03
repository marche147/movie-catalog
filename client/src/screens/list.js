import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'
import Info from './info';

const movies = [{"id": 1, "name": "Malificent2", "year": 2019, "director": "Joachim Ronning", "cast": "Angelina Jolie"},
{"id": 2, "name": "Once Upon A Time in Hollywood", "year": 2019, "director": "Quentin Tarantino", "cast": "Brad Pitt"},
{"id": 3, "name": "Frozen2", "year": 2019, "director": "Chris Buck", "cast": "Idina Menzel"}]

class List extends Component{
  state = {
    data: null
  };
  
  render() {
    const listItems = movies.map((m) => <li key={m.id}> <Link to={`/info/${m.id}`}> {m.name} </Link></li>)
    return (
        <div className="home">
          {listItems}
            
          <Route path="/info/:id" component={Info} />
        </div>
      );
  };
}

export default List