import React from 'react'
import { t } from './Quiz.jsx'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

const Category = (props) => {
  const { onClick, category, use } = props
  return (
    <Col>
      <Form.Check
        type="checkbox"
        inline
        id={category}
        defaultChecked={use}
        onClick={() => onClick(category)}
        label={t(category)}
      />
    </Col>
  )
}

export default Category