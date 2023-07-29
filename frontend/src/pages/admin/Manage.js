import React, { useEffect, useState } from 'react'
import FileUploader from '../../components/FileUploader';

const Manage = () => {
    const [products, setProducts] = useState(null);
    const [updated, setUpdated] = useState(false)
    const [selectedImage, setSelectedImage] = useState("")
    const [product, setProduct] = useState({
        name: "",
        description: "",
        category: "mens",
        price: "",
        rating: "",
        stock: ""

    })

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
        setUpdated(false)
    }

    useEffect(() => {
        getProducts()
    }, [updated])

    const handleDelete = async (productId) => {
        const res = await fetch('/admin/deleteProduct', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: productId
            })
        })
        const data = await res.json();

        if (res.status === 400 || !data) {
            console.log(data)
            window.alert("Invalid Credentails")
        } else {
            window.alert("Deleted Successfully!")
            console.log(data)
            setUpdated(true)
        }
    }


    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setProduct({
            ...product, [name]: value
        })
    }
    const handleUpdate = (prod) => {
        console.log(prod)
        setProduct({
            id: prod._id,
            name: prod.name,
            description: prod.description,
            image: prod.image,
            category: prod.category,
            price: prod.price,
            rating: prod.rating,
            stock: prod.stock
        })
        setSelectedImage(prod.image)

    }

    const handleFromSubmit = async (e) => {
        e.preventDefault();
        if (product.name === "" || product.description === "" || product.price === "" || product.rating === "" || product.stock === "") {
            alert("All Feilds must be filled out!");
            return
        }
        const formData = new FormData();
        formData.append("id", product.id);
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("category", product.category);
        formData.append("price", product.price);
        formData.append("rating", product.rating);
        formData.append("stock", product.stock);
        formData.append("cimage", product.image);
        if (selectedImage !== "") {
            console.log("has Image")
            formData.append("uimage", selectedImage)
        }
        console.log(formData)

        const res = await fetch('/admin/updateProduct', {
            method: "POST",
            body: formData
        })
        const data = res.json();

        if (res.status === 400 || !data || res.status === 422) {
            console.log(data)
            window.alert("Invalid Credentails")
        } else {
            setUpdated(!updated)
            window.alert("Updated Successfull!")
            // setProduct({
            //     name: "",
            //     description: "",
            //     category: "mens",
            //     price: "",
            //     rating: "",
            //     stock: ""
            // })
            // setSelectedImage("")
        }
        console.log(data)
    }
    const handleCurrentImg = () => {
        return product.image
    }

    return (
        <div className="container box mt-3">
            <h5 class="py-4">Manage Products</h5>
            <div class="manage-order-section">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="border px-4 py-2 text-left">Product</th>
                            <th class="border px-4 py-2 text-left">Description</th>
                            <th class="border px-4 py-2 text-left">Category</th>
                            <th class="border px-4 py-2 text-left">Price</th>
                            <th class="border px-4 py-2 text-left">Rating</th>
                            <th class="border px-4 py-2 text-left">Stock</th>
                            <th class="border px-4 py-2 text-left">Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products ?
                            products.map(product => <tr>
                                <td class="border px-4 py-2 text-left">
                                    <img src={`http://localhost:4000/${product.image}`} class="table-image" alt="Product" />
                                    <h6>
                                        {product.name}
                                    </h6>
                                </td>
                                <td class="border px-4 py-2 text-left">
                                    {product.description}
                                </td>
                                <td class="border px-4 py-2 text-center">
                                    {product.category}
                                </td>
                                <td class="border px-4 py-2 text-center">
                                    ${product.price}
                                </td>
                                <td class="border px-4 py-2 text-center">
                                    {product.rating}
                                </td>
                                <td class="border px-4 py-2 text-center">
                                    {product.stock}
                                </td>
                                <td class="border px-4 py-2 text-left">
                                    <div class="d-flex flex-column jstify-content-center">
                                        <button
                                            onClick={() => handleUpdate(product)}
                                            class="btn-edit" id="btn-edit"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                        >
                                            Edit
                                        </button>
                                        <button type="submit" class="btn-del" onClick={() => handleDelete(product._id)}>
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>) :
                            <div className="h-box d-flex align-items-center justify-content-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p>Loading...</p>
                            </div>
                        }
                    </tbody>
                </table>
            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Edit Product</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form class="row g-3" id="modal-form" method="post"
                                enctype="multipart/form-data">
                                <div class="col-12">
                                    <label for="inputEmail4" class="form-label">Product Name</label>
                                    <input name="name" type="text" className="form-control" id="inputEmail4" value={product.name} onChange={handleInputs} />
                                </div>
                                <div class="col-md-6">
                                    <label for="inputimg" class="form-label">Image Upload</label>
                                    <FileUploader
                                        onFileSelectSuccess={(file) => setSelectedImage(file)}
                                        onFileSelectError={({ error }) => alert(error)}
                                    />
                                </div>
                                <div class="col-md-6">
                                    <label for="minputimg" class="form-label">Current Image</label>
                                    <input name="cimage" type="text" class="form-control" id="minputimg" value={product.image} onChange={handleCurrentImg} />
                                </div>
                                <div class="col-12">
                                    <label for="minputdes" class="form-label">Description</label>
                                    <input name="description" type="text" className="form-control" id="inputdes"
                                        placeholder="Product Description" value={product.description} onChange={handleInputs} />
                                </div>
                                <div class="col-md-3">
                                    <label for="minputcat" class="form-label">Category</label>
                                    <select name="category" id="inputState" className="form-select" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                                        <option value="mens">Mens</option>
                                        <option value="womens">Womens</option>
                                        <option value="kids">Kids</option>
                                        <option value="living">Home&Living</option>
                                        <option value="sports">Sports</option>
                                    </select>
                                </div>
                                <div class="col-md-3">
                                    <label for="inputprice" class="form-label">Price</label>
                                    <input name="price" type="text" className="form-control" id="inputprice" placeholder="$" value={product.price} onChange={handleInputs} />
                                </div>
                                <div class="col-md-3">
                                    <label for="inputrating" class="form-label">Rating</label>
                                    <input name="rating" type="text" className="form-control" id="inputrating" value={product.rating} onChange={handleInputs} />
                                </div>
                                <div class="col-md-3">
                                    <label for="inputstock" class="form-label">Stock</label>
                                    <input name="stock" type="text" className="form-control" id="inputstock" value={product.stock} onChange={handleInputs} />
                                </div>
                                <div class="col-12">
                                    <button type="submit" onClick={handleFromSubmit} className="btn btn-warning form-control">Update Product</button>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button btn-sm" class="btn btn-secondary"
                                data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Manage
