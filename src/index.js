//final front-end project for udemy ZTM: Complete Web Developer in 2019
//guidelines by: https://github.com/aneagoie
//additional features (theming, multiple detection) by evgin
//github: https://github.com/evg1n

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
