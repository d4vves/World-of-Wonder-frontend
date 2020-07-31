import React from 'react';
import { Link } from 'react-router-dom'
import './Footer.css'
import './teamPage.jsx'

const Footer = () => {
    return (
        <footer class="page-footer">
            <div class="container">
                <div className="right">
                    <Link exact to="/teampage" className = "link">
                        <div className="white-text">Meet the Team</div>
                    </Link>
                </div>
            </div>
        </footer>

    );
};

export default Footer;