import React from 'react';
import { Container } from 'react-bootstrap';
import logo from '../assets/nuclear_explosion.png';

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container className="text-center">
        <div className="d-flex justify-content-center align-items-center gap-2 mb-2">
          <img
            src={logo}
            alt="Rehacktor Logo"
            style={{ height: '32px' }}
          />
          <strong style={{ fontSize: '1.2rem' }}>Rehacktor</strong>
        </div>
        <div className="d-flex flex-wrap justify-content-center gap-4 small">
          <div>P.IVA: 12345601</div>
          <div>Tel: 380 6376511</div>
          <div>Via Roma 123, Angeli di Rosora (AN)</div>
          <div>© Rehacktor di Joseph Gregoriano</div>
        </div>
      </Container>
    </footer>
  );
}