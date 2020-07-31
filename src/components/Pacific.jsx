import React, { useState } from 'react';
import './Pacific.css';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import './modal.css'


// import Artifact from '../modals/Artifact'

const Pacific = (props) => {
   const [show, setShow] = useState(false);
   const [artifacts, setArtifacts] = useState({
    name: "",
    description: "", 
    imageurl: ""
  })

  const handleClose = () => {
      setShow(false)
      stopRead()
  }
  
  const handleShow = (e) => {
    console.log(e.target.id)
    setShow(true);
    axios.get(`${process.env.REACT_APP_SERVER_URL}artifact/${e.target.id}`, artifacts)
        .then(response => {
            let articleTitle = response.data['dc:title'][0].value
            let articleDescription = response.data['dc:description'][0].value
            let articleImage = response.data['ecrm:P138_has_representation'][0].value
            setArtifacts({ name: articleTitle, description: articleDescription, imageurl: articleImage })
        })
    }

    const saveToProfile = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_SERVER_URL}profile/artifact/`, artifacts)
        handleClose()    
    }

    var synth = window.speechSynthesis
    var utterThis = new SpeechSynthesisUtterance(artifacts.description)
    speechSynthesis.getVoices()

    const startRead = () => {
        utterThis.lang='en-GB'
        synth.speak(utterThis)
        utterThis.onend = () => {
            synth.cancel()
        }
    }

    const stopRead = () => {
        synth.cancel()
    }
    

    return (
        <div>
            <div className="modalWindow">
                <Modal show={show} className='modalContent'>
                    <Modal.Body>

                        <div class="closeButton">
                            <button class="closeModal" onClick={handleClose} >&times;</button>
                        </div>
                        <h3>{artifacts.name}</h3>
                        <p>
                            <i onClick={startRead} className='material-icons'>play_arrow</i>
                            <i onClick={stopRead} className='material-icons'>stop</i>
                        </p>
                        <p>{artifacts.description}</p>
                        <img className="modalImage" src={artifacts.imageurl} />
                        <form>
                            <input type="hidden" name="name" value={artifacts.name}></input>
                            <input type="hidden" name="description" value={artifacts.description}></input>
                            <input type="hidden" name="imageurl" value={artifacts.imageurl}></input>
                            <button type="submit" className="modalButton" onClick={saveToProfile}>Save to Profile</button>

                        </form>
                    </Modal.Body>
                </Modal>
            </div>
            <div  className='pacificDiv'>
            <img className='fishingHook pacificArtifact' id='660574' src='/fishing-hook-pacific.png' alt='fishing hook' onClick={handleShow}/>
            <img className='fishingBox pacificArtifact' id='635437' src='/fishing-box-pacific2.png' alt='fishing box' onClick={handleShow}/>
            <img className='danceDress pacificArtifact' id='42200' src='/dance-dress-pacific.png' alt='dance dress' onClick={handleShow}/>
            <img className='fan pacificArtifact' id='42147' src='/fan-pacific3.png' alt='fan' onClick={handleShow}/>
            <img className='kite pacificArtifact' id='91655' src='/kite-pacific2.png' alt='kite' onClick={handleShow}/>
            <img className='canoe pacificArtifact' id='627946' src='/model-canoe-pacific2.png' alt='model canoe' onClick={handleShow}/>
            <img className='wovenMat pacificArtifact' id='67902' src='/woven-mat-pacific.png' alt='woven mat' onClick={handleShow}/>
            <img className='waistGarment pacificArtifact' id='52072' src='/waist-garment-pacific.png' alt='waist garment' onClick={handleShow} />
            <img className='pacificRoomImg' src='/pacific-room.png' alt='maori and pacific museum room' />
            </div>
        </div>
    );
};

export default Pacific;