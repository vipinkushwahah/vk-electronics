import { useState, useEffect } from "react";
import "./navbar.scss";
import SearchBar from "../hooks/search/search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from '../../assets/vklogo.png';
import { RiLogoutBoxRLine, RiUser3Line } from "react-icons/ri";

interface NavbarProps {
  isShopkeeper: boolean;
  username: string | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  isShopkeeper, 
  username, 
  onLogout 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("theme") === "dark"
  );
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/");
    closeMenu();
  };

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
            <Link to="/"><img src={logo} className="logo" alt="VK Electronics Logo" /></Link>
            <div className="nav-right">
              <SearchBar />
              <div className="theme-toggle" onClick={toggleTheme}>
                {darkMode ? "☀️" : "🌙"}
              </div>
              {username && (
                <div className="user-info">
                  <RiUser3Line className="user-icon" />
                  <span className="username">{username}</span>
                </div>
              )}
              <div className="menu-btn" onClick={() => setMenuOpen(true)}>☰</div>
            </div>
          </div>

          {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}

          <div className={`side-menu ${menuOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={() => setMenuOpen(false)}>✖️</button>
            <ul className="nav-links">
              <li><Link to="/" onClick={closeMenu}>Home</Link></li>
              <li><Link to="smartphone" onClick={closeMenu}>SmartPhone</Link></li>
              <li><Link to="electronics" onClick={closeMenu}>Electronics</Link></li>
              <li><Link to="home-appliance" onClick={closeMenu}>Home-Appliances</Link></li>

              {isShopkeeper && (
                <>
                  {/* <li><Link to="/add-product" onClick={closeMenu}>Add Product</Link></li> */}
                  <li><Link to="/manage-products" onClick={closeMenu}>Manage Products</Link></li>
                </>
              )}

              <li><Link to="/contect" onClick={closeMenu}>Contact Us</Link></li>
              {/* <li><Link to="/repair-services" onClick={closeMenu}>Repair Services</Link></li> */}

              {username ? (
                <>
                  <li className="logout-btn" onClick={handleLogout}>
                    <RiLogoutBoxRLine /> Logout
                  </li>
                </>
              ) : (
                <li><Link to="login" onClick={closeMenu}>Login & Signup</Link></li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <div className="subnav">
        <div className="subnav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="smartphone">SmartPhone</Link></li>
          <li><Link to="electronics">Electronics</Link></li>
          <li><Link to="home-appliance">Home-Appliances</Link></li>
          {/* <li><Link to="/repair-services">Repair Services</Link></li> */}
        </div>
      </div>
    </div>
  );
};