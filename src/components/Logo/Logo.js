import React from 'react';
import 'tachyons';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from '../../img/brain.png';
const Logo = () => {
    return(
        <div className="ma4 mt0 w-50" style={{display: 'flex', justifyContent: 'flex-start'}}>
            <Tilt 
            className="Tilt br2 pa3 shadow-5"
            options={{ max : 25 }}
            style={{ height: 100, width: 100 }} >
            <img alt='brain-logo' src={brain}></img>
            </Tilt>
        </div>
    );
}

export default Logo;