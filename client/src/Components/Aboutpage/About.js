import React from 'react'
import img1 from '../photos/aboutpg/1.png'
import img2 from '../photos/aboutpg/2.png'
import tm1 from '../photos/aboutpg/teammember1.jpg'

import './About.css'
const About = () => {
    return (
        <div className="about-outer">
            <img src={img1} width={"100%"} />
            <div className="abtus-head">
                <h1>About us</h1>
                <div>
                    <p>
                        Smart EduTech is an ed-tech platform. Since March 24, 2020, we've been assisting learners of all ages in learning the trendiest courses in any field with diversified bundles. Bizgurukul keeps culture and learning at the root of everything it does. We’re entrenched in creating a difference. Therefore, we strive to make a distinction in the way people approach entrepreneurship and education.

                        We deliver courses and bundles designed, created, and produced with real-world statistical data input for the folks we highly believe in.
                    </p>
                </div>
            </div>
            <div className='founders-outer'>
                <h1>Our Team</h1>
                <div>
                    <div className='card'>
                        <img src={tm1} />
                        <h2>Harshal Jain</h2>
                        <h3>Team member</h3>
                    </div>
                    <div className='card'>
                        <img src={tm1} />
                        <h2>Harshal Jain</h2>
                        <h3>Team member</h3>
                    </div>
                    <div className='card'>
                        <img src={tm1} />
                        <h2>Harshal Jain</h2>
                        <h3>Team member</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About;