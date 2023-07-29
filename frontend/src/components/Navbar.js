import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { BsPerson } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";
import { CartContext } from '../CartContext'
import { useHistory } from 'react-router-dom'


const Navbar = () => {

    const { cart, user } = useContext(CartContext)
    const [query, setQuery] = useState()
    const history = useHistory();

    const searchProduct = async (e) => {
        history.push(`/search/${query}`)
    }
    return (

        <div>
            <header className="p-3 bg-light fixed-top text-dark shadow-b-sm" id="navbar" >
                <div className="px-4">
                    <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                        <Link to="/" className="navbar-brand text-dark fw-bold display-5 d-flex align-items-center justify-content-center" href="#">
                            <img src="/images/logo.jpg" alt="logo" width="35" height="35" className="d-inline-block align-text-top" />
                            FashionStore
                        </Link>

                        <ul className="nav col-12 col-lg-auto ms-3 me-lg-auto mb-2 justify-content-center mb-md-0">
                            <li><Link to="/category/mens" className="nav-link px-2 text-dark">Men</Link></li>
                            <li><Link to="/category/womens" className="nav-link px-2 text-dark">Women</Link></li>
                            <li><Link to="/category/kids" className="nav-link px-2 text-dark">Kids</Link></li>
                            <li><Link to="/category/home&living" className="nav-link px-2 text-dark">Home&Living</Link></li>
                            <li><Link to="/category/sports " className="nav-link px-2 text-dark">Sports</Link></li>
                        </ul>

                        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 search-field" onSubmit={searchProduct}>
                            <button><FaSearch style={{ color: "#757575" }} /></button>
                            <input type="text" placeholder="Search for products" aria-label="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
                        </form>

                        <div className="text-end d-flex flex-row">
                            <Link to="/cart" className=" px-2 position-relative text-dark text-decoration-none d-flex flex-column align-items-center justify-content-center"><BiCart style={{ fontSize: 1.5 + "rem" }} /><span style={{ fontSize: .8 + "rem", fontWeight: 600 }}>Cart</span>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cart ? (cart.totalItems ? cart.totalItems : 0) : 0}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </Link>
                            {
                                user ?
                                    <Link to="/profile" className=" px-2 ms-2 text-dark text-decoration-none d-flex flex-column align-items-center justify-content-center"><BsPerson style={{ fontSize: 1.5 + "rem" }} /><span style={{ fontSize: .8 + "rem", fontWeight: 600 }}>Profile</span> </Link>
                                    :
                                    <Link to="/login" className=" px-2 ms-2 text-dark text-decoration-none d-flex flex-column align-items-center justify-content-center"><BsPerson style={{ fontSize: 1.5 + "rem" }} /><span style={{ fontSize: .8 + "rem", fontWeight: 600 }}>Login</span> </Link>
                            }
                        </div>
                    </div>
                </div>
            </header>
        </div >

    )
}

export default Navbar
