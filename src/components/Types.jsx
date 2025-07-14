import React from "react"
import PropTypes from "prop-types"
import { t } from "./Quiz.jsx"
import { translateTitle } from "./Utils.jsx"
import { quizDefs } from "../data/data.js"
import Button from "react-bootstrap/Button"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import { mapImg } from "../data/data.js"
import Image from "react-bootstrap/Image"

const Types = (props) => {
  const { onStart } = props

  const pictogram = (quizDef) => {
    const textSpur = (
      <div className="pictogram pictogram-border">{t("Spur")}</div>
    )
    const textThicket = (
      <div className="pictogram pictogram-border">{t("Thicket")}</div>
    )
    const mapSpur = (
      <div className="pictogram pictogram-border">
        <Image className="cd-card-map" roundedCircle src={mapImg.c102} />
      </div>
    )
    const mapThicket = (
      <div className="pictogram pictogram-border">
        <Image className="cd-card-map" roundedCircle src={mapImg.c405} />
      </div>
    )
    const cdSpur = (
      <div className="pictogram pictogram-border cd">
        <div className="pictogram-cd">{String.fromCharCode(59649)}</div>
      </div>
    )
    const cdThicket = (
      <div className="pictogram pictogram-border cd">
        <div className="pictogram-cd">{String.fromCharCode(59689)}</div>
      </div>
    )

    if (quizDef.type === "pick") {
      return (
        <>
          {quizDef.from === "cd" && cdSpur}
          {quizDef.from === "map" && mapSpur}
          {quizDef.from === "text" && textSpur}
          <div className="pictogram">
            <Image className="cd-card-map" src={mapImg.c900} roundedCircle />
          </div>
          {quizDef.to === "cd" && cdSpur}
          {quizDef.to === "map" && mapSpur}
          {quizDef.to === "text" && textSpur}
        </>
      )
    }
    return (
      <>
        {quizDef.from === "cd" && cdSpur}
        {quizDef.from === "map" && mapSpur}
        {quizDef.from === "text" && textSpur}
        {quizDef.to === "cd" && cdThicket}
        {quizDef.to === "map" && mapThicket}
        {quizDef.to === "text" && textThicket}
        {quizDef.from === "cd" && cdThicket}
        {quizDef.from === "map" && mapThicket}
        {quizDef.from === "text" && textThicket}
        {quizDef.to === "cd" && cdSpur}
        {quizDef.to === "map" && mapSpur}
        {quizDef.to === "text" && textSpur}
      </>
    )
  }

  const types = quizDefs.map(function (q, i) {
    return (
      <div className="col-md-4" key={i}>
        <Card className="my-2">
          <Card.Header className="font-weight-bold p-0">
            <Row className="m-1">
              <Col>{translateTitle(q.title)}</Col>
              <Col xs={3}>
                <Button
                  value={q.id}
                  onClick={(event) =>
                    onStart(parseInt(event.currentTarget.value, 10))
                  }
                  variant="primary"
                >
                  {t("Start")}
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body className="p-1">
            <Row className="center-column">{pictogram(q)}</Row>
          </Card.Body>
        </Card>
      </div>
    )
  })
  return <div className="row">{types}</div>
}

Types.propTypes = {
  onStart: PropTypes.func,
}

export default Types
