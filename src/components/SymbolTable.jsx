import React from "react"
import { t } from "./Quiz.jsx"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import { baseData } from "../data/data.js"
import { getImage } from "./Utils.jsx"
import { Container } from "react-bootstrap"

const SymbolTable = (props) => {
  const { handleClose, open } = props

  return (
    <Modal show={open} onHide={handleClose} dialogClassName="match-cards">
      <Modal.Header closeButton>
        <Modal.Title>{t("Symbols")}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="symbol-table">
          {baseData.map((item, i) => {
            return (
              <Card className="symbol-card" key={i} border="primary">
                <Card.Title className="text-center">{item.desc}</Card.Title>
                <Container>
                  <Row className="justify-content-between">
                    <div className="symbol-card-pictogram cd">
                      <div className="pictogram-cd">
                        {String.fromCharCode(item.code)}
                      </div>
                    </div>
                    <div className="">{getImage(item.id)}</div>
                  </Row>
                </Container>
              </Card>
            )
          })}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SymbolTable
