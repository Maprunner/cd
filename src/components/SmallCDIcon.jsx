import React from "react"
import { t } from "./Utils.jsx"

function getContent(props) {
  if (props.code === 0) {
    return (
      <span className={"unanswered"} title={""}>
        {String.fromCharCode(59648)}
      </span>
    )
  } else {
    return (
      <span className={props.gotIt ? "correct" : "wrong"} title={t(props.desc)}>
        {String.fromCharCode(props.code)}
      </span>
    )
  }
}

function SmallCDIcon(props) {
  return <div className="small-cd-icon cd">{getContent(props)}</div>
}

export default SmallCDIcon
