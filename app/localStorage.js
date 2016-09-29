export const loadToken = () => {
  try {
    const token = localStorage.getItem('token');
    if (token === null) {
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
  console.log(token);
  if (token === null) {
    return {}
  } else{
    return {'Authorization': loadToken()}
  }
}