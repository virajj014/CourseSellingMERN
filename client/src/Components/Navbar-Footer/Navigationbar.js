import React, { useEffect, useState } from 'react'
import mainlogo from '../photos/mainlogo.jpg'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import './Navigationbar.css'
import Cookies from 'js-cookie';
import testimg from '../photos/no-profile.jpg'
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Navigationbar = () => {
    const navigate = useNavigate();
    const [userdetails, setuserDetails] = useState()


    const user = Cookies.get("user");
    let emailUser = null
    if (user != null) {
        emailUser = JSON.parse(user).email

    };
    // console.log(emailUser)
    useEffect(() => {
        axios.get(`/enroll/enroll/email/${emailUser}`).then((response) => {
            setuserDetails([response.data[0]]);
        }).catch((e) => {
            console.log(e);
        })
    }, [emailUser])


    const logout = () => {
        try {
            Cookies.remove('user')
            userprofdropclose()
            navigate('/home')
            window.location.reload()
        } catch (err) {
            console.log(err.toString);
        }
    }

    const mycookie = Cookies.get('user');
    // if (userdetails) {
    //     // console.log(userdetails)
    // }


    const hambtnactive = () => {
        let navToggler = document.querySelector(".nav-toggler");
        navToggler.classList.toggle("active");
        const section1 = document.querySelector(".section-1");
        section1.classList.toggle("open");
        if (section1.classList.contains("open")) {
            section1.style.maxHeight = section1.scrollHeight + "px";
        } else {
            section1.removeAttribute("style");
        }


    }

    const userprofdrop = () => {
        const nav = document.querySelector(".userprofile-drop");

        if (nav.style.display === "flex") {
            nav.style.display = "none";
        }
        else {
            nav.style.display = "flex";
        }
        // console.log(nav.style.display)

    }
    const userprofdropclose = () => {
        const nav = document.querySelector(".userprofile-drop");
        nav.style.display = "none";

        console.log(nav.style.display)
    }


    const location = useLocation();


    return (
        <>
            <nav onMouseLeave={userprofdropclose}>
                <div className='left'>
                    <Link to="/home" onClick={userprofdrop}><img src={mainlogo} style={{ width: "50px" }} /></Link>
                </div>
                <div className='right'>
                    <div className='section-1'>
                        <div className='navlinks'>
                            <Link to="/home" onLoad={userprofdropclose} style={{ textDecoration: "none" }}>{location.pathname == '/home' ? <p className='active'>Home</p> : <p >Home</p>}</Link>

                            <Link to="/courses" onClick={userprofdropclose} style={{ textDecoration: "none" }}>{location.pathname == '/courses' ? <p className='active'>Courses</p> : <p >Courses</p>}</Link>

                            <Link to="/about" onClick={userprofdropclose} style={{ textDecoration: "none" }}>
                                {location.pathname == '/about' ? <p className='active'>About Us</p> : <p >About Us</p>}
                            </Link>

                            <Link to="/contact" onClick={userprofdropclose} style={{ textDecoration: "none" }}>
                                {location.pathname == '/contact' ? <p className='active'>Contact Us</p> : <p >Contact Us</p>}
                            </Link>
                        </div>
                        <div className='navbtns'>
                            <Link to="/enrollnow" style={{ textDecoration: "none" }}>
                                {userdetails != undefined ? <></> : <button variant="outline-info" className="text-capitalize">Enroll now</button>}
                            </Link>
                            <Link to="/login" style={{ textDecoration: "none" }}>
                                {userdetails != undefined ? <></> : <button variant="outline-info" className="text-capitalize">Login</button>}
                            </Link>
                            <div style={{ textDecoration: "none" }}>

                            </div>
                        </div>
                    </div>
                    <div className='section-2'>
                        {userdetails != undefined ?
                            <button onClick={userprofdrop} className="userprofilebtn">
                                {userdetails && userdetails[0].user_image ? <img src={userdetails[0].user_image} /> : <img src={testimg} />}
                            </button>
                            :
                            <></>}
                    </div>
                    <div className="hamburger-btn">
                        <button onClick={hambtnactive} type="button" className="nav-toggler">
                            <span></span>
                        </button>
                    </div>
                </div>
                <div className="userprofile-drop" onMouseLeave={userprofdropclose}>
                    <Link to="/userprofile" style={{ textDecoration: 'none' }} onClick={userprofdropclose}><button>My profile</button></Link>
                    <Link to="/mycourses" style={{ textDecoration: 'none' }} onClick={userprofdropclose}><button >My courses</button></Link>
                    <Link to="/affiliate-dashboard" style={{ textDecoration: 'none' }} onClick={userprofdropclose} ><button >Affiliate Panel</button></Link>
                    {mycookie != undefined ? <button variant="outline-info" className="text-capitalize" onClick={logout}>Logout</button>
                        : <></>}
                </div>
            </nav ><ToastContainer /></>
    )
}

export default Navigationbar