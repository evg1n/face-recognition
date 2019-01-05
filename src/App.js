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
    }
  }

  calculateFaceLocation = (data) => {
    
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    
    let i = 0;
        let clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;

    let boxArray = [];

     let boxGroup =  {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }

    for (i; i < data.outputs[0].data.regions.length;i++) {

        clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
       // console.log('clarifai face', clarifaiFace);
        boxArray.push(clarifaiFace);
      // console.log('loop kutu', boxArray);
    }
    console.log('kutu', boxArray);
     return {boxArray}
  }

  
  

  displayFaceBox = (box) => {

    let divBox = document.getElementById('inputImage').parentNode;
    let canvas = document.getElementById('inputImage');

    console.log('box', box.boxArray);

    for (let i=0; i < box.boxArray.length;i++) {

      let node = document.createElement('div');
      let lastChild = document.getElementById('imageContainer').lastChild;
      this.setState({box: box.boxArray[i]});

      let top = box.boxArray[i].top_row * canvas.height;
      let left = box.boxArray[i].left_col * canvas.width;
      let bottom = canvas.height - (box.boxArray[i].bottom_row * canvas.height);
      let right = canvas.width - (box.boxArray[i].right_col * canvas.width);
      let style = `top: ${top}px; right: ${right}px; bottom: ${bottom}px; left: ${left}px`;

      divBox.appendChild(node).setAttribute('style', style)
      if (lastChild !== canvas){
      lastChild.setAttribute('class', 'bounding-box');
      }
      console.log('style', style);
    }
     document.getElementById('imageContainer').lastChild.setAttribute('class', 'bounding-box absolutely');
    return console.log('display face box end');
  }
  
  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
   app.models
   .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
   .then(response => {
     this.displayFaceBox(
       this.calculateFaceLocation(response));
  })
   .catch(err => console.log(err));
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

export default App;
