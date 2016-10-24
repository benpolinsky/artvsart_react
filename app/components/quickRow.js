import React from 'react'
import styles from '../styles/competition.js'

const QuickRow = ({label, content}) => {
  const rowStyles = styles.artInfo
  return (
    <div style={rowStyles}>
      <span style={rowStyles.labels}>{`${label}:`}</span>
      {content}
    </div>
  )
}

QuickRow.propTypes = {
  label: React.PropTypes.string.isRequired,
  content: React.PropTypes.string
}

export default QuickRow