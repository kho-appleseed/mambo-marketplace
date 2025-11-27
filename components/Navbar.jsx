import { useStateContext } from '@/context/StateContext'
import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect, useMemo } from 'react'
import { useRouter } from 'next/router'
import {AiOutlineShopping} from 'react-icons/ai'
import Cart from './Cart'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities, sections = [], categories = [] } = useStateContext()
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeSection, setActiveSection] = useState(null)
  const [hoveredSection, setHoveredSection] = useState(null)

  // Group categories by section
  const categoriesBySection = useMemo(() => {
    const grouped = {}
    sections.forEach(section => {
      grouped[section._id] = categories
        .filter(cat => {
          const sectionId = typeof cat.section === 'object' ? cat.section._id : cat.section
          return sectionId === section._id
        })
        .sort((a, b) => (a.order || 999) - (b.order || 999))
    })
    return grouped
  }, [sections, categories])

  // Check URL for active category and section
  useEffect(() => {
    const categorySlug = router.query.category
    const sectionSlug = router.query.section
    
    if (sectionSlug && typeof sectionSlug === 'string') {
      const section = sections.find(sec => sec.slug?.current === sectionSlug)
      if (section) {
        setActiveSection(section._id)
        setActiveCategory(null)
      }
    } else {
      setActiveSection(null)
    }
    
    if (categorySlug && typeof categorySlug === 'string' && !sectionSlug) {
      const category = categories.find(cat => cat.slug?.current === categorySlug)
      if (category) {
        setActiveCategory(category._id)
      }
    } else if (!categorySlug) {
      setActiveCategory(null)
    }
  }, [router.query.category, router.query.section, categories, sections])

  const handleSectionClick = (sectionId) => {
    const section = sections.find(sec => sec._id === sectionId)
    if (section?.slug?.current) {
      router.push(`/?section=${section.slug.current}`)
    }
  }

  const handleCategoryClick = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId)
    if (category?.slug?.current) {
      router.push(`/?category=${category.slug.current}`)
    }
  }

  return (
    <div className='navbar-wrapper'>
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
      
      {/* Horizontal Navigation with Sections and Categories */}
      {sections.length > 0 && (
        <div className='navbar-categories-container'>
          <div className='navbar-categories'>
            {sections.map((section) => {
              const sectionCategories = categoriesBySection[section._id] || []
              return (
                <div
                  key={section._id}
                  className='navbar-section-item'
                  onMouseEnter={() => setHoveredSection(section._id)}
                  onMouseLeave={() => setHoveredSection(null)}
                >
                  <button
                    className={`navbar-section-button ${activeSection === section._id ? 'active' : ''}`}
                    type='button'
                    onClick={() => handleSectionClick(section._id)}
                  >
                    {section.name}
                  </button>
                  {/* Dropdown with categories for this section */}
                  {hoveredSection === section._id && sectionCategories.length > 0 && (
                    <div className='navbar-categories-dropdown'>
                      {sectionCategories.map((category) => (
                        <button
                          key={category._id}
                          className={`navbar-category-dropdown-item ${activeCategory === category._id ? 'active' : ''}`}
                          onClick={() => handleCategoryClick(category._id)}
                          type='button'
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar