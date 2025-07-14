import React from "react"
import { t } from "./Utils.jsx"
import Form from "react-bootstrap/Form"

const NameInput = (props) => {
  const { onSetName, name } = props
  const onNameChange = (event) => {
    let newName = event.target.value
    // limit valid characters to 1 to 25 of quite a wide range
    /* eslint no-useless-escape: "off" */
    const validChars =
      /^[ A-Za-z0-9!£\$%\^&\*()\-\+=:;@#\?\.,\[\]\{\}\/]{1,25}$/
    if (newName.match(validChars) === null) {
      // invalid name so stick with what we had previously
      newName = name
    }
    onSetName(newName)
  }

  return (
    <Form.Group controlId="frmNameInput" className="col-md-3">
      <Form.Label className="font-weight-bold">{t("Name")}</Form.Label>
      <Form.Control
        type="text"
        value={name}
        placeholder={name}
        onChange={onNameChange}
      />
    </Form.Group>
  )
}

export default NameInput
