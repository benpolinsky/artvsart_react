import {tokenObject} from '../localStorage.js';

const domain = 'http://localhost:3000';
const token = tokenObject();

const headers = {
  'Accept': "application/json",
  'Content-Type': 'application/json',
  token
}

export const getToken = () => {
  return fetch(`${domain}/api/v1/`, {
    credentials: 'include',
    method: 'GET',
    headers: headers
  }).then(response => response.json());
}

const getBattle = () => {
  return fetch(`${domain}/api/v1/competitions`, {
    credentials: 'include',
    method: 'POST',
    headers: headers,
    body: {
    }
  }).then(response => response.json());
}

const getArtInfo = () => {
  return fetch(`${domain}/api/v1/art`, {
    credentials: 'include',
    method: "GET",
    headers: headers
  }).then(response => response.json());
}

const fetchArt = (id) => {
  return fetch(`${domain}/api/v1/art/${id}`, {
    credentials: 'include',
    method: 'GET',
    headers: headers
  }).then(response => response.json());
}


const fetchResults = () => {
  return fetch(`${domain}/api/v1/results`, {
    credentials: "include",
    method: "GET",
    headers: headers
  }).then(response => response.json());
}

const selectWinner = (competition, winner) => {
  return fetch(`${domain}/api/v1/competitions/${competition}`, {
    credentials: 'include',
    method: 'PUT',
    headers: headers,
    body: JSON.stringify({
      competition: {
        winner_id: winner
      }
    })
  }).then(response => response.json()); 
}

const createNewArt = (art) => {
  return fetch(`${domain}/api/v1/art`, {
    credentials: 'include',
    method: "POST",
    headers: headers, 
    body: JSON.stringify({art: art})
  }).then(response => response.json());
}

const importArt = (id, source) => {
  return fetch(`${domain}/api/v1/art/import`, {
    credentials: 'include',
    method: 'POST',
    headers: headers,
    body: JSON.stringify({
      id: id,
      source: source
    })
  }).then(response => response.json());
}

const searchSource = (data) => {
  return fetch(`${domain}/api/v1/search_source?${to_params(data)}`, {
    credentials: 'include',
    method: "GET",
    headers: headers
  }).then(response => response.json());
}

function to_params(data) {
  return Object.keys(data).map(function(key) {
    return key + '=' + data[key];
  }).join('&');
}

export {
  getBattle, getArtInfo, fetchArt, fetchResults, 
  selectWinner, createNewArt, importArt, searchSource
}