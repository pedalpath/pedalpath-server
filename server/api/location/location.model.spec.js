import Location from '../location/location.model';

describe('LocationModel',() => {

	describe('.name',() => {

		it('should have a name',() => {			
			let location = new Location({
				name: 'Location'
			});
			expect(location.name).to.equal('Location');
		});

	});

});