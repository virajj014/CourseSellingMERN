import React, { useEffect, useState } from 'react'
import './Courses.css'
import Card3 from '../Cards/Card3.js'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card1 from '../Cards/Card1';
const Courses = () => {
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



    return (
        <>
            <div className='coursepage'>
                <h1 className='title'>Our Courses</h1>

                <div className='course-searchbar'>
                    <FontAwesomeIcon icon={faSearch} />
                    <input placeholder='Search any course by title or creator name' value={keyword} onChange={(e) => setkeyword(e.target.value.toLowerCase())} type='text' />
                </div>


                {allCourses === [] ?
                    <p>No Courses</p>
                    : <div className='courses_array'>
                        {
                            allCourses.filter((val) => {
                                if (keyword === '') {
                                    return val
                                }
                                else if (val.course_name.toLowerCase().includes(keyword) || val.course_author.toLowerCase().includes(keyword)) {
                                    return val
                                }
                            }).map((course) =>
                                <Card1 key={course._id} coursename={course.course_name} creator={course.course_author} courseimg={course.course_image} coursedescription={course.course_description} courseprice={course.course_price} courseoffer={course.offer_price} courseid={course._id} />
                            )
                        }
                    </div>}
            </div>
            <ToastContainer />
        </>
    )
}

export default Courses