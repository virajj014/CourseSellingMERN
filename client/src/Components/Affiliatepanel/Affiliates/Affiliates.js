import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import AffiliateSidebar from '../AffiliateSidebar'
import './Affiliates.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import copy from "copy-to-clipboard";

const Affiliates = () => {


    const [invoices, setInvoices] = useState([]);
    const user = Cookies.get("user");
    let emailUser = null
    if (user != null) {
        emailUser = JSON.parse(user).email

    };

    // let navigate = useNavigate();

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
    const [userdetails, setuserDetails] = useState([initialValues1])

    useEffect(() => {
        axios.get(`/enroll/enroll/email/${emailUser}`).then((response) => {
            setuserDetails([response.data[0]]);
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
    const { gender, country, city, state, pincode, dob, address } = userdetails[0];



    useEffect(() => {
        axios.get(`/invoice/invoice`).then((response) => {
            setInvoices(response.data);
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
    // console.log(invoices)
    // console.log(userdetails)

    // invoices.filter((invoice) => {
    //     if (invoice.referred_by === userdetails[0]?.referredCode) {
    //         console.log(invoice)
    //     }
    // })

    const copyToClipboard = (e) => {
        e.preventDefault();
        copy(userdetails[0].referredCode);
        alert(`You have copied "${userdetails[0].referralCode}" to your clipboard!`);
    }

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
                        <h1>Affiliate Links</h1>
                    </div>
                    <div className='affiliate-hr'></div>
                    <div className='section1'>
                        <form>
                            <label>My Refferral Code</label>
                            <div >
                                <input value={userdetails[0].referralCode} id="textbox" />
                                <button onClick={copyToClipboard}>Copy Code</button>
                            </div>
                        </form>
                    </div>

                    <div className='head'>
                        <h1>Affiliate List</h1>
                    </div>
                    <div className='affiliate-hr'></div>

                    <div className='aff-container2'>
                        <h1>Affiliate Lists</h1>

                        <table className='sales'>


                            <thead >
                                <th>Sno.</th>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Invoive No.</th>
                            </thead>

                            <tbody>

                                {invoices.filter((invoice) => {
                                    if (invoice.refferred_by === userdetails[0]?.refferralCode) {
                                        return invoice
                                    }
                                }).map((invoice, index) => {
                                    return (

                                        <tr>
                                            <td data-label="Sno.">{index + 1}</td>
                                            <td data-label="Name">{invoice.client_name}</td>
                                            <td data-label="Course">{invoice.course_name}</td>
                                            <td data-label="Date">{new Date(invoice.createdAt).toDateString()}</td>
                                            <td data-label="Amount">{invoice.amount}</td>
                                            <td data-label="Invoice No.">{invoice.invoice_number}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>



            </div><ToastContainer /></>

    )
}

export default Affiliates