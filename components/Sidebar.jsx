import React from 'react'
import SidebarNavItem from './SidebarNavItem'

/**
 * Sidebar component - Navigation sidebar with sections and categories
 * @param {Object} props
 * @param {Array} props.sections - Array of section objects
 * @param {Array} props.categories - Array of category objects
 * @param {string} props.activeSection - Currently active section ID
 * @param {string} props.activeCategory - Currently active category ID
 * @param {Function} props.onSectionClick - Handler for section clicks
 * @param {Function} props.onCategoryClick - Handler for category clicks
 * @param {boolean} props.isOpen - Whether sidebar is open (for mobile)
 * @param {Function} props.onClose - Handler to close sidebar (for mobile)
 */
const Sidebar = ({
  sections = [],
  categories = [],
  activeSection,
  activeCategory,
  onSectionClick,
  onCategoryClick,
  isOpen = true,
  onClose
}) => {
  const handleSectionClick = (sectionId) => {
    if (onSectionClick) {
      onSectionClick(sectionId)
    }
  }

  const handleCategoryClick = (categoryId) => {
    if (onCategoryClick) {
      onCategoryClick(categoryId)
    }
  }

  // Get categories for each section
  const getSectionCategories = (sectionId) => {
    return categories.filter(cat => {
      if (!cat.section) return false
      const sectionIdObj = typeof cat.section === 'object' ? cat.section._id : cat.section
      return sectionIdObj === sectionId
    }).sort((a, b) => (a.order || 999) - (b.order || 999))
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && onClose && (
        <div 
          className="sidebar-overlay" 
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">Shop by Category</h2>
          {onClose && (
            <button 
              className="sidebar-close-btn" 
              onClick={onClose}
              aria-label="Close sidebar"
            >
              ×
            </button>
          )}
        </div>
        
        <nav className="sidebar-nav">
          {sections.map((section) => {
            const sectionCategories = getSectionCategories(section._id)
            const isSectionActive = activeSection === section._id
            
            return (
              <div key={section._id} className="sidebar-section-group">
                <SidebarNavItem
                  id={section._id}
                  name={section.name}
                  onClick={() => handleSectionClick(section._id)}
                  isActive={isSectionActive}
                  isSection={true}
                />
                {/* Show categories when section is active */}
                {isSectionActive && sectionCategories.length > 0 && (
                  <div className="sidebar-categories">
                    {sectionCategories.map((category) => (
                      <SidebarNavItem
                        key={category._id}
                        id={category._id}
                        name={category.name}
                        onClick={() => handleCategoryClick(category._id)}
                        isActive={activeCategory === category._id}
                        isSection={false}
                      />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar

