import Userprofilenavbar from './Userprofilenavbar'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Changepassword.css'

const Changeprofileimage = () => {

    const [user_image, setuserimg] = useState('');

    const formdata = new FormData();
    formdata.append('user_image', user_image);

    const user = Cookies.get("user");
    const emailUser = JSON.parse(user).email;
    const [userdetails1, setuserDeatils1] = useState([])
    useEffect(() => {
        axios.get(`/enroll/enroll/email/${emailUser}`).then((response) => {
            setuserDeatils1([response.data[0]._id])
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

    const PostData = async (e) => {
        e.preventDefault()
        if (user_image) {
            axios.patch(`/enroll/enroll/${userdetails1[0]}`, formdata).then((response) => {
                if (response.status === (400)) {

                    toast.error(response.data, {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: 'colored'
                    });
                }
                if (response.status === (200)) {

                    toast.success("Profile Image changed successfully!", {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: 'colored'
                    });
                    window.location.reload()
                }
            }).catch((e) => {
                if (e.response.status === 400) {


                    toast.error(e.response.data + '💀', {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: 'colored'
                    });

                } else {

                    toast.error('something wrong 💀', {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: 'colored'
                    });
                }
            });
        } else {
            toast.error('No image selected ✖', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        }
    }


    return (
        <>
            <div className='changepassword-outer'>
                <Userprofilenavbar />
                <div className="changepassword-container">
                    <h1>Change Profile Picture</h1>
                    <form method='POST' encType='multipart/form-data'>
                        <div>
                            <label>Choose new profile Picture</label>
                            <input type="file" filename='user_image' onChange={(e) => { setuserimg(e.target.files[0]) }} accept='image/png, image/jpeg, image/jpg' />
                        </div>

                        <div className='contfullwidth'>
                            <button onClick={PostData}>Make Changes</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Changeprofileimage