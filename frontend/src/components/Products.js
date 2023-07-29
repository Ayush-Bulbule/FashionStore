import React, { useState, useEffect, useContext } from 'react'
import ProductCard from './ProductCard'
import { CartContext } from '../CartContext';

const Products = () => {
    // const { name } = useContext(CartContext) 

    const [products, setProducts] = useState(null);
    console.log(`${process.env.REACT_APP_API_KEY}/api`);

    const getProducts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/api`, {
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

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="container">
            <div className="my-4"><h4>Products</h4></div>
            <div className="row">
                {products ?
                    products.map(product => <ProductCard key={product._id} product={product} />) :
                    <div className="h-box h-80  d-flex align-items-center justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p>Loading...</p>
                    </div>
                }
            </div>
        </div>
    )
}

export default Products
