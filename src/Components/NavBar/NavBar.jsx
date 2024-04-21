import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; 
import { Navbar, Nav } from 'react-bootstrap';
import logo from "../../assets/image/IMDB_Logo_2016.svg.png";
import { TokenContext } from '../../Context/TokenContext';
import { useTheme } from '@emotion/react';

export default function NavBar( {setMyMode} ) {
  let {token , setToken} = useContext(TokenContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const currentMode = theme.palette.mode;

  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/Login");
  }

  return (
    <Navbar bg="dark" expand="lg" className='position-fixed end-0 start-0 z-3 top-0'>
      <div className="container">
        <Navbar.Brand as={NavLink} to="/">
          <img src={logo} alt="IMDB" style={{ width: '80px', height: 'auto' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          {token && (
            <Nav className="me-auto">
              <NavLink className='nav-link text-white' to="/popular" activeClassName="active">Popular</NavLink>
              <NavLink className='nav-link text-white' to="/toprated" activeClassName="active">Top Rated</NavLink>
              <NavLink className='nav-link text-white' to="/upcoming" activeClassName="active">Upcoming</NavLink>
            </Nav>
          )}
          {token ? (
            <Nav className="ms-auto align-items-center ">
              <NavLink className='nav-link text-white' onClick={logOut} to="/login" activeClassName="active">logOut</NavLink>
              <button className="btn mb-4" onClick={() => { 
                localStorage.setItem("currentMode", currentMode === "light" ? "dark" : "light");
                setMyMode(currentMode === "light" ? "dark" : "light");
              }}>
                {currentMode === "dark" ? <i className="fas fa-moon fs-4 text-white"></i> : <i className="far fa-sun fs-4 text-warning"></i>}
              </button>
            </Nav>
          ) : (
            <Nav className="ms-auto">
              <NavLink className='nav-link text-white' to="/register" activeClassName="active">Register</NavLink>
              <NavLink className='nav-link text-white' to="/login" activeClassName="active">Login</NavLink>
            </Nav>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
