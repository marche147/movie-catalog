/* eslint-disable */
import React, { Component } from 'react';

const movieList = [
  {'id': 1, 'name': 'Malificent2', 'year': 2019, 'director': 'Joachim Ronning', 'cast': 'Angelina Jolie', 'IMDB': '7.0','RT':'41%','image':'https://m.media-amazon.com/images/M/MV5BZjJiYTExOTAtNWU0Yi00NzJjLTkwOTgtOTU2NWM1ZjJmYWVhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg','description':
'Maleficent and her goddaughter Aurora begin to question the complex family ties that bind them as they are pulled in different directions by impending nuptials, unexpected allies, and dark new forces at play.'},
{'id': 2, 'name': 'Once Upon A Time in Hollywood', 'year': 2019, 'director': 'Quentin Tarantino', 'cast': 'Brad Pitt', 'IMDB': '8.0','RT':'85%','image':'https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_UX182_CR0,0,182,268_AL_.jpg','description':"A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final years of Hollywood's Golden Age in 1969 Los Angeles."},
{'id': 3, 'name': 'Frozen2', 'year': 2019, 'director': 'Chris Buck', 'cast': 'Idina Menzel', 'IMDB': '7.9','RT':'85%','image':'https://m.media-amazon.com/images/M/MV5BMjA0YjYyZGMtN2U0Ni00YmY4LWJkZTItYTMyMjY3NGYyMTJkXkEyXkFqcGdeQXVyNDg4NjY5OTQ@._V1_UX182_CR0,0,182,268_AL_.jpg','description':"Anna, Elsa, Kristoff, Olaf and Sven leave Arendelle to travel to an ancient, autumn-bound forest of an enchanted land. They set out to find the origin of Elsa's powers in order to save their kingdom."}];

class Info extends Component{
  // state = {
  //   data: []
  // };

  render() {
    const { match: { params } } = this.props;
    const data = movieList.find((item) => { return item.id == params.id; });
    return (
      <div className='home' style={{position:'absolute', left:'55px', color: 'dark grey'}}>
        <h1> {data.name} ({data.year})</h1>
        <p> IMDB---{data.IMDB}/10 </p>
        <p> Rotten Tomatoes---{data.RT}</p>
        <div>
            <img alt={data.name}
            src={data.image}
            height = {300}/>
            <h3>Director: {data.director}</h3>
            <h4>Cast: {data.cast}</h4>
            <p>Description: {data.description}</p>
        </div>
      </div>
    );
  }
}

export default Info;
