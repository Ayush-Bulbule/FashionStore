import React, { useState, useEffect, useContext } from 'react'
import ProductCard from '../components/ProductCard';
import { CartContext } from '../CartContext';
import { useParams } from 'react-router-dom'


const Search = () => {

    const [products, setProducts] = useState(null);
    let { query } = useParams()

    // const { searchRes } = useContext(CartContext);


    const searchProduct = async () => {
        console.log(query)
        const res = await fetch(`${process.env.REACT_APP_API_KEY}/search`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                searchitem: query
            })
        })
        const data = await res.json();
        console.log(data)
        if (res.status === 400 || !data) {
            // window.alert("No Results");
            setProducts(null)
        } else {
            setProducts(data)
            // window.alert("Many Results");
        }
    }

    useEffect(() => {
        searchProduct()
    }, [])

    return (
        <div className="min-vh-100 container py-4 pt-70 box">
            <h4 className="fw-bold text-center text-capitalize p-2">Search Results for "{query}"</h4>
            <div className="row">
                {products ?
                    products.map(product => <ProductCard key={product._id} product={product} />)
                    :
                    <div className="h-box d-flex align-items-center justify-content-center">
                        <h4>No Results</h4>
                    </div>
                }
            </div>

        </div>
    )
}

export default Search
