import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { CartContext } from '../CartContext';
import moment from "moment"

const TrackOrder = () => {
    const { user } = useContext(CartContext)
    const [order, setOrder] = useState();
    const [image, setImage] = useState('/images/processingordr.jpg')
    const [state, setState] = useState(document.readyState)
    const param = useParams();



    const getSingleOrder = async () => {
        if (!user) {
            console.log("No User")
            return
        }
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/getSingleOrder`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "customerId": user.id,
                "orderId": param.orderid
            })

        }).then(res => {
            console.log(res)
            return res.json()
        }
        ).then(products => {
            console.log(products)
            setOrder(products)
        })
        console.log(order)

    }

    const updateStatus = () => {
        if (document.readyState === 'complete') {
            // The page is fully loaded
            const li1 = document.getElementById("1");
            const li2 = document.getElementById("2");
            const li3 = document.getElementById("3");
            const li4 = document.getElementById("4");

            if (!order) {
                return
            }

            if (order.status === "processing") {
                setImage("/images/processingordr.jpg")
                console.log(li1)
                li1.classList.add("is-active")
            } else if (order.status === "shipped") {
                setImage("/images/shipped.jpg")
                li1.classList.remove("is-active")
                li2.classList.add("is-active")
                console.log("Shipped")
            } else if (order.status === "transit") {
                setImage("/images/transit.svg")
                li2.classList.remove("is-active")
                li3.classList.add("is-active")
            } else {
                setImage("/images/delivered.jpg")
                li3.classList.remove("is-active")
                li4.classList.add("is-active")
                console.log("delivered")
            }
        }


    }

    useEffect(() => {
        getSingleOrder();
        updateStatus();
    }, [user])

    useEffect(() => {
        updateStatus();
    }, [state, order])

    return (
        <div className="container pt-70 box py-3 d-flex flex-column align-items-center">
            <div className="d-flex justify-content-around w-100">
                <p className="orderid">{order ? order._id : "Loading"}</p>
                <p className="updatedat">{order ? moment(order.updatedAt).format('hh:mm A DD/MM') : "loading"}</p>
            </div>
            <img src={image} alt="track-image" className="w-50 h-50" />
            <p className="text-capitalize fw-bold">{order ? order.status : "Loading"}</p>
            <br /><br />
            <ul className="list-unstyled multi-steps">
                <li id="1">Processing</li>
                <li id="2">Shipped</li>
                <li id="3">In Transit</li>
                <li id="4">Delivered</li>
            </ul>
        </div>
    )
}

export default TrackOrder
