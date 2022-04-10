var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
    {
        text: {type: String},
        lastUpdatedDate: {type: String}
    }
);


NoteSchema
    .virtual('url')
    .get(function () {
        return '/catalog/note/' + this._id;
    });

module.exports = mongoose.model('Note', NoteSchema);
