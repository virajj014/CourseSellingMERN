import React, { useEffect, useState } from 'react'
import AffiliateSidebar from '../AffiliateSidebar'
import './Kyc.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const Kyc = () => {
    const user = Cookies.get('user');

    const userMail = JSON.parse(user).email

    const [userDeatils, setuserDeatils] = useState([]);
    useEffect(() => {
        try {
            axios.get(`/enroll/enroll/email/${userMail}`).then((response) => {
                setuserDeatils(response.data[0]);
                // console.log('inside use effect')


            }).catch((e) => {
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }

        const userid = userDeatils._id;
        console.log(userid)

        try {
            axios.get(`/kyc/kyc/${userid}`).then((response) => {
                setKycDetails(response.data)
                console.log(response.data)
            }).catch((e) => {
                toast.error(e, {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            })
        } catch (error) {
            console.log(error)
        }


    }, [userMail, userDeatils._id])
    const userid = userDeatils._id;
    console.log(userid)

    // const checkKyc = () => {
    //     try {
    //     axios.get(`kyc/kyc/${userid}`).then((response) => {
    //         setKycDetails(response.data)
    //         console.log(response.data)
    //     }).catch((e) => {
    //         toast.error(e, {
    //             position: "top-center",
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             theme: 'colored'
    //         });
    //     })} catch (error) {

    //     }
    // }


    // checkyc();

    const [file, setFile] = useState([])
    function handleChange(event) {
        setFile(event.target.files[0])
    }

    const [file1, setFile1] = useState([])
    function handleChange1(event) {
        setFile1(event.target.files[0])
    }

    const initialValues = {
        uname: "",
        email: "",
        mobileNumber: "",
        pinCode: "",
        city: "",
        state: "",
        aadharNumber: "",
        aadharName: "",
        panNumber: "",
        panName: "",
        bankAccountNumber: "",
        accountHolderName: "",
        bankName: "",
        ifscCode: ""
    }

    let name, value;
    const [kycDetails, setKycDetails] = useState(initialValues);
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setKycDetails({ ...kycDetails, [name]: value });
        console.log(name + "  " + value)
    }

    const { uname, email, mobileNumber, pinCode, city, state, aadharNumber, aadharName,
        panNumber, panName, bankAccountNumber, accountHolderName, bankName, ifscCode } = kycDetails;

    const formdata = new FormData();
    formdata.append('uname', kycDetails.uname);
    formdata.append('email', kycDetails.email);
    formdata.append('mobileNumber', kycDetails.mobileNumber);
    formdata.append('pinCode', kycDetails.pinCode);
    formdata.append('city', kycDetails.city);
    formdata.append('state', kycDetails.state);
    formdata.append('aadharNumber', kycDetails.aadharNumber);
    formdata.append('aadharName', kycDetails.aadharName);
    formdata.append('panNumber', kycDetails.panNumber);
    formdata.append('panName', kycDetails.panName);
    formdata.append('bankAccountNumber', kycDetails.bankAccountNumber);
    formdata.append('accountHolderName', kycDetails.accountHolderName);
    formdata.append('bankName', kycDetails.bankName);
    formdata.append('ifscCode', kycDetails.ifscCode);
    formdata.append('userid', userid);
    formdata.append('documents', file);
    formdata.append('documents', file1);
    formdata.append('verified', 'Pending');


    const makeChanges = (e) => {
        e.preventDefault();
        try {
            axios.post('/kyc/kyc',
                formdata, {
                headers: { "Content-Type": "multipart/form-data", 'Accept': "multipart/form-data" }
            }).then((response) => {
                if (response.status === 201) {
                    toast.success("saved successfully..", {
                        position: "top-center",
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        theme: 'colored'
                    });
                }
            }).catch((e) => {
                console.log(e)
            });

        } catch (e) {
            console.log(e)
        }
    }

    const verification = kycDetails.verified;
    console.log(kycDetails.verified)
    console.log(verification)

    console.log(kycDetails)



    const showsidebar = () => {
        const sidebar = document.querySelector(".affiliate-sidebar-outer");
        const siderbarbtnopen = document.querySelector(".affiliate-sidebar-hamopen");
        console.log(sidebar.style.display)
        if (sidebar.style.display === "" || sidebar.style.display === "none") {
            sidebar.style.display = "flex";
            siderbarbtnopen.style.display = "none"
        }
        else {
            sidebar.style.display = "none";
            siderbarbtnopen.style.display = "flex"
        }
    }


    return (
        <>
            <div className='affiliate-outer'>
                {/*  */}
                <div className='affiliate-sidebar-hamopen' onClick={showsidebar}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                    </svg>
                </div>
                <div className='affiliate-sidebar-outer'>
                    <div className='affiliate-sidebar-hamclose' onClick={showsidebar}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <AffiliateSidebar />
                    <div className='affiliate-vr'></div>
                </div>

                {/*  */}
                <div className='affiliate-vr'></div>
                <div className='affiliate-inner'>
                    <div className='head'>
                        <h3>Apply For Kyc</h3>
                    </div>
                    <div className='affiliate-hr'></div>
                    {verification === "Rejected" ?
                        <div className='kyc-not-verified'>
                            <h3>Try Again!!</h3>
                            Your KYC is rejected Please enter the correct details and submit below for Successful bank transactions
                        </div>
                        : verification === "Approved" ?
                            <div className='kyc-verified'>
                                <h3>Hurray!!</h3>
                                Your KYC is verified, you can not update your details
                            </div>
                            : verification === "Pending" ?
                                <div className='kyc-pending-verified'>
                                    <h3>Wait for a while!!</h3>
                                    Your KYC is not verified yet, it is under observation check again in the next 24hours
                                </div>

                                :
                                <div className='kyc-not-verified'>
                                    <h3>Warning!!</h3>
                                    Your KYC is Not verified Please enter the correct details and submit below for Successful bank transactions
                                </div>


                    }

                    <div className='kyc-details'>
                        <h1>Add/Modify Your Details</h1>
                        <div className='kyc-form'>
                            <div className='outer'>
                                <div className='inner'>
                                    <label>Name</label>
                                    <input type="text" name="uname" value={uname} onChange={handleInput} />
                                </div>
                                <div className='inner'>
                                    <label>Email</label>
                                    <input type="text" name="email" value={email} onChange={handleInput} />
                                </div>
                            </div>

                            <div className='outer'>
                                <div className='inner'>
                                    <label>Mobile Number</label>
                                    <input type="text" name="mobileNumber" value={mobileNumber} onChange={handleInput} />
                                </div>
                                <div className='inner'>
                                    <label>Pin code</label>
                                    <input type="text" name="pinCode" value={pinCode} onChange={handleInput} />
                                </div>
                            </div>

                            <div className='outer'>
                                <div className='inner'>
                                    <label>City</label>
                                    <input type="text" name="city" value={city} onChange={handleInput} />
                                </div>
                                <div className='inner'>
                                    <label>State</label>
                                    <input type="text" name="state" value={state} onChange={handleInput} />
                                </div>
                            </div>

                            <div className='outer'>
                                <div className='inner'>
                                    <label>Aadhaar Number</label>
                                    <input type="text" name="aadharNumber" value={aadharNumber} onChange={handleInput} />
                                </div>
                                <div className='inner'>
                                    <label>Aadhaar Name</label>
                                    <input type="text" name="aadharName" value={aadharName} onChange={handleInput} />
                                </div>
                            </div>

                            <div className='outer'>
                                <div className='inner'>
                                    <label>Pan Number</label>
                                    <input type="text" name="panNumber" value={panNumber} onChange={handleInput} />
                                </div>
                                <div className='inner'>
                                    <label>Pan Name</label>
                                    <input type="text" name="panName" value={panName} onChange={handleInput} />
                                </div>
                            </div>

                            <div className='outer'>
                                <div className='inner'>
                                    <label>Upload Aadhaar card with front & back (Pdf file) </label>
                                    <input type='file' onChange={handleChange} accept='application/pdf' />
                                </div>
                                <div className='inner'>
                                    <label>Upload Pan card (Pdf file)</label>
                                    <input type='file' onChange={handleChange1} accept='application/pdf' />
                                </div>
                            </div>

                            <div className='outer'>
                                <div className='inner'>
                                    <label>Bank Account number</label>
                                    <input type="text" name="bankAccountNumber" value={bankAccountNumber} onChange={handleInput} />
                                </div>
                                <div className='inner'>
                                    <label>Account Holder Name</label>
                                    <input type="text" name="accountHolderName" value={accountHolderName} onChange={handleInput} />
                                </div>
                            </div>

                            <div className='outer'>
                                <div className='inner'>
                                    <label>Bank Name</label>
                                    <input type="text" name="bankName" value={bankName} onChange={handleInput} />
                                </div>
                                <div className='inner'>
                                    <label>IFSC Code</label>
                                    <input type="text" name="ifscCode" value={ifscCode} onChange={handleInput} />
                                </div>
                            </div>

                            <button onClick={makeChanges}>Add/Modify Details</button>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default Kyc