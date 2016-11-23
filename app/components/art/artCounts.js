import React from 'react';
import CategoryCountStyles from '../../styles/categoryCountStyles.js';

const ArtCounts = ({categories, totalCount}) => {
  return (
    <div style={CategoryCountStyles.container}>
      <h1 style={CategoryCountStyles.header}>Art Count by Category ({totalCount} total)</h1>

      {categories.map(category => {
        return (
          <div key={category.id} style={CategoryCountStyles.eachContainer}>
            <p style={CategoryCountStyles.name}>{category.name}</p>
            <div style={CategoryCountStyles.count}>{category.art_count}</div>
          </div>
        )})
      }
      
    </div>
  )
}

export default ArtCounts