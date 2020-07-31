import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import M from 'materialize-css/dist/js/materialize.min.js'
import '../modals/journal.css'
import axios from 'axios'


const Journal = (props) => {
    let [title, setTitle] = useState('')
    let [entry, setEntry] = useState('')
    let [redirect, setRedirect] = useState(false)

    let handleTitle = (e) => {
        setTitle(e.target.value)
    }

    let handleEntry = (e) => {
        setEntry(e.target.value)
    }

    let handleSubmit = (e) => {
        e.preventDefault()
        const newEntry = {
            title: title,
            entry: entry
        }
        axios.post(`${process.env.REACT_APP_SERVER_URL}journal`, newEntry)
        .then(response => {
            console.log(`RESPONSE: ${response}`)
            setTitle('')
            setEntry('')
        })
        .catch(err => {
            let error = String(err)
            if (error.includes('status code 401')) {
                props.handleLogout()
                setRedirect(true)
            }
        })
    }

    useEffect(() => {
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems, {});
      }, []);

        if (redirect) return <Redirect to="/login" />

        return (
            <div>
                <a class="modal-trigger" href="#modal1">
                    <img className="journal" src="https://img.icons8.com/plasticine/100/000000/journal.png" alt="Journal" />
                </a>
                {
                    props.isAuthenticated ?
                    <div id="modal1" className="modal">
                        <h5 class="container modal-close right-align black-text" id="close">&#10005;</h5>
                        <div class="container modal-content center">
                            <form action="/journal" method="POST" onSubmit={handleSubmit}>
                                <h1 className = "black-text">Journal Entry</h1>
                                <hr></hr>
                                <div class="input-field">
                                    <i class="material-icons prefix">title</i>
                                    <input type="text" name="title" id="journalTitle" onChange={handleTitle} value={title} />
                                    <label for="journalTitle">Title</label>
                                </div>
                                <div class="input-field">
                                    <i class="material-icons prefix">create</i>
                                    <input type="text" name="entry" id="journalContent" onChange={handleEntry} value={entry} />
                                    <label for="journalContent">Content</label>
                                </div>
                                <input type="submit" value="Submit" class="black white-text btn modal-close" />
                            </form>
                        </div>
                    </div>
                    :
                    <div id="modal1" className="modal">
                        <h5 class="container modal-close right-align black-text" id="close">&#10005;</h5>
                        <div class="container modal-content center black-text">
                            <h3>Please <Link className="blue-text modal-close" to='/login'>login</Link> or <Link className="blue-text modal-close" to='/signup'>sign up</Link> to start your journal!</h3>
                        </div>
                    </div>
                }
            </div>
        );
    }

export default Journal;