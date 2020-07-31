import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom'
import M from 'materialize-css/dist/js/materialize.min.js'
import Journal from '../modals/journal.js'

export class Navbar extends Component {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('.sidenav');
            var instances = M.Sidenav.init(elems, {})
            var elems = document.querySelectorAll('.dropdown-trigger');
            var instances = M.Dropdown.init(elems, {});
        });
    }
    render() {
        return (
            <nav>
                <div class="container nav-wrapper">
                    <Link className="brand-logo link" exact to="/"><div>World of Wonder</div></Link>
                    <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                    <ul class="right hide-on-med-and-down">
                        <li><NavLink to="/">Office</NavLink></li>
                        <li><NavLink to="/collections" className="dropdown-trigger link" data-target="dropdown1">Collections</NavLink></li>
                        {
                            this.props.isAuthenticated ?
                                <>
                                    <li><NavLink to="/profile">Profile</NavLink></li>
                                    <li><NavLink to="/" onClick={this.props.handleLogout}>Logout</NavLink></li>
                                </>
                            :
                                <>
                                    <li><NavLink to="/signup">Sign Up</NavLink></li>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                </>
                        }
                    </ul>
                </div>
                {/* Burger menu */}
                <ul class="sidenav" id="mobile-demo">
                    <li><NavLink to="/collections" className="dropdown-trigger link" data-target="dropdown2">Collections</NavLink></li>
                    <li><NavLink to="/office" className="link">Office</NavLink></li>
                    {
                        this.props.isAuthenticated ?
                            <>
                                <li><NavLink to="/profile" className="link">Profile</NavLink></li>
                                <li><NavLink to="/" className="link" onClick={this.props.handleLogout}>Logout</NavLink></li>
                            </>
                        :
                            <>
                                <li><NavLink to="/signup" className="link">Sign Up</NavLink></li>
                                <li><NavLink to="/login" className="link">Login</NavLink></li>
                            </>
                    }
                </ul>
                <ul id='dropdown1' class='dropdown-content'>
                    <li><NavLink to="/ancientEgypt" className="link">Ancient Egypt</NavLink></li>
                    <li><NavLink to="/pacific" className="link">Pacific</NavLink></li>
                </ul>
                <ul id='dropdown2' class='dropdown-content'>
                    <li><NavLink to="/ancientEgypt" className="link">Ancient Egypt</NavLink></li>
                    <li><NavLink to="/pacific" className="link">Pacific</NavLink></li>
                </ul>
                <Journal isAuthenticated={this.props.isAuthenticated} handleLogout={this.props.handleLogout} nowCurrentUser={this.props.nowCurrentUser} />
            </nav >
        );
    };
}
export default Navbar;