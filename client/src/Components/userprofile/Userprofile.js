import React, { useEffect, useState } from 'react'
import Userprofilenavbar from './Userprofilenavbar'
import "./Userprofile.css";
import Cookies from 'js-cookie';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Userprofile = () => {

    const user = Cookies.get("user");
    const emailUser = JSON.parse(user).email;

    const initialValues1 = {
        username: "",
        userloginid: "",
        email: "",
        gender: "",
        country: "",
        usercity: "",
        mobileNo: "",
        usercitypincode: "",
        state: "",
        dob: "",
        useraddress: "",
    }
    const [userdetails, setuserDeatils] = useState([initialValues1])

    const handleInputs = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setuserDeatils({ ...userdetails, [name]: value });
    }
    const id = userdetails[0]._id;

    const updateUserProfile = (e) => {
        e.preventDefault();
        const { gender, country, city, state, mobileNo, pincode, dob, address } = userdetails;
        axios.patch(`enroll/enroll/${id}`,
            JSON.stringify({ gender, country, city, state, mobileNo, pincode, dob, address }), {
            headers: { "Content-Type": "application/json", 'Accept': 'application/json' }
        }).then((response) => {
            toast.success("saved successfully..", {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }
    //    console.log(updateUserProfile)
    useEffect(() => {
        axios.get(`/enroll/enroll/email/${emailUser}`).then((response) => {
            setuserDeatils([response.data[0]]);
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
    const { gender, country, city, state, pincode, dob, address } = userdetails[0];

    return (
        <>
            <div className='userprofile-outer'>
                <Userprofilenavbar />
                <div className="userprofile-container">
                    <h1>Personal Information</h1>
                    <form>
                        <div className='form-div'>
                            <div>
                                <label>Name</label>
                                <input name='username' value={userdetails[0].name} onChange={handleInputs} />
                            </div>

                            <div>
                                <label>Login Id</label>
                                <input disabled name='userloginid' value={userdetails[0].email} />
                            </div>
                        </div>
                        <div className='form-div'>
                            <div>
                                <label>Email</label>
                                <input disabled name='useremail' value={userdetails[0].email} />
                            </div>
                            <div>
                                <label>Mobile Number</label>
                                <input name='mobileNo' defaultValue={userdetails[0].mobileNo} onChange={handleInputs} />
                            </div>
                        </div>
                        <div className='form-div'>
                            <div>
                                <label>Gender</label>
                                <select id="gender" name='gender' defaultValue={gender} onChange={handleInputs}>
                                    <option disabled>{gender}</option>
                                    <option >Male</option>
                                    <option >Female</option>
                                    <option >Other</option>
                                </select>
                            </div>
                            <div>
                                <label>DOB</label>
                                <input type="date" name='dob' defaultValue={dob.substring(0, 10)} onChange={handleInputs} />
                            </div>
                        </div>

                        <div className='form-div'>
                            <div>
                                <label>Select Country</label>
                                <select id="country" name='country' defaultValue={country} onChange={handleInputs} >
                                    <option disabled>{country}</option>
                                    <option>India</option>
                                </select>
                            </div>
                            <div>
                                <label>Select State</label>
                                <select id="state" name="state" defaultValue={state} onChange={handleInputs} >
                                    <option disabled>{state}</option>
                                    <option>MP</option>
                                    <option>UP</option>
                                    <option>AP</option>
                                    <option>JB</option>
                                    <option>KP</option>
                                    <option>NP</option>
                                </select>
                            </div>
                        </div>
                        <div className='form-div'>
                            <div>
                                <label>Enter City</label>
                                <input name='city' defaultValue={city} onChange={handleInputs} />
                            </div>
                            <div>
                                <label>Pin Code</label>
                                <input name='pincode' defaultValue={pincode} onChange={handleInputs} />
                            </div>
                        </div>


                        <div className='form-div1'>
                            <label>Address</label>
                            <textarea name='address' defaultValue={address} onChange={handleInputs} />
                        </div>
                        <div className='form-div'>
                            <button onClick={updateUserProfile}>Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Userprofile