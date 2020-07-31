import React, { useState, useEffect } from 'react';
import './App.css';
import './components/Footer.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import Office from './components/Office'
import Navbar from './components/Navbar'
import About from './components/About';
import Profile from './components/Profile'
import Footer from './components/Footer'
import Pacific from './components/Pacific'
import NativeAmerican from './components/NativeAmerican'
import AncientEgypt from './components/AncientEgypt'
import Signup from './components/Signup';
import Login from './components/Login';
import TeamPage from './components/teamPage'
import axios from 'axios'
import JournalPage from './components/JournalPage'
import teamPage from './components/teamPage';



const PrivateRoute = ({ component: Component, ...rest }) => {
  //get user via jwt token to confirm user authenticated
  const user = localStorage.getItem(`jwtToken`);
  //setup return based on user status
  return <Route {...rest} render={(props) => (
      user
          ? <Component {...rest} {...props} />
          : <Redirect to='/login' />
      )} 
  />
}
function App() {

  // set state values
  let [currentUser, setCurrentUser] = useState("")
  let [isAuthenticated, setIsAuthenticated] = useState(true)
  useEffect(() => {
    let token;
    if(localStorage.getItem('jwtToken') === null) {
      setIsAuthenticated(false)
    } else {
      token = jwt_decode(localStorage.getItem('jwtToken'));
      setAuthToken(localStorage.jwtToken);
      setCurrentUser(token);
      setIsAuthenticated(true);
    }
  }, [])
  let nowCurrentUser = (userData) => {
    console.log("oh hey this is even running")
    setCurrentUser(userData);
    setIsAuthenticated(true)
  }
  let handleLogout = () => {
    if(localStorage.getItem('jwtToken') !== null) {
      localStorage.removeItem('jwtToken');
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  console.log('Current User = ', currentUser);
  console.log('Authenticated = ', isAuthenticated);


  return (
    <div>
      <BrowserRouter>
        <Navbar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
          <div className="react-router-logic">
            <Switch>
              <Route path='/signup' component={ Signup } />
              <Route path='/login' render={ (props) => <Login {...props} nowCurrentUser={nowCurrentUser} setIsAuthenticated={setIsAuthenticated} user={currentUser} /> } />
              <Route path='/pacific' component={Pacific} />
              <Route path='/ancientEgypt' exact component={AncientEgypt}  />
              <Route path="/" exact component={Office} />
              <Route path ="/teampage" exact component = {teamPage} />
              <PrivateRoute path="/profile" exact component={Profile} user={currentUser} />
              <Route path='/journal' component={JournalPage} />
            </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;