import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaUser, FaLocationArrow, FaUserLock } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'

const Register = () => {
    const history = useHistory();
    const [user, setUser] = useState(
        {
            name: "",
            email: "",
            address: "",
            password: ""
        }
    )

    let name, value, repeatPassword;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        repeatPassword = e.target.repeatPassword;
        setUser({
            ...user, [name]: value
        })
    }

    const registerUser = async (e) => {
        e.preventDefault();

        const { name, email, address, password } = user;

        const res = await fetch(`${process.env.REACT_APP_API_KEY}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, address, password
            })
        })
        const data = res.json();

        if (res.status === 400 || !data || res.status === 422) {
            console.log(data)
            window.alert("Invalid Credentails")
        } else {
            window.alert("Registration Successfull!")
            history.push("/login")
        }
        console.log(data)
    }

    return (
        <div className="container-fluid box pt-5" style={{ backgroundColor: "#f5f5f6" }}>
            <div className="row py-4 d-flex align-items-center justify-content-center">
                <div className="col-lg-8 col-md-10 col-12 shadow-sm rounded p-sm-4 " style={{ backgroundColor: "#fff" }}>
                    <div className="row">

                        <div className="col-md-6 col-12 py-2 p-4">
                            <h4 style={{ fontWeight: 800 }}>Register</h4>
                            <form method="post" className="form-auth ">
                                <div className="mt-3 auth-input">
                                    <FaUser style={{ color: "#757575" }} />
                                    <input type="text" className='w-full' name="name" id="inpname" placeholder="Name" value={user.name} onChange={handleInputs} />
                                </div>
                                <div className="mt-3 auth-input">
                                    <FaEnvelope style={{ color: "#757575" }} />
                                    <input type="text" className='w-full' name="email" id="inpname" placeholder="Email" value={user.email} onChange={handleInputs} />
                                </div>
                                <div className="mt-3 auth-input">
                                    <FaLocationArrow style={{ color: "#757575" }} />
                                    <input type="text" className='w-full' name="address" id="inpname" placeholder="Address" value={user.address} onChange={handleInputs} />
                                </div>
                                <div className="mt-3 auth-input">
                                    <FaLock style={{ color: "#757575" }} />
                                    <input type="password" className='w-full' name="password" id="inpname" placeholder="Password**" value={user.password} onChange={handleInputs} />
                                </div>
                                <div className="mt-3 auth-input">
                                    <FaUserLock style={{ color: "#757575" }} />
                                    <input type="password" className='w-full' name="password" id="inpname" placeholder="Confirm Password**" value={user.password} onChange={handleInputs} />
                                </div>
                                <button className="btn-login-form btn-style btn-register-form" onClick={registerUser}>Register</button>
                            </form>
                            <Link to="login" className="text-decoration-none pt-4 d-inline-block">Already Have an Account? Login</Link>
                        </div>
                        <div className="col-md-6 col-12">
                            <img src="/images/register.png" className="img-fluid" alt="register" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register

