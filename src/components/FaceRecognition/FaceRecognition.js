import React from 'react';
import './FaceRecognition.css';



const FaceRecognition = ({imgUrl, box}) => {

    return(
        
        <div className='center ma pa3'>
            <div id='imageContainer' className='mt2 shadow-5 br3'>
                <img id='inputImage' className='' alt='placeholder' src={imgUrl}></img>
            </div>
        </div>
    );
}

export default FaceRecognition;