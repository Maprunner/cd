import React from 'react'
import PropTypes from 'prop-types'
import { t } from './Quiz.jsx'
import { quizDefs } from '../data/data.js'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const Types = (props) => {
  const {quizDefs, onStart} = props
  const types = quizDefs.map(function (btn, i) {
    return (
      <div className="col-md-4" key={i}>
        <Card className="my-2">
          <Card.Header className="font-weight-bold">
            {t(btn.text)}
          </Card.Header>
          <Card.Body>
            <Card.Text>{t(btn.caption)}</Card.Text>
            <Button
              value={btn.value}
              onClick={(event) => onStart(parseInt(event.currentTarget.value, 10))}
              variant="primary"
            >
              {t('Start')}
            </Button>
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
