import { urlFor } from '@/lib/client'
import Link from 'next/link'
import React, { memo, useMemo } from 'react'

const Products = memo(({data: {image, name, slug, price}}) => {
  const imageUrl = useMemo(() => {
    if (image && image[0]) {
      try {
        return urlFor(image[0]).url()
      } catch (error) {
        console.warn('Error generating product image URL:', error)
        return null
      }
    }
    return null
  }, [image])

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          {imageUrl ? (
            <img className='product-image' src={imageUrl} alt={name} width={250} height={250} />
          ) : (
            <div className='product-image' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-background-light)' }}>
              <span>{name.charAt(0).toUpperCase()}</span>
            </div>
          )}
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
})

Products.displayName = 'Products'

export default Products