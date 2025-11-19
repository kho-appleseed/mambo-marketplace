import { Cart, Footer, FooterBanner, HeroBanner, Layout, Navbar, Products, Sidebar } from '@/components'
import Types from '@/components/Types'
import { client } from '@/lib/client'
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useRouter } from 'next/router'

const Home = ({products, bannerData, sections, categories, productTypes}) => {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState(null)
  const [activeProductType, setActiveProductType] = useState(null)
  
  useEffect(() => {
    // Check for category query param in URL
    const categorySlug = router.query.category
    const productTypeSlug = router.query.productType
    
    if (categorySlug && typeof categorySlug === 'string') {
      const category = categories.find(cat => cat.slug?.current === categorySlug)
      if (category) {
        setActiveCategory(category._id)
      }
    } else if (!categorySlug) {
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
  }, [router.query.category, router.query.productType, categories, productTypes])
  
  // Get available product types for the active category
  const availableProductTypes = useMemo(() => {
    if (!activeCategory) return []
    return productTypes.filter(productType => {
      const productTypeCategoryId = typeof productType.category === 'object' ? productType.category._id : productType.category
      return productTypeCategoryId === activeCategory
    }).sort((a, b) => (a.order || 999) - (b.order || 999))
  }, [activeCategory, productTypes])
  
  // Filter products by selected category and product type
  const filteredProducts = useMemo(() => {
    let filtered = products
    
    if (activeCategory) {
      filtered = filtered.filter(product => product.category?._id === activeCategory)
    }
    
    if (activeProductType) {
      filtered = filtered.filter(product => product.productType?._id === activeProductType)
    }
    
    // If no filters are active, show 5 products for "Best Selling Products"
    // Use first 5 to avoid hydration mismatch (Math.random differs between server/client)
    if (!activeCategory && !activeProductType && filtered.length > 0) {
      return filtered.slice(0, 5)
    }
    
    return filtered
  }, [products, activeCategory, activeProductType])

  const [activeSection, setActiveSection] = useState(null)

  // Auto-select first section on mount
  useEffect(() => {
    if (sections && sections.length > 0 && !activeSection) {
      const firstSection = sections[0]
      setActiveSection(firstSection._id)
    }
  }, [sections, activeSection])

  // Get categories for active section from Sanity data
  const activeSectionCategories = useMemo(() => {
    if (!activeSection || !categories || !categories.length) return []
    return categories.filter(cat => {
      if (!cat.section) return false
      const sectionId = typeof cat.section === 'object' ? cat.section._id : cat.section
      return sectionId === activeSection
    }).sort((a, b) => (a.order || 999) - (b.order || 999))
  }, [activeSection, categories])

  // Auto-select first category when section is selected (only if no URL param)
  useEffect(() => {
    const categorySlug = router.query.category
    if (activeSection && activeSectionCategories.length > 0 && !activeCategory && !categorySlug) {
      const firstCategory = activeSectionCategories[0]
      setActiveCategory(firstCategory._id)
      // Update URL
      if (firstCategory.slug?.current) {
        router.push(`/?category=${firstCategory.slug.current}`, undefined, { shallow: true })
      }
    }
  }, [activeSection, activeSectionCategories, activeCategory, router.query.category, router])
  
  // Get active section data
  const activeSectionData = useMemo(() => {
    if (!activeSection || !sections || !sections.length) return null
    return sections.find(s => s._id === activeSection)
  }, [activeSection, sections])

  const handleSectionClick = useCallback((sectionId) => {
    setActiveSection(sectionId)
    // Auto-select first category in section
    const sectionCategories = categories.filter(cat => {
      if (!cat.section) return false
      const sectionIdObj = typeof cat.section === 'object' ? cat.section._id : cat.section
      return sectionIdObj === sectionId
    }).sort((a, b) => (a.order || 999) - (b.order || 999))
    
    if (sectionCategories.length > 0 && !activeCategory) {
      const firstCategory = sectionCategories[0]
      setActiveCategory(firstCategory._id)
      if (firstCategory.slug?.current) {
        router.push(`/?category=${firstCategory.slug.current}`, undefined, { shallow: true })
      }
    }
  }, [categories, activeCategory, router])

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
      
      {/* Main Content Area with Sidebar */}
      <div className="content-with-sidebar">
        {/* Sidebar Navigation */}
        <Sidebar
          sections={sections}
          categories={categories}
          activeSection={activeSection}
          activeCategory={activeCategory}
          onSectionClick={handleSectionClick}
          onCategoryClick={handleCategoryClick}
        />
        
        {/* Main Content Area */}
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
              {activeCategory 
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

