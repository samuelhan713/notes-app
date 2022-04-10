var mongoose = require('mongoose');
/* const { default: Profile } = require('../../src/components/profile'); */

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