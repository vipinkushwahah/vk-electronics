import { useState, useEffect } from "react";
import "./navbar.scss";
import SearchBar from "../hooks/search/search";
import { Link, useLocation } from "react-router-dom";
import logo from '../../assets/vklogo.png'

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location])

  const closeMenu = () => {
    setMenuOpen(false)
  }

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Apply theme on load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-theme", savedTheme);
    setDarkMode(savedTheme === "dark");
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="logo-menu-container">
          <div className="menu-btn-container">
            <img src={logo} className="logo" />
            <div className="nav-right">
              <SearchBar />
              {/* <button className="cart-btn">🛒</button> */}
              <div className="theme-toggle" onClick={toggleTheme}>
                {darkMode ? "☀️" : "🌙"}
              </div>
              <div className="menu-btn" onClick={() => setMenuOpen(true)}>☰</div>
            </div>
          </div>

          {/* Overlay to hide background content when menu is open */}
          {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}

          {/* Side Navigation */}
          <div className={`side-menu ${menuOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={() => setMenuOpen(false)}>✖️</button>
            <ul className="nav-links">
              <li><Link to="/" onClick={closeMenu}>Home</Link></li>
              <li><Link to="smartphone" onClick={closeMenu}>SmartPhone </Link></li>
              <li><Link to="electronics" onClick={closeMenu}>Electronics </Link></li>
              <li><Link to="home-appliance" onClick={closeMenu}>Home-Appliences </Link></li>
              <li><Link to="/add-product" onClick={closeMenu}>Add Product</Link></li>
              <li><Link to="/manage-products" onClick={closeMenu}>Manage Products</Link></li>
              <li><Link to="/contect" onClick={closeMenu}>contect Us</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="subnav">
        <div className="subnav-links">
          <li><Link to="/" >Home</Link></li>
          <li><Link to="smartphone" >SmartPhone </Link></li>
          <li><Link to="electronics" >Electronics </Link></li>
          <li><Link to="home-appliance" >Home-Appliences </Link></li>
        </div>
      </div>
    </div>
  );
};
