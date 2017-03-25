import Service from '../../utilities/service'

class RequestService extends Service {

  /*
  * Access a list of objects
  * @param {Object} query
  * @return {Array} objects
  */
  async index(query) {
    query = query || {}
    let requests = await this.Model.find(query).exec()
    return requests
  }

  /*
  * Show a particular object using the id
  * @param {ObjectId} id
  * @return {Object} object
  */
  async show(id) {
    let request = await this.Model.findById(id).exec()
    return route
  }

}

module.exports = RequestService