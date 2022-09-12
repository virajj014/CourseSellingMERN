import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import './Affiliate.css'
import AffiliateSidebar from './AffiliateSidebar'
import './AffiliateDashboard.css'
import Cookies from 'js-cookie'
import './Salestable.css'
import testimg from '../photos/no-profile.jpg'

const AffiliateDashboard = () => {
    const user = Cookies.get("user");

    const [invoices, setInvoices] = useState([]);

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
            setInvoices(response.data.filter((invoice) => {
                if (invoice.referred_by === userdetails[0]?.referralCode) {
                    return invoice
                }
            }));

        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }, [userdetails])

    // console.log(userdetails[0].referralCode)
    // console.log(invoices)
    const getdatedifference = (date1, date2) => {
        let dt1 = new Date(date1);
        let dt2 = new Date(date2);

        return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    }


    const currentdate = new Date()


    // console.log(invoices)
    let profimg = testimg
    if (userdetails) {
        // console.log(userdetails[0])
        if (userdetails[0].user_image) {
            profimg = userdetails[0].user_image
        }
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
                <div className='affiliate-inner'>
                    <div className='head'>
                        <h1>Dashboard</h1>
                    </div>
                    <div className='affiliate-hr'></div>
                    <div className='aff-container1'>
                        <div className='aff-dashboard-section1'>
                            <div className='userimage'>
                                <img src={profimg} />
                            </div>
                            <div className='affdetails'>
                                <div className='username'>{userdetails[0].name}</div>
                                <div className='useremail'>{userdetails[0].email}</div>
                            </div>
                        </div>

                        <div className='aff-dashboard-section2'>
                            <div className='aff-card c1'>
                                <h1>Today's Earnings</h1>
                                <p>₹{invoices != '' ?

                                    invoices.filter((el) => {
                                        return getdatedifference(currentdate, el.createdAt) > -1
                                    }).reduce((accumulator, object) => {
                                        return accumulator + (object.amount / 2);
                                    }, 0)
                                    : 0
                                }</p>
                            </div>
                            <div className='aff-card c2'>
                                <h1>Last 1 Month Earnings</h1>
                                <p>₹{invoices != '' ?
                                    invoices.filter((el) => {
                                        return getdatedifference(currentdate, el.createdAt) >= -30
                                    }).reduce((accumulator, object) => {
                                        return accumulator + (object.amount / 2);
                                    }, 0) : 0
                                }</p>
                            </div>
                            <div className='aff-card c3'>
                                <h1>Last 1 Year Earnings</h1>
                                <p>₹{invoices != '' ?
                                    invoices.filter((el) => {
                                        return getdatedifference(currentdate, el.createdAt) >= -365
                                    }).reduce((accumulator, object) => {
                                        return accumulator + (object.amount / 2);
                                    }, 0) : 0
                                }</p>
                            </div>

                            <div className='aff-card c4'>
                                <h1>All time Earnings</h1>
                                <p>₹{invoices != '' ?
                                    invoices.filter((el) => {
                                        return getdatedifference(currentdate, el.createdAt) >= -Infinity
                                    }).reduce((accumulator, object) => {
                                        return accumulator + (object.amount / 2);
                                    }, 0) : 0
                                }</p>
                            </div>
                        </div>
                    </div>

                    <div className='aff-container2'>
                        <h1>Sales Details</h1>
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

            </div><ToastContainer />
        </>
    )
}

export default AffiliateDashboard