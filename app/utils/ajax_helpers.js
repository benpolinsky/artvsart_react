const domain = 'http://localhost:3000';
const headers = {
  'Accept': "application/json",
  'Content-Type': 'application/json'
}

const ajax_helpers = {
  getBattle(){
    return fetch(`${domain}/api/v1/competitions`, {
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: {
      }
    }).then(response => response.json());
  },  
  
  getArtInfo(){
    return fetch(`${domain}/api/v1/art`, {
      credentials: 'include',
      method: "GET",
      headers: headers
    }).then(response => response.json());
  },
  
  selectWinner(competition, winner){
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
  },
  
  createNewArt(art){
    return fetch(`${domain}/api/v1/art`, {
      credentials: 'include',
      method: "POST",
      headers: headers, 
      body: JSON.stringify({art: art})
    }).then(response => response.json());
  },
  
  fetchArt(id){
    return fetch(`${domain}/api/v1/art/${id}`, {
      credentials: 'include',
      method: 'GET',
      headers: headers
    }).then(response => response.json());
  },
  
  importArt(id, source){
    return fetch(`${domain}/api/v1/art/import`, {
      credentials: 'include',
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        id: id,
        source: source
      })
    }).then(response => response.json());
  },
  
  searchSource(data){
    return fetch(`${domain}/api/v1/search_source?${to_params(data)}`, {
      credentials: 'include',
      method: "GET",
      headers: headers
    }).then(response => response.json());
  },
  
  fetchResults(){
    return fetch(`${domain}/api/v1/results`, {
      credentials: "include",
      method: "GET",
      headers: headers
    }).then(response => response.json());
  }
}

function to_params(data) {
  return Object.keys(data).map(function(key) {
    return key + '=' + data[key];
  }).join('&');
}

export default ajax_helpers