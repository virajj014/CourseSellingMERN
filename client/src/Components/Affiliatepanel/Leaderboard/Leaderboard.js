import AffiliateSidebar from '../AffiliateSidebar'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import '../Salestable.css'
import './leaderboard.css'

const Leaderboard = () => {

    const [lbdetails, setlbDeatils] = useState([])

    useEffect(() => {
        axios.get(`/common/leaderboard/`).then((response) => {
            setlbDeatils(response.data.sort((a, b) => b.total_income - a.total_income));
            // console.log(response.data.sort((a,b)=>a.total_income-b.total_income))

        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })

    }, []);

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


    console.log(lbdetails)
    return (
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

            <div className='leaderboard-outer'>
                {/* <div className='head-main'>Leaderboard</div> */}
                <div className='affiliate-inner'>
                    <div className='head'>
                        <h1>Leaderboard</h1>
                    </div>
                    <div className='affiliate-hr'></div>
                    <div className='aff-container2'>
                        <h1>Leaderboard</h1>

                        <table className='sales'>
                            <thead>
                                <th>Sno.</th>
                                <th>User name</th>
                                <th>Email ID</th>
                                <th>Total Amount</th>

                            </thead>
                            <tbody>
                                {
                                    lbdetails.map((e, i) => {

                                        return (
                                            <tr>
                                                <td data-label="Sno.">{i + 1}</td>
                                                <td data-label="ID">{e._id}</td>
                                                <td data-label="Email">{e._id}</td>
                                                <td data-label="Sales">₹ {e.total_income.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                                            </tr>
                                        )
                                    })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>



            </div>
        </div >
    )
}

export default Leaderboard