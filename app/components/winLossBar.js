import React from 'react'
import { StyleSheet, css } from 'aphrodite';

// string decimal to string percentage
const rate_to_percentage_flipped = (rate_string) => {
  return `${(1 - parseFloat(rate_string).toFixed(2))*100}%`;
}

const rate_to_percentage = (rate_string) => {
  return `${(parseFloat(rate_string).toFixed(2))*100}%`;
}


export const WinLossBar = ({data}) => {
  
  const styles = StyleSheet.create({
    winMeter: {
      backgroundColor: '#83dea0',
      width: rate_to_percentage(data.win_loss_rate)
    },
    
    lossMeter: {
      backgroundColor: "rgba(201, 53, 53, 0.81)",
      width: rate_to_percentage_flipped(data.win_loss_rate)
    },
    
    meter: {
      display: "inline-block",
      height: 10
    },
    
    winLossBar: {
      width: "100%",
      height: 10,
      display: 'block'
    },
    
    winLossContainer: {
      width: "100%",
      display: "block"
    }
  });
  
  return(
    <div className={css(styles.winLossContainer)}>
      <span className={css(styles.winLossBar)}>
        <span className={css(styles.winMeter, styles.meter)}></span>
        <span className={css(styles.lossMeter, styles.meter)}></span>
      </span>
    </div>
  ) 
}