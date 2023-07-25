
const Order = require('../../models/order')
const Product = require('../../models/product')

const multer = require('multer')


function manageController() {
    return {
        async addProcuct(req, res) {
            const { name, description, category, price, rating, stock } = req.body;

            if (!name || !description || !category || !price || !rating || !stock) {
                return res.status(400).json({ error: "All Fields Are Required!" })
            }
            if (!req.file) {
                return res.status(400).json({ error: "All Fields Are Required!" })
            }
            console.log(req.file)

            const product = new Product({
                name: name,
                image: req.file.filename,
                description: description,
                category: category,
                price: price,
                rating: rating,
                stock: stock,
                initialItems: stock,
            });
            console.log(req.file.path)

            console.log(req.body);
            product.save().then(() => {
                return res.status(200).json({ success: "Data Saved!!" })
            }).catch(err => {
                console.log(err)
                return res.status(400).json({ error: "Error Occured" })
            });
        },
        async updateProduct(req, res) {
            const { name, cimage, description, category, price, rating, stock } = req.body;
            var product;


            if (!name || !description || !category || !price || !rating || !stock) {
                return res.json({ error: 'All fields are required!!' });

            }
            if (!req.file) {
                product = {
                    name: name,
                    image: cimage,
                    description: description,
                    category: category,
                    price: price,
                    rating: rating,
                    stock: stock
                };

                console.log("File Not Found")
                console.log(req.file)
            } else {
                product = {
                    name: name,
                    image: req.file.filename,
                    description: description,
                    category: category,
                    price: price,
                    rating: rating,
                    stock: stock
                };
                console.log("File  Found")

            }
            console.log(product)

            let _id = req.body.id;
            if (_id) {
                const result = await Product.findByIdAndUpdate(_id, product);
                return res.status(200).json({ success: "Data Updated!!" })
            } else {
                return res.status(200).json({ error: "Data Updated Failed!!" })
            }
            return res.status(200).json({ error: "Data Updated Failed!!" })
        },
        async deleteProduct(req, res) {
            let id = req.body.productId;
            console.log("id");
            console.log(id)
            if (id) {
                const deleteProduct = await Product.findByIdAndDelete(id);
                console.log(deleteProduct)
                return res.status(200).json({ success: 'Product Deleted Successfully' });
            } else {
                return res.status(200).json({ error: 'Product Delete failed' });
            }
        }

    }
}

module.exports = manageController