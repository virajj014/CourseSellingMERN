import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Userprofilenavbar from './Userprofilenavbar'
import "./Invoice.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom';


const Invoice = () => {
    const user = Cookies.get("user");
    const emailUser = JSON.parse(user).email;
    const [userdetails, setuserDeatils] = useState([])
    const [invoices, setInvoices] = useState([]);
    const [keyword, setkeyword] = useState('');

    useEffect(() => {
        axios.get(`/enroll/enroll/email/${emailUser}`).then((response) => {
            setuserDeatils(response.data[0]);
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })

        axios.get(`/invoice/invoice/user_id/${userdetails._id}`).then((response) => {
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
    }, [emailUser, userdetails._id])

    console.log(invoices)

    console.log(userdetails)

    return (
        <>
            <div className='userprofile-outer'>
                <Userprofilenavbar />
                <div className="userprofile-container">
                    <div className="invoices-outer">

                        <div className='head-main p-4 mt-5 font-weight-bold'><h1>My Invoices</h1></div>

                        <div className='invoices-searchbar'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <input placeholder='Search by username or coursename or date' onChange={(e) => setkeyword(e.target.value.toLowerCase())} />
                        </div>


                        <div className='invoices'>
                            <div className='invoices-card-head'>
                                <p className='invoices-sno'>Sno.</p>
                                <p className='invoices-small'>Invoice</p>
                                <p className='invoices-small'>Reffered By</p>
                                <p className='invoices-small'>Course name</p>
                                <p className='invoices-small'>Course cost</p>
                                <p className='invoices-small'>Order date</p>
                                <p className='invoices-btn'>View</p>
                            </div>
                            <div className='invoices-card-body'>
                                {invoices.filter((val) => {
                                    if (keyword === '') {
                                        return val
                                    }
                                    else if (val.course_name.toLowerCase().includes(keyword.toLowerCase())) {
                                        console.log(val)
                                        return val
                                    }
                                }).map((e, i) => {
                                    return (
                                        <div className='invoices-card-body-row' key={e._id}>
                                            <p className='invoices-sno'>{i + 1}</p>
                                            <p className='invoices-small'>{e.invoice_number}</p>
                                            <p className='invoices-small'>.{userdetails.referredCode}</p>
                                            <p className='invoices-small'>{e.course_name}</p>
                                            <p className='invoices-small'>{'Rs. ' + e.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>

                                            <p className='invoices-small'>{e.createdAt.toString().slice(0, 10)}</p>
                                            <Link to={`/printinvoice/${e._id}`} style={{ textDecoration: 'none' }}>
                                                <button className='invoices-btn'>View</button>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Invoice