import React from "react"
import { t } from "./Utils.jsx"
import { getImage } from "./Utils.jsx"

const CardFace = (props) => {
  const { idx, onClick, question } = props
  let style = "cd-card"
  let content

  if (question.card === "text") {
    style = style + " cd-card-text"
    content = t(question.desc)
  } else if (question.card === "cd") {
    style = style + " cd-card-symbol cd"
    content = String.fromCharCode(question.code)
  } else {
    content = getImage(question.id)
  }
  if (question.selected) {
    style = style + " card-selected"
  }
  return (
    <div className={style} onClick={() => onClick(idx)}>
      {content}
    </div>
  )
}

const FinishedCard = () => {
  return <div className="cd-card card-got-it">{t("OK")}</div>
}

const MatchCard = (props) => {
  const { question, idx, onClick } = props
  if (question.gotIt) {
    return <FinishedCard />
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
