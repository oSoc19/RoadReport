import { Link } from "gatsby"
import React from "react"

import headerStyles from "./header.module.css"

export default() => (
  <header>
    <div className={headerStyles.container}>
    <Link className={headerStyles.linklogo} to="/"> <h1 className={headerStyles.logo}>ROAD REPORT</h1> </Link>
      <div className={headerStyles.linkContainer}>
        <Link className={headerStyles.link} to="#team">Team</Link>
        <a className={headerStyles.link} href="https://drive.tmaas.eu/nl/">Partners</a>
      </div>
    </div>
  </header>
) 
