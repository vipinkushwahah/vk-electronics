import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Menu, X, Search, Smartphone, ChevronDown,
  Plug, Refrigerator
} from 'lucide-react';
import { RiLogoutBoxRLine, RiUser3Line } from 'react-icons/ri';
import SearchBar from '../hooks/search/search';
// import logo from '../../assets/vklogo.png';
import './navbar.scss';

interface NavbarProps {
  isShopkeeper: boolean;
  username: string | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isShopkeeper, username, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsScrolled(window.scrollY > 10);
    const handler = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setIsOpen(false), [location.pathname]);

  const handleLogout = () => {
    onLogout();
    navigate('/');
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Products', dropdown: [
        { name: 'SmartPhone', path: '/smartphone', icon: <Smartphone size={16} /> },
        { name: 'Electronics', path: '/electronics', icon: <Plug size={16} /> },
        { name: 'Home-Appliances', path: '/home-appliance', icon: <Refrigerator size={16} /> },
      ]
    },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contect' },
    { name: 'Cart', path: '/cart' },
    { name: 'Login', path: '/login' },
  ];
  return (
    <>
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-row">
            <Link to="/" className="navbar-logo">
            <div className="logo-icon">
              <Smartphone className="icon-white" />
            </div>
              {/* <img src={logo} alt="VK Electronics" className="logo-img" /> */}
              <span className="logo-text">Vk Electronics</span>
            </Link>
            <div className="navbar-links">
              {navLinks.map((link, i) =>
                link.dropdown ? (
                  <div key={i} className="dropdown">
                    <button className="dropdown-toggle">
                      {link.name}<ChevronDown size={16}/>
                    </button>
                    <div className="dropdown-menu">
                      {link.dropdown.map((item, j) => (
                        <Link key={j} to={item.path} className="dropdown-item">
                          {item.icon}<span>{item.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link key={i} to={link.path} 
                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}>
                    {link.name}
                  </Link>
                )
              )}
            </div>
            <div className="navbar-actions">
              <div className="searchbar-desktop"><SearchBar /></div>
              {username && (
                <div className="user-info">
                  <RiUser3Line className="user-icon" /><span>{username}</span>
                </div>
              )}
              {/* <Link to="/cart" className="action-btn cart">
                <ShoppingCart size={20}/>
                <span className="cart-count">0</span>
              </Link> */}
              <button className="menu-btn" onClick={() => setIsOpen(v => !v)}>
                {isOpen ? <X size={24}/> : <Menu size={24}/>}
              </button>
            </div>
          </div>
        </div>
        {isSearchOpen && (
          <div className="search-bar-mobile">
            <Search className="search-icon" size={18}/>
            <input type="text" placeholder="Search for products..." className="search-input"/>
          </div>
        )}
      </nav>

      {isOpen && (
        <>
          <div className="overlay" onClick={() => setIsOpen(false)}></div>
          <div className={`side-menu ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={() => setIsOpen(false)}><X /></button>
            <SearchBar />
            <ul className="nav-links-mobile">
              <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
              <li><Link to="/smartphone" onClick={() => setIsOpen(false)}>SmartPhone</Link></li>
              <li><Link to="/electronics" onClick={() => setIsOpen(false)}>Electronics</Link></li>
              <li><Link to="/home-appliance" onClick={() => setIsOpen(false)}>Home-Appliances</Link></li>
              <li><Link to="/cart" onClick={() => setIsOpen(false)}>cart</Link></li>
              {isShopkeeper && (
                <li><Link to="/manage-products" onClick={() => setIsOpen(false)}>Manage Products</Link></li>
              )}
              <li><Link to="/contect" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
              {username ? (
                <li className="logout-btn" onClick={handleLogout}>
                  <RiLogoutBoxRLine /> Logout
                </li>
              ) : (
                <li><Link to="/login" onClick={() => setIsOpen(false)}>Login & Signup</Link></li>
              )}
            </ul>
          </div>
        </>
      )}

      {/* <div className="subnav">
        <div className="subnav-links">
          <Link to="/">Home</Link>
          <Link to="/smartphone">SmartPhone</Link>
          <Link to="/electronics">Electronics</Link>
          <Link to="/home-appliance">Home-Appliances</Link>
        </div>
      </div> */}
    </>
  );
};

export default Navbar;
