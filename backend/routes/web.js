const homeController = require("../app/controllers/homeController");
const authController = require("../app/controllers/authController");
const cartController = require("../app/controllers/cartController");
const orderController = require("../app/controllers/orderController");
const adminController = require("../app/controllers/admin/adminControllers");
const store = require('../app/middlewares/multeradd');
const manageController = require("../app/controllers/admin/manageControllers");

// const authController = require("../app/http/controllers/authController");
// const cartController = require("../app/http/controllers/customer/cartController");

//MiddleWares
// const guest = require('../app/http/middleware/guest')
// const auth = require('../app/http/middleware/auth')
// const orderControllers = require("../app/http/controllers/customer/orderController");


function initRoutes(app) {

    //Get Products
    app.get('/api', homeController().index);
    //Get Particular product
    app.get('/api/product/:id', homeController().singleproduct);
    //Get Products By Cate
    app.get('/products/:category', homeController().category);
    //search 
    app.post('/search', homeController().search)

    //login
    app.post('/login', authController().login);
    //register
    app.post('/register', authController().register);

    //cart page
    app.post('/api/cart-items', cartController().getProducts);
    // app.post('/update-cart', cartController().update);

    //Order
    app.post('/store-order', orderController().store);
    app.post('/get-order', orderController().getorder);
    app.post('/getsingleorder', orderController().getOrderId);

    //Admin
    app.get('/admin-orders', adminController().index)
    app.post('/updateOrderStat', adminController().updateOrderStat)
    app.post('/admin/addProcuct', store.single('image'), manageController().addProcuct);
    app.post('/admin/deleteProduct', manageController().deleteProduct);
    app.post('/admin/updateProduct', store.single('uimage'), manageController().updateProduct)
    app.post('/admin/stats', adminController().getstats);
}

module.exports = initRoutes;