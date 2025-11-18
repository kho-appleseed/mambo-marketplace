import React from 'react'

const Types = ({ types, activeType, onTypeClick }) => {
  if (!types || types.length === 0) return null

  return (
    <div className='types-container'>
      <h3 className='types-title'>Filter by Type</h3>
      <div className='types-buttons'>
        <button
          className={`type-button ${!activeType ? 'active' : ''}`}
          onClick={() => onTypeClick(null)}
        >
          All
        </button>
        {types.map((type) => (
          <button
            key={type._id}
            className={`type-button ${activeType === type._id ? 'active' : ''}`}
            onClick={() => onTypeClick(type._id)}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Types

