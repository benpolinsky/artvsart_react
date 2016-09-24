import expect from 'expect';
import sinon from 'sinon';
import fetchMock from 'fetch-mock';
import {getBattle} from '../utils/ajax_helpers.js';



describe('Ajax Helpers', function(){
  
  before(function(done) {
    const battle_response = "{\"competition\":{\"id\":1198,\"winning_art\":null,\"losing_art\":null,\"art\":{\"id\":2213,\"name\":\"Now Sleeps the Crimson Petal\",\"creator\":\"Justine Herzog\",\"description\":null,\"status\":\"pending_review\",\"image\":\"http://placehold.it/250x250\",\"win_loss_record\":\"0-0\"},\"challenger\":{\"id\":2212,\"name\":\"The Moving Toyshop\",\"creator\":\"Brook Bosco\",\"description\":null,\"status\":\"pending_review\",\"image\":\"http://placehold.it/250x250\",\"win_loss_record\":\"0-0\"}}}"
    
    fetchMock.post('http://localhost:3000/api/v1/competitions', battle_response);
  });
  
  after(function(){
    fetchMock.restore();
  })

  
  it('can getBattle()', function(done){
      getBattle().then(function(response){
        expect(response).to_eql("");
        done();

    }, function(err){
      done(err);
    });
  });
});