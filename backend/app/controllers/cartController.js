const Product = require('../models/product');

function cartController() {
    return {

        async getProducts(req, res, next) {
            let documents;
            try {
                documents = await Product.find({
                    _id: { $in: req.body.ids },
                }).select('-updatedAt -__v');
            } catch (err) {
                return next(CustomErrorHandler.serverError());
            }
            return res.json(documents);
        }
    }
}

module.exports = cartController;