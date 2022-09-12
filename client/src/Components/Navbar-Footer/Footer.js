import React from 'react'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { MDBFooter } from 'mdb-react-ui-kit';
import fullogo from '../photos/logofull.png'
import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className="footer-outer">
            <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>
                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                    <div className='me-5 d-none d-lg-block' style={{ color: 'white' }}>
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href='' className='me-4 text-reset' >
                            <i className='fab fa-facebook-f' style={{ color: 'white' }}></i>
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <i className='fab fa-twitter' style={{ color: 'white' }}></i>
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <i className='fab fa-google' style={{ color: 'white' }} ></i>
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <i className='fab fa-instagram' style={{ color: 'white' }} ></i>
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <i className='fab fa-linkedin' style={{ color: 'white' }}></i>
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <i className='fab fa-github' style={{ color: 'white' }}></i>
                        </a>
                    </div>
                </section>


                <div className='myfooter'>
                    <div className='section-1'>
                        <img src={fullogo} className='footerimg' />
                        <p>Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    </div>
                    <div className='sub-section'>
                        <div className='section-2'>
                            {/* <div>
                                <h1>Products</h1>
                                <a>Angular</a>
                                <a>React</a>
                                <a>Vue</a>
                                <a>Laravel</a>
                            </div> */}

                            <div>
                                <h1>Useful Links</h1>
                                <Link to='/' style={{ textDecoration: 'none', color: 'grey' }}><a>Home</a></Link>
                                <Link to='/courses' style={{ textDecoration: 'none', color: 'grey' }}><a>Course</a></Link>
                                <Link to='/contact' style={{ textDecoration: 'none', color: 'grey' }}><a>Contact Us</a></Link>
                                <Link to='/about' style={{ textDecoration: 'none', color: 'grey' }}><a>About us</a></Link>
                                <Link to='/privacy-policy' style={{ textDecoration: 'none', color: 'grey' }}><a>Privacy Policy</a></Link>
                            </div>
                        </div>
                        <div className='section-3'>

                            <h1>Contact</h1>
                            <p>
                                <i className='fas fa-home me-3'></i>Jabalpur(482002), Madhya Pradesh, India
                            </p>
                            <p>
                                <i className='fas fa-envelope me-3'></i>
                                1999anilrajak@gmail.com
                            </p>
                            <p>
                                <i className='fas fa-phone me-3'></i>+91 8839280515
                            </p>
                            {/* <p>
                                <i className='fas fa-print me-3'></i> + 01 234 567 89
                            </p> */}

                        </div>
                    </div>

                </div>


                <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2022 Copyright:&nbsp;
                    <a className='text-reset fw-bold' href='https://smarteducates.in/'>
                        Smarteducates.in
                    </a>
                </div>
            </MDBFooter>
        </div>
    )
}

export default Footer