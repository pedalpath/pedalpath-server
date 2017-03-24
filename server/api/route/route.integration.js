import request from 'supertest';

import Route from './route.model';

describe('/routes', () => {
    
  describe('/:id GET', () => {

    let route;

    beforeEach(function*(){
      route = new Route({ name: 'route' });
      yield route.save()
    })

    it('should return not found', function*(){
      let response = yield request(app)
        .get(`/routes/${route._id}`)
        .set('Accept', 'application/json')
        .expect(200)
      expect(response.body).to.have.any.keys(['name','locations']);
      expect(response.body.name).to.equal('route');
      expect(response.body.locations).to.deep.equal([]);
    })

  })

})
