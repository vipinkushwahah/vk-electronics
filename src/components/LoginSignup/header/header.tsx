import React from 'react';
import './header.scss';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { authState } from '../state'; // Import Recoil state
import { useRecoilState } from 'recoil';

const Header: React.FC = () => {
  const [, setAuth] = useRecoilState(authState); // Only updating state, no need to read it

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="VK Electronics Logo" />
          </Link>
        </div>
        <nav className="nav-links">
          <Link to="/login" onClick={() => setAuth((prev) => ({ ...prev, authView: "login" }))}>
            Login
          </Link>
          <Link to="/signup" onClick={() => setAuth((prev) => ({ ...prev, authView: "signup" }))}>
            Signup
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
