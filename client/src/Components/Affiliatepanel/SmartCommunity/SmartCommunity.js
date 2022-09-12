import React from 'react'
import AffiliateSidebar from '../AffiliateSidebar'
import './SmartCommunity.css'
import fb from './fb.png'
import ig from './ig.png'
import yt from './yt.png'
import li from './linkedin.png'



const SmartCommunity = () => {

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
                <div className='sect1'>
                    <div className='community-head'>
                        <h1>Join the Smart Community!!</h1>
                    </div>
                    <div className='social-card-cont'>
                        <div className='social-card-row'>
                            <div className='social-card'>
                                <div className='social-img'>
                                    <img src={fb} />
                                </div>
                                <div className='social-details'>
                                    <h1>Follow us on Facebook</h1>
                                    <p>Join us here, we post informative stuff daily</p>
                                </div>
                                <button>Visit</button>
                            </div>
                            <div className='social-card'>
                                <div className='social-img'>
                                    <img src={yt} />
                                </div>
                                <div className='social-details'>
                                    <h1>Subscribe to our youtube channel</h1>
                                    <p>Join us here, we post informative stuff daily</p>
                                </div>
                                <button>Visit</button>
                            </div>
                        </div>
                        <div className='social-card-row'>
                            <div className='social-card'>
                                <div className='social-img'>
                                    <img src={ig} />
                                </div>
                                <div className='social-details'>
                                    <h1>Follow us on Instagram</h1>
                                    <p>Join us here, we post informative stuff daily</p>
                                </div>
                                <button>Visit</button>
                            </div>

                            <div className='social-card'>
                                <div className='social-img'>
                                    <img src={li} />
                                </div>
                                <div className='social-details'>
                                    <h1>Follow us on LinkedIn</h1>
                                    <p>Join us here, we post informative stuff daily</p>
                                </div>
                                <button>Visit</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default SmartCommunity