import React from 'react'
import Products from '../components/Products'
import Slider from '../components/Slider'

const Home = () => {
    return (
        <div className='pt-5'>
            <Slider />
            <Products />
        </div>
    )
}

export default Home
