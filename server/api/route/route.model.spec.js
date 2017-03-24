import Route from './route.model';

describe('RouteModel',() => {

	describe('.greeting',() => {

		it('should have a greeting',() => {			
			let route = new Route({
				name: 'Route'
			});
			expect(route.greeting).to.equal('This route is called Route')
		});

	});

});