import React from 'react'
import { t } from './Quiz.jsx'
import Form from 'react-bootstrap/Form'

const NumberInput = (props) => {
  const {oldNumber, onSetNumber} = props
  const onNumberChange = (event) => {
    let number = event.target.value
    // eslint-disable-next-line
    const validChars = /^[0-9]{0,4}$/
    if (number.match(validChars) === null) {

      // invalid number so stick with what we had previously
      number = oldNumber
    }
    onSetNumber(number)
  }
  return (
    <Form.Group
      controlId="frmNumberInput"
      className="col-md-4"
    >
      <Form.Label className="font-weight-bold">{t('Number')}</Form.Label>
      <Form.Control
        type="text"
        value={oldNumber}
        placeholder={oldNumber}
        onChange={onNumberChange}
      />
     </Form.Group>
  )
}

export default NumberInput

