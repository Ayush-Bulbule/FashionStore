import React, { useContext, useState, useEffect } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa'
import { CartContext } from '../CartContext'
import { Link, useHistory } from 'react-router-dom'

const CustomerCart = () => {
    let total = 0
    const { user, cart, setCart } = useContext(CartContext)
    const [products, setProducts] = useState(1)

    const history = useHistory();

    const [priceFetched, setPriceFetched] = useState(false)

    const getProduct = async () => {
        if (!cart.items) {
            return
        }
        if (priceFetched) {
            return
        }
        console.log(JSON.stringify({ ids: Object.keys(cart.items) }))

        const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/cart-items `, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: Object.keys(cart.items) })

        }).then(res => res.json())
            .then(products => {
                console.log(products)
                setProducts(products)
                setPriceFetched(true);
            })
        // console.log(response)
        // const data = await response.json()
        // console.log(data)
        // setProducts(data);
    }

    useEffect(() => {
        getProduct();
    }, [cart])

    const getQty = (productId) => {
        return cart.items[productId]
    }

    const increament = (productId) => {
        const existingQty = cart.items[productId];
        const _cart = { ...cart }
        _cart.items[productId] = existingQty + 1;
        _cart.totalItems += 1;
        setCart(_cart);
    }
    const decreament = (productId) => {
        const existingQty = cart.items[productId];
        if (existingQty === 1) {
            return
        }
        const _cart = { ...cart }
        _cart.items[productId] = existingQty - 1;
        _cart.totalItems -= 1;
        setCart(_cart);
    }


    const getSumPrice = (productId, price) => {
        const sum = price * getQty(productId);
        // total + sum;
        total += sum;
        return sum
    }

    const handleDelete = (productId) => {
        const _cart = { ...cart }
        const qty = _cart.items[productId]
        delete _cart.items[productId]

        _cart.totalItems -= qty;

        setCart(_cart);
        const updatedProductsList = products.filter((product) => product._id !== productId)
        setProducts(updatedProductsList)
    }


    const handleOrder = async () => {
        console.log(products)
        console.log(user.id)

        const newProduct = [];

        products.forEach(element => {
            newProduct.push({
                item: element,
                qty: getQty(element._id)
            })
        });
        console.log(process.env.REACT_APP_API_KEY)


        const res = await fetch(`${process.env.REACT_APP_API_KEY}/store-order`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                customerId: user.id,
                items: newProduct,
                address: user.address,

            })
        })



        console.log(res)
        const data = await res.json();
        if (res.status === 400 || !data) {
            window.alert("Something Went wrong")
        } else {
            window.localStorage.removeItem("cart");
            setProducts([])
            setCart({});
            history.push('/payment')
            window.alert("Order Placed Successfully")
            console.log(data)
            console.log(products.length)
        }
    }

    //
    // setCart({})



    return (
        products ? (
            (products.length > 0) ?
                <div className="container min-vh-100 pt-70 box py-4 pt-5">
                    <h5 className="fw-bold">Cart Items</h5>
                    <ul>
                        {
                            products.map(product => {
                                return (
                                    <li key={product._id}>
                                        <div className="row mx-5 d-flex align-items-center justify-content-between py-3">
                                            <div className="col-6 d-flex align-items-center">
                                                <div className="product-img-box d-flex align-items-center justify-content-center" style={{ height: 100 + "px" }} >
                                                    <img src={`${process.env.REACT_APP_API_KEY}/${product.image}`} className="product-img img-fluid" alt="ProductImage" style={{ height: 100 + "px" }} />
                                                </div>
                                                <div className="cart-ctext ps-3">
                                                    <p>{product.name}</p>
                                                </div>
                                            </div>
                                            <div className="col-2 cart-quantity">
                                                <button onClick={() => decreament(product._id)} className="cart-qty-btn">-</button>
                                                <b className="px-3">{getQty(product._id)}</b>
                                                <button onClick={() => increament(product._id)} className="cart-qty-btn">+</button>
                                            </div>
                                            <span className="col-2 text-center cart-price fs-6 fw-bold">${getSumPrice(product._id, product.price)}</span>
                                            <div className="col-2">
                                                <button className="cart-del-btn" onClick={() => handleDelete(product._id)}>Delete</button>
                                            </div>
                                        </div>
                                    </li>

                                )
                            })
                        }
                    </ul>
                    <hr />
                    <div className="g-total-box text-end">
                        <b>Grand Total:</b> ${total}
                    </div>
                    <div className="text-end mt-4">
                        {
                            (user === null || !user) ?
                                <div>
                                    <Link to="/login" className="login-btn d-inline-block">Go to Login</Link>
                                    <p className="note-text">*You need to login before you checkout order!</p>
                                </div>
                                :
                                <button onClick={handleOrder} className="cart-ordr-btn">Order Now</button>
                        }
                    </div>
                </div >
                :
                <div className="container py-4 d-flex flex-column align-items-center justify-content-lg-center">
                    <img src="/images/cart.png" alt="empty-cart" className="img-fluid w-50 mx-auto" />
                    <h6>Your Cart is Empty! </h6>
                    <Link className="my-4 back-btn" to="/">Back to Home</Link>
                </div>

        ) :

            <div className="container h-box d-flex align-items-center justify-content-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
    )
}

export default CustomerCart
