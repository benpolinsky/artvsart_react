import {tokenObject, loadToken} from '../localStorage.js';

const domain = 'http://localhost:3000';
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
  return fetch(`${domain}/api/v1/search_source?${to_params(data)}`, {
    credentials: 'include',
    method: "GET",
    headers: {...headers, ...tokenObject()},
  }).then(response => response.json());
}

function to_params(data) {
  return Object.keys(data).map(function(key) {
    return key + '=' + data[key];
  }).join('&');
}
