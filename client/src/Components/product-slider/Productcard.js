import React from 'react'
import { Link } from 'react-router-dom'
import './Productcard.css'
const Productcard = (props) => {
    console.log(props)
    return (
        <div className='productcard'>
            <div className='productcard-img'>
                <img src={`/${props.courseimg}`} />
            </div>
            <div className='card-hr'></div>
            <div className='details'>

                <div className='product-head'>
                    <h1>{props.coursename}</h1>
                    <h2>Created by- <span>{props.creator}</span></h2>
                </div>

                <div className='card-price'>
                    {props.courseprice && props.courseoffer ?
                        <div className='cop'>
                            <p className='cp'>M.R.P. <span>₹{props.courseprice}</span></p>
                            <p className='op'>Offer <span>₹{props.courseoffer}</span></p>

                        </div>
                        : <div className='cop'>
                            <p className='op'>M.R.P. <span>₹{props.courseprice}</span></p>

                        </div>}
                </div>
                <p className='description'>{props.coursedescription}</p>
            </div>
            <Link style={{ textDecoration: 'none' }} to={`/coursepage/${props.courseid}`}><button>More Details</button></Link>
        </div>
    )
}

export default Productcard