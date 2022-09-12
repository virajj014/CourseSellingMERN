import React, { useEffect, useState } from 'react'
import Productcard from './Productcard'
import './Productcarousel.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios'

const Productslider = () => {
    const btnpressprev = () => {
        let box = document.querySelector('.product-container');
        let width = box.clientWidth;
        box.scrollLeft = box.scrollLeft - width - width / 2;
        // width = width + box.offsetWidth;
        console.log(width);
    }

    const btnpressnext = () => {
        let box = document.querySelector('.product-container');
        let width = box.clientWidth;
        // width = width + box.offsetWidth;
        box.scrollLeft = box.scrollLeft + width + width / 2;

        console.log(width);
    }


    const [allCourses, setallCourses] = useState([]);

    const [keyword, setkeyword] = useState('');

    useEffect(() => {
        axios.get(`/course/course/`).then((response) => {
            setallCourses(response.data);
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
            <div className="product-carousel-outer">
                <h1 className="product-carousel-title">Explore More Courses</h1>
                <div className='product-carousel'>
                    <button className='pre-btn' onClick={btnpressprev}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className='next-btn' onClick={btnpressnext}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                    <div className='product-container'>
                        {allCourses.map((course, i) => (
                            <div key={i}>
                                <Productcard coursename={course.course_name} creator={course.course_author} courseimg={course.course_image} coursedescription={course.course_description} courseprice={course.course_price} courseoffer={course.offer_price} courseid={course._id} />
                            </div>
                        ))}

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Productslider