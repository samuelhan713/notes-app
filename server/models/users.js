var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {type: String},
        email: {type: String},
        colorScheme: {type: String}, //(?)
    }
);

UserSchema
    .virtual('url')
    .get(function () {
        return '/catalog/user/' + this._id;
    });

module.exports = mongoose.model('User', UserSchema);