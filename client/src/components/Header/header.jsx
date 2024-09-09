import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import PersonIcon from '@mui/icons-material/Person';

const Header = ({ isLoggedIn, handleLogout }) => {
    return (
        <header className="header">
            <div className="logo">
                <h1>TaskTrail</h1>
            </div>
            <nav className="nav-menu">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/services">Services</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
            <div className="auth-menu">
                {isLoggedIn ? (
                    <button onClick={handleLogout} className="auth-button">Logout</button>
                ) : (
                    <Link to="/login" className="auth-button">Login</Link>
                )}
            </div>
            <div>
                
                <Link to="/userProfile" className="" style={{color:'white'}}><PersonIcon/></Link>
                
            </div>
        </header>
    );
};

export default Header;
