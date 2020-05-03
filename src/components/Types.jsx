import React from 'react'
import PropTypes from 'prop-types'
import { t } from './Quiz.jsx'
import { quizDefs } from '../data/data.js'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { mapImg } from '../data/data.js'
import Image from 'react-bootstrap/Image'

const Types = (props) => {
  const { onStart} = props

  const pictogram = (quizDef)  => {
    return(
      <>
      <Col>
      {(quizDef.from === "cd") && <div className='cd-pictogram cd'>{String.fromCharCode(59649)}</div>}
      {(quizDef.from === "map") && <Image src={mapImg.c102} roundedCircle/>}
      {(quizDef.from === "text") && t("Spur")}
      </Col>
      <Col>
        <>-></>
      </Col>
      <Col>
      {(quizDef.to === "cd") && <div className='cd'>{String.fromCharCode(59649)}</div>}
      {(quizDef.to === "map") && <Image src={mapImg.c102} roundedCircle/>}
      {(quizDef.to === "text") && t("Spur")}
      </Col>
      </>
    )
  }

  const types = quizDefs.map(function (q, i) {
    return (
      <div className="col-md-4" key={i}>
        <Card className="my-2">
          <Card.Header className="font-weight-bold">
            <Row>
              <Col>
            {t(q.title)}
            </Col>
            <Col xs={3}>
            <Button
              value={q.id}
              onClick={(event) => onStart(parseInt(event.currentTarget.value, 10))}
              variant="primary"
            >
              {t('Start')}
            </Button>
            </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Text>{t(q.caption)}</Card.Text>
            <Row>
            {pictogram(q)}
            </Row>
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

Types.propTypes = {
  onStart: PropTypes.func
}

export default Types
