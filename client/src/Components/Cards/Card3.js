import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import "./Card3.css"
const Card3 = (props) => {
    const [course, setcourse] = useState(props.data)
    console.log(course);
    return (
        <>{
            course ?
                <div className='card3'>
                    < div className='img-cont' >
                        <img src={`/${course.course_image}`} />
                    </div >
                    {/* <div className='img-cont'>
            <video src={course.course_video} controls />
        </div> */}
                    < div className='details' >
                        <div className='head'>
                            <h1>{course.course_name}</h1>
                            <h2>( Created by - {course.course_author} )</h2>
                        </div>
                        <div className='head2'>
                            <p className='course-des' > {course.course_description} </p>
                            <div className='cprice'>
                                {course.offer_price ?
                                    <div>
                                        {course.course_price ?
                                            <p className='course-price'>
                                                Course Price - <span className='strikespan'>{course.course_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>/-
                                            </p>
                                            : ''}
                                        <p className='offer-price'>
                                            Offer Price - <span>{course.offer_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>/-
                                        </p>
                                    </div>
                                    :
                                    <div>
                                        {course.course_price ?
                                            <p className='offer-price'>
                                                Course Price - <span >{course.course_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span>/-
                                            </p>
                                            : <></>}
                                    </div>}
                            </div>
                        </div>
                        <Link style={{ textDecoration: 'none' }} to={`/coursepage/${props.data._id}`}><button>More Details</button></Link>
                    </div >
                </div >
                : <></>}
        </>
    )


}

export default Card3