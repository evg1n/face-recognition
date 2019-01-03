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
    }
  }
  
  onInputChange = (event) => {
    console.log(event.target.value);
  }
  onButtonSubmit = () => {
    app.models.initModel({id: Clarifai.GENERAL_MODEL, version: "aa7f35c01e0642fda5cf400f543e7c40"})
      .then(generalModel => {
        return generalModel.predict("https://samples.clarifai.com/metro-north.jpg");
      })
      .then(response => {
        var concepts = response['outputs'][0]['data']['concepts']
      })
  
   app.models
   .predict(Clarifai.FACE_DETECT_MODEL, "link here")
   .then( response => {
       console.log(response)
       // do something with response
     },
     err => {
       // there was an error
     }
   );

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
        <FaceRecognition/>
      </div>
    );
  }
}

export default App;
