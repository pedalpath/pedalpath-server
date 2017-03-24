'use strict';

let wrap = require('co-express');

class Endpoint {

  constructor(router,service) {

    // Set object attributes
    this.router = router;
    this.service = service;

    // Set endpoints
    this.endpoints();
  }

  endpoints() {
    this.router.post('/', wrap(this.create.bind(this)));
    this.router.get('/', wrap(this.index.bind(this)));
    this.router.get('/:id', wrap(this.show.bind(this)));
    this.router.put('/:id', wrap(this.update.bind(this)));
    this.router.delete('/:id', wrap(this.destroy.bind(this)));
  }

  sendError(response,error){
    console.error(error.name);
    response.status(500).send({
      message: error.toString(),
      detail: error.stack
    })
  }

  *index(req, res) {
    let objects
    let query = req.query;
    try {
      objects = yield this.service.index(query);
    } catch(error) {
      return this.sendError(res,error);
    }
    res.send(objects);
  }

  *show(req, res) {
    let object
    let id = req.params.id;
    let query = req.query;
    try {
      object = yield this.service.show(id,query);
    } catch(error) {
      return this.sendError(res,error);
    }
    if (!object) {
      return res.status(404).send({
        message: `No object found for id ${id}`
      });
    }
    res.send(object);
  }

  *create(req, res) {
    let object; 
    let data = req.body;
    try {
      object = yield this.service.create(data);
    } catch(error) {
      return this.sendError(res,error);
    }

    res.status(201).send(object)
  }

  *update(req, res) {
    let object;
    let id = req.params.id;
    let data = req.body;
    try {
      object = yield this.service.update(id,data)
    } catch(error) {
      return this.sendError(res,error);
    }
    if (!object) {
      return res.status(404).send({
        message: `No existing object found for id ${id}`
      });
    }
    res.status(200).send(object);
  }

  *destroy(req, res) {
    let object;
    let id = req.params.id;
    try {
      object = yield this.service.destroy(id);
    } catch(error) {
      return this.sendError(res,error);
    }
    if (!object) {
      return res.status(404).send({
        message: `No existing object found for id ${id}`
      });
    }
    res.status(204).send();
  }
}

module.exports = Endpoint