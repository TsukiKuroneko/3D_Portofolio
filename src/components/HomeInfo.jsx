import React from 'react'
import { Link } from 'react-router-dom';
import { arrow } from '../assets/icons';


const InfoBox = ({text, link, btnText}) => (
    <div className="info-box">
        <p className="font-medium sm:text-xl text-center">{text}</p>
        <Link to={link} className="neo-brutalism-white neo-btn">
            {btnText}
            <img src={ arrow } className="w-4 h-4 object-contain"/>
            </Link>
    </div>
)

const renderContent = {
    1: (
    <h1 className="sm:text-x1 sm:leading-snug text-center 
    neo-brutalism-blue py-4 px-8 text-white mx-5">
        Hi I'm <span className="font-semibold">Steven</span>👋<br/>
       A Software Engineer from Indonesia
    </h1>
    ),
    
    2: (
    <InfoBox 
    text="I have experience on making some app and i could picked up many skills along the way "
    link="/about"
    btnText="Learn More"
    />
    ),
    
    3: (
     <InfoBox 
    text="Here's some of my projects that i make while i'm learning to code"
    link="/projects"
    btnText="Visit my portofolio"
    />
    ),
    
    4: (
    <InfoBox 
    text="Need a project done or looking for a web dev? I'm just a keystrokes away"
    link="/contact"
    btnText="Contact me"
    />
    ),
}
const HomeInfo = ({currentStage}) => {
  return renderContent[currentStage] || null;
}

export default HomeInfo