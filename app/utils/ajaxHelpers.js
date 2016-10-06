import {tokenObject, loadToken} from '../localStorage.js';

const domain = 'http://localhost:3000';
const token = tokenObject();

const headers = {
  'Accept': "application/json",
  'Content-Type': 'application/json',
  ...token
}

// export const authGithubRequest = () => {
//   const data = {
//     client_id: '72999c5c016b8e18a13e',
//     redirect_url: 'http://localhost::3333/sign_up',
//     scope: 'user:email',
//     state: "w80dsadkjsadja"
//   }
//   window.open(`https://github.com/login/oauth/authorize?${to_params(data)}`);
// }
//

export const facebookLogin = () => {
  return fetch(`${domain}/users/auth/facebook/callback`, {
    credentials: 'include',
    method: 'GET',
    headers: {...headers, ...tokenObject()}
  }).then(response => response.json());

}


export const fetchTopJudges = () => {
  return fetch(`${domain}/api/v1/top_judges`, {
    credentials: 'include',
    method: 'GET',
    headers: {...headers, ...tokenObject()}
  }).then(response => response.json());
}


export const fetchUserCompetitions = () => {
  return fetch(`${domain}/api/v1/user/competitions`, {
    credentials: 'include',
    method: 'GET',
    headers: {...headers, ...tokenObject()}
  }).then(response => response.json());
}

export const signIn = (user) => {
  return fetch(`${domain}/api/v1/users/sign_in`, {
    credentials: 'include',
    method: 'POST',
    headers: {...headers, ...tokenObject()},
    body: JSON.stringify({
      email: user.email,
      password: user.password
    })
  }).then(response => response.json());
}

export const signOut = () => {
  return fetch(`${domain}/api/v1/users/sign_out`, {
    credentials: 'include',
    method: 'DELETE',
    headers: {...headers, ...tokenObject()},
    body: {
    }
  }).then(response => {
    return response.json();
  });
}

export const registerUser = (user) => {
  return fetch(`${domain}/users/`, {
    credentials: 'include',
    method: 'POST',
    headers: {...headers, ...tokenObject()},
    body: JSON.stringify({
      user: user
    })
  }).then(response => response.json());
}

export const getToken = () => {
  return fetch(`${domain}/api/v1/`, {
    credentials: 'include',
    method: 'GET',
    headers: {...headers, ...tokenObject()}
  }).then(response => response.json());
}

export const userInfo = () => {
  
  return fetch(`${domain}/api/v1/`, {
    credentials: 'include',
    method: 'GET',
    headers: {...headers, ...tokenObject()}
  }).then(response => response.json());
}

const getBattle = () => {
  return fetch(`${domain}/api/v1/competitions`, {
    credentials: 'include',
    method: 'POST',
    headers: {...headers, ...tokenObject()},
    body: {
    }
  }).then(response => response.json());
}

const getArtInfo = () => {
  return fetch(`${domain}/api/v1/art`, {
    credentials: 'include',
    method: "GET",
    headers: {...headers, ...tokenObject()}
  }).then(response => response.json());
}

const fetchArt = (id) => {
  return fetch(`${domain}/api/v1/art/${id}`, {
    credentials: 'include',
    method: 'GET',
    headers: {...headers, ...tokenObject()}
  }).then(response => response.json());
}


export const getResults = () => {
  return fetch(`${domain}/api/v1/results`, {
    credentials: "include",
    method: "GET",
    headers: {...headers, ...tokenObject()}
  }).then(response => response.json());
}

const selectWinner = (competition, winner) => {
  return fetch(`${domain}/api/v1/competitions/${competition}`, {
    credentials: 'include',
    method: 'PUT',
    headers: {...headers, ...tokenObject()},
    body: JSON.stringify({
      competition: {
        winner_id: winner
      }
    })
  }).then(response => response.json()); 
}

const createNewArt = (art) => {
  console.log(art);
  return fetch(`${domain}/api/v1/art`, {
    credentials: 'include',
    method: "POST",
    headers: {...headers, ...tokenObject()},
    body: JSON.stringify({art: art})
  }).then(response => response.json());
}

export const importArt = (id, source) => {
  return fetch(`${domain}/api/v1/art/import`, {
    credentials: 'include',
    method: 'POST',
    headers: {...headers, ...tokenObject()},
    body: JSON.stringify({
      id: id,
      source: source
    })
  }).then(response => response.json());
}

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

export {
  getBattle, getArtInfo, fetchArt, 
  selectWinner, createNewArt
}