import { useStateContext } from '@/context/StateContext'
import Link from 'next/link'
import React from 'react'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from './Cart'

const Navbar = () => {
  
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href="/">Mab Inc Headphones</Link>
      </p>

      <button className='cart-icon' onClick={() => setShowCart(!showCart)} type='button'>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar