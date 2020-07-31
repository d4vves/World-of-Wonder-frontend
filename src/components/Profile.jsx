import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './Profile.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import './modal.css'

const Profile = (props) => {

  const [show, setShow] = useState(false);
  const [artifacts, setArtifacts] = useState([])
  const [artifact, setArtifact] = useState({
    name: "",
    description: "",
    imageurl: "",
  })


  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}profile`)
      .then(response => {

        if (response.status === 200) {
          setArtifacts(response.data)
        } else {
          setError(response.statusText)
          console.log(error)
        }

        console.log(response.data)
      })
      .catch(err => {
        console.log(err)
        setError(err.message)
        console.log(error)
      })
  }, [])


  const handleClose = () => {
    setShow(false)
    stopRead()
  }

  const handleShow = (e) => {
    setShow(true);
    console.log(e.target.id)
    axios.get(`${process.env.REACT_APP_SERVER_URL}profile/artifact/${e.target.id}`, artifacts)
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          setArtifact(response.data)
        } else {
          setError(response.statusText)
          console.log(error)
        }
      })
      .catch(err => {
        console.log(err)
        setError(err.message)
        console.log(error)
      })
  }

  let userData = props.user
    ?
    <div>

    </div>
    : <h4>Loading...</h4>

  let errorDiv = () => {

    return (
      <div className="text-center pt-4"><h3>Please <Link to='/login'>login</Link> to view this page</h3></div>
    )
  }


  let artifactList = artifacts.length < 1 ?
    <h3>There are no favorited artifacts</h3> :
    <div className="imageRow">
    <ul className="test">
      {artifacts.map((artifact) => (
        <li>
          <h3 className = "white-text">{artifact.name}</h3>
          <img className="savedArtifacts" src={artifact.imageurl} alt="Saved artifacts" id={artifact._id} onClick={handleShow} />
        </li>
    ))}
      
        </ul>
      </div>

  const removeFromProfile = (e) => {
    e.preventDefault()
    axios.delete(`${process.env.REACT_APP_SERVER_URL}profile/artifact/${e.target.id}`, artifacts)
    handleClose()
  }

  var synth = window.speechSynthesis
  var utterThis = new SpeechSynthesisUtterance(artifact.description)
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
    <div className="profileBackground">

      <div className="container center-align topBar">

        <div className="modalWindow">
          <Modal show={show} className='modalContent'>
            <Modal.Body>

              <div class="closeButton">
                <button class="closeModal" onClick={handleClose} >&times;</button>
              </div>


              <h3>{artifact.name}</h3>
              <p>
                  <i onClick={startRead} className='material-icons'>play_arrow</i>
                  <i onClick={stopRead} className='material-icons'>stop</i>
              </p>
              <p>{artifact.description}</p>
              <img className="modalImage" src={artifact.imageurl} />
              <form>
                <input type="hidden" name="name" value={artifact.name}></input>
                <input type="hidden" name="description" value={artifact.description}></input>
                <input type="hidden" name="imageurl" value={artifact.imageurl}></input>
                <button type="submit" className="modalButton" onClick={removeFromProfile}>Remove from Profile</button>
              </form>
            </Modal.Body>
          </Modal>
        </div>

        {props.user ? userData : errorDiv()}

        {artifactList}

      </div>
      <div>
        <Link to='/journal'>
          <img id="journalImage" src="/books.png" alt="books" />
        </Link>
      </div>
    </div>
  
)
}
  

export default Profile;