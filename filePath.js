const path = require('path');
const config = require('./config');
const basePath = path.join(__dirname, config.filePath);

const filePath = (note) => basePath + `/${note.id}.zip`;

module.exports = filePath;
