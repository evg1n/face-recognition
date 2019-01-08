import React from 'react';
import 'tachyons';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from '../../img/brain.png';

const Logo = () => {
    return(
        <div className="w-100 center">
            <Tilt 
            className="Tilt br2 pa1 shadow-5"
            options={{ max : 25 }}
            style={{ height: 100, width: 100}} >
            <img alt='brain-logo' style={{width: 80, height: 80}}src={brain}></img>
            </Tilt>
        </div>
    );
}

export default Logo;