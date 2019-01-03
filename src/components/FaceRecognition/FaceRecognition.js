import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({imageUrl}) => {
    return(
        <div className='center pa3'>
            <img className='br3 shadow-5 center' style={{width:'500px'}} alt='placeholder' src={imageUrl}></img>
        </div>
    );
}

export default FaceRecognition;