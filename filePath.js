var path = require('path');
var config = require('./config');
var basePath = path.join(__dirname, config.filePath);

const filePath = (note) => basePath + `/${note.id}.zip`;

module.exports = filePath;
