import Service from '../../utilities/service';

class RouteService extends Service {

  /*
  * Access a list of objects
  * @param {Object} query
  * @return {Array} objects
  */
  async index(query) {
    query = query || {};
    let routes = await this.Model.find(query).populate('locations').exec();
    return routes
  }

  /*
  * Show a particular object using the id
  * @param {ObjectId} id
  * @return {Object} object
  */
  async show(id) {
    let route = await this.Model.findById(id).populate('locations').exec();
    return route;
  }

}

module.exports = RouteService;