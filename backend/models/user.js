var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostSchema = new Schema({
    name    :   {type: String, required: true},
    username    :   {type: String, required: true, unique: true},
    password    :   {type: String, required: true}
});

module.exports = mongoose.model('User', PostSchema);