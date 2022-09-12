import React, { useEffect, useState } from 'react'
import './Courses.css'
import Card3 from '../Cards/Card3.js'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card1 from '../Cards/Card1';


const Mycourses = () => {
    const user = Cookies.get("user");
    const emailUser = JSON.parse(user).email;
    const [userdetails1, setuserDeatils1] = useState([])

    useEffect(() => {
        axios.get(`/enroll/enroll/email/${emailUser}`).then((response) => {
            // console.log(response.data)
            setuserDeatils1([response.data[0].purchased_course][0])
        }).catch((e) => {

            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }, [emailUser])

    const [allCourses, setallCourses] = useState([]);

    const [keyword, setkeyword] = useState('');

    useEffect(() => {
        axios.get(`/course/course/`).then((response) => {
            setallCourses(response.data);
        }).catch((e) => {
            console.log(e)
        })
    }, [])

    var mycourses = [];

    userdetails1.map((e) => {
        console.log(e.course_id)
        allCourses.filter((val) => {
            if (val._id == e.course_id) {
                console.log('hi');
                mycourses.push(val);
            }
        })
    })
    console.log(allCourses)
    console.log(mycourses)


    return (
        <>
        <div className='coursepage'>
            <h1 className='title'>Your Courses</h1>
            <div>
                <div className='course-searchbar'>
                    <FontAwesomeIcon icon={faSearch} />
                    <input placeholder='Search any course by title or creator name' value={keyword} onChange={(e) => setkeyword(e.target.value.toLowerCase())} type='text' />
                </div>
            </div>

            {mycourses === [] ?
                <p>No Courses</p>
                : <div className='courses_array'>
                    {
                        mycourses.filter((val) => {
                            if (keyword === '') {
                                return val
                            }
                            else if (val.course_name.toLowerCase().includes(keyword) || val.course_author.toLowerCase().includes(keyword)) {
                                return val
                            }
                        }).map((course) =>
                            <Card1 coursename={course.course_name} creator={course.course_author} courseimg={course.course_image} coursedescription={course.course_description} courseprice={course.course_price} courseoffer={course.offer_price} courseid={course._id} />

                        )
                    }
                </div>}
        </div><ToastContainer /></>
    )
}

export default Mycourses