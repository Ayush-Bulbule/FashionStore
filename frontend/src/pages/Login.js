import React, { useState, useContext, useEffect } from 'react'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import jwtDecode from "jwt-decode"
import { CartContext } from '../CartContext'

const Login = () => {

    const { user, setUser } = useContext(CartContext)
    const history = useHistory();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_API_KEY}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        const data = await res.json();

        if (res.status === 400 || !data) {
            console.log(data)
            window.alert("Invalid Credentails")
        } else {
            window.alert("Login Successfully!")
            console.log(data)
            const user = jwtDecode(data.data);
            setUser(user)
            console.log(user)
            history.push("/")
        }
    }

    useEffect(() => {
        if (user) {
            if (user.email) {
                if (user.role === "admin") {
                    history.push("/admin")
                }
                history.push("/profile")
            }
        }
    }, [])

    return (
        <div className="container-fluid  h-80 box pt-5" style={{ backgroundColor: "#f5f5f6" }}>
            <div className="row py-4 d-flex align-items-center justify-content-center">
                <div className="col-lg-8 col-md-10 col-12 shadow-sm rounded p-sm-4 " style={{ backgroundColor: "#fff" }}>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <img src="/images/login.png" className="img-fluid" alt="img-login" />
                        </div>
                        <div className="col-md-6 col-12 py-2 p-4">
                            <h4>Log In</h4>
                            <form method="post" className="form-auth ">
                                <div className="mt-3 auth-input">
                                    <FaEnvelope style={{ color: "#757575" }} />
                                    <input type="text" name="email" id="inpname" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mt-3 auth-input">
                                    <FaLock style={{ color: "#757575" }} />
                                    <input type="text" name="password" id="inpname" placeholder="Password**" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button className="btn-login-form btn-style" onClick={loginUser}>Login</button>
                            </form>
                            <Link to="register" className="text-decoration-none pt-4 d-inline-block">Not Have Account? Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
