import React, { useContext, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { CartContext } from '../CartContext'
import moment from 'moment'

const CustomerOrders = () => {
    let total = 0
    const { user, cart, setCart } = useContext(CartContext)
    const [orders, setOrders] = useState(null)

    const history = useHistory();


    const getOrders = async () => {
        if (!user) {
            console.log("No User")
            return
        }
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/get-order`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                customerId: user.id
            })

        }).then(res => {
            console.log(res)
            return res.json()
        }
        ).then(products => {
            console.log(products)
            setOrders(products)
        })
        console.log(orders)

    }

    useEffect(() => {
        getOrders();
    }, [user])

    return (
        <div className=" box container mt-3 pt-70 min-vh-100">
            <h5>My Orders</h5>
            <table className="table">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 text-left">Order Id</th>
                        <th className="border px-4 py-2 text-left">Status</th>
                        <th className="border px-4 py-2 text-left">Address</th>
                        <th className="border px-4 py-2 text-left">Placed at</th>
                    </tr>
                </thead>
                <tbody id="orderTableBody">
                    {
                        orders ?
                            orders.map(product => {
                                return (
                                    <tr key={product._id}>
                                        <td className="border px-4 py-2 text-left fw-bold">
                                            <Link className="link" to={`order/${product._id}`}>
                                                {product._id}
                                            </Link>
                                        </td>
                                        <td className="border px-4 py-2 text-left text-capitalize">
                                            {product.status}
                                        </td>
                                        <td className="border px-4 py-2 text-left">
                                            {product.address}
                                        </td>
                                        <td className="border px-4 py-2 text-left">
                                            {moment(product.createdAt).format('hh:mm A DD/MM')}
                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <tr>
                                <td className="w-100">
                                    <div className="h-box d-flex align-items-center justify-content-center" >
                                        <div className="spinner-border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>
                                    <p>Loading...</p>
                                </td>
                            </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default CustomerOrders

