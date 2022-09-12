import React from 'react'
import './Card2.css'


const Card2 = (props) => {
    return (

        <div className='card2'>
            <img src={props.courseimg} />
            <h1>{props.coursename}</h1>
            <p>{props.coursedescription}</p>
            <button>More Details</button>
        </div>

    )
}

export default Card2