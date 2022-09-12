import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Userprofilenavbar.css'
import testimg from '../photos/no-profile.jpg'
import Cookies from 'js-cookie'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Userprofilenavbar = () => {
    const user = Cookies.get("user");
    const emailUser = JSON.parse(user).email;
    const [userdetails, setuserDeatils] = useState()
    let profimg = testimg

    useEffect(() => {
        axios.get(`/enroll/enroll/email/${emailUser}`).then((response) => {
            setuserDeatils([response.data[0]]);
        }).catch((e) => {
            console.log(e);
        })
    }, [])
    // if (userdetails[0].user_image) {
    //     setprofimg(userdetails[0].user_image)
    // }
    if (userdetails) {
        // console.log(userdetails[0])
        if (userdetails[0].user_image) {
            profimg = userdetails[0].user_image
        }

    }
    const hambtnactive = () => {
        let navToggler = document.querySelector(".nav-toggler-user");
        navToggler.classList.toggle("active");
        const navouter = document.querySelector(".nav-outer");
        navouter.classList.toggle("open1");

        if (navouter.classList.contains("open1")) {
            navouter.style.maxHeight = navouter.scrollHeight + "px";
        } else {
            navouter.removeAttribute("style");
        }

        const navoutermost = document.querySelector(".nav-outermost");
        navoutermost.classList.toggle("open1");
    }





    return (
        <>
        <div className='nav-outermost'>
            <div className="user-hamburger-btn">
                <button type="button" class="nav-toggler-user" onClick={hambtnactive}>
                    <span></span>
                </button>
            </div>

            <div className='nav-outer'>
                <h1>
                    My Profile
                </h1>
                <div className='userimg-sidenav'>
                    {/* {userdetails[0].user_image}*/}

                    <img src={profimg} />
                </div>
                <div className='nav-link'>
                    <Link style={{ textDecoration: 'none' }} to="/userprofile"><p>Personal Information</p></Link>
                    <Link style={{ textDecoration: 'none' }} to="/userinvoice"><p>Invoice</p></Link>
                    <Link style={{ textDecoration: 'none' }} to="/changeprofilepic"><p>Change Profile Image</p></Link>
                    <Link style={{ textDecoration: 'none' }} to="/changepassword"><p>Change Password</p></Link>
                </div>
            </div>
        </div><ToastContainer /></>
    )
}

export default Userprofilenavbar