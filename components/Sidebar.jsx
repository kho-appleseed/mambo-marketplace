import React from 'react'
import SidebarNavItem from './SidebarNavItem'

/**
 * Sidebar component - Navigation sidebar with sections
 * @param {Object} props
 * @param {Array} props.sections - Array of section objects
 * @param {Array} props.categories - Array of category objects (hidden for now)
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

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
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
          {sections.map((section) => (
            <SidebarNavItem
              key={section._id}
              id={section._id}
              name={section.name}
              onClick={() => handleSectionClick(section._id)}
              isActive={activeSection === section._id}
            />
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar

