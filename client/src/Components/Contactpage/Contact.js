import React, { useEffect, useState } from 'react'
import contactpic from '../photos/contactuspic.png'
import './Contact.css'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {

    const [data, setData] = useState({
        contactName: '',
        contactEmail: '',
        contactMessage: ''
    });

    var name, value;
    const handleChange = (e) => {
        name = e.target.name;
        value = e.target.value;
        setData({ ...data, [name]: value })
        console.log(name + "" + value)
    }
    console.log(data)
    const sendMail = (e) => {
        // console.log(e);
        e.preventDefault();
        console.log("jiiii")
        const { contactName, contactEmail, contactMessage } = data;

        axios.post('/common/contactus', JSON.stringify({ contactName, contactEmail, contactMessage }), {
            headers: { "Content-Type": "application/json", 'Accept': 'application/json' }
        })
            .then((response) => {
                window.alert(response.data);
            }).catch((e) => {
                console.log(e);
            })
    }

    return (
        <>
            <div className='contact-outer'>
                <div className='contact-inner'>
                    <p>Contact Us</p>
                    <div className='contact-innermost'>
                        <img src={contactpic} />
                        <form>
                            <p>Get in touch</p>
                            <input type='text' name='contactName' onChange={handleChange} placeholder='Name' />
                            <input type='email' name='contactEmail' onChange={handleChange} placeholder='Email' />
                            <textarea type='text' name='contactMessage' onChange={handleChange} placeholder='Message' />
                            <button onClick={sendMail}>Send</button>
                        </form>
                    </div>
                </div>
            </div><ToastContainer />
        </>

    )
}

export default Contact