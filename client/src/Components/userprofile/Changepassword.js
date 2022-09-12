import React, { useEffect, useState } from 'react'
import Userprofilenavbar from './Userprofilenavbar'
import './Changepassword.css'
import Cookies from 'js-cookie'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Changepassword = () => {
    const user = Cookies.get("user");
    const emailUser = JSON.parse(user).email

    const initialValues = {
        oldpwd: "",
        newpwd: "",
        cnfmpwd: ""
    }
    const [userdetails, setuserDeatils] = useState([initialValues])

    const [userdetails1, setuserDeatils1] = useState([])
    useEffect(() => {
        axios.get(`/enroll/enroll/email/${emailUser}`).then((response) => {

            setuserDeatils1([response.data[0]])

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

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setuserDeatils({ ...userdetails, [name]: value });
    }

    const changePassword = (e) => {
        e.preventDefault();
        const { oldpwd, newpwd, cnfmpwd } = userdetails;

        if (oldpwd && newpwd && cnfmpwd) {
            if (comparePassword()) {
                axios.patch(`enroll/changePassword/${userdetails1[0]._id}`,
                    JSON.stringify({ oldpwd: oldpwd, newpwd: newpwd, cnfmpwd: cnfmpwd }), {
                    headers: { "Content-Type": "application/json", 'Accept': 'application/json' }
                }).then((response) => {
                    toast.success("password changed..", {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: 'colored'
                    });


                }).catch((e) => {
                    if (e.response.status === (400)) {
                        toast.error(e.response.data, {
                            position: "top-center",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            theme: 'colored'
                        });
                    } else {
                        toast.error(e, {
                            position: "top-center",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            theme: 'colored'
                        });

                    }

                })
            } else {
                toast.error("New password & confirm password does not match ✖", {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }
        } else {
            toast.error('All fields are required', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        }

    }
    const comparePassword = (e) => {
        const a = document.getElementById('newpwd').value
        const b = document.getElementById('cnfmpwd').value
        if (a == b) {
            return true;
        }
    }

    const { oldpwd, newpwd, cnfmpwd } = userdetails;

    return (
        <>

            <div className='changepassword-outer'>
                <Userprofilenavbar />
                <div className="changepassword-container">
                    <h1>Change Your Password</h1>

                    <form >
                        <div>
                            <label>Enter Old Password</label>
                            <input type="password" name='oldpwd' value={oldpwd} onChange={handleInputs} />
                        </div>

                        <div>
                            <label>Enter New Password</label>
                            <input type="password" id='newpwd' name='newpwd' value={newpwd} onKeyUp={comparePassword} onChange={handleInputs} />
                        </div>
                        <div>

                            <label>Confirm New Password</label>
                            <input type="password" id='cnfmpwd' name='cnfmpwd' value={cnfmpwd} onKeyUp={comparePassword} onChange={handleInputs} />
                        </div>

                        <div >
                            <button onClick={changePassword}>Make Changes</button>
                        </div>
                    </form>

                </div >
            </div >
            <ToastContainer />
        </>
    )
}

export default Changepassword