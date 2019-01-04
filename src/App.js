import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js';
import shortid from 'shortid';

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
     const boxGroup =  {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }

    for (i; i < data.outputs[0].data.regions.length;i++) {

        clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;

        boxArray.push(boxGroup)
       
    }
     return {boxArray}
    }

  

  displayFaceBox = (box) => {


    console.log('displayFacebox', box);
    for (let i=0; i < box.length;i++) {
    console.log(box[i]);
    this.setState({box: box[i]});
    console.log('logging box', this.state.box);
    }
    console.log('display face box end');
  }
  
  onInputChange = (event) => {
   this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
   app.models
   .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
   .then(response => {
     this.drawFaceBoxes(
       this.calculateFaceLocation(response));
  })
   .catch(err => console.log(err));
  }

  drawFaceBoxes = (boxes) => {
    console.log('face count', boxes);
    var divBox = document.getElementById('imageContainer'), htmlString = 'asd';
    console.log(divBox, htmlString);
    for (let j=0; j < boxes.length; j++) {
      console.log('box number', boxes[j]);
      //htmlString += '<div className = "bounding-box"style={' + boxes[i] +
      //  '}></div>'
    //divBox.insertAdjacentHTML('beforeend', htmlString);
    console.log('boxes', boxes[j]);
    }
    return null;
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
