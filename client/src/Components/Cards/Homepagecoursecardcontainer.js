import React from 'react'
import { Card } from 'react-bootstrap'
import './Homepagecoursecardcontainer.css'
import Card1 from './Card1'

import cardimg1 from '../photos/cardimgs/1.png'
import cardimg2 from '../photos/cardimgs/2.png'
import cardimg3 from '../photos/cardimgs/3.png'
import cardimg4 from '../photos/cardimgs/4.png'
import cardimg5 from '../photos/cardimgs/5.png'
import cardimg6 from '../photos/cardimgs/6.png'


import { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const Homepagecoursecardcontainer = () => {
    const [allCourses, setallCourses] = useState([]);

    const [keyword, setkeyword] = useState('');

    useEffect(() => {
        axios.get(`/course/course/`).then((response) => {
            setallCourses(response.data.sort(GetSortOrder("course_price" - "offer_price")));
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }, [])

    function GetSortOrder(prop) {
        return function (a, b) {
            if (a[prop] < b[prop]) {
                return 1;
            } else if (a[prop] > b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    // console.log(allCourses)
    // allCourses.map((course) => {
    //     console.log(course.course_price)
    // })
    return (
<>
        <div className='home-all-card-container-outer'>
            <p className='head1'>Special Discounts</p>
            <div className='home-all-card-container'>
                {allCourses.slice(0, 9).map((course) => 
                    <Card1 key={course._id} coursename={course.course_name} creator={course.course_author} courseimg={course.course_image} coursedescription={course.course_description} courseprice={course.course_price} courseoffer={course.offer_price} courseid={course._id} />
                )}


            </div>
            <Link to='/courses' style={{ textDecoration: 'none' }}> <button className='show-more'>Show more</button></Link>
        </div><ToastContainer /></>
    )
}

export default Homepagecoursecardcontainer