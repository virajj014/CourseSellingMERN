import React, { useState } from 'react'
import contactpic from '../photos/contactuspic.png'
import axios from 'axios';
import Fp2 from './Fp2'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Fp = () => {
    const [email, setEmail] = useState('');
    const [fpForm, showForm] = useState(true);
        
    const sendCode = (e) => {
        e.preventDefault();
        if (email) {
            axios.post(`otp/emailSend`,
                JSON.stringify({ email }), {
                headers: { "Content-Type": "application/json", 'Accept': 'application/json' }
            }).then((response) => {
                showForm(false)
            }).catch((e) => {
                toast.error(e.response.data+'💀', {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
                if (e.response.status === (400)) {
                    toast.error(e.response.data+'💀', {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: 'colored'
                    });
                } else if (e.response.status === (404)) {                    
                    toast.error(e.response.data+'💀', {
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
            toast.error("email required...", {
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
        <div className='contact-outer'>
            <div className='contact-inner'>
                <p>Forgot Password</p>
                <div className='contact-innermost'>
                    <img src={contactpic} />
                    {fpForm ? <form>
                        <p>Verify Yourself</p>
                        <input type="email" name='email' id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email' />
                        <button onClick={sendCode}>Send Code</button>
                    </form>
                        :
                        <Fp2 email={email} />
                    }
                </div>
            </div>
        </div><ToastContainer /></>
    )
}

export default Fp