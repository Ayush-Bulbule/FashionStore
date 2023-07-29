import React from 'react'
import { Link } from 'react-router-dom'
import { MdAddShoppingCart } from 'react-icons/md'


const ProductCard = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none", color: "#000" }} className="col-lg-3 col-md-4 col-sm-6 col-10 d-flex felx-column justify-content-end mb-3">

            <div className="card product-card h-100">
                <div className="product-img-box d-flex align-items-center justify-content-center" style={{ height: 210 + "px" }} >
                    <img src={`${process.env.REACT_APP_API_KEY}/${product.image}`} className="product-img img-fluid" alt="ProductImage" style={{ height: 180 + "px" }} />
                </div>
                <div className="card-body product-info">
                    <h3 className="card-title">
                        {product.name}
                    </h3>
                    <p className="card-text">
                        {product.description}
                    </p>
                </div>
                <div
                    className="pb-2 px-3 d-flex align-items-center flex-shrink-1 justify-content-between">
                    <h5>$ 49
                    </h5>
                    <button data-product="<%= JSON.stringify(product)%>"
                        className="btn-add-cart"><MdAddShoppingCart /></button>
                </div>
            </div>
        </Link>

    )
}

export default ProductCard
