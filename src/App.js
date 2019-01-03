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
   this.setState({input: event.target.value});
  }
  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
   app.models
   .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
   .then( response => {
       console.log(response);
       console.log(this.state.imgUrl);
       console.log(this.state.input);
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
        <FaceRecognition imageUrl={this.state.imgUrl}/>
      </div>
    );
  }
}

export default App;
