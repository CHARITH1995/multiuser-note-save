const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TextFile = new Schema({
    userId: {
        type:Number
    },
    textBody: {
        type: String
    },
    is_archived: {
        type: Boolean
    }
});

module.exports = mongoose.model('TextFile', TextFile);