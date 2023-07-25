const Order = require('../../models/order')
const Product = require('../../models/product')

function adminController() {
    return {
        async index(req, res) {
            const orders = await Order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 } })
                .populate('customerId', '-password').exec((err, orders) => {
                    if (orders) {
                        return res.json(orders);
                    } else {
                        return res.status(400).json({ error: "Not found" })
                    }
                })
        },
        updateOrderStat(req, res) {
            Order.updateOne({ _id: req.body.orderId }, { status: req.body.status }, (err, data) => {

                if (err) {
                    return res.status(400).json({ error: "Error Occured" })
                }
                return res.status(201).json({ message: "Updated Status" })

            })
        },
        async getstats(req, res) {
            const products = await Product.find();
            const mens = await Product.find({ category: "mens" }, null);
            const womens = await Product.find({ category: "womens" }, null);
            const kids = await Product.find({ category: "kids" }, null);
            const living = await Product.find({ category: "living" }, null);
            const sports = await Product.find({ category: "sports" }, null);


            const categories = [mens, womens, kids, living, sports];
            persentages = [];
            // console.log(categories)

            function getpercentage(itemsArray) {

                let totalsold = 0, totalitems = 0, category;
                itemsArray.forEach(item => {
                    totalsold = totalsold + (item.initialItems - item.stock);
                    totalitems = totalitems + item.initialItems;
                    category = item.category;

                })
                percent = Math.round((totalsold * 100) / totalitems);
                return {
                    "name": category,
                    "percent": percent,
                    "totalitems": totalitems,
                    "solditems": totalsold,
                };
            }

            categories.forEach(category => {
                // console.log(category)
                persentages.push(getpercentage(category));

            })

            if (req.body.filter !== "") {
                filter = req.body.filter
                today = new Date();
                d = new Date().toISOString();
                wd = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7).toISOString();
                md = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 28).toISOString();
                console.log(wd)


                function getSales(salesArray) {

                    let salesDate = [];
                    let statsData = [];
                    let values = []
                    let i = 0
                    salesArray.forEach(sales => {
                        console.log(sales.items)
                        values.push(Object.values(sales.items))
                        console.log(i)
                        salesDate.push(sales.createdAt)
                        i++
                    })
                    values.forEach((item, index, array) => {
                        item.forEach(function (itm, idx, arr) {
                            console.log(index, idx, itm);
                            statsData.push(itm);
                        });

                    })
                    console.log(salesDate)
                    return statsData;
                }

                if (filter == "week") {
                    Order.find({ createdAt: { $lt: d, $gt: wd } })
                        .populate('customerId', '-password').exec((err, orders) => {
                            if (err) {
                                console.log(err)
                            }
                            const statsData = getSales(orders)
                            console.log(statsData)
                            return res.status(200).json({ persentages: persentages, products: statsData });
                        })
                } else if (filter == "month") {
                    Order.find({ createdAt: { $lt: d, $gt: md } })
                        .populate('customerId', '-password').exec((err, orders) => {
                            if (err) {
                                console.log(err)
                            }
                            const statsData = getSales(orders)
                            return res.status(200).json({ persentages: persentages, products: statsData });
                        })
                } else if (filter == "all") {
                    Order.find().exec((err, orders) => {
                        if (err) {
                            console.log(err)
                        }
                        const statsData = getSales(orders)
                        return res.status(200).json({ persentages: persentages, products: statsData });
                    })
                } else {
                    return res.status(200).json({ persentages: persentages, products: products });

                }
            } else {
                return res.status(200).json({ persentages: persentages, products: products });
            }

            // res.status(200).json({ persentages: persentages, products: products });

        }
    }
}

module.exports = adminController