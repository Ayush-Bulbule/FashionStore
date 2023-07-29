import React, { useState, useEffect, useContext } from 'react'
import { CartContext } from '../CartContext';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa'

const Products = () => {
    // const { name } = useContext(CartContext) 

    const [products, setProducts] = useState(null);

    const param = useParams();
    const history = useHistory();

    const getProduct = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/api/product/${param._id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        console.log(response)
        const data = await response.json()
        console.log(data)
        setProducts(data);
    }


    const { cart, setCart } = useContext(CartContext);

    const addToCart = (e) => {
        e.preventDefault()

        let _cart = { ...cart };

        if (!_cart.items) {
            _cart.items = {}
        }
        if (_cart.items[products[0]._id]) {
            _cart.items[products[0]._id] += 1
        } else {
            _cart.items[products[0]._id] = 1
        }
        if (!_cart.totalItems) {
            _cart.totalItems = 0;
        }
        _cart.totalItems += 1;

        setCart(_cart)
        window.alert("Item Added to cart Successfully!")

    }
    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className="container pt-70 box">
            <button className="my-4 back-btn" onClick={() => { history.goBack() }}><FaArrowLeft /> <span className="ms-2">Back</span></button>
            {products ?
                <div className="row mt-3 mb-5">
                    <div className="col-lg-4 col-md-4 col-sm-6 p-3">
                        <img src={`${process.env.REACT_APP_API_KEY}/${products[0].image}`} alt="product-image" className="img-fluid px-5" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-12 me-auto">
                        <h2 className="fw-bold">{products[0].name}</h2>
                        <p>{products[0].description}</p>
                        <p>Category: {products[0].category}</p>
                        <p>Rating: {products[0].rating}</p>
                        <h5 className="my-3">Price: ${products[0].price}</h5>

                        <Link className="btn-add-tocart" onClick={addToCart}>Add to Cart</Link>
                    </div>
                </div>
                :
                <div className="h-box d-flex align-items-center justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            }
        </div>
    )
}

export default Products
