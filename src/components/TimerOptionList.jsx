import React from "react"
import Form from "react-bootstrap/Form"
import { t } from "./Utils.jsx"

const TimerOptionList = (props) => {
  const { onChange, possibleTimers, setting } = props
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  let timers = possibleTimers.map(function (timer, i) {
    return (
      <option value={timer} key={i}>
        {timer}
      </option>
    )
  })

  return (
    <Form.Group controlId="frmTimerOptionSelect" className="col-md-2">
      <Form.Label className="font-weight-bold">{t("Time")}</Form.Label>
      <Form.Control onChange={handleChange} as="select" value={setting}>
        {timers}
      </Form.Control>
    </Form.Group>
  )
}

export default TimerOptionList
