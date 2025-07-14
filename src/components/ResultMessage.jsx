import React from "react"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"
import AnswerIconGrid from "./AnswerIconGrid.jsx"
import { TYPE_MATCH } from "../data/data.js"
import { t } from "./Utils.jsx"

const ResultMessage = (props) => {
  const { handleClose, open, name, children, type, questions } = props
  return (
    <Modal show={open} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>{t("Congratulations") + " " + name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{children}</div>
        {type !== TYPE_MATCH ? <AnswerIconGrid answers={questions} /> : null}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose}>OK</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ResultMessage
