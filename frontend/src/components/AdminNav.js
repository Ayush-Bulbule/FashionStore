import React from 'react'
import { Link } from 'react-router-dom'

const AdminNav = () => {
    return (
        <div className="admin-nav py-2 p-3">
            <ul className="container my-0 d-flex align-items-center justify-content-evenly" id="ad-nav">
                <li>
                    <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/add">AddProducts</Link>
                </li>
                <li>
                    <Link to="/admin/manage">ManageProducts</Link>
                </li>
                <li>
                    <Link to="/admin/orders">ManageOrders</Link>
                </li>
            </ul>
        </div >
    )
}

export default AdminNav
