import React from "react"

import WebWorkStyles from "./webWork.module.css"

function WebWork(props) {
  console.log(props.image1);
  return(
  <div className={WebWorkStyles.container}>
    <div className={WebWorkStyles.work} style={{backgroundImage: `url(${props.image1})`}}></div>
    <div className={WebWorkStyles.work} style={{backgroundImage: `url(${props.image2})`}}></div>
  </div>
  )
}

export default WebWork
