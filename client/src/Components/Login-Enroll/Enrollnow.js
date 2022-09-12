import React, { useEffect, useState } from 'react'
import logoimg from '../photos/register-img.png'
import '../Login-Enroll/Enrollnow.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Enrollnow = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: "",
        mobileNo: "",
        pwd: "",
        cpwd: "",
        state: "",
        referredCode: "",

    }
    const [user, setUser] = useState(initialValues);

    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const register = (e) => {
        e.preventDefault();

        const { name, email, mobileNo, pwd, cpwd, state, referredCode } = user;

        if (!email) {

            toast.error("email required! ", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        } else if (!mobileNo) {

            toast.warn("mobile number is required! ", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        } else if (!pwd) {

            toast.warn("password is required! ", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        } else if (!state) {

            toast.warn("state is required! ", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        } else {
            try {
                if (pwd === cpwd) {
                    axios.post('/enroll/enroll',
                        JSON.stringify({ name, email, mobileNo, pwd, cpwd, state, referredCode }), {
                        headers: { "Content-Type": "application/json", 'Accept': 'application/json' }
                    }).then((response) => {
                        if (response.status === (400)) {

                            toast.error(response.data.message, {
                                position: "top-center",
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                theme: 'colored'
                            });
                        }
                        if (response.status === (201)) {
                            navigate('/login')
                        }
                        console.log(response)

                    }).catch((e) => {
                        if (e.response.status === 400) {

                            toast.error(e.response.data, {
                                position: "top-center",
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                theme: 'colored'
                            });
                        }
                        console.log(e)
                    });
                } else {

                    toast.error('password and confirm password do not match', {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: 'colored'
                    });
                }
            } catch (err) {

                toast.error(err, {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            }

        }
    }

    const { email, mobileNo, pwd, cpwd, state, referredCode } = user;
    return (
        <>
            <form method='POST' >
                <div className='outer-enrollnow-container '>
                    <div className='enrollnow-container'>
                        <div className='enrollnow-left'>
                            <img src={logoimg} />
                        </div>

                        <div className='enrollnow-right'>
                            <h1>Register to Smart Educates</h1>
                            <br />
                            <label>name</label>
                            <input type='text' name='name' value={name} onChange={handleInputs} placeholder='Enter your Full Name' />
                            <label>email Id</label>
                            <input type='email' name="email" value={email} onChange={handleInputs} placeholder='xyz@gmail.com' />

                            <label>Enter Mobile number</label>
                            <input type='number' name='mobileNo' value={mobileNo} onChange={handleInputs} placeholder='Enter your 10 digit Mobile mobileNo' />
                            <div className='sub-form'>
                                <div>
                                    <label>Create pwd</label>
                                    <input name='pwd' value={pwd}
                                        onChange={handleInputs}
                                        type='password' id="pwd" />
                                </div>
                                <div>
                                    <label>Confirm pwd</label>
                                    <input type='password' name="cpwd" id="cpwd" value={cpwd}
                                        onChange={handleInputs} />
                                    <span id="message"></span>
                                </div>

                            </div>
                            <label for="state">Choose your state from the list:</label>
                            <select id="state" name='state' value={state}
                                onChange={handleInputs}  >
                                <option value="">Select an Option</option>
                                <option value="Madhya Pradesh" >Madhya Pradesh</option>
                                <option value="UP">UP</option>
                                <option value="Kerala" >Kerala</option>
                                <option value="Assam" >Assam</option>
                            </select>
                            <br />
                            <input name='referredCode' value={referredCode}
                                onChange={handleInputs}
                                placeholder='Enter Referral Code' type='text' />
                            <button onClick={register}>submit</button>

                            <hr className='light-grey-hr' />
                            <p>Already have an account? <Link to='/login'>Login</Link></p>

                        </div>

                    </div>
                </div>
            </form>

            <ToastContainer />
        </>
    )
}

export default Enrollnow