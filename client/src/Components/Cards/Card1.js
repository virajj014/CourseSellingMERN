import React from 'react'
import { Link } from 'react-router-dom'
import "./Card1.css"
const Card1 = (props) => {
    return (
        <div className='card1'>
            <div className='card1-img'>
                <img src={props.courseimg} />
            </div>
            <div className='card-hr'></div>
            <div className='card1-head'>
                <h1>{props.coursename}</h1>
                <h2>Created by- <span>{props.creator}</span></h2>
            </div>
            <div className='details'>
                <div className='card-price'>
                    {props.courseprice && props.courseoffer ?
                        <div className='cop'>
                            <p className='cp'>M.R.P. <span>₹{props.courseprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
                            <p className='op'>Offer <span>₹{props.courseoffer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>

                        </div>
                        : <div className='cop'>
                            <p className='op'>M.R.P. <span>₹{props.courseprice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }</span></p>

                        </div>}
                </div>
                <p className='description'>{props.coursedescription}</p>
            </div>
            <Link style={{ textDecoration: 'none' }} to={`/coursepage/${props.courseid}`}><button>More Details</button></Link>
        </div>
    )
}

export default Card1