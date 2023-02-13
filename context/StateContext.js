import product from '@/sanity_ecommerce/schemas/product'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast }   from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({  children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct;
    let index;

    const onAdd = (product, quantity) => {
        const checkProductInCart = cartItems.find(item => item._id === product._id)

        if (checkProductInCart) {
            setTotalPrice((prev) => prev + (product.price  * quantity))
            setTotalQuantities((prev) => prev + quantity)

            const updatedCartItems = cartItems.map(item => {
                if (item._id === product._id) return {
                    ...item,
                    quantity: item.quantity + quantity
                }
            })

            setCartItems(updatedCartItems)
            toast.success(`${qty} ${product.name} added`)
        } else {
            setTotalPrice((prev) => prev + (product.price  * quantity))
            setTotalQuantities((prev) => prev + quantity)
            
            product.quantity = quantity
            setCartItems([...cartItems, { ...product }])

            toast.success(`${qty} ${product.name} added to cart`)
        }
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find(item => item._id === product._id)
        const tempCart = cartItems.filter(item => item._id !== product._id)
        setTotalPrice(prev => prev - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prev => prev - foundProduct.quantity)
        setCartItems(tempCart)
    }
    
    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((item) => item._id === id)
        const newCartItems = cartItems.filter((item) => item._id === id)

        if (value === 'inc') {
            foundProduct.quantity += 1
            // cartItems[index] = foundProduct
            setTotalPrice(prev => prev + foundProduct.price)
            setTotalQuantities(prev => prev + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                foundProduct.quantity -= 1
                // cartItems[index] = foundProduct
                setTotalPrice(prev => prev - foundProduct.price)
                setTotalQuantities(prev => prev - 1)
            }
        }  
    }

    const incQty = () => {
        setQty((prev) => prev + 1)
    }

    const decQty = () => {
        setQty((prev) => {
            if (prev - 1 < 1) return 1

            return prev - 1
        })
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)