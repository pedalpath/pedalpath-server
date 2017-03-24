import express from 'express';
import config from './config';

function loadClass(name,type){
  var Class;
  try {
    Class = require(`./api/${name}/${name}.${type}`);
  } catch(error) {
    if (config.debug) console.log(`Didn't find ${name} ${type}`);
    if (error.name === 'SyntaxError') throw(error);
    else if (error.name === 'ReferenceError') throw(error);
    else Class = require(`./utilities/${type}`);
  }
  return Class
}

function createRoute(name){
  var router = express.Router();
  var Model = loadClass(name,'model');
  var Service = loadClass(name,'service');
  var Endpoint = loadClass(name,'endpoint');
  var service = new Service(Model);
  var endpoint = new Endpoint(router,service);
  return router;
}

export default function(app) {

  app.use('/routes', createRoute('route'));
  app.use('/locations', createRoute('location'));
  app.get('/',(req,res) => res.send('Hello World'));

}