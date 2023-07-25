const Product = require('../models/product');

function homeController() {
    return {
        async index(req, res) {
            const products = await Product.find();
           return res.status(200).json(products);
        },
        async category(req, res) {
            console.log(req.params.category)
            const products = await Product.find({ category: req.params.category }, null);
            if (products) {
               return res.status(200).json(products);
            }
           return res.status(404).send('Not Found')
        },
        async singleproduct(req, res) {
            console.log(req.params.id)
            const product = await Product.find({ _id: req.params.id }, null);
            if (product) {
                return res.status(200).json(product);
            }
            return res.status(404).send('Not Found')
        },
        error(req, res) {
            return res.status(404).send("404error")

        },
        async search(req, res) {
            console.log(req.body.searchitem)
            var regex = new RegExp(req.body.searchitem, 'i');
            try {
                const products = await Product.find({ $or: [{ name: regex }, { category: regex }, { description: regex }] }, (err, products) => {
                    if (err) {
                        console.log(err);
                    } else {
                        if (products.length > 0) {
                            return res.status(200).json(products)
                        } else {
                            return res.status(400).json({ message: 'No Products Found' })
                        }
                        return res.status(400).json({ message: 'No Products Found' })
                    }
                })
            } catch (error) {
                console.log(error);
            }

        }
    }
}

module.exports = homeController;