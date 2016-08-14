const log = require('simple-node-logger').createSimpleLogger();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/bl', (error) => {
	if (error) {
		log.error('Can not connect to mongodb.');
		throw error;
	}
});

//create schema
let configSchema = new Schema({
  _id: { type: Number, required: true },
  fps: { type: Number, required: true },
	model: { type: Number, required: true },
  logoColor: { type: String, required: true },
	threshold: { type: Number, required: true },
  thresholdChecked: { type: Boolean, required: true }
}, { collection: 'bl' });
let Configuration = mongoose.model('Configuration', configSchema);

exports.getConfigurationPromise = () => new Promise(function(resolve, reject) {
  //get configuration from mongodb
  Configuration.findOne(function(err, conf) {
    if (err) throw err;
    if (conf._id !== 412662) throw { 'error': 'More than one record in bl db.' };

    resolve(conf);
  });

});
