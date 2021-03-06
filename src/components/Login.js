import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { Redirect } from 'react-router-dom'

const Login = (props) => {
  console.log('💔')
  console.log(props)
  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')

  let handleEmail = (e) => {
    setEmail(e.target.value)
    console.log('AHHHHH')
  }

  let handlePassword = (e) => {
    setPassword(e.target.value)
  }

  let handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password
    }
    axios.post(`${process.env.REACT_APP_SERVER_URL}login`, userData)
      .then(res => {
        // take res data and set to token
        const { token } = res.data;
        // save token to local storage
        localStorage.setItem('jwtToken', token);
        // set token to Auth Header
        setAuthToken(token);
        // decode jwt token to get user data
        const decoded = jwt_decode(token);
        // set current user
        props.nowCurrentUser(decoded);
      })
      .catch(err => console.log(err));
  }

  if (props.user) return <Redirect to="/profile" user={props.user} />

  return (
      <div className="row mt-4">
        <div className="col-md-7 offset-md-3">
          <div className="card card-body">
            <h2 className="py-2">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={handleEmail} className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={handlePassword} className="form-control" required />
              </div>
              <button type="submit" className="btn btn-primary float-right">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default Login;
