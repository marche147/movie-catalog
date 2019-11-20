import React, { Component } from 'react';
/* eslint-disable */
import "./styles.css";
import img1 from './pic/1.png';
import img2 from './pic/2.png';
import img3 from './pic/3.png';
import img4 from './pic/4.jpg';


class Home extends Component{
  state = {
    data: null
  };
  render() {
    return (
        <div className = "Home">
          <div id="container">
            <h1> FILMER </h1>
            <button type = "button" id = "button">GO</button>
            <div id="main">
              <div id = "catagory">ACTION</div>
              <div id = "catagory">THREAT</div>
              <div id = "catagory">THREAT</div>
              <div id = "catagory">FICTION</div>
              <div id = "catagory">ANIMA</div>
              <div id = "catagory">PREDICT</div>
              <div id="images">
                <img id="image1" src={img1} />
                <img id="image2" src={img2} />
                <img id="image3" src={img3} />
                <img id="image4" src={img4} />
              </div>
              <div id="slider">
                <a href="#image1">1</a>
                <a href="#image2">2</a>
                <a href="#image3">3</a>
                <a href="#image4">4</a>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default Home
