import React from 'react'
import Form from 'react-bootstrap/Form'

const EventList = (props) => {
  const {events, onSelectEvent, idx } = props
  
  const handleChange = (event) => {
    onSelectEvent(event.target.value)
  }
  console.log(events)
  const value = events.length > 0 ? events[idx].name: "None"
  return (
    <Form.Group
      controlId="frmEventSelect"
      className="col-md-2"
    >
      <Form.Label className="font-weight-bold">Select Event</Form.Label>
      <Form.Control
        onChange={handleChange}
        as="select"
        value={value}
      >
      {events.map(function (event, i) {
        return (
          <option value={i} key={i}>{event.name}</option>
        )
      })}
      </Form.Control>
    </Form.Group>
  )
}

export default EventList