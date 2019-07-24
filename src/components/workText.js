import React from "react"

import WebWorkStyles from "./webWork.module.css"

function WorkText(props) {
  return(
  <div className={WebWorkStyles.textContainer}>
    <h1 className={WebWorkStyles.title}>{props.title}</h1>
    <p className={WebWorkStyles.text}>{props.intro}</p>

    {props.children}

    <a className={props.btnStyle} href={props.github}>View on Github</a>
  </div>
  )
}

export default WorkText
