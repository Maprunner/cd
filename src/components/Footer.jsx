import React from "react"
import Navbar from "react-bootstrap/Navbar"
import config from "../../package.json"

function Footer() {
  return (
    <Navbar bg="dark" variant="dark" className="mt-2">
      <div className="container">
        <Navbar.Text>Version {config.version}</Navbar.Text>
        <Navbar.Text className="p-0">
          Copyright © 2025 <a href="https://www.maprunner.co.uk"> Maprunner</a>
        </Navbar.Text>
      </div>
    </Navbar>
  )
}

export default Footer
