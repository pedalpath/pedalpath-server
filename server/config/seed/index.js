import Location from '../../api/location/location.model'
import Route from '../../api/route/route.model'
import Request from '../../api/request/request.model'

import locations from './data/locations.json'
import routes from './data/routes.json'
import requests from './data/requests.json'

/**
	* generateCreator
	* Generate a creator for the given Model
	* The creator can be used to make a new document
	*/
let generateCreator = (Model,formatter) => {
	let creator = async (doc) => {
		if (formatter) formatter(doc)
		doc = new Model(doc)
		await doc.save()
		return doc
	}
	return creator
}

/**
	* createDocuments
	* Create given documents with the provided creator
	* Place all created documents back in the provided object
	*/
let createDocuments = async (documents,creator) => {
  let promises = Object.keys(documents).map(async (key) => {
    documents[key] = await creator(documents[key])
  })
  await Promise.all(promises)
}

/**
	* removeCollections
	* Remove all documents from collections associated with Models
	*/
let removeCollections = async (Models) => {
	let promises = Models.map(
		async (Model) => Model.remove({}).exec()
	)
	await Promise.all(promises)
}

/**
	* createPoint
	* Create a point from coordinates
	*/
let createPoint = (coordinates) => ({ type: 'Point', coordinates: coordinates })

/**
	* seed
	* Seed script to remove documents then create locations, routes and agents
	*/
let seed = async () => {

	// Remove all data
	await removeCollections([Location,Route,Request])

	// Create locations
	await createDocuments(locations,generateCreator(Location,locationFormatter))
	function locationFormatter(location){
		location.point = createPoint(location.point)
	}
	
	// Create requests
	await createDocuments(requests,generateCreator(Request,requestFormatter))
	function requestFormatter(request){
		request.from = createPoint(requests.request_1.from)
		request.to = createPoint(requests.request_1.to)
	}
	
	// Create routes
	await createDocuments(routes,generateCreator(Route,routeFormatter))
	function routeFormatter(route){
		route.locations = route.locations.map((location) => locations[location.location])
		route.request = requests.request_1
	}

}

// Export seed script
module.exports = seed