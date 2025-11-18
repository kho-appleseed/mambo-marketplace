import { useStateContext } from '@/context/StateContext'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from './Cart'

const Navbar = () => {
  
  const { showCart, setShowCart, totalQuantities } = useStateContext()

  return (
    <div className='navbar-container'>
      <Link href="/" className='logo'>
        <Image 
          src="/logo/logo-primary.png" 
          alt="Mambo Marketplace" 
          width={150} 
          height={40}
          priority
        />
      </Link>

      <button className='cart-icon' onClick={() => setShowCart(!showCart)} type='button'>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  )
}

export default Navbar