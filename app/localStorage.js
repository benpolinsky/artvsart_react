export const loadToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (token === null || token == "") {
      return undefined
    }
    return token
  } catch (e) {
    return undefined
  }
}

export const storeToken = (token) => {
  try {
    localStorage.setItem('token', token)
  } catch (e) {
    // ignore    
  }
}

export const tokenObject = () => {
  const token = loadToken();
  if (token === null) {
    return {}
  } else{
    return {'Authorization': loadToken()}
  }
}

export const deleteToken = () => {
  localStorage.removeItem('token');
}