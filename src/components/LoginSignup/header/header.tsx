import React from 'react';
import './header.scss';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import { authState } from '../state';
import { useRecoilState } from 'recoil';

const Header: React.FC = () => {
  const [, setAuth] = useRecoilState(authState);
  const location = useLocation();

  const handleAuthView = (view: "login" | "signup") => {
    if (location.pathname === "/reviews") {
      // Already on reviews page, just change view
      setAuth((prev) => ({ ...prev, authView: view }));
    } else {
      // Navigate user to reviews page if not already there
      window.location.href = "/reviews"; // simple redirect (optional: use navigate() from react-router)
      setAuth((prev) => ({ ...prev, authView: view }));
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="VK Electronics Logo" />
          </Link>
        </div>
        <nav className="nav-links">
          <a onClick={() => handleAuthView("login")}>Login</a>
          <a onClick={() => handleAuthView("signup")}>Signup</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
