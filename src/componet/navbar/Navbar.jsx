import './Nav.css';
import { Link, BrowserRouter as Router } from 'react-router-dom';
import logo from "./Images/logo.png";
export const Navbar = () => {
  return (
    <div className="container-nav">
      <nav className="navbar">
      <Link to="/" className="logo">
        <img src={logo} alt="Logo" className="logo-img" />
      </Link>
        <ul className="nav-links">
          <li><Link to="home" className="nav-item">HOME</Link></li>
          <li><Link to="about" className="nav-item">ABOUT</Link></li>
        </ul>
        <div className="nav-buttons">
        <Link to="registre">
          <button className="nav-button register-button">Registre</button></Link>
          <Link to="login"><button className="nav-button login-button">Login</button></Link>
        </div>
      </nav></div>
  );
};
