var colors = require('colors');
var path = require('path');
var glob = require('glob');
var Mocha = require('mocha');
var coMocha = require('co-mocha');
coMocha(Mocha);

// Global expectations
var chai = require('chai');
global.expect = chai.expect;
global.assert = chai.assert;
chai.use(require('chai-json-schema'));
global.addSchema = chai.tv4.addSchema;
global.getSchema = chai.tv4.getSchema;
chai.should();

// Load Sinon
global.sinon = require('sinon');

// Initialize Chai plugins
chai.use(require('sinon-chai'));
chai.use(require('chai-as-promised'));
chai.use(require('chai-things'))


// Create function to expect generator error
global.expectError = function*(generator){
	let threwError = false;
	try { generator() }
	catch (error) { threwError = true; }
	expect(threwError).to.be.true;
}

// Allow ES6 syntax
require('babel-polyfill');
require('babel-register');

// Set test environment
process.env.NODE_ENV = 'test';

let runUnitTests = () => new Promise(
	(resolve,reject) => {
		// Instantiate a Mocha instance.
		var unitMocha = new Mocha({});

		// Find files and run all tests
		let loadedTests = new Promise((resolve,reject) => {
			glob("./server/**/*.spec.js", function (error, files) {
				if (error) return reject(error);
				files.forEach((file) => unitMocha.addFile(file));
				resolve();
			});
		});

		loadedTests.then(() => {
			console.log('\nRunning unit tests'.underline.blue);
			unitMocha.run((failures) => {
				if (failures) reject(failures);
				else resolve();
			});
		});
	}
);


let runIntegrationTests = () => new Promise(
	(resolve, reject) => {

		// Pull in app to run server for integration tests
		global.app = require('./app');

		let integrationMocha = new Mocha({});
		let loadedIntegrations = new Promise((resolve,reject) => {
			glob("./server/**/*.integration.js", function (error, files) {
				if (error) return reject(error);
				files.forEach((file) => integrationMocha.addFile(file));
				resolve();
			});
		});

		loadedIntegrations.then(()=>{
			console.log('\nRunning integration tests'.underline.blue);
			integrationMocha.run(function(failures){
				if (failures) reject(failures);
				else resolve(failures);
			});
		}).catch(reject);
	}
);

Promise.resolve()
	.then(runUnitTests)
	.then(runIntegrationTests)
	.then(() => {
		process.exit(0)
	})
	.catch((error) => {
		console.error(error);
		process.exit(error);
	})

