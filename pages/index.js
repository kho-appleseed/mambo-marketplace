import { Cart, Footer, FooterBanner, HeroBanner, Layout, Navbar, Products } from '@/components'
import Types from '@/components/Types'
import { client } from '@/lib/client'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'

const Home = ({products, bannerData, sections, categories, productTypes}) => {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeProductType, setActiveProductType] = useState(null)
  const [activeSection, setActiveSection] = useState(null)
  
  useEffect(() => {
    // Check for section query param in URL
    const sectionSlug = router.query.section
    const categorySlug = router.query.category
    const productTypeSlug = router.query.productType
    
    // Auto-select first section if no query params exist
    if (!sectionSlug && !categorySlug && sections.length > 0) {
      const firstSection = sections[0]
      if (firstSection.slug?.current) {
        router.push(`/?section=${firstSection.slug.current}`, undefined, { shallow: true })
        return // Exit early, let the next render handle the section
      }
    }
    
    // Handle section from URL
    if (sectionSlug && typeof sectionSlug === 'string') {
      const section = sections.find(sec => sec.slug?.current === sectionSlug)
      if (section) {
        setActiveSection(section._id)
        setActiveCategory(null) // Clear category when section is selected
        setActiveProductType(null) // Clear product type when section is selected
      }
    }
    
    // Handle category (only if no section is active)
    if (categorySlug && typeof categorySlug === 'string' && !sectionSlug) {
      const category = categories.find(cat => cat.slug?.current === categorySlug)
      if (category) {
        setActiveCategory(category._id)
        setActiveSection(null) // Clear section when category is selected
      }
    } else if (!categorySlug && !sectionSlug) {
      setActiveCategory(null)
    }
    
    // Check for productType query param in URL
    if (productTypeSlug && typeof productTypeSlug === 'string') {
      const productType = productTypes.find(pt => pt.slug?.current === productTypeSlug)
      if (productType) {
        setActiveProductType(productType._id)
      }
    } else if (!productTypeSlug) {
      setActiveProductType(null)
    }
  }, [router.query.section, router.query.category, router.query.productType, sections, categories, productTypes, router])
  
  // Get available product types for the active category
  const availableProductTypes = useMemo(() => {
    if (!activeCategory) return []
    return productTypes.filter(productType => {
      const productTypeCategoryId = typeof productType.category === 'object' ? productType.category._id : productType.category
      return productTypeCategoryId === activeCategory
    }).sort((a, b) => (a.order || 999) - (b.order || 999))
  }, [activeCategory, productTypes])
  
  // Get categories for active section
  const activeSectionCategories = useMemo(() => {
    if (!activeSection) return []
    return categories.filter(cat => {
      const sectionId = typeof cat.section === 'object' ? cat.section._id : cat.section
      return sectionId === activeSection
    }).map(cat => cat._id)
  }, [activeSection, categories])

  // Filter products by selected section, category and product type
  const filteredProducts = useMemo(() => {
    let filtered = products
    
    // Filter by section (all categories in that section)
    if (activeSection && activeSectionCategories.length > 0) {
      filtered = filtered.filter(product => {
        const productCategoryId = product.category?._id
        return activeSectionCategories.includes(productCategoryId)
      })
    }
    
    // Filter by category (only if no section is active)
    if (activeCategory && !activeSection) {
      filtered = filtered.filter(product => product.category?._id === activeCategory)
    }
    
    // Filter by product type
    if (activeProductType) {
      filtered = filtered.filter(product => product.productType?._id === activeProductType)
    }
    
    // If no filters are active, show 5 products for "Best Selling Products"
    // Use first 5 to avoid hydration mismatch (Math.random differs between server/client)
    if (!activeSection && !activeCategory && !activeProductType && filtered.length > 0) {
      return filtered.slice(0, 5)
    }
    
    return filtered
  }, [products, activeSection, activeSectionCategories, activeCategory, activeProductType])

  const handleCategoryClick = useCallback((categoryId) => {
    // Handle category clicks
    setActiveCategory(categoryId === activeCategory ? null : categoryId)
    setActiveProductType(null) // Reset product type when category changes
    // Update URL without reload
    const category = categories.find(cat => cat._id === categoryId)
    if (categoryId && category) {
      router.push(`/?category=${category.slug.current}`, undefined, { shallow: true })
    } else {
      router.push('/', undefined, { shallow: true })
    }
  }, [categories, activeCategory, router])
  
  const handleProductTypeClick = useCallback((productTypeId) => {
    setActiveProductType(prev => prev === productTypeId ? null : productTypeId)
    // Update URL without reload
    const productType = productTypes.find(pt => pt._id === productTypeId)
    const category = categories.find(c => c._id === activeCategory)
    if (productTypeId && productType && category) {
      router.push(`/?category=${category.slug.current}&productType=${productType.slug.current}`, undefined, { shallow: true })
    } else if (category) {
      router.push(`/?category=${category.slug.current}`, undefined, { shallow: true })
    }
  }, [productTypes, categories, activeCategory, router])
  
  const activeSectionData = useMemo(() => 
    sections.find(s => s._id === activeSection),
    [sections, activeSection]
  )
  
  const activeCategoryData = useMemo(() => 
    categories.find(c => c._id === activeCategory),
    [categories, activeCategory]
  )
  
  const activeProductTypeName = useMemo(() => {
    if (!activeProductType) return null
    return productTypes.find(pt => pt._id === activeProductType)?.name
  }, [productTypes, activeProductType])

  return (
    <>
      <HeroBanner data={bannerData.length && bannerData[0]} />
      
      {/* Main Content Area */}
      <div className="main-content-wrapper">
        <main className="main-content">
          {/* Product Types Filter (only show when category is selected) */}
          {activeCategory && availableProductTypes.length > 0 && (
            <Types 
              types={availableProductTypes}
              activeType={activeProductType}
              onTypeClick={handleProductTypeClick}
            />
          )}
          
          {/* Products Section */}
          <div className='products-heading'>
            <h2>
              {activeSection
                ? activeSectionData?.name
                : activeCategory 
                  ? activeProductType
                    ? `${activeCategoryData?.name} - ${activeProductTypeName}`
                    : activeCategoryData?.name
                  : 'Best Selling Products'
              }
            </h2>
          </div>
          <div className='products-container'>
            {filteredProducts?.map((product) => <Products key={product._id} data={product} />)}
          </div>
        </main>
      </div>
      
      <FooterBanner data={bannerData && bannerData[0]} />
    </>
  )
}

export const getServerSideProps = async () => {
  // Fetch products with category and type
  const query = `*[_type == "product"] {
    ...,
    category-> {
      _id,
      name,
      slug,
      section-> {
        _id,
        name
      }
    },
    productType-> {
      _id,
      name,
      slug
    }
  }`
  // Fetch all data in parallel for better performance
  const [productsResult, bannerData, sections, categories, productTypes] = await Promise.all([
    client.fetch(query),
    client.fetch('*[_type == "banner"]'),
    client.fetch(`*[_type == "section"] {
      _id,
      name,
      slug,
      description,
      image,
      order
    } | order(order asc, name asc)`),
    client.fetch(`*[_type == "category"] {
      _id,
      name,
      slug,
      description,
      image,
      order,
      section-> {
        _id,
        name,
        slug
      }
    } | order(order asc, name asc)`),
    client.fetch(`*[_type == "productType"] {
      _id,
      name,
      slug,
      description,
      order,
      category-> {
        _id,
        name,
        slug
      }
    } | order(order asc, name asc)`)
  ])

  return {
    props: {
      products: productsResult || [],
      bannerData: bannerData || [],
      sections: sections || [],
      categories: categories || [],
      productTypes: productTypes || []
    }
  }
}

export default Home

