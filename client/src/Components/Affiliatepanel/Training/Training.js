import React, { useEffect, useState } from 'react';
import AffiliateSidebar from '../AffiliateSidebar';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Training = () => {

    const [data, setdata] = useState([]);

    useEffect(() => {
        axios.get(`/training/training/`).then((response) => {
            setdata(response.data);
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
                        <h1>Training</h1>
                    </div>
                    <div className='affiliate-hr'></div>
                    <div className='webinar-card'>
                        {
                            data.map((e) => {
                                return (

                                    <div className='webinar-card-inner'>
                                        <div className='webinar-card-img'>
                                            <img src={`/${e.training_image}`} />
                                        </div>

                                        <a href={e.youtube_link}>
                                            <button>
                                                Visit
                                            </button>
                                        </a>
                                    </div>

                                )
                            })
                        }

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Training