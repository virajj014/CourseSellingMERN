import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import contactpic from '../photos/contactuspic.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Fp2 = (props) => {
    const navigate = useNavigate();
    const [pwd, setPwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [code, setCode] = useState('');

    const changePassword = (e) => {
        const email = props.email;
        e.preventDefault();
        if (pwd && cpwd && code) {
            if (comparePassword()) {
                axios.post(`otp/changePassword`,
                    JSON.stringify({ email, code, pwd }), {
                    headers: { "Content-Type": "application/json", 'Accept': 'application/json' }
                }).then((response) => {
                    navigate('/login')
                }).catch((e) => {
                    if (e.response.status === (400)) {
                        toast.error(e.response.data + '💀', {
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
                toast.error("password and confirm password should be matched...", {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }

        } else {
            toast.error("all fields are required", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        }

    }
    const comparePassword = (e) => {
        const a = document.getElementById('pwd').value
        const b = document.getElementById('cpwd').value
        if (a == b) {
            return true;
        }
    }

    return (
        <>
            <div className='contact-outer'>
                <div className='contact-inner'>
                    <p>Forgot Password</p>
                    <div className='contact-innermost'>
                        <img src={contactpic} />
                        <form>
                            <p>Reset Password</p>
                            <input name="pwd"
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                                id="pwd"
                                placeholder='New Password'
                                type={'password'} />

                            <input name="cpwd"
                                value={cpwd}
                                onChange={(e) => setCpwd(e.target.value)}
                                id="cpwd"
                                placeholder='Confirm Password'
                                type={'password'} />

                            <input name="code"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder='Enter Verification Code'
                                type={'text'} />

                            <button onClick={changePassword} style={{ width: '200px' }}>Change Password</button>
                        </form>
                    </div>
                </div>
            </div><ToastContainer /></>
    )
}

export default Fp2