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
  }
}

export default ajax_helpers