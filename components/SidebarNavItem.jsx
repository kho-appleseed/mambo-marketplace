import React, { memo } from 'react'

/**
 * SidebarNavItem - Category item with checkbox for sidebar
 * @param {Object} props
 * @param {string} props.id - Item ID
 * @param {string} props.name - Item name
 * @param {Function} props.onClick - Click handler
 * @param {boolean} props.isActive - Whether item is active/selected
 */
const SidebarNavItem = memo(({
  id,
  name,
  onClick,
  isActive = false
}) => {
  return (
    <label
      className={`sidebar-nav-item ${isActive ? 'active' : ''}`}
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
        name="section"
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

