import React from "react"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import logo from "./img/cdquizlogo.gif"
import { t } from "./Utils.jsx"

function Header(props) {
  return (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="p-1"
      >
        <div className="container">
          <img src={logo} alt="logo" className="pr-2"></img>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Text className="p-0 mr-auto">
              Maprunner {t("IOF Control Description Quiz")}
            </Navbar.Text>
            <Nav>
              <Nav.Link onClick={props.onShowSymbolTable}>
                {t("Symbols")}
              </Nav.Link>
              <Nav.Link onClick={props.onShowResultsTable}>
                {t("Results")}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  )
}

export default Header
