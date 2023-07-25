const Order = require("../models/order");
const Product = require("../models/product")


function orderController() {
    return {
        async store(req, res) {

            console.log(req.body)
            const order = new Order({
                customerId: req.body.customerId,
                items: req.body.items,
                address: req.body.address
            });

            //to dcrease qty from stock
            const keys = []
            const qtys = []

            order.items.forEach(element => {
                keys.push(element.item._id)
                qtys.push(element.qty)
            });
            // console.log(keys)
            // console.log(qtys)

            for (let i = 0; i < keys.length; i++) {
                let product = await Product.findOne({ _id: keys[i] })
                let update = await Product.updateOne({ _id: keys[i] }, { "stock": product.stock - qtys[i] }, { upsert: true })
            }

            order.save().then(result => {
                console.log('saved')
                return res.status(200).json({ message: "Order Placed" })
            }).catch(err => {
                console.log(err)
                return res.status(400).json({ error: "Something went Wrong" })

            })
            // res.status(400).send('Something Went Wrong')
            // console.log(req.body);
        },
        async getorder(req, res) {
            const orders = await Order.find({ customerId: req.body.customerId }, null, {
                sort: {
                    'createdAt': -1
                }
            });

            return res.json(orders);
        },
        async getOrderId(req, res) {
            const order = await Order.findById(req.body.orderId);

            //Authorize User
            if (req.body.customerId === order.customerId.toString()) {
                return res.json(order);
            } else {
                return res.status(400).json({ error: "Not Found" })
            }
        }
    }
}

module.exports = orderController;