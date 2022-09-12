import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Affiliate.css'

const AffiliateSidebar = () => {
    const location = useLocation();

    return (
        <div className="affiliate-side">

            <Link style={{ textDecoration: 'none' }} to='/affiliate-dashboard'><h1 >Affiliate Panel</h1></Link>
            <div className="affiliate-sidebar-content">
                <Link style={{ textDecoration: 'none' }} to='/affiliate-dashboard'><p className={location.pathname == '/affiliate-dashboard' ? 'active' : ''}>Dashboard</p></Link>

                <Link style={{ textDecoration: 'none' }} to='/affiliate-kyc'><p className={location.pathname == '/affiliate-kyc' ? 'active' : ''}>KYC</p></Link>

                <Link style={{ textDecoration: 'none' }} to='/affiliate-affiliates'><p className={location.pathname == '/affiliate-affiliates' ? 'active' : ''}>Affiliates</p></Link>
                {/* <Link style={{ textDecoration: 'none' }} to='/affiliate-orientation'><p>Orientation Stats</p></Link> */}
                <Link style={{ textDecoration: 'none' }} to='/affiliate-offer'><p className={location.pathname == '/affiliate-offer' ? 'active' : ''}>Offer</p></Link>
                <Link style={{ textDecoration: 'none' }} to='/affiliate-smartcommunity'><p className={location.pathname == '/affiliate-smartcommunity' ? 'active' : ''}>Smart Community</p></Link>
                <Link style={{ textDecoration: 'none' }} to='/affiliate-leaderboard'><p className={location.pathname == '/affiliate-leaderboard' ? 'active' : ''}>Leaderboard</p></Link>
                <Link style={{ textDecoration: 'none' }} to='/affiliate-marketing'><p className={location.pathname == '/affiliate-marketing' ? 'active' : ''}>Marketing Tools</p></Link>
                <Link style={{ textDecoration: 'none' }} to='/affiliate-training'><p className={location.pathname == '/affiliate-training' ? 'active' : ''}>Training </p></Link>
                <Link style={{ textDecoration: 'none' }} to='/affiliate-webinar'><p className={location.pathname == '/affiliate-webinar' ? 'active' : ''}>Webinars</p></Link>
                {/* <Link style={{ textDecoration: 'none' }} to='/affiliate-dashboard'><p>Live QNA</p></Link> */}

            </div>
            <br />
            <div className='sidebar-hr'></div>

            <div className='sidebar-inner'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <Link to='/contact' style={{ textDecoration: 'none', color: 'black' }}><h2>Support</h2></Link>
            </div>
        </div>
    )
}

export default AffiliateSidebar