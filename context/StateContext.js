import React, { createContext, useContext, useState, useCallback } from 'react'
import { toast }   from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({  children, sections = [], categories = [] }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)
    const [globalSections, setGlobalSections] = useState(sections)
    const [globalCategories, setGlobalCategories] = useState(categories)

    const onAdd = useCallback((product, quantity) => {
        const checkProductInCart = cartItems.find(item => item._id === product._id)

        if (checkProductInCart) {
            setTotalPrice((prev) => prev + (product.price  * quantity))
            setTotalQuantities((prev) => prev + quantity)

            const updatedCartItems = cartItems.map(item => {
                if (item && item._id === product._id) {
                    return {
                        ...item,
                        quantity: item.quantity + quantity
                    }
                }
                return item
            }).filter(item => item !== undefined)

            setCartItems(updatedCartItems)
            toast.success(`${quantity} ${product.name} added`)
        } else {
            setTotalPrice((prev) => prev + (product.price  * quantity))
            setTotalQuantities((prev) => prev + quantity)
            
            product.quantity = quantity
            setCartItems([...cartItems, { ...product }])

            toast.success(`${quantity} ${product.name} added to cart`)
        }
    }, [cartItems])

    const onRemove = useCallback((product) => {
        if (!product || !product._id) return
        
        const foundProduct = cartItems.find(item => item && item._id === product._id)
        if (!foundProduct) return
        
        const tempCart = cartItems.filter(item => item && item._id !== product._id)
        setTotalPrice(prev => prev - (foundProduct.price * foundProduct.quantity))
        setTotalQuantities(prev => prev - foundProduct.quantity)
        setCartItems(tempCart)
    }, [cartItems])
    
    const toggleCartItemQuantity = useCallback((id, value) => {
        if (!id) return
        
        const foundProduct = cartItems.find((item) => item && item._id === id)
        if (!foundProduct) return
        
        const index = cartItems.findIndex((item) => item && item._id === id)
        if (index === -1) return

        if (value === 'inc') {
            const updatedCartItems = cartItems.map((item, idx) => {
                if (idx === index) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item
            })
            setCartItems(updatedCartItems)
            setTotalPrice(prev => prev + foundProduct.price)
            setTotalQuantities(prev => prev + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                const updatedCartItems = cartItems.map((item, idx) => {
                    if (idx === index) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }
                    return item
                })
                setCartItems(updatedCartItems)
                setTotalPrice(prev => prev - foundProduct.price)
                setTotalQuantities(prev => prev - 1)
            }
        }  
    }, [cartItems])

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
                onRemove,
                sections: globalSections,
                categories: globalCategories
            }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)