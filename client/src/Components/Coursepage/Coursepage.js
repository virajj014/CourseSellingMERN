import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Coursepage.css'
import './Videocard.css'
import Videocard from './Videocard'
import Cookies from 'js-cookie'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilState } from 'recoil'
import { videoatomid } from '../../atoms/currentVideoplaying'
import Productslider from '../product-slider/Productslider'

var videoIndex = 0;
const Coursepage = () => {

    const user = Cookies.get("user");

    if (user == undefined) {
        window.location.href = "/login";
    }
    const emailUser = JSON.parse(user).email;

    const { courseid } = useParams()
    const [selectedCourse, setselectedCourse] = useState();

    let purchased = false;
    const [purchasednow, setpurchasednow] = useState(false);

    useEffect(() => {
        axios.get('/course/course/').then((response) => {
            setselectedCourse(response.data.filter(course => course._id === courseid)[0])
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }, [courseid])

    const [userdetails1, setuserDeatils1] = useState([])
    const [userdetails, setuserDeatils] = useState([])
    const [invoices, setInvoices] = useState([]);
    useEffect(() => {
        axios.get(`/enroll/enroll/email/${emailUser}`).then((response) => {
            setuserDeatils1([response.data[0].purchased_course][0])
            setuserDeatils(response.data[0])
        }).catch((e) => {

            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })
    }, [emailUser]);


    // var eEmail = "";
    // var eName = "";

    const [referredByState, setReferredByState] = useState();



    useEffect(() => {
        userdetails.referredCode ?
            axios.get(`/enroll/enroll/referralCode/${userdetails.referredCode}`).then((response) => {
                setReferredByState(response.data[0])
            }).catch((e) => {
                toast.error(e, {
                    position: "top-center",
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    theme: 'colored'
                });
            })
            :
            setReferredByState([
                {
                    name: '',
                    email: ''
                }
            ])
    }, [userdetails]);

    useEffect(() => {
        axios.get(`/invoice/invoice/`).then((response) => {
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
    }, []);

    selectedCourse?.course_video.sort((a, b) => (a.video_position > b.video_position ? 1 : -1))



    var course_image = `/${selectedCourse?.course_image}`;
    const course_id = selectedCourse?._id;
    var video_data = selectedCourse?.course_video;

    var cp = [];
    for (var i = 0; i < selectedCourse?.course_video.length; i++) {
        cp[i] = `/${selectedCourse?.course_video[i]?.video_path}`;
    }
    userdetails1.filter((val) => {
        if (val.course_id === courseid) {
            purchased = true;
            return val
        }
    })


    let videoaccess = false;
    if (purchased === true) { videoaccess = true }
    else if (purchased === false) { videoaccess = false }
    var index = 0;

    const [playvideoid, setvideoid] = useRecoilState(videoatomid)
    // console.log(userdetails)
    // console.log(selectedCourse)
    console.log(playvideoid)


    const createInvoice = () => {
        var invoNumPlusone;
        var invoiceCount = [];
        // console.log(invoices);

        if (invoices.length == 0) {
            console.log('inside createInvoice => if')
            invoNumPlusone = 1;

        } else {
            console.log('inside createInvoice => else')

            invoices.map((e) => {
                console.log(e.invoice_number);
                invoiceCount.push(e.invoice_number);
            })

            invoiceCount.sort((a, b) => (a > b ? 1 : -1));
            console.log(invoiceCount);

            const invoiceNum = invoices.length - 1;
            const lastInvoiceNumber = invoiceCount[invoiceNum];
            invoNumPlusone = lastInvoiceNumber + 1;
        }

        console.log(userdetails)
        console.log(referredByState)
        axios.post('/invoice/invoice',
            JSON.stringify({
                user_id: userdetails._id,
                referred_by: userdetails.referredCode,
                invoice_number: invoNumPlusone,
                status: "Paid",
                client_name: userdetails.name,
                client_address: userdetails.address + ', ' + userdetails.city + ', ' + userdetails.state,
                client_contact_number: userdetails.mobileNo,
                course_name: selectedCourse.course_name,
                quantity: 1,
                amount: selectedCourse.offer_price ? selectedCourse.offer_price : selectedCourse.course_price,
                cgst: selectedCourse.cgst,
                sgst: selectedCourse.sgst,
                referred_by_name: referredByState.name,
                referred_by_email: referredByState.email
            }), {
            headers: { "Content-Type": "application/json", 'Accept': 'application/json' }
        }).then((response) => {
            console.log(response)
        }).catch((e) => {
            console.log(e)
        });

    }

    const PurchaseCourse = () => {
        // console.log(course_id, emailUser)
        // add payment gaeteway here
        axios.post(`/enroll/buyCourse/${emailUser}/${course_id}`).then((response) => {

            if (response.status === 200) {
                window.alert('Purchased Successfully')
                setpurchasednow(true);
                createInvoice();

            }
        }).catch((e) => { })
        // window.location.reload()
    }

    // console.log(selectedCourse.course_image)
    console.log(selectedCourse)

    const convertdate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    }
    return (
        <>
            <div className='coursepg-outer'>
                {typeof (selectedCourse) == 'object' ?
                    <div className='coursepg-inner'>
                        <div className='s1'>
                            <div className='s1-in'>
                                <img src={`/${selectedCourse.course_image}`} alt='course_image' />

                                <h1>{selectedCourse.course_name}</h1>

                            </div>
                        </div>

                        <div className='s2'>
                            <h2>Course Details</h2>
                            <div className='hrline'></div>

                            <div className='s2-in'>
                                <p>Couse Name : <span>{selectedCourse.course_name}</span></p>
                                <p>Course Author : <span>{selectedCourse.course_author}</span></p>
                                <p>Cousrse Created at : <span>{convertdate(selectedCourse.createdAt)}</span></p>
                            </div>
                            <br />
                            <h2>Course description</h2>
                            <div className='hrline'></div>

                            <div className='s2-in'>
                                {/* <p>{selectedCourse.course_description}</p> */}
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

                                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                            </div>
                            <br />
                            <h2>Course Price</h2>
                            <div className='hrline'></div>
                            {selectedCourse.course_price && selectedCourse.offer_price ?
                                <div className='cop1'>
                                    <p className='cp1'>M.R.P. <span>₹{selectedCourse.course_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>
                                    <p className='op1'>Offer <span>₹{selectedCourse.offer_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>

                                </div>
                                : <div className='cop1'>
                                    <p className='op1'>M.R.P. <span>₹{selectedCourse.course_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</span></p>

                                </div>}

                            <div className='s2-in2'>
                                {purchased || purchasednow === true ?
                                    <p className="purchased">
                                        You have purchased this course
                                    </p> :
                                    <button className='purchase-btn' onClick={PurchaseCourse}>Purchase Now</button>}
                            </div>
                        </div>

                        <h1 className='title'>Course Videos</h1>
                        <div className='s3'>
                            <video src={cp[playvideoid]} controls poster={course_image} width={'100%'} controlsList="nodownload" />
                            <div className='s3-in'>
                                {
                                    cp.map((e) => {
                                        index += 1;
                                        if (index == 1) {
                                            return (
                                                <Videocard videonum={index} vidimg={course_image} title={video_data[index - 1].video_title} description={video_data[index - 1].video_description} videotype='Free' videoaccess={videoaccess} videolink={`${index - 1}`} />
                                            )
                                        } else {
                                            return (
                                                <Videocard videonum={index} vidimg={course_image} title={video_data[index - 1].video_title} description={video_data[index - 1].video_description} videotype={video_data[index - 1].video_type} videoaccess={videoaccess} videolink={`${index - 1}`} />
                                            )
                                        }

                                    })
                                }
                            </div>
                            {/* <button className='claimcertificate'>Claim Certificate</button> */}
                        </div>

                        <Productslider />
                    </div>
                    : <h1>Loading...</h1>}
            </div><ToastContainer /></>
    )
}



export default Coursepage