import React, { useState, useEffect } from 'react'
import moment from "moment"
import CustomSelect from '../../components/CustomSelect';

const Orders = () => {
    const [orders, setOrders] = useState();
    const [orderId, setOrderId] = useState();
    const [selected, setSelected] = useState()
    const [render, setRender] = useState(false)

    const getOrders = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/admin-orders`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
        setOrders(data);
        setRender(true)
    }

    useEffect(() => {
        getOrders();
    }, [render])


    const handleSubmit = async (orderId, status) => {
        console.log(orderId, status)


        const res = await fetch(`${process.env.REACT_APP_API_KEY}/updateOrderStat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status: status,
                orderId: orderId
            })
        })
        const data = await res.json();

        if (res.status === 400 || !data) {
            console.log(data)
            console.log("Error");
        } else {
            console.log(data)
            console.log("changed");
        }
        setRender(false)

    }

    return (
        <div className="container box mt-4">
            <h5>Customer Orders</h5>
            <div className="order-section box">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="border px-4 py-2 text-left">Orders</th>
                            <th className="border px-4 py-2 text-left">Customer</th>
                            <th className="border px-4 py-2 text-left">Address</th>
                            <th className="border px-4 py-2 text-left">Status</th>
                            <th className="border px-4 py-2 text-left">Placed at</th>
                        </tr>
                    </thead>
                    <tbody id="orderTableBody">
                        {
                            orders ?
                                orders.map(order =>
                                    <tr>
                                        <td className="border px-4 py-2 text-left">
                                            <p>{order._id}</p>
                                        </td>
                                        <td className="border px-4 py-2 text-left">{order.customerId.email}</td>
                                        <td className="border px-4 py-2 text-left">{order.address}</td>
                                        <td className="border px-4 py-2 text-left">
                                            <div className="inline-block relative w-64">
                                                <CustomSelect value={order.status} orderId={order._id} handleChange={handleSubmit} />
                                            </div>
                                        </td>
                                        <td className="border px-4 py-2 text-left">{moment(order.createdAt).format('hh:mm A')}</td>
                                    </tr>
                                ) :
                                <tr>
                                    <td> No Ordersw</td>
                                </tr>


                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Orders
