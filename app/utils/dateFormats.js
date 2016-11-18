import Datejs from 'datejs'

const dateFormat = (date) => {
  if (typeof date == 'string') {
    return Date.parse(date).toString("M/d/yyyy");
  } 
}

export default dateFormat;