import { Link } from "gatsby"
import React from "react"

import headerStyles from "./header.module.css"

export default() => (
  <header>
    <div className={headerStyles.container}>
    <Link className={headerStyles.linklogo} to="/"> <h1 className={headerStyles.logo}>ROAD REPORT</h1> </Link>
      <div className={headerStyles.linkContainer}>
        <Link className={headerStyles.link} to="#team">Team</Link>
        <Link className={headerStyles.link} to="#partners">Partners</Link>
      </div>
    </div>
  </header>
) 
