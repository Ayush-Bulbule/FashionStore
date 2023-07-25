import React from 'react'
import { Link } from 'react-router-dom'

const AdminRoute = () => {
    return (
        <div>
            <div className="nav">
                <ul>
                    <li><Link to="/admin/orders" >DashBoard</Link></li>
                    <li><Link to="/admin/orders" >Manage Orders</Link></li>
                    <li><Link to="/admin/orders" >Manage Orders</Link></li>
                    <li><Link to="/admin/orders" >Manage Orders</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default AdminRoute
