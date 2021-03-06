var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const date = new Date();

var NoteSchema = new Schema(
    {
        text: {type: String},
        lastUpdatedDate: {type: String},
        noteTags: [{type: Object}],
        agent: { type: Schema.Types.ObjectId, ref: 'User', required: false },
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
