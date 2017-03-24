import Model from '../../utilities/model';
import Mongo from '../../utilities/mongo';


class LocationModel extends Model {

}

LocationModel.schema = {
	point: Mongo.Point
}

LocationModel.hooks = {
	post: {
		save: function(doc){
			console.log('Just saved',doc)
		}
	}
}


module.exports = Mongo('Location',LocationModel);