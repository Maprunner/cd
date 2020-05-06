import React, { memo }from 'react'
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { mapImg } from '../data/data.js'

export const AnswerAsMap = memo((props) => {
  const onClick = () => {
    props.onClick(props.answer.desc)
  }
  const key = "c" + props.answer.id
  //console.log(key)
  return (
    <Col>
      <div className="map-container">
        <div className="map-button" onClick={onClick}>
          <Image src={mapImg[key]} roundedCircle/>
        </div>
      </div>
    </Col>
  )
})

const AnswerListAsMap = memo((props) => {
  if (!props.answers) {
    return null
  }
  const answers = props.answers.map(function (ans, i) {
    return (
      <AnswerAsMap
        key={i}
        number={i + 1}
        answer={ans}
        onClick={props.onClick}
      />
    )
  })
  if (!answers.length) {
    return null
  }
  return (
    <>
      <Container>
        <Row className="spaceEvenly">
          {answers}
        </Row>
      </Container>
    </>
  )
})


export default AnswerListAsMap
