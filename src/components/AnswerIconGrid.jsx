import React from 'react'
import SmallCDIcon from './SmallCDIcon.jsx'

const AnswerIconGrid = (props) => {
  const {answers, questions} = props
  let answered = answers.map(function (q, i) {
    return (
      <SmallCDIcon
        key={i}
        code={q.question.code}
        gotIt={q.gotIt}
        desc={q.question.desc}
      />
    )
  })
  let unanswered = []
  for (let j = answers.length; j < questions; j = j + 1) {
    unanswered.push(
      <SmallCDIcon
        key={j}
        code={0}
        gotIt={false}
        desc={''}
      />
    )
  }
  return (
    <>
      {answered.concat(unanswered)}
    </>
  )
}

export default AnswerIconGrid
