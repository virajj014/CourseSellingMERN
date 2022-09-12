import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print'
import './PrintInvoice.css'
import axios from 'axios';
import Cookies from 'js-cookie';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PrintInvoice = () => {
    const ref = useRef();
    const { invoice_id } = useParams();

    const user = Cookies.get("user");
    const emailUser = JSON.parse(user).email;
    const [invoices, setInvoices] = useState([]);

    useEffect(() => {
        axios.get(`/invoice/invoice/_id/${invoice_id}`).then((response) => {
            console.log(response.data)
            setInvoices(response.data[0]);
        }).catch((e) => {
            toast.error(e, {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                theme: 'colored'
            });
        })

    }, [invoice_id])

    console.log(invoices)
    
    var sgst_amt = (invoices.amount / 100) * invoices.sgst;
    console.log(sgst_amt)

    var cgst_amt = (invoices.amount / 100) * invoices.cgst;
    console.log(cgst_amt)

    var total_tax = invoices.sgst+invoices.cgst;
    console.log(total_tax)

    var total_tax_amt = sgst_amt+cgst_amt;
    console.log(total_tax_amt)

    var sub_total = invoices.amount- (total_tax_amt ? total_tax_amt : 0);
    console.log(sub_total)

    var total_amt = sub_total+ (total_tax_amt ? total_tax_amt : 0);
    console.log(total_amt)


    console.log(invoice_id)
    return (
        <>
            <ReactToPrint trigger={() => <button className='btn btn-outline-success mt-5 mx-5' >Print/Download</button>}
                content={() => ref.current} />
            <div ref={ref} className='p-5 bg-white rounded shadow-lg text-dark mx-5 my-4'>
                <header className=' item-center justify-center mb-5'>
                    <div className='d-flex item-center justify-center'>
                        <h1>Invoice</h1>
                    </div>
                </header>
                <section className='flex flex-col items-end justify-end m-3'>
                    <label>Smart Educates</label>
                    <label>SmartEducates Pvt. Ltd.</label>
                    <label>Regd. Add: 118C, G/F KH NO-5/18</label>
                    <label>SAINIK ENCLAVE, D-BLK</label>
                    <label>NEAR CRPF CAMP, Delhi-110043</label>
                    <label>GSTIN: 07AAJCB0091Q1ZA</label>
                    <label>State Name: Delhi, Code : 07</label>
                    <label>PAN: AAJCB0091Q</label>
                </section>
                <section className='flex flex-col items-start justify-start m-2 p-3  border rounded'>
                    <label>Invoice Number : <b> #{invoices.invoice_number}</b></label>
                    <label>Invoice Date :<b> {new Date(invoices.createdAt).toLocaleString()}</b></label>
                    <label>Status :<b> {invoices.status}</b></label>
                </section>
                <section className='flex flex-col items-start justify-start m-3'>
                    <h5>Invoice To: </h5>
                    <label>Client's Name: <b>{invoices.client_name}</b></label>
                    <label>Client's Address: <b>{invoices.client_address} </b></label>
                    <label>Phone Number: <b>{invoices.client_contact_number}</b></label>
                </section>

                <table width="100%" className='py-2 my-3'>
                    <thead>
                        <tr className='bg-gray-100'>
                            <th colSpan={3}>Description</th>
                            <th colSpan={2}>Quantity</th>
                            {/* <th colSpan={2}>HSN/SAC</th> */}
                            <th>Amount</th></tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={3}>{invoices.course_name}</td>
                            <td colSpan={2}>{invoices.quantity}</td>
                            {/* <td colSpan={2}>999293</td> */}
                            <td><b>₹{invoices.amount}</b></td>
                        </tr>
                        <tr className='bg-gray-100'>
                            <td colSpan={5}>Sub Total:	</td>
                            <td><b>₹{sub_total}</b></td>
                        </tr>
                        {
                            invoices.cgst || invoices.sgst 
                            ?
                            <tr>
                            <td>Tax: <b>{total_tax}%</b></td>
                            <td>CGST:<b> {invoices.cgst}%</b></td>
                            <td>CGST Amt: <b>₹{cgst_amt}</b></td>
                            <td>SGST: <b>{invoices.sgst}%</b></td>
                            <td>SGST Amt:<b> ₹{sgst_amt}</b></td>
                            <td><b>₹{total_tax_amt}</b></td>
                        </tr>
                            :
                             ''
                        }
                        
                    </tbody>
                    <tfoot>
                        <tr className='bg-gray-100'>
                            <td colSpan={5}>Total:</td>
                            <td><b>₹{total_amt}</b></td>
                        </tr>
                    </tfoot>
                </table>

                <div className=' p-2 border '>
                    <p className='text-center'>We declare that this invoice shows the actual price of the goods/ services described and that all particulars are true and correct.</p>
                </div>
                <section className='d-flex item-center justify-center border p-2 '>
                    <h5>This is a Computer Generated Invoice No Signature Required.</h5>
                </section>
                <section>
                    <h6 className='d-flex item-center justify-center border p-2'>Generated on &nbsp;&nbsp;<i><b> {new Date().toLocaleString()}</b></i></h6>
                </section>
            </div>
            <ToastContainer />
        </>
    )
}

export default PrintInvoice