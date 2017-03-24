import { getObjectId, objectsEqual } from '../../utilities/generic';

import Model from '../../utilities/model';
import Mongo from '../../utilities/mongo';

class RouteModel extends Model {
	get greeting(){
		return `This route is called ${this.name}`;
	}	
}

RouteModel.schema = {
	locations: [{
		ref: 'Location',
		type: Mongo.ObjectId
	}]
}

module.exports = Mongo('Route',RouteModel);