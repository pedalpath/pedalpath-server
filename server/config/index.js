const NODE_ENV = process.env.NODE_ENV || 'development';

let config = {
	debug: true,
	port: process.env.PORT || 8000,
	seed:  process.env.hasOwnProperty('SEED') ? (process.env.SEED === 'true') : false,
	mongo: {
		uri: process.env.MONGOLAB_URI
	}
}

switch (NODE_ENV){
	case 'test':
		config.seed = false;
		config.debug = false;
		config.mongo.uri = 'mongodb://localhost:27017/pedalpath-server-test';
	break
	case 'development':
		config.mongo.uri = 'mongodb://localhost:27017/pedalpath-server-dev'
	break
}

export default config;