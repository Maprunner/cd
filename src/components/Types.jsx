import React from 'react'
import PropTypes from 'prop-types'
import { t } from './Quiz.jsx'
import { quizDefs } from '../data/data.js'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

const Types = (props) => {
  const {quizDefs, onStart} = props
  const types = quizDefs.map(function (btn, i) {
    return (
      <div className="col-md-4" key={i}>
        <Card className="my-2">
          <Card.Header className="font-weight-bold">
            <Row>
              <Col>
            {t(btn.text)}
            </Col>
            <Col xs={3}>
            <Button
              value={btn.value}
              onClick={(event) => onStart(parseInt(event.currentTarget.value, 10))}
              variant="primary"
            >
              {t('Start')}
            </Button>
            </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Text>{t(btn.caption)}</Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  })
  return (
    <div className="row">
      {types}
    </div>
  )
}

Types.defaultProps = {
  quizDefs: quizDefs
}

Types.propTypes = {
  onStart: PropTypes.func
}

export default Types
