import React, { useState } from 'react';
import './AncientEgypt.css'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';


const AncientEgypt = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        stopRead()
    }
    const [artifacts, setArtifacts] = useState({
        name: "",
        description: "",
        imageurl: ""
    })

    const handleShow = (e) => {
        setShow(true);
        let defaultImage = e.target.src
        axios.get(`${process.env.REACT_APP_SERVER_URL}artifact/${e.target.id}`, artifacts)
            .then(response => {
                let articleTitle = response.data['dc:title'][0].value
                let articleDescription = response.data['dc:description'][0].value
                let articleImage
                response.data['ecrm:P138_has_representation'][0].value !== "http://api.aucklandmuseum.com/id/media/v/522285" ? articleImage = response.data['ecrm:P138_has_representation'][0].value : articleImage = defaultImage
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
        <div class="egyptDiv">
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
            <div id="test" className="modal">
                <h5 class="container modal-close right-align black-text" id="close">&#10005;</h5>
                <div class="container modal-content center">

                    <h3>Name :  {artifacts.name}</h3>
                    <p>Description :  {artifacts.description}</p>
                    <img src={artifacts.imageurl} />

                </div>
            </div>
            <img className="egyptArtifact wallHanging" id='626407' src="egypt/wall-hanging-egypt.png" alt="wall hanging" onClick={handleShow} />
            <img className="egyptArtifact mummies" id='30452' src="egypt/mummy2-egypt.png" alt="mummy" onClick={handleShow} />
            <img className="egyptArtifact slippers" id='523725' src="egypt/slippers-egypt.png" alt="slippers" onClick={handleShow}/>
            <img className="egyptArtifact cosmetics" id='103226' src="egypt/cosmetics-egypt.png" alt="cosmetics" onClick={handleShow} />
            <img className='egyptArtifact writings' id='597565' src="egypt/writings-egypt.png" alt="writings" onClick={handleShow}/>
            <img className="egyptArtifact mummifiedBirds" id='33177' src="egypt/mummified-birds-egypt.png" alt="mummified birds" onClick={handleShow} />
            <img className="egyptArtifact funeralBeads" id='523731' src="egypt/funeral-beads-egypt2.png" alt="funeral beads" onClick={handleShow}/>
            <img className="egyptRoomImg" src="egypt/egypt-room.jpg" alt="ancient egyptian museum room" />
        </div>

    );
};

export default AncientEgypt;