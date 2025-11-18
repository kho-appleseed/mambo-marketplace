import { urlFor } from '@/lib/client'
import React, { memo, useMemo } from 'react'
import { getSectionIcon } from './utils/sectionIcons'

/**
 * CategoryCard - Reusable card component for displaying categories, sections, or similar items
 * @param {Object} props
 * @param {Object} props.data - Data object containing: image, imagePath, name, slug, description, _id
 * @param {Function} props.onClick - Click handler function (receives _id as parameter)
 * @param {boolean} props.isActive - Whether the card is in active state
 * @param {boolean} props.useIcon - Whether to display an icon instead of an image
 * @param {number} props.iconSize - Size of the icon in pixels (default: 24)
 * @param {string} props.className - Additional CSS classes to apply
 */
const CategoryCard = memo(({
  data: {image, imagePath, name, slug, description, _id}, 
  onClick, 
  isActive, 
  useIcon,
  iconSize = 24,
  className = ''
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick(_id)
    }
  }

  // Determine image source - use imagePath if available (from public folder), otherwise use urlFor
  // Memoize to avoid recalculating on every render
  const imageSrc = useMemo(() => {
    if (useIcon) {
      return null // Don't use images if icon is requested
    }
    if (imagePath) {
      return imagePath // Direct path from public folder
    }
    if (!image) {
      return null
    }
    // Check if it's a string (already a path)
    if (typeof image === 'string') {
      return image
    }
    // Check if image has asset property (standard Sanity image structure)
    if (image.asset) {
      try {
        return urlFor(image).url()
      } catch (error) {
        console.warn('Error generating image URL:', error)
        return null
      }
    }
    return null
  }, [image, imagePath, useIcon])

  return (
    <div>
      <div className={`category-card ${isActive ? 'active' : ''} ${className}`} onClick={handleClick}>
        {useIcon ? (
          <div className={`category-image category-icon-placeholder ${isActive ? 'active' : ''}`}>
            {getSectionIcon(name, iconSize)}
          </div>
        ) : imageSrc ? (
          <img 
            className='category-image' 
            src={imageSrc} 
            alt={name} 
            width={90} 
            height={70} 
          />
        ) : (
          <div className='category-image category-image-placeholder'>
            <span>{name.charAt(0).toUpperCase()}</span>
          </div>
        )}
        <p className='category-name'>{name}</p>
        {description && (
          <p className='category-description'>{description}</p>
        )}
      </div>
    </div>
  )
})

CategoryCard.displayName = 'CategoryCard'

export default CategoryCard

