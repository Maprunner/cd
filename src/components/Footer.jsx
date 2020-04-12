import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <>

    <Navbar bg="dark" variant="dark" className="mt-2">
      <div className="container">
        <Navbar.Text>
          Version 2.0.6
        </Navbar.Text>
      </div>
    </Navbar>
    </>
  );
}

export default Footer;