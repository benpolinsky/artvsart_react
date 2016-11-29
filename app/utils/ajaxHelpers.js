import {tokenObject, loadToken} from '../utils/localStorage.js';

const domain = process.env.API_URL;
const token = tokenObject();

const headers = {
  'Accept': "application/json",
  'Content-Type': 'application/json',
  ...token
}


export const get = url => {
  return fetch(`${domain}/api/v1/${url}`, {
    credentials: 'include',
    method: 'GET',
    headers: {...headers, ...tokenObject()}
  }).then(response => response.json());
}

export const post = (url, data) => {
  return fetch(`${domain}/api/v1/${url}`, {
    credentials: 'include',
    method: 'POST',
    headers: {...headers, ...tokenObject()},
    body: JSON.stringify(data)
  }).then(response => response.json());
}

export const put = (url, data) => {
  return fetch(`${domain}/api/v1/${url}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {...headers, ...tokenObject()},
    body: JSON.stringify(data)
  }).then(response => response.json()); 
}

// delete is reserved...
export const destroy = (url) => {
  return fetch(`${domain}/api/v1/${url}`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {...headers, ...tokenObject()}
  }).then(response => response.json());
}


// I don't mind this as the to_params() call
// doesn't belong in an action
// it could be abstracted a bit more...
export const searchSource = (data) => {
  return fetch(`${domain}/api/v1/search_source?${toParams(data)}`, {
    credentials: 'include',
    method: "GET",
    headers: {...headers, ...tokenObject()},
  }).then(response => response.json());
}

export const searchWikipedia = (name) => {
  return fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&origin=*&titles=${name}`).then(response => response.json())
}

export const toParams = (data) => {
  return Object.keys(data).map((key) => {
    if (data[key]) {
      return `${key}=${data[key]}`;      
    } else {
      return null
    }

  }).filter(n => n).join('&');
}
