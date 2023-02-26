import React from "react"
import Navbar from "react-bootstrap/Navbar"
import config from "../../package.json"

function Footer() {
  return (
    <Navbar bg="dark" variant="dark" className="mt-2 sticky-bottom">
      <div className="container">
        <Navbar.Text>Version {config.version}</Navbar.Text>
      </div>
    </Navbar>
  )
}

export default Footer
