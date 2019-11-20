/* eslint-disable */
import React, { Component } from 'react';

const movieList = [
{"_id":{"$oid":"5dc4cb47b91b4bca44b7f38a"},"title":"joker","cast":"Joaquin Phoenix","certificate":"R","director":"Todd Phillips","genre":["Crime","Drama","Thriller"],"img_url":"https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg","plot":"In Gotham City, mentally-troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: \"The Joker\".","release_date":"4 October 2019 (USA)","runtime":"122 min"},
{"_id":{"$oid":"5dc4cb65b91b4bca44b8613d"},"title":"avengers: endgame","cast":"Joe Russo","certificate":"PG-13","director":"Anthony Russo","genre":["Action","Adventure","Drama"],"img_url":"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg","plot":null,"release_date":"26 April 2019 (USA)","runtime":"181 min"},
{"_id":{"$oid":"5dc4cb64b91b4bca44b85fd8"},"title":"once upon a time in hollywood","cast":"Leonardo DiCaprio","certificate":"R","director":"Quentin Tarantino","genre":["Comedy","Drama"],"img_url":"https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_UX182_CR0,0,182,268_AL_.jpg","plot":null,"release_date":null,"runtime":"161 min"}
];

class Info extends Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
  }

  fetch = async () => {
  }

  render() {
    const { match: { params } } = this.props;
    console.log(this.params)
    const data = movieList.find((item) => { return item.title == params.id; });
    return (
      <div className='home' style={{position:'absolute', left:'55px', color: 'dark grey'}}>
        <h1> {data.name} ({data.year})</h1>
        <p> IMDB---{data.IMDB}/10 </p>
        <p> Rotten Tomatoes---{data.RT}</p>
        <div>
            <img alt={data.title}
            src={data.image_url}
            height = {300}/>
            <h3>Director: {data.director}</h3>
            <h4>Cast: {data.cast}</h4>
            <p>Description: {data.plot}</p>
        </div>
      </div>
    );
  }
}

export default Info;
