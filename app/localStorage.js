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

export const loadUser = () => {
  try {
    const user = {
      token: localStorage.getItem('token'),
      email: localStorage.getItem('email'),
      type: localStorage.getItem('type')
    }
    if (user.token === null || user.token == "") {
      return undefined
    }
    return user
  } catch (e) {
    return undefined
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


export const storeToken = (user) => {
  try {
    localStorage.setItem('token', user.auth_token);
    localStorage.setItem('email', user.email);
    localStorage.setItem('type', user.type);
  } catch (e) {
    // ignore    
  }
}


export const deleteToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('email');
  localStorage.removeItem('type');
}