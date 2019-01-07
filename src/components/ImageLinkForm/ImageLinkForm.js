import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
    return(
        <div>
            <p className='f3 center pa5'>
                {'This magic brain will detect faces in photos. Copy link to your image and give it a try!'}
            </p>
            <div className= 'center'>
                <div className= 'texture center pa4 br3 shadow-5 w-90'>
                    <input type='text' className='f4 inputText w-60 pa2' onChange={onInputChange}></input>
                    <button 
                        className='w-20 btn f4 grow link ph3 pv2 dib'
                        onClick={onButtonSubmit}
                        style={{minWidth: '90px'}}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;