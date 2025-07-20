import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import supabase from '../supabase/supabase-client';
import SessionContext from '../context/SessionContext';
import logo from '../assets/nuclear_explosion.png';

export default function Header({ children }) {
  const navigate = useNavigate();
  const contextValue = useContext(SessionContext);
  const user = contextValue?.session?.user;

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    alert('Signed out');
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src={logo} alt="Logo" style={{ height: '28px' }} />
          <span>Rehacktor</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {children}
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={Link} to="/account">Account</Nav.Link>
                <Navbar.Text className="me-2">Ciao, {user.email}!</Navbar.Text>
                <Button variant="outline-light" onClick={signOut}>Logout</Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}