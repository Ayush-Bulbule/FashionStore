import React, { useState, useEffect, } from 'react'
import { useHistory } from 'react-router-dom'

const PaymentGatway = () => {
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const history = useHistory();

    const makePayment = () => {
        setTimeout(() => {
            history.push("/orders");
        }, 6000);
    }

    useEffect(() => {
        makePayment();
    }, [])
    return (

        <div className="container box py-4 pt-70  d-flex flex-column align-items-center justify-content-lg-center">
            <img src="/images/payment.svg" alt="pament-processing" className="img-fluid w-50 mx-auto" />
            <h6>Payment Processing... </h6>
            <div className="loader d-flex">
                <div class="spinner-grow spinner-grow-sm " role="status">
                    <span class="visually-hidden">Loading...</span>
                </div><div class="spinner-grow spinner-grow-sm mx-3" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div><div class="spinner-grow spinner-grow-sm " role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>

        </div>
    )
}

export default PaymentGatway
