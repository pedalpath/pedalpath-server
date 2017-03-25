import { getObjectId, objectsEqual } from '../../utilities/generic';

import Model from '../../utilities/model';
import Mongo from '../../utilities/mongo';

class RequestModel extends Model {
	get greeting(){
		return `This request is ${this._id}`;
	}	
}

RequestModel.schema = {
	from: Mongo.Point,
	to: Mongo.Point,
	params: {
		safety: { type: Number, min: 0, max: 1 },
		scenic: { type: Number, min: 0, max: 1 },
		quiet: { type: Number, min: 0, max: 1 },
	}
}

module.exports = Mongo('Request',RequestModel);