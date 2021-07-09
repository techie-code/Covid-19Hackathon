var mongoose = require('mongoose');
var Schema = mongoose.Schema;

userSchema = new Schema( {
	
	unique_id: Number,
	email: String,
	username: String,
	password: String,
	passwordConf: String,
	dob:String,
	gender:String,
	country:String,
	state:String,
	city:String,
	address:String,
	mobile:String,
	nationalid:String
}),
User = mongoose.model('User', userSchema);

module.exports = User;