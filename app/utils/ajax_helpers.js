const ajax_helpers = {
  getBattle(){
    return fetch('http://localhost:3000/api/v1/competitions', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: {
      }
    }).then(response => response.json());
  },  
  
  selectWinner(competition, winner){
    return fetch(`http://localhost:3000/api/v1/competitions/${competition}`, {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Accept': "application/json",
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        competition: {
          winner_id: winner
        }
      })
    }).then(response => response.json()); 
  }
}

export default ajax_helpers