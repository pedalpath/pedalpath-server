import Request from './request.model'

describe('RequestModel',() => {

	describe('.greeting',() => {

		it('should have a greeting',() => {			
			let request = new Request({})
			expect(request.greeting).to.equal(`This request is ${request._id}`)
		})

	})

})