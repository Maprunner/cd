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
  const {webResults, onStart, btnDisabled} = props

  const pictogram = (quizDef)  => {
    const textSpur = <div className="pictogram pictogram-border">{t("Spur")}</div>
    const textThicket = <div className="pictogram pictogram-border">{t("Thicket")}</div>
    const mapSpur = <div className="pictogram pictogram-border"><Image className="cd-card-map" roundedCircle src={mapImg.c102} /></div>
    const mapThicket = <div className="pictogram pictogram-border"><Image className="cd-card-map" roundedCircle src={mapImg.c405} /></div>
    const cdSpur = <div className="pictogram pictogram-border cd"><div className="pictogram-cd">{String.fromCharCode(59649)}</div></div>
    const cdThicket = <div className="pictogram pictogram-border cd"><div className="pictogram-cd">{String.fromCharCode(59689)}</div></div>

    if (quizDef.type === "pick") {
      return (
      <>
      {(quizDef.from === "cd") && cdSpur}
      {(quizDef.from === "map") && mapSpur}
      {(quizDef.from === "text") && textSpur}
      <div className="pictogram">
        <Image className="cd-card-map" src={mapImg.c900} roundedCircle/>
      </div>
      {(quizDef.to === "cd") && cdSpur}
      {(quizDef.to === "map") && mapSpur}
      {(quizDef.to === "text") && textSpur}
      </>
      )
    }
    return (
      <>
      {(quizDef.from === "cd") && cdSpur}
      {(quizDef.from === "map") && mapSpur}
      {(quizDef.from === "text") && textSpur}
      {(quizDef.to === "cd") && cdThicket}
      {(quizDef.to === "map") && mapThicket}
      {(quizDef.to === "text") && textThicket}
      {(quizDef.from === "cd") && cdThicket}
      {(quizDef.from === "map") && mapThicket}
      {(quizDef.from === "text") && textThicket}
      {(quizDef.to === "cd") && cdSpur}
      {(quizDef.to === "map") && mapSpur}
      {(quizDef.to === "text") && textSpur}
      </>
    )
  }

  const types = quizDefs.map(function (q, i) {
    const idx = webResults.findIndex((result) => (result.title === q.title))
    const buttonSize = ((idx > -1) && (webResults[idx].title === q.title)) ? 4 : 3
    const button = ((idx > -1) && (webResults[idx].title === q.title))  ?
    <Button
      value={q.id}
      onClick={null}
      variant="success"
      active="false"
    >
    {webResults[idx].score + " / " + (webResults[idx].wrong + webResults[idx].score) + ", " + webResults[idx].time + "s"}
    </Button>
    :
    <Button
      value={q.id}
      disabled={btnDisabled}
      onClick={(event) => onStart(parseInt(event.currentTarget.value, 10))}
      variant="primary"
    >
    {t('Start')}
    </Button>

    return (
      <div className="col-md-6" key={i}>
        <Card className="my-2">
          <Card.Header className="font-weight-bold p-0">
            <Row className="m-1">
            <Col>
              {t(q.title)}
            </Col>
            <Col xs={buttonSize}>
              {button}
            </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-1">
            <Row className="center-column">
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
