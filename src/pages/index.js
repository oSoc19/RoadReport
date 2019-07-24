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
				github="https://github.com/gdmgent-1819-mobdev2/positive-design-moodify"
				>
					<div style={{margin: 0,fontWeight: 300, fontSize: '1vw', fontFamily: 'Roboto, sans-serif'}}>
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

		<section id="second_section" className="second">
			<h1 className={WebWorkStyles.title} style={{marginTop: 0, color: 'white'}}>TEAM </h1>
			<div className={indexStyle.teamContainer}>
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<div>
					<div style={{width: 230, height: 230, borderRadius: 115, backgroundColor: 'green', marginRight: 50, marginLeft: 50}}></div>
					<div className={contactStyle.iconContainer}>
					<a href="https://www.linkedin.com/in/jan-temmerman-896b07146/">
					<img className={contactStyle.icon} src={linkedin} alt="linkedin"/>
					</a>
					<a href="https://www.facebook.com/jan.temmerman.5">
					<img className={contactStyle.icon} src={facebook} alt="facebook"/>
					</a>
					<a href="https://github.com/gdm-1718-jantemme">
					<img className={contactStyle.icon} src={github} alt="github"/>
					</a>
					</div>
				</div>
				<div>
					<div style={{width: 230, height: 230, borderRadius: 115, backgroundColor: 'green', marginRight: 50, marginLeft: 50}}></div>
					<div className={contactStyle.iconContainer}>
					<a href="https://www.linkedin.com/in/jan-temmerman-896b07146/">
					<img className={contactStyle.icon} src={linkedin} alt="linkedin"/>
					</a>
					<a href="https://www.facebook.com/jan.temmerman.5">
					<img className={contactStyle.icon} src={facebook} alt="facebook"/>
					</a>
					<a href="https://github.com/gdm-1718-jantemme">
					<img className={contactStyle.icon} src={github} alt="github"/>
					</a>
					</div>
				</div>
				<div>
					<div style={{width: 230, height: 230, borderRadius: 115, backgroundColor: 'green', marginRight: 50, marginLeft: 50}}></div>
					<div className={contactStyle.iconContainer}>
					<a href="https://www.linkedin.com/in/jan-temmerman-896b07146/">
					<img className={contactStyle.icon} src={linkedin} alt="linkedin"/>
					</a>
					<a href="https://www.facebook.com/jan.temmerman.5">
					<img className={contactStyle.icon} src={facebook} alt="facebook"/>
					</a>
					<a href="https://github.com/gdm-1718-jantemme">
					<img className={contactStyle.icon} src={github} alt="github"/>
					</a>
					</div>
				</div>
			</div>
				<div style={{display: 'flex', flexDirection: 'row'}}>
				<div>
					<div style={{width: 230, height: 230, borderRadius: 115, backgroundColor: 'green', marginRight: 50, marginLeft: 50, backgroundImage: "url('https://unsplash.com/photos/a7T0PQol-6E')"}}></div>
					<div className={contactStyle.iconContainer}>
					<a href="https://www.linkedin.com/in/jan-temmerman-896b07146/">
					<img className={contactStyle.icon} src={linkedin} alt="linkedin"/>
					</a>
					<a href="https://www.facebook.com/jan.temmerman.5">
					<img className={contactStyle.icon} src={facebook} alt="facebook"/>
					</a>
					<a href="https://github.com/gdm-1718-jantemme">
					<img className={contactStyle.icon} src={github} alt="github"/>
					</a>
					</div>
				</div>
				<div>
					<div style={{width: 230, height: 230, borderRadius: 115, backgroundColor: 'green', marginRight: 50, marginLeft: 50}}></div>
					<div className={contactStyle.iconContainer}>
					<a href="https://www.linkedin.com/in/jan-temmerman-896b07146/">
					<img className={contactStyle.icon} src={linkedin} alt="linkedin"/>
					</a>
					<a href="https://www.facebook.com/jan.temmerman.5">
					<img className={contactStyle.icon} src={facebook} alt="facebook"/>
					</a>
					<a href="https://github.com/gdm-1718-jantemme">
					<img className={contactStyle.icon} src={github} alt="github"/>
					</a>
					</div>
				</div>
				</div>
			</div>
		</section>
	</Layout>
)

export default IndexPage
