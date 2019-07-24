import React from "react"

import Layout from "../components/layout"

import contactStyle from "./contact.module.css"

import sw404 from "../images/sw404.gif"

const NotFoundPage = () => (
<Layout>
  <section className="centered">
    <div className={contactStyle.container}>
      <h1 className={contactStyle.greet}>ERROR 404</h1>
      <p className={contactStyle.intro}>You're not supposed to be here...</p>
      <img src={sw404} alt="Computer man" className={contactStyle.notFound}></img>
    </div>
  </section>
</Layout>
)

export default NotFoundPage
