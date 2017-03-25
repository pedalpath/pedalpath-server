'use strict';

import wrap from 'co-express';
import Endpoint from '../../utilities/endpoint';

class RouteEndpoint extends Endpoint {

  endpoints() {
    this.router.get('/action', wrap(this.action.bind(this)));
    super.endpoints();
  }

  async action(req, res) {
    let query = req.query;
    try {
      
    } catch(error) {
      return this.sendError(res,error);
    }
    res.send('issa action')
  }
}

module.exports = RouteEndpoint;