import { Products } from '@/components'
import { useStateContext } from '@/context/StateContext'
import { client, urlFor } from '@/lib/client'
import React, { useState, useMemo } from 'react'
import { AiOutlineStar, AiOutlineMinus, AiOutlinePlus, AiFillStar } from 'react-icons/ai'

const ProductDetails = ({product, products}) => {
    const {image, name, details, price} = product
    const [index, setIndex] = useState(0)
    const { decQty, incQty, setShowCart, qty, onAdd } = useStateContext()
    
    const handleBuyNow = () => {
        onAdd(product, qty)
        setShowCart(true)
    }

    // Filter recommended products: same section, different category, one random product per category, max 10
    const recommendedProducts = useMemo(() => {
        if (!product || !products || products.length === 0) return []
        
        const currentProductId = product._id
        const currentCategoryId = product.category?._id || (typeof product.category === 'object' ? product.category?._id : null)
        const currentSectionId = product.category?.section?._id || (typeof product.category?.section === 'object' ? product.category?.section?._id : null)
        
        // If no section, return empty array
        if (!currentSectionId) return []
        
        // Filter products: same section, different category, exclude current product
        const filtered = products.filter(p => {
            // Exclude current product
            if (p._id === currentProductId) return false
            
            // Get product's category and section
            const pCategoryId = p.category?._id || (typeof p.category === 'object' ? p.category?._id : null)
            const pSectionId = p.category?.section?._id || (typeof p.category?.section === 'object' ? p.category?.section?._id : null)
            
            // Must be in same section
            if (pSectionId !== currentSectionId) return false
            
            // Must be different category
            if (pCategoryId === currentCategoryId) return false
            
            return true
        })
        
        // Group products by category
        const productsByCategory = {}
        filtered.forEach(p => {
            const pCategoryId = p.category?._id || (typeof p.category === 'object' ? p.category?._id : null)
            if (pCategoryId) {
                if (!productsByCategory[pCategoryId]) {
                    productsByCategory[pCategoryId] = []
                }
                productsByCategory[pCategoryId].push(p)
            }
        })
        
        // Select one product from each category (deterministic to avoid hydration errors)
        const selectedProducts = []
        const categoryIds = Object.keys(productsByCategory).sort() // Sort for consistency
        
        // Select first product from each category (max 10 categories)
        // Using first product ensures server and client render the same
        categoryIds.slice(0, 10).forEach(categoryId => {
            const categoryProducts = productsByCategory[categoryId]
            if (categoryProducts.length > 0) {
                // Sort products by _id for consistency, then take first
                const sortedProducts = categoryProducts.sort((a, b) => a._id.localeCompare(b._id))
                selectedProducts.push(sortedProducts[0])
            }
        })
        
        return selectedProducts
    }, [product, products])

  return (
    <div>
        <div className='product-detail-container'>
            <div>
                <div className='image-container'>
                    <img 
                        className='product-detail-image' 
                        src={urlFor(image && image[index])} />
                </div>
                <div className='small-images-container'>
                    {
                        image?.map((item, i) => (
                            <img 
                                src={urlFor(item)}
                                className={i === index ? 'small-image selected-image': 'small-image'} 
                                onMouseEnter={() => setIndex(i)} 
                                key={i} />
                        ))
                    }
                </div>
            </div>

            <div className='product-detail-desc'>
                <h1 className='product-title'>{name}</h1>
                <div className='reviews'>
                    <div className='stars-container'>
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiFillStar />
                        <AiOutlineStar />
                    </div>
                    <p className='review-count'>(20)</p>
                </div>
                <div className='details-section'>
                    <h4 className='details-label'>Details:</h4>
                    <p className='details-text'>{details}</p>
                </div>
                <p className='price'>${price}</p>
                <div className='quantity'>
                    <h3 className='quantity-label'>Quantity:</h3>
                    <div className='quantity-desc'>
                        <span onClick={decQty} className='minus'><AiOutlineMinus /></span>
                        <span className='num'>{qty}</span>
                        <span onClick={incQty} className='plus'><AiOutlinePlus /></span>
                    </div>
                </div>
                <div className='buttons'>
                    <button onClick={() => onAdd(product, qty)} className="add-to-cart" type="button">Add to Cart</button>
                    <button onClick={handleBuyNow} className="buy-now" type="button">Buy Now</button>
                </div>
            </div>
        </div>
        {recommendedProducts.length > 0 && (
            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {recommendedProducts.map((item) => (
                            <Products key={item._id} data={item} />
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export const getStaticPaths = async () => {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`

    const products = await client.fetch(query)
    const paths = products.map(product => ({
      params: {
        slug: product.slug.current
      }
    }))

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps = async ({params: {slug}}) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0] {
      ...,
      category-> {
        _id,
        name,
        slug,
        section-> {
          _id,
          name
        }
      }
    }`
    
    const productsQuery = `*[_type == "product"] {
      _id,
      name,
      slug,
      image,
      price,
      category-> {
        _id,
        name,
        section-> {
          _id,
          name
        }
      }
    }`

    const product = await client.fetch(query)
    const products = await client.fetch(productsQuery)
  
    return {
      props: {
        product,
        products
      }
    }
  }

export default ProductDetails