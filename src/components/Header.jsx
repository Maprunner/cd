import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from './img/cdquizlogo.gif';
import { t } from './Quiz.jsx';

function Header(props) {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="p-1">
        <div className="container">
          <img src={logo} alt='logo' className="pr-2"></img>
          <Navbar.Brand className="p-0" href="https://www.maprunner.co.uk">Maprunner</Navbar.Brand>
          <Navbar.Text className="">{t('Lockdown Orienteering 2020 Control Description Quiz')}</Navbar.Text>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ml-auto">
              <Nav.Link onClick={props.onShowResultsTable} className="">{t('Results')}</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
}

export default Header;
