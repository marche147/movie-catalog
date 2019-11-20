/* eslint-disable */
import React, { Component } from 'react';
import { Typography } from 'antd';
import { render } from 'react-dom'
import { Comment, Icon, Tooltip, Avatar } from 'antd';
import moment from 'moment';

const { Text } = Typography;

const movieList = [
  { "_id": { "$oid": "5dc4cb47b91b4bca44b7f38a" }, "title": "joker", "cast": "Joaquin Phoenix", "certificate": "R", "director": "Todd Phillips", "genre": ["Crime", "Drama", "Thriller"], "img_url": "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_UX182_CR0,0,182,268_AL_.jpg", "plot": "In Gotham City, mentally-troubled comedian Arthur Fleck is disregarded and mistreated by society. He then embarks on a downward spiral of revolution and bloody crime. This path brings him face-to-face with his alter-ego: \"The Joker\".", "release_date": "4 October 2019 (USA)", "runtime": "122 min" },
  { "_id": { "$oid": "5dc4cb65b91b4bca44b8613d" }, "title": "avengers: endgame", "cast": "Joe Russo", "certificate": "PG-13", "director": "Anthony Russo", "genre": ["Action", "Adventure", "Drama"], "img_url": "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_UX182_CR0,0,182,268_AL_.jpg", "plot": "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.", "release_date": "26 April 2019 (USA)", "runtime": "181 min" },
  { "_id": { "$oid": "5dc4cb64b91b4bca44b85fd8" }, "title": "once upon a time in hollywood", "cast": "Leonardo DiCaprio", "certificate": "R", "director": "Quentin Tarantino", "genre": ["Comedy", "Drama"], "img_url": "https://m.media-amazon.com/images/M/MV5BOTg4ZTNkZmUtMzNlZi00YmFjLTk1MmUtNWQwNTM0YjcyNTNkXkEyXkFqcGdeQXVyNjg2NjQwMDQ@._V1_UX182_CR0,0,182,268_AL_.jpg", "plot": "A faded television actor and his stunt double strive to achieve fame and success in the film industry during the final years of Hollywood's Golden Age in 1969 Los Angeles.", "release_date": "22 July 2019(USA)", "runtime": "161 min" }
];

const commentList = [{ "_id": { "$oid": "5dcce2e5b91b4bca449c6cc7" }, "review_title": "Outstanding movie with a haunting performance and best character development ever seen", "review_content": "Every once in a while a movie comes, that truly makes an impact. Joaquin's performance and scenography in all it's brilliance. Grotesque, haunting and cringy. Hard to watch at times,... but so mesmerizing, you won't blink an eye watching it. Tragic, but with seriously funny moments. Emotional rollercoaster - sometimes, with multiple emotions popping-up at the same time.", "score": "1", "title": "joker", "website": "imdb" },
{ "_id": { "$oid": "5dcce2e3b91b4bca449c6992" }, "review_title": "As a viewer that actually went to TIFF and witnessed this film and didn't want to believe the hype, it is an absolute MASTERPIECE and Phoenix is a certified legend.", "review_content": "I was a person that saw all the hype and claims of masterpiece as overreacting and overblown excitement for another Joker based film. I thought this looked solid at best and even a bit too pretentious in the trailer, but in here to say I was incredibly wrong. This is a massive achievement of cinema that's extremely rare in a day and age of cgi nonsense and reboots. While this is somewhat of a reboot of sorts, the standalone origin tale is impeccable from start to finish and echoes resemblance to the best joker origin comics from the past. Joaquin bleeds, sweats, and cries his every drop into this magnificently dedicated performance. Heath Ledger would be proud. This is undoubtedly the greatest acting performance since Heath's joker. The directing and writing is slickly brilliant and the bleak settings and tones are palpable throughout. When this film was over the place was blown away and every audience member was awestruck that they witnessed a film that could still transport them into a character's world and very existence. Believe the hype. This is going to be revered as a transcending masterpiece of cinema.", "score": "1", "title": "joker", "website": "imdb" },
{ "_id": { "$oid": "5dcce2fcb91b4bca449c9769" }, "review_title": "Movie of the Decade", "review_content": "The pool does not need the money. They need the dignity and respect, coz that is what it takes to be a human. If you don't have that, money will only be a reminder of them being a \"good boy\". Like some politicians, they feel so frustrated when people from the lower class does not accept their funding champions. In this movie, through joker's life, I begin to get it.", "score": "0", "title": "joker", "website": "imdb" },
{ "_id": { "$oid": "5dcce183b91b4bca4499e93e" }, "review_title": "Probably the best Netflix movie release", "review_content": "For this type of movie I thought the director got pretty much everything just right. The acting, the sets, the music, the storyline, everything worked to give us a thoroughly enjoyable film.", "score": "1", "title": "the king", "website": "imdb" },
{ "review_title": "Overhyped", "review_content": "More than 3h of \"yes sure...\" BS. The franchise is at its end and CGI won't rescue it.", "score": "0", "title": "avengers: endgame", "website": "imdb" },
{ "review_title": "Not for everyone", "review_content": "The first 2 hours is only for lovers of everything late 60s retro,great cinematography and outstanding acting.The last 45 minutes fasten your seatbelts because classic Tarantino kicks in.", "score": "1", "title": "once upon a time in hollywood", "website": "imdb" }
]

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li>{number}</li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

class Info extends Component {
  state = {
    likes: 0,
    dislikes: 0,
    action: null,
  };

  like = () => {
    this.setState({
      likes: 1,
      dislikes: 0,
      action: 'liked',
    });
  };

  dislike = () => {
    this.setState({
      likes: 0,
      dislikes: 1,
      action: 'disliked',
    });
  };

  render() {
    const { match: { params } } = this.props;
    console.log(params.id)
    const data = movieList.find((item) => { return item.title == params.id; });
    const comments = []
    commentList.forEach(item => {
      if (item.title == params.id) {
        comments.push(item)
      }
    });
    function scores(c){
      console.log(c.length);
      var s = 0;
      for (var i=0; i<c.length; i++)
        {s += Number(c[i].score);}
      var ave = s/c.length;
      ave = 10*ave.toFixed(2);
      return ave;
    }
    const score = scores(comments);
    const { likes, dislikes, action } = this.state;
    const actions = [
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon
            type="like"
            theme={action === 'liked' ? 'filled' : 'outlined'}
            onClick={this.like}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{likes}</span>
      </span>,
      <span key=' key="comment-basic-dislike"'>
        <Tooltip title="Dislike">
          <Icon
            type="dislike"
            theme={action === 'disliked' ? 'filled' : 'outlined'}
            onClick={this.dislike}
          />
        </Tooltip>
        <span style={{ paddingLeft: 8, cursor: 'auto' }}>{dislikes}</span>
      </span>,
      <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return (
      <div className='home' style={{ position: 'absolute', left: '220px', overflowY: 'auto', height: '100%' }}>
        <Text strong>
          <h1> {data.title[0].toUpperCase() + data.title.slice(1)} </h1>
        </Text>
        <br />
        <div style={{ position: 'absolute', left: '420px' }}>
          <h1> {score}/10</h1>
          <p> <Icon type="star" theme="twoTone" />IMDB---{data.imdb_rate}/10 </p>
          <p> <Icon type="star" theme="twoTone" />Rotten Tomatoes---{data.rt_rate}</p>
        </div>
        <Text underline> <p> {data.runtime} | {data.certificate} | {data.release_date} <NumberList numbers={data.genre} /></p></Text>
        <br />
        <div>
          <img alt={data.title} src={data.img_url} height={300} />
          <h3>Director: {data.director}</h3>
          <h3>Cast: {data.cast}</h3>
        </div>
        <p> {data.plot}</p>
        <br />
        <Text strong><p>Reviews:</p></Text>
        {
          comments.map((comment, index) => (
            <Comment
              key={comment.title + index}
              actions={actions}
              author={<a>User</a>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt="User"
                />
              }
              content={
                <div>
                  <Text strong><p>{comment.review_title}</p></Text>
                  <div style={{ color: 'red' }}>
                    <p>{comment.score == 1 ? <Icon type="like" theme="filled" /> : <Icon type="dislike" />}</p>
                  </div>
                  <p>{comment.review_content}</p>
                  <Text type="secondary"><p>From: {comment.website}</p></Text>
                </div>
              }
              // datetime={
              //   <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              //     <span>{moment().fromNow()}</span>
              //   </Tooltip>
              // }
            />
          ))
        }
      </div>
    );
  };
}

export default Info;
