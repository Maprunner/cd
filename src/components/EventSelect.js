import React from "react"
import Form from "react-bootstrap/Form"

const EventSelect = (props) => {
    const { currentEventid, onChange } = props
  return (
<Form>
<div className="mb-3">
  {["e001", "e002", "e003", "e004", "e005", "e006", "e007", "e008", "e009"].map((event) => (
      <Form.Check 
      key={event}
      inline
      label={event}
      value={event}
      checked={currentEventid === event}
      type="radio"
      id={event}
      onChange={onChange}
      />
  ))}
</div>
</Form>
 )
}

export default EventSelect