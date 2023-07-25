import React, { useState, useEffect } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/home';
import Login from './pages/Login';
import Category from './pages/Category';
import CustomerCart from './pages/CustomerCart';
import Register from './pages/Register';
import SingleProduct from './pages/SingleProduct';
import { CartContext } from './CartContext';
import Profile from './pages/Profile';
import PaymentGatway from './pages/PaymentGatway';
import CustomerOrders from './pages/CustomerOrders';
import TrackOrder from './pages/TrackOrder';
import Search from './pages/Search';
import AdminRoute from './pages/admin/AdminRoute';
import AdminNav from './components/AdminNav';
import Dashboard from './pages/admin/Dashboard';
import Orders from './pages/admin/Orders';
import Manage from './pages/admin/Manage';
import Add from './pages/admin/Add';

function App() {

  const [cart, setCart] = useState({})
  const [user, setUser] = useState(null)
  const [query, setQuery] = useState(null)
  useEffect(() => {
    const cart = window.localStorage.getItem('cart');
    const user = window.localStorage.getItem('user')

    setUser(JSON.parse(user))
    setCart(JSON.parse(cart))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
    window.localStorage.setItem('user', JSON.stringify(user))
  }, [cart, user])

  return (
    <>
      <Router>
        <CartContext.Provider value={{ cart, setCart, user, setUser, }}>
          <Navbar />
          {
            user ? (
              user.role === "admin" ? <AdminNav /> : ""
            ) : ""
          }
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:_id" component={SingleProduct} />
            <Route exact path="/category/:cat" component={Category} />
            <Route exact path="/search/:query" component={Search} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/payment" component={PaymentGatway} />
            <Route exact path="/orders" component={CustomerOrders} />
            <Route exact path="/order/:orderid" component={TrackOrder} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/cart" component={CustomerCart} />

            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/orders" component={Orders} />
            <Route exact path="/admin/manage" component={Manage} />
            <Route exact path="/admin/add" component={Add} />
          </Switch>
        </CartContext.Provider>
        <Footer />
      </Router>
    </>
  );
}

export default App;
