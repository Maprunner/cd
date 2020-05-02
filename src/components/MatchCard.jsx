import React from 'react'
import { t } from './Quiz.jsx'

const CardFace = (props)  => {
  const {idx, onClick, question} = props
  let style = 'cd-card'
  let content
  if (question.type === 'text') {
    style = style + ' cd-card-text'
    content = t(question.desc)
  } else {
    style = style + ' cd-card-symbol cd'
    content = String.fromCharCode(question.code)
  }
  if (question.selected) {
    style = style + ' card-selected'
  }
  return (
    <div className={style} onClick={() => onClick(idx)}>
      {content}
    </div>
  )
}

const FinishedCard = () => {
  return (
    <div className='cd-card card-got-it'>
      {t('OK')}
    </div>
  )
}

const MatchCard = (props) => {
  const {question, idx, onClick} = props
  if (question.gotIt) {
    return (
      <FinishedCard />
    )
  }
  return (
    <CardFace
      question={question}
      idx={idx}
      onClick={onClick}
      type={question.type}
    />
  )
}

export default MatchCard