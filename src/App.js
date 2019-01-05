//final front-end project for udemy ZTM: Complete Web Developer in 2019
//guidelines by: https://github.com/aneagoie
//additional features (theming, multiple detection) by evgin
//github: https://github.com/evg1n

import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import './App.css';

const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '67209dcc98bb42f0923b7df1e0b61583'
});

const particlesOptions = {
    "particles": {
      "color": {"value": '#646c83'},
      "number": { "value": 100 },
      "size": { "value": 2 },
      "line_linked": {
            				"shadow": {
            					"enable": true,
            					"color": "#646c83",
            					"blur": 2
            				}
      }
    }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl:'',
      box:{},
      imgLoad: false,
    }
  }

  calculateFaceLocation = (data) => {

    let i = 0;
    
    let clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;

    let boxArray = [];

    for (i; i < data.outputs[0].data.regions.length;i++) {
        clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
        boxArray.push(clarifaiFace);
    }

     return {boxArray}
  }

  reset = () => {
    var container = document.getElementById('imageContainer');
    while (container.firstChild) {
      container.removeChild(container.firstChild);
      console.log('clearing childnodes', this.state.imgUrl);
    }
    console.log('cleared children nodes');
  }
  displayFaceBox = (box) => {

    let divBox = document.getElementById('imageContainer');
    let image = document.createElement('img');
    let imageSrc = `${this.state.imgUrl}`;
    divBox.appendChild(image).setAttribute('id', 'inputImage');
    document.getElementById('inputImage').setAttribute('src', imageSrc);

    let canvas = document.getElementById('inputImage');

    canvas.onload = console.log('image loaded');

      for (let i = 0; i < box.boxArray.length; i++) {
      this.setState({
          box: box.boxArray[i]
        });

        let node = document.createElement('div');
        let lastChild = document.getElementById('imageContainer').lastChild;
        let top = box.boxArray[i].top_row * canvas.height;
        let left = box.boxArray[i].left_col * canvas.width;
        let bottom = canvas.height - (box.boxArray[i].bottom_row * canvas.height);
        let right = canvas.width - (box.boxArray[i].right_col * canvas.width);
        let style = `top: ${top}px; right: ${right}px; bottom: ${bottom}px; left: ${left}px`;

        divBox.appendChild(node).setAttribute('style', style);

        if (lastChild !== canvas) {
          // we don't want the image to have border
          lastChild.setAttribute('class', 'bounding-box');
        }
      }

     document.getElementById('imageContainer').lastChild.setAttribute('class', 'bounding-box absolutely');
  }
  
  onInputChange = (event) => {
   this.setState({input: event.target.value});
  
  }
  onButtonSubmit = () => {

    if(this.state.imgUrl !== ''){
      console.log('resetting');
      this.reset();
    }

     this.setState({
       imgUrl: this.state.input
     });

    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      this.displayFaceBox(
        this.calculateFaceLocation(response));
       })
    .catch(err => {
      let div = document.getElementById('imageContainer');
      div.innerHTML = `<p>An Error Occured:${JSON.stringify(err.data.status.description)}. See console for details.</p>`
      console.log('Error Details: ', err);
    });
  }
  
   render() {
    return (
      <div className="App">
        <div className="pa3 stretch">
          <Particles className="particle-bg" params={ particlesOptions }/>
          <Logo/>
          <Navigation/>
        </div>
        <Rank/>
        <ImageLinkForm 
        onInputChange={ this.onInputChange }
        onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl}/>
      </div>
    );
  }
}

console.log( 
    `final front-end project for udemy ZTM: Complete Web Developer in 2019 \nguidelines by: https://github.com/aneagoie \nadditional features (theming, multiple detection, error logging) by: https://github.com/evg1n`
    );
export default App;
