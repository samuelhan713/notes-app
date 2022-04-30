var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema(
    {
        text: {type: String},
        lastUpdatedDate: {type: String},
        noteTags: [{type: Object}],
    }
);


NoteSchema
    .virtual('fullText')
    .get(function () {
        return this.text + "!";
    });

NoteSchema
    .virtual('date')
    .get(function () {
        return this.lastUpdatedDate;
    });

module.exports = mongoose.model('Note', NoteSchema);
