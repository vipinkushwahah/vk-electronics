import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="VK Electronics Logo" />
          </Link>
        </div>
        <nav className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
