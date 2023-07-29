import React, { useState, useEffect, useContext } from 'react'
import ProductCard from '../components/ProductCard';
import { CartContext } from '../CartContext';
import { useParams } from 'react-router-dom'


const Category = () => {
    // const { name } = useContext(CartContext) 

    const [products, setProducts] = useState(null);
    let { cat } = useParams()


    const getProducts = async () => {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/products/${cat}`, {
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
        if (cat === 'home&living') {
            cat = 'living';
        }
        getProducts()
    }, [cat])

    return (
        <div className="container py-4 pt-70 min-vh-100">
            <h4 className="fw-bold text-center text-capitalize p-2">{cat} collection</h4>

            <div className="row">
                {products ?
                    products.map(product => <ProductCard key={product._id} product={product} />) : <div className="h-box d-flex align-items-center justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Category
