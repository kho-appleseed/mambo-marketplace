import React, { memo } from 'react'

/**
 * SidebarNavItem - Category item with checkbox for sidebar
 * @param {Object} props
 * @param {string} props.id - Item ID
 * @param {string} props.name - Item name
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.isActive - Whether item is active/selected
 * @param {boolean} props.isSection - Whether this is a section (not a category)
 */
const SidebarNavItem = memo(({
  id,
  name,
  onClick,
  isActive = false,
  isSection = true
}) => {
  return (
    <label
      className={`sidebar-nav-item ${isActive ? 'active' : ''} ${isSection ? 'sidebar-section' : 'sidebar-category'}`}
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) onClick()
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          if (onClick) onClick()
        }
      }}
    >
      <input
        type="radio"
        name={isSection ? "section" : "category"}
        checked={isActive}
        onChange={() => {}}
        className="sidebar-checkbox"
      />
      <span className="sidebar-nav-name">{name}</span>
    </label>
  )
})

SidebarNavItem.displayName = 'SidebarNavItem'

export default SidebarNavItem

