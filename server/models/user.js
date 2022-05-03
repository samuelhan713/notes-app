var mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('../utils/validators');

var Schema = mongoose.Schema;

var validateEmail = function(email) {
    console.log("validaing email...");
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}

var UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            validate: {
                validator: validator.validateEmail,
                message: props => `${props.value} is not a valid email!`
            },
        }, //have at least 1 character before an @symbol followed by a domain name
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profileImage: {type: String},
        colorScheme: {type: String},
    }
);

UserSchema.statics.findAndValidate = async function (email, password) {
    const user = await this.findOne({email});
    if(!user) {
        return false;
    }
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : false;
}

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})

/* UserSchema
    .virtual('url')
    .get(function () {
        return '/catalog/user/' + this._id;
    }); */

module.exports = mongoose.model('User', UserSchema);