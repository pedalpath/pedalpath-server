import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

import config from '../../config';
import Route from './route.model';
import RouteService from './route.service';

import Location from '../location/location.model';

describe('RouteService',() => {

	let service, location, route;

	// Mock mongoose
	before(function (done) {
		mockgoose(mongoose).then(() => mongoose.connect('',done));
	});

	// Reset database
	afterEach(function(){
		mockgoose.reset();
	})

	// Close mocked mongoose connection
	after(function() {
		mongoose.connection.close();
	});

	beforeEach(function*() {
		// Instantiate route service
		service = new RouteService(Route);

		// Create a location
		location = new Location({
			name: 'location',
			coordinates: {
				type: "Point",
				coordinates:[51.5201493,-0.0545479]
			}
		});
		yield location.save();

		// Create a route
		route = new Route({
			name: 'route',
			locations: [location]
		});
		yield route.save()

	});

	describe('.index()', function*(){

		it('should return populated locations for all routes', function*(){

			let routes = yield service.index();
			expect(routes).to.be.an.array;
			expect(routes).to.have.length(1);
			expect(routes[0]).to.have.any.keys(['name','locations']);
			expect(routes[0].name).to.equal('route');
			expect(routes[0].locations).to.deep.equal([location]);

		})

	})

	describe('.show()', function*(){

		it('should return populated locations for a single route', function*(){

			let route = yield service.show(route._id);
			expect(route).to.have.any.keys(['name','locations']);
			expect(route.name).to.equal('route');
			expect(route.locations).to.deep.equal([location]);

		})

	})

});