import React from 'react'
import Cart from './Cart'
import Footer from './Footer'
import Navbar from './Navbar'
const CartPage = () => {
  return (
    <div>
        <Navbar/>
        <div style={{marginTop: 100, marginBottom: 50}}>
            <Cart/>
        </div>
        <Footer/>
    </div>
  )
}

export default CartPage