import React from 'react'
import MatchCards from './MatchCards.jsx'
import PickQuestionPage from './PickQuestionPage.jsx'
import { TYPE_MATCH, TYPE_PICK } from '../data/data.js'

const QuestionPage = (props) => {

  const renderPick = (props) => {
    return (
      <PickQuestionPage
        idx={props.idx}
        answered={props.answered}
        elapsed={props.elapsed}
        countdown={props.countdown}
        timerOption={props.timerOption}
        questions={props.questions}
        score={props.score}
        onCheckAnswer={props.onCheckAnswer}
        quizDef={props.quizDef}
      />
    )
  }

  const renderMatchItems = (props) => {
    return (
      <MatchCards
        questions={props.questions}
        quizDef={props.quizDef}
        answered={props.answered}
        elapsed={props.elapsed}
        score={props.score}
        open={true}
        onFinished={props.onCheckAnswer}
      />
    );
  }

  switch (props.quizDef.type) {
    case TYPE_PICK:
      return renderPick(props)
    case TYPE_MATCH:
      return renderMatchItems(props)
    default:
      return null
  }
}

export default QuestionPage

