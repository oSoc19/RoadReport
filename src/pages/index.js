import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import WebWork from "../components/webWork"
import WorkText from "../components/workText"
import SEO from "../components/seo"

import indexStyle from "./index.module.css"
import WebWorkStyles from "../components/webWork.module.css"
import contactStyle from "./contact.module.css"

import linkedin from "../images/linkedin.png"
import github from "../images/github.png"
import facebook from "../images/facebook.png"
import twitter from "../images/twitter.png"
import mail from "../images/mail.png"
import portfolio from "../images/portfolio.png"

import elena from "../images/elena_sánchez.jpg"
import wouter from "../images/wouter_wouters.jpg"
import jan from "../images/jan_temmerman.jpg"
import mars from "../images/martin_leroy.jpg"
import miet from "../images/miet_claes.jpg"

import app1 from "../images/app_2.png"
import app2 from "../images/app_3.png"

const IndexPage = () => (
	<Layout>
		<section className="first">
			<div className={indexStyle.workContainer}>
				<WorkText 
				title="ROAD REPORT" 
				intro="With Road Report, cyclists and pedestrians can report problems such as potholes or broken paving slabs they encounter in the city. Road Report sends this data to our partner TMaaS, who supports the city of Ghent to spot problems quicker and to improve the quality of the sidewalks and cycling paths!"
				btnStyle={indexStyle.buttonWhite}
				github="https://github.com/oSoc19/RoadReport"
				>
					<div className={WebWorkStyles.text}>
						At open Summer of code 2019, three students built Road Report. An open source project based on a mobile application and a website that has a double social benefit:
						<ul>
							<li>
							Citizens can directly communicate with those responsible of the mobility in their city.
							</li>
							<li>
							Cities can use this data to become smarter, quicker and more effective fixing mobility problems
							</li>
						</ul>
					</div>
				</WorkText>
				<WebWork image1={app1} image2={app2}/>
			</div>
		</section>

		<section id="team" className="second">
			<h1 className={WebWorkStyles.title} style={{marginTop: 0, color: 'white'}}>TEAM </h1>
			<div className={indexStyle.teamContainer}>
			<div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
				<div>
				<div style={{width: 230, height: 230, borderRadius: 115, backgroundColor: 'green', marginRight: 50, marginLeft: 50, backgroundImage: `url(${elena})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
					<div className={contactStyle.iconContainer}>
						<a href="https://www.linkedin.com/in/elena-sánchez-nicolás-792724121/">
						<img className={contactStyle.icon} src={linkedin} alt="linkedin"/>
						</a>
						<a href="https://twitter.com/Sanchelen">
						<img className={contactStyle.icon} src={twitter} alt="twitter"/>
						</a>
						<a href="https://elenasancheznicolas.wordpress.com">
						<img className={contactStyle.icon} src={portfolio} alt="portfolio"/>
						</a>
						<a href="mailto:sancheznicolaselena@gmail.com">
						<img className={contactStyle.icon} src={mail} alt="mail"/>
						</a>
					</div>
				</div>
				<div>
				<div style={{width: 230, height: 230, borderRadius: 115, backgroundColor: 'green', marginRight: 50, marginLeft: 50, backgroundImage: `url(${mars})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
					<div className={contactStyle.iconContainer}>
						<a href="https://www.linkedin.com/in/mars-leroy/">
						<img className={contactStyle.icon} src={linkedin} alt="linkedin"/>
						</a>
						<a href="https://twitter.com/imars073">
						<img className={contactStyle.icon} src={twitter} alt="twitter"/>
						</a>
						<a href="https://m-leroy.pro">
						<img className={contactStyle.icon} src={portfolio} alt="portfolio"/>
						</a>
						<a href="mailto:contact@m-leroy.pro">
						<img className={contactStyle.icon} src={mail} alt="mail"/>
						</a>
					</div>
				</div>
				<div>
				<div style={{width: 230, height: 230, borderRadius: 115, backgroundColor: 'green', marginRight: 50, marginLeft: 50, backgroundImage: `url(${jan})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
					<div className={contactStyle.iconContainer}>
						<a href="https://www.linkedin.com/in/jan-temmerman-896b07146">
						<img className={contactStyle.icon} src={linkedin} alt="linkedin"/>
						</a>
						<a href="https://twitter.com/jan_temmerman">
						<img className={contactStyle.icon} src={twitter} alt="twitter"/>
						</a>
						<a href="https://www.jantemmerman.ga/">
						<img className={contactStyle.icon} src={portfolio} alt="portfolio"/>
						</a>
						<a href="mailto:temmjan@gmail.com">
						<img className={contactStyle.icon} src={mail} alt="mail"/>
						</a>
					</div>
				</div>
			</div>
				<div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
				<div>
					<div style={{width: 230, height: 230, borderRadius: 115, backgroundColor: 'green', marginRight: 50, marginLeft: 50, backgroundImage: `url(${wouter})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
					<div className={contactStyle.iconContainer}>
						<a href="https://www.linkedin.com/in/wouterswouter/">
						<img className={contactStyle.icon} src={linkedin} alt="linkedin"/>
						</a>
					</div>
				</div>
				<div>
				<div style={{width: 230, height: 230, borderRadius: 115, backgroundColor: 'green', marginRight: 50, marginLeft: 50, backgroundImage: `url(${miet})`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
					<div className={contactStyle.iconContainer}>
						<a href="https://www.linkedin.com/in/mietcls/">
						<img className={contactStyle.icon} src={linkedin} alt="linkedin"/>
						</a>
						<a href="https://twitter.com/choisissez">
						<img className={contactStyle.icon} src={twitter} alt="twitter"/>
						</a>
						<a href="https://www.miet.be/">
						<img className={contactStyle.icon} src={portfolio} alt="portfolio"/>
						</a>
						<a href="mailto:miet@miet.be">
						<img className={contactStyle.icon} src={mail} alt="mail"/>
						</a>
					</div>
				</div>
				</div>
			</div>
		</section>
	</Layout>
)

export default IndexPage
