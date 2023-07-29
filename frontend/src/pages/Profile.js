import React, { useState, useContext } from 'react'
import { CartContext } from '../CartContext'
import { Link, useHistory } from 'react-router-dom'


const Profile = () => {

    const { user, setUser } = useContext(CartContext)
    const history = useHistory();

    const logOut = () => {
        setUser(null);
        window.localStorage.removeItem("user");
        history.push('/login')
    };

    return (
        <div className="container-fluid box" style={{ backgroundColor: "#f5f5f6" }}>
            <div className="row py-4 d-flex pt-70 align-items-center justify-content-center">
                <div className="col-lg-8 col-md-10 col-12 shadow-sm rounded p-sm-4 " style={{ backgroundColor: "#fff" }}>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <img src="/images/personal-info.png" className="img-fluid" alt="profile" />
                        </div>
                        <div className="col-md-6 col-12 py-2 p-4">
                            <h4>Your Profile</h4>
                            <p><b>Name: </b>{user.name} </p>
                            <p><b>Email: </b>{user.email} </p>
                            <p><b>Address: </b>{user.address} </p>
                            <div className="d-flex justify-content-between align-items-center">
                                <button onClick={logOut} className="my-4 btn-logout">Logout</button>
                                <Link className="my-4 btn-ordr" to="/orders">My Orders</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
