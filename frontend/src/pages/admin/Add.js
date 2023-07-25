import React, { useState } from 'react'
import FileUploader from '../../components/FileUploader';

const Add = () => {
    const [selectedImage, setSelectedImage] = useState("")
    const [product, setProduct] = useState({
        name: "",
        description: "",
        category: "mens",
        price: "",
        rating: "",
        stock: ""

    })
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setProduct({
            ...product, [name]: value
        })
    }

    const handleFromSubmit = async (e) => {
        e.preventDefault();
        if (product.name === "" || product.description === "" || product.price === "" || product.rating === "" || product.stock === "" || selectedImage === "") {
            alert("All Feilds must be filled out!");
            return
        }
        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("category", product.category);
        formData.append("price", product.price);
        formData.append("rating", product.rating);
        formData.append("stock", product.stock);
        formData.append("image", selectedImage)
        console.log(formData)

        const res = await fetch('/admin/addProcuct', {
            method: "POST",
            body: formData
        })
        const data = res.json();

        if (res.status === 400 || !data || res.status === 422) {
            console.log(data)
            window.alert("Invalid Credentails")
        } else {
            window.alert("Addded Successfull!")
            setProduct({
                name: "",
                description: "",
                category: "mens",
                price: "",
                rating: "",
                stock: ""
            })
            setSelectedImage("")
        }
        console.log(data)
    }

    return (
        <div className="container box py-3">
            <h5 className="my-2 text-center">Add Product</h5>
            <div className="add-form">
                <form className="row g-3" onSubmit={handleFromSubmit} method="post">
                    <div className="col-md-6">
                        <label htmlFor="inputEmail4" className="form-label">Product Name</label>
                        <input name="name" type="text" className="form-control" id="inputEmail4" value={product.name} onChange={handleInputs} />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="inputimg" className="form-label">Image Upload</label>
                        <FileUploader
                            onFileSelectSuccess={(file) => setSelectedImage(file)}
                            onFileSelectError={({ error }) => alert(error)}
                        />
                    </div>
                    <div className="col-12">
                        <label htmlFor="inputdes" className="form-label">Description</label>
                        <input name="description" type="text" className="form-control" id="inputdes"
                            placeholder="Product Description" value={product.description} onChange={handleInputs} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="inputState" className="form-label">Category</label>
                        <select name="category" id="inputState" className="form-select" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })}>
                            <option value="mens">Mens</option>
                            <option value="womens">Womens</option>
                            <option value="kids">Kids</option>
                            <option value="living">Home&Living</option>
                            <option value="sports">Sports</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="inputprice" className="form-label">Price</label>
                        <input name="price" type="text" className="form-control" id="inputprice" placeholder="$" value={product.price} onChange={handleInputs} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="inputrating" className="form-label">Rating</label>
                        <input name="rating" type="text" className="form-control" id="inputrating" value={product.rating} onChange={handleInputs} />
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="inputstock" className="form-label">Stock</label>
                        <input name="stock" type="text" className="form-control" id="inputstock" value={product.stock} onChange={handleInputs} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-warning form-control">Add Product</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default Add
