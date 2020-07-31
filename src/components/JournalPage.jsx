import React, { useState, useEffect } from 'react';
import './profileJournal.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from 'react-bootstrap/Modal';
import './modal.css'
import axios from 'axios'
import './JournalPage.css'
import { connect } from 'mongoose';

const JournalPage = () => {
  const [journalEntries, setJournalEntries] = useState([])
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [journalEntry, setJournalEntry] = useState({
    id: "",
    title: "",
    entry: ""
  })


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}journal`, journalEntries)
          .then(response => {
            setJournalEntries(response.data)
          })
          .catch(error => console.log(error))
  }, [])

   
 
    const handleCloseModal = () => setShowModal(false);
    
    const openJournal = (e) => {
      setShowModal(true)
      axios.get(`${process.env.REACT_APP_SERVER_URL}journal/${e.target.id}`, journalEntry)
        .then(response => {
          console.log(response.data)
          setJournalEntry({title: response.data.title, entry: response.data.entry, id: response.data._id})
          console.log(journalEntry)
        })
    }

    let editJournalEntry = (e) => {
      e.preventDefault()
      if (title === "") {
        title = journalEntry.title
      } 
      if (entry === "") {
        entry = journalEntry.entry
      } 
      let updatedEntry = {title: title, entry: entry}
      console.log(updatedEntry)
      axios.put(`${process.env.REACT_APP_SERVER_URL}journal/${journalEntry.id}`, updatedEntry)
      .then(response => {
          console.log(`RESPONSE: ${response}`)
          console.log(response.data)
          setShowModal(false)
        
      })
      .catch(err => console.log(err))
    }

    let deleteEntry = (e) => {
      e.preventDefault()
      axios.delete(`${process.env.REACT_APP_SERVER_URL}journal/${journalEntry.id}`)
        .then(response => {
          console.log(response)

        })

    }

  return (
    <div className="journalPage">
        <div className='jbgDiv'>
          <div className='tocDiv'>
            <h3 className='toc'>Table of Contents</h3>
          </div>
          <div className='entriesDiv'>
            <ul className='entriesList'>
              {journalEntries.map(entry => (
                  <li key={entry.title} id={entry._id} onClick={openJournal}>{entry.title}</li>
              ))}
            </ul>
          </div>
        <img className='journalBackground' src='journalBackground.png' alt='journal with map and glasses near it' />
      </div>
      <div className="modalWindow">
      <Modal show={showModal} className='modalContent'>
          <Modal.Body id="journalModal">
              <div class="closeButton">
                  <button class="closeModal" onClick={handleCloseModal} >&times;</button>
              </div>
            <div class="editJournalEntry">
                <form onSubmit={editJournalEntry}>
                  <label for="title" className="formLabel">Edit Title:</label>
                  <input type="text" placeholder={journalEntry.title} value={title} id={journalEntry._id} className="formInput" onChange={(e) => {setTitle(e.target.value)}}></input>
                  <label for="entry" className="formLabel">Edit Entry:</label>
                  <input type="text" placeholder={journalEntry.entry} value={entry} ></input>
                  <input type="submit" className="modalButton" id={journalEntry._id} value="Edit Journal Entry" onChange={(e) => {setEntry(e.target.value)}}></input>
                </form>
                <form onSubmit={deleteEntry}>
                  <input type="submit" className="modalButton" value="Delete Entry"></input>
                </form>
              </div>
          </Modal.Body>
      </Modal>
    </div>

    
  </div>
  )
}

export default JournalPage;