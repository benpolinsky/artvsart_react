import React from 'react'

const quickRow = ({label, content}) => {
  const styles = {
    label: {
      fontWeight: 700,
      width: 120,
      display: 'inline-block'
    },
    content: {
      margin: '6px 0'
    }
  }
  
  return (
    <h2 style={styles.content}>
      <span style={styles.label}>{`${label}:`}</span>
      {content}
    </h2>
  )
}

export default quickRow