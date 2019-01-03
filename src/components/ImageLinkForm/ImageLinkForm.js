import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = () => {
    return(
        <div>
            <p className='f3'>
                {'This magic brain will detect faces in photos. Copy link to your image and give it a try!'}
            </p>
            <div className= 'center'>
                <div className= 'texture pa4 br3 shadow-5 w-90'>
                    <input type='text' className='f4 w-60 pa2'></input>
                    <button className='w-20 f4 grow link ph3 pv2 dib' style={{minWidth: '90px'}}>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;